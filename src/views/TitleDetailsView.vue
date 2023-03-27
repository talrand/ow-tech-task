<script setup lang="ts">
import TitleDetails from '../components/titles/TitleDetails.vue';

const props = defineProps({
  titleId: {
    type: String,
    required: true
  }
});

</script>
<template>
  <TitleDetails :id="titleId"></TitleDetails>
</template>