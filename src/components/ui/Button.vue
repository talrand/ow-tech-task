<script setup lang="ts">import { computed } from 'vue';


const props = defineProps({
    /** Text to display on the button */
    text: {
        type: String,
        required: true
    },
    /** Disables/enables the button  */
    disabled: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['click']);

/** Handles the button click event */
const clicked = () => {
    if (props.disabled) {
        return;
    }

    emit('click');
}

const disabledClasses = computed(() => {
    return props.disabled ? ['bg-gray-300', 'cursor-not-allowed'] : ['bg-ow-orange', 'cursor-pointer', 'hover:opacity-80'];
});

</script>
<template>
    <button :class="['text-white', 'py-1 px-2', 'rounded-md', ...disabledClasses]" @click="clicked">{{ text }}</button>
</template>
