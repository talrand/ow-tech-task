import { mount } from "@vue/test-utils";
import { test, expect, describe } from "vitest";
import { Title } from "../../../types/Title";
import TitleDetails from "../../../components/titles/TitleDetails.vue";
import Map from "../../../components/ui/Map.vue";

const testData: Title =
{
    "Title Number": "AGL436244",
    "Property Address": "Farringdon Station, Cowcross Street, London, EC1M 6BY",
    "Tenure": "Freehold",
    "X": -0.105314569,
    "Y": 51.52098786
}

describe('TitleDetails', () => {
    test('Tests title details are displayed correctly', () => {
        const wrapper = mount(TitleDetails, {
            propsData: {
                title: testData
            }
        });

        expect(wrapper.vm.title).toEqual(testData);
        expect(wrapper.text()).toContain(testData.Tenure);
        expect(wrapper.text()).toContain(testData["Title Number"]);
        expect(wrapper.text()).toContain(testData["Property Address"]);
        expect(wrapper.findComponent(Map).exists()).toBeTruthy();
        expect(wrapper.find('button')?.text()).toContain('Back');
    });
});