<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useTitlesStore } from '../../stores/TitlesStore';
import { Title } from '../../types/Title';
import Map from '../ui/Map.vue';
import Tag from '../ui/Tag.vue';

const titlesStore = useTitlesStore();
const title = ref<Title>();

onMounted(async () => {
  title.value = await titlesStore.getTitleByNumber(props.id);
});

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

</script>
<template>
  <div v-if="title" class="flex flex-col w-full items-center sm:flex-row sm:space-x-3 sm:items-start">
    <div class="flex flex-col md:w-1/2 space-y-2 mb-4 sm:mb-0">
      <div class="flex flex-row w-full items-center">
        <span class="font-bold text-lg">{{ title['Title Number'] }}</span>
        <Tag :text="title.Tenure" class="ml-3"></Tag>
      </div>
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt placerat pulvinar. 
        Quisque fringilla felis et sapien bibendum, maximus pharetra neque lobortis. Vivamus quis ultrices nibh. 
        Integer aliquam vel velit a pharetra.</div> 
       <div>Proin nibh nunc, ornare non risus nec, volutpat rhoncus tellus. 
        Suspendisse potenti. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
        Morbi id dapibus tortor. In sodales facilisis risus at euismod. Maecenas mollis ornare sem eu consequat. 
        Ut semper mattis erat a tincidunt. Nulla interdum in lacus sit amet mattis.</div>
    </div>
    <div class="w-full md:w-[400px] min-w-[400px]">
      <Map :latitude="title.Y" :longitude="title.X"></Map>
    </div>
  </div>
</template>