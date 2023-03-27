<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTitlesStore } from '../stores/TitlesStore'
import { Title } from '../types/Title'
import { useRouter } from 'vue-router';

import TitlesGrid from '../components/titles/TitlesGrid.vue';
import { TitleSort } from '../types/TitleSort';
import { SortDirection } from '../types/SortDirection';

const router = useRouter();
const titles = ref<Title[]>([]);
const titlesStore = useTitlesStore();
const defaultPage = ref(1);
const defaultSort = ref<TitleSort>(TitleSort.None);
const defaultSortDirection = ref<SortDirection>(SortDirection.None)
const loaded = ref(false);

onMounted(async () => {
    titles.value = await titlesStore.getTitles();

    // Read values from query string, this allows users share the current page they're on
    if (router.currentRoute.value.query.page != undefined) {
        defaultPage.value = Number(router.currentRoute.value.query.page);
    }

    if (router.currentRoute.value.query.sortBy != undefined) {
        defaultSort.value = Number(router.currentRoute.value.query.sortBy);
    }

    if (router.currentRoute.value.query.sortDirection != undefined) {
        defaultSortDirection.value = Number(router.currentRoute.value.query.sortDirection);
    }

    // Set a loaded flag to avoid grid double loading
    loaded.value = true;
});


</script>
<template>
    <div v-if="loaded">
        <TitlesGrid :titles="titles" :default-page="defaultPage" :default-sort="defaultSort"
            :default-sort-direction="defaultSortDirection"></TitlesGrid>
    </div>
</template>