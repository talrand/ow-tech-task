import { describe, expect, test } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { SortDirection } from "../../../types/SortDirection";
import GridHeader from "../../../components/ui/GridHeader.vue";
import ChevronDownIcon from "../../../components/icons/ChevronDownIcon.vue";
import ChevronUpIcon from "../../../components/icons/ChevronUpIcon.vue";

describe('GridHeader', () => {
    test('Tests header displays the correct title', () => {
        const wrapper = shallowMount(GridHeader, { propsData: {
            text: 'Title',
            modelValue: SortDirection.None
        }});

        expect(wrapper.vm.text).toBe('Title');
        expect(wrapper.text()).toContain('Title');
    });

    test('Tests sort direction is set to ascending after clicking header when previous sort direction is none', () => {
        let direction = SortDirection.None;
        const wrapper = shallowMount(GridHeader, { props: {
            text: 'Title',
            modelValue: direction,
            'onUpdate:modelValue': (e :SortDirection) => {
                direction = e;
            } 
        }});

        wrapper.find('th').trigger('click');

        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([SortDirection.Ascending]);
    });


    test('Tests sort direction is set to descending after clicking header when previous sort direction is ascending', () => {
        let direction = SortDirection.Ascending;
        const wrapper = shallowMount(GridHeader, { props: {
            text: 'Title',
            modelValue: direction,
            'onUpdate:modelValue': (e :SortDirection) => {
                direction = e;
            } 
        }});

        wrapper.find('th').trigger('click');

        expect(direction).toBe(SortDirection.Descending);
    });

    test('Tests sort direction is set to ascending after clicking header when previous sort direction is descending', () => {
        let direction = SortDirection.Descending;
        const wrapper = shallowMount(GridHeader, { props: {
            text: 'Title',
            modelValue: direction,
            'onUpdate:modelValue': (e :SortDirection) => {
                direction = e;
            } 
        }});

        wrapper.find('th').trigger('click');
        expect(direction).toBe(SortDirection.Ascending);
    });

    test('Tests no icons are displayed when sort direction is set to none', () => {
        const wrapper = mount(GridHeader, { propsData: {
            text: 'Title',
            modelValue: SortDirection.None
        }});

        expect(wrapper.findComponent(ChevronDownIcon).exists()).toBeFalsy();
        expect(wrapper.findComponent(ChevronUpIcon).exists()).toBeFalsy();
    });

    test('Tests correct icon is displayed when sort direction is set to ascending', () => {
        const wrapper = mount(GridHeader, { propsData: {
            text: 'Title',
            modelValue: SortDirection.Ascending
        }});

        expect(wrapper.findComponent(ChevronDownIcon).exists()).toBeTruthy();
        expect(wrapper.findComponent(ChevronUpIcon).exists()).toBeFalsy();
    });

    test('Tests correct icon is displayed when sort direction is set to descending', () => {
        const wrapper = mount(GridHeader, { propsData: {
            text: 'Title',
            modelValue: SortDirection.Descending
        }});

        expect(wrapper.findComponent(ChevronDownIcon).exists()).toBeFalsy();
        expect(wrapper.findComponent(ChevronUpIcon).exists()).toBeTruthy();
    });
});