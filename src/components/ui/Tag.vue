<script setup lang="ts">
/** Text to display in tag */
const props = defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>
<template>
    <div class="rounded-xl bg-ow-dark-blue text-white m-4 py-1 px-3">
        {{ text }}
    </div>
</template>
