import { describe, expect, test } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import Map from "../../../components/ui/Map.vue";
import { GoogleMap, Marker } from "vue3-google-map";

describe('Map', () => {
    test('Tests longitude and latitude are passed to correctly', () => {
        const wrapper = shallowMount(Map, {
            propsData: {
                latitude: 51.597050,
                longitude: -1.140680
            }
        });

        expect(wrapper.vm.latitude).toBe(51.597050);
        expect(wrapper.vm.longitude).toBe(-1.140680);
    });

    test('Tests Google Map is rendered', () => {
        const wrapper = mount(Map, {
            propsData: {
                latitude: 51.597050,
                longitude: -1.140680
            }
        });

        expect(wrapper.find('.mapdiv').exists()).toBeTruthy();
        expect(wrapper.findComponent(GoogleMap).exists()).toBeTruthy();
        expect(wrapper.findComponent(Marker).exists()).toBeTruthy();
    });
});