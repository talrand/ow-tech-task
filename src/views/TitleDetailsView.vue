<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TitleDetails from '../components/titles/TitleDetails.vue';
import { useTitlesStore } from '../stores/TitlesStore';
import { Title } from '../types/Title';

const props = defineProps({
  titleId: {
    type: String,
    required: true
  }
});

const titlesStore = useTitlesStore();
const title = ref<Title>();

onMounted(async () => {
  title.value = await titlesStore.getTitleByNumber(props.titleId);
});

</script>
<template>
  <TitleDetails :title="title"></TitleDetails>
</template>