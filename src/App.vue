<script setup lang="ts">
import { RouterView } from 'vue-router';

</script>
<template>
    <div class="flex flex-col w-full items-center p-4">
        <div class="flex flex-col w-full md:w-3/4 items-center">
            <RouterView></RouterView>
        </div>
    </div>
</template>