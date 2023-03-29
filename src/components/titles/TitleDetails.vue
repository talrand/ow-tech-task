<script setup lang="ts">
import { PropType } from 'vue';
import { useRouter } from 'vue-router';
import { Title } from '../../types/Title';
import Map from '../ui/Map.vue';
import Tag from '../ui/Tag.vue';
import Button from '../ui/Button.vue';

const props = defineProps({
  /** Title details to display */
  title: {
    type: Object as PropType<Title>
  }
});

const router = useRouter();

/** Handles the click event on the Back button */
const onBackClick = () => {
  router.back();
}

</script>
<template>
  <div class="flex flex-col space-y-2 w-full">
    <Button text="Back" @click="onBackClick" class="w-16"></Button>
    <div v-if="title" class="flex flex-col w-full items-center sm:flex-row sm:space-x-3 sm:items-start">
      <div class="flex flex-col sm:w-3/4 space-y-2 mb-4 sm:mb-0">
        <div class="flex flex-row w-full items-center">
          <span class="font-bold text-lg">{{ title['Title Number'] }}</span>
          <Tag :text="title.Tenure" class="ml-3"></Tag>
        </div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt placerat pulvinar.
          Quisque fringilla felis et sapien bibendum, maximus pharetra neque lobortis. Vivamus quis ultrices nibh.
          Integer aliquam vel velit a pharetra.</div>
        <div>Proin nibh nunc, ornare non risus nec, volutpat rhoncus tellus.
          Suspendisse potenti. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Morbi id dapibus tortor. In sodales facilisis risus at euismod.</div>
      </div>
      <div class="w-full md:w-[350px] min-w-[350px]">
        <Map :latitude="title.Y" :longitude="title.X"></Map>
      </div>
    </div>
  </div>
</template>