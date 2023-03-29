import { describe, expect, test } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Tag from "../../../components/ui/Tag.vue";

describe('Tag', () => {
    test('Tests tag displays the correct text', () => {
        const wrapper = shallowMount(Tag, {
            propsData: {
                text: 'Tenure'
            }
        });

        expect(wrapper.vm.text).toBe('Tenure');
        expect(wrapper.text()).toContain('Tenure');
    });
});