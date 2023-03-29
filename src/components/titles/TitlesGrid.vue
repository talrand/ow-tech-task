<script setup lang="ts">
import { Mutex } from 'async-mutex';
import { PropType, ref, computed, onMounted, watch, nextTick } from 'vue';
import { SortByTitleNumber, SortByTenure } from '../../helpers/SortHelper';
import { RouteNames } from '../../router/RouteNames';
import { SortDirection } from '../../types/SortDirection';
import { Title } from '../../types/Title';
import { TitleSort } from '../../types/TitleSort';
import { useRouter } from 'vue-router';
import GridHeader from '../ui/GridHeader.vue';
import Pagination from '../ui/Pagination.vue';

const props = defineProps({
    /** Titles to display in the grid */
    titles: {
        type: Array as PropType<Title[]>,
        required: true
    },
    /** Number of titles to display per page */
    resultsPerPage: {
        type: Number,
        default: 5
    },
    /** Default sort order for the grid */
    defaultSort: {
        type: Number as PropType<TitleSort>,
        default: TitleSort.None
    },
    /** Default sort direction for the grid */
    defaultSortDirection: {
        type: Number as PropType<SortDirection>,
        default: SortDirection.None
    },
    /** Default page to be displayed */
    defaultPage: {
        type: Number,
        default: 1
    }
});

onMounted(() => {
    // Set defaults passed in via props. This is to avoid mutating props
    sortBy.value = props.defaultSort;

    switch (sortBy.value) {
        case TitleSort.TitleNumber:
            titleNumberSortDirection.value = props.defaultSortDirection;
            break;
        case TitleSort.Tenure:
            tenureSortDirection.value = props.defaultSortDirection;
            break;
    }

    currentPageNumber.value = props.defaultPage;

    /* To avoid a race condition with the watchers, only set the loaded flag 
     * after Vue's state management has moved to the next step */
    nextTick(() => {
        loaded.value = true;
    });
});

const router = useRouter();
const loaded = ref(false);
const currentPageNumber = ref(1);

/** Gets the index of the first title for the current page */
const indexOfFirstTitleInPage = computed(() => {
    return (currentPageNumber.value - 1) * props.resultsPerPage;
});

/** Gets the index of the first title for the next page (if applicable) */
const indexOfFirstTitleInNextPage = computed(() => {
    const index = currentPageNumber.value * props.resultsPerPage;

    return index <= props.titles.length - 1 ? index : props.titles.length;
});

/** Title data for the current page */
const pagedData = computed(() => {
    return sortedData.value.slice(indexOfFirstTitleInPage.value, indexOfFirstTitleInNextPage.value);
});

const sortBy = ref<TitleSort>(TitleSort.None);
const titleNumberSortDirection = ref<SortDirection>(SortDirection.None);
const tenureSortDirection = ref<SortDirection>(SortDirection.None);

const sortedData = computed(() => {
    // Need to clone the passed data to avoid mutating the props
    const data = [...props.titles]

    if (sortBy.value === TitleSort.None) {
        return data;
    }

    return data.sort((a, b) => {
        switch (sortBy.value) {
            case TitleSort.TitleNumber:
                return SortByTitleNumber(a, b, titleNumberSortDirection.value);

            case TitleSort.Tenure:
                return SortByTenure(a, b, tenureSortDirection.value);

            default:
                return 0;
        }
    });
});

const onRowClick = async (title: Title) => {
    await router.push({ name: RouteNames.TitleDetails, params: { titleId: title['Title Number'] } })
}

watch(() => currentPageNumber.value, async () => {  
    if (!loaded.value) {
        return;
    }
    
    await updateRoute();
});

watch(() => tenureSortDirection.value, async newValue => {
    if (!loaded.value || newValue === SortDirection.None) {
        return;
    }

    titleNumberSortDirection.value = SortDirection.None;
    sortBy.value = TitleSort.Tenure;
    currentPageNumber.value = 1;

    await updateRoute();
});

watch(() => titleNumberSortDirection.value, async newValue => {
    if (!loaded.value || newValue === SortDirection.None) {
        return;
    }

    tenureSortDirection.value = SortDirection.None;
    sortBy.value = TitleSort.TitleNumber;
    currentPageNumber.value = 1;

    await updateRoute();
});

const updateRoute = async () => {
    const mutex = new Mutex
    let sortDirection: SortDirection = SortDirection.None

    switch (sortBy.value) {
        case TitleSort.TitleNumber:
            sortDirection = titleNumberSortDirection.value;
            break;
        case TitleSort.Tenure:
            sortDirection = tenureSortDirection.value;
            break;
    }

    /* To avoid multiple updates firing at the same time and potentially getting the wrong route,
     * only allow one process to update the router at a time  */  
    await mutex.runExclusive(async () => {
        await router.push({ name: RouteNames.TitlesList, query: { page: currentPageNumber.value, sortBy: sortBy.value, sortDirection: sortDirection } });
    });
}

</script>
<template>
    <div class="flex flex-col w-full max-w-[500px]">
        <table class="table-fixed border border-1 border-300-gray mb-2 w-full" cellpadding="5px">
            <thead class="bg-gray-300 w-30">
                <tr>
                    <GridHeader text="Title Number" v-model="titleNumberSortDirection"></GridHeader>
                    <GridHeader text="Class of Title" v-model="tenureSortDirection"></GridHeader>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pagedData" :key="item['Title Number']"
                    class="border border-b-1 border-300-gray hover:bg-gray-200 hover:cursor-pointer"
                    @click="onRowClick(item)">
                    <td>{{ item['Title Number'] }}</td>
                    <td>{{ item.Tenure }}</td>
                </tr>
            </tbody>
        </table>
        <div class="flex flex-row">
            <Pagination v-model="currentPageNumber" :total-results="titles.length" :results-per-page="resultsPerPage">
            </Pagination>
        </div>
    </div>
</template>
