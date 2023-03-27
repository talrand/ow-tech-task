<script setup lang="ts">
import { computed } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map'

const props = defineProps({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
})

const center = computed(() => {
    return { lat: props.latitude, lng: props.longitude }
})

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

</script>
<template>
    <GoogleMap :api-key="googleMapsApiKey" style="width: 100%; height: 400px" :center="center" :zoom="16">
        <Marker :options="{ position: center }" />
    </GoogleMap>
</template>