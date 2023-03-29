<script setup lang="ts">
import { PropType, computed } from 'vue';
import { SortDirection } from '../../types/SortDirection';
import ChevronDownIcon from '../icons/ChevronDownIcon.vue';
import ChevronUpIcon from '../icons/ChevronUpIcon.vue';

const props = defineProps({
    /** Text to display in the Grid Header */
    text: {
        type: String,
        required: true
    },
    /** Current sort direction for the Grid Header */
    modelValue: {
        type: Number as PropType<SortDirection>,
        required: true
    }
});

const sortDirection = computed({
    get: () => props.modelValue,
    set: (value: SortDirection) => emit('update:modelValue', value)
})

const emit = defineEmits(['update:modelValue'])

/** Handles the header click event */
const onClick = () => {
    // Update the sort direction based on the current value
    switch (sortDirection.value) {
        case SortDirection.None:
        case SortDirection.Descending:
            sortDirection.value = SortDirection.Ascending;
            break;
        case SortDirection.Ascending:
            sortDirection.value = SortDirection.Descending;
            break;
    }
}

</script>
<template>
    <th class="text-left hover:cursor-pointer" @click="onClick">
        <div class="flex flex-row items-center">
            <span>{{ text }}</span>
            <ChevronDownIcon v-if="sortDirection === SortDirection.Ascending" class="ml-1"></ChevronDownIcon>
            <ChevronUpIcon v-if="sortDirection === SortDirection.Descending" class="ml-1"></ChevronUpIcon>
        </div>
    </th>
</template>
