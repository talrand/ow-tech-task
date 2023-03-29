<script setup lang="ts">
import { computed } from 'vue';
import Button from './Button.vue';

const props = defineProps({
    /** Current page number */
    modelValue: {
        type: Number,
        required: true
    },
    /** Total number of results */
    totalResults: {
        type: Number,
        required: true
    },
    /** Number of results to be displayed per page */
    resultsPerPage: {
        type: Number,
        required: true
    }
});

const currentPageNumber = computed({
    get: () => props.modelValue,
    set: (value :Number) => emit('update:modelValue', value)
});

const emit = defineEmits(['update:modelValue']);

/** Calculates the total number of pages */
const totalPages = computed(() => Math.ceil(props.totalResults / props.resultsPerPage));

</script>
<template>
    <div class="flex flex-row w-full justify-end space-x-2">
        <Button text="<" :disabled="currentPageNumber === 1" @click="currentPageNumber--"></Button>
        <div class="ml-auto py-1">{{ currentPageNumber }} of {{ totalPages }}</div>
        <Button text=">" :disabled="currentPageNumber === totalPages" @click="currentPageNumber++"
            class="ml-auto"></Button>
    </div>
</template>
