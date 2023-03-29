import { describe, expect, test } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import Pagination from "../../../components/ui/Pagination.vue";

describe('Pagination', () => {
    test('Tests number of pages is calculated correctly', () => {
        const wrapper = shallowMount(Pagination, {
            propsData: {
                modelValue: 1,
                resultsPerPage: 5,
                totalResults: 33
            }
        });

        expect(wrapper.vm.modelValue).toBe(1);
        expect(wrapper.vm.resultsPerPage).toBe(5);
        expect(wrapper.vm.totalResults).toBe(33);
        expect(wrapper.text()).toContain("1 of 7");
    });

    test('Tests current page number is increased when next button clicked', () => {
        let pageNumber = 1;
        const wrapper = mount(Pagination, {
            props: {
                modelValue: pageNumber, 
                resultsPerPage: 5,
                totalResults: 33,
                "onUpdate:modelValue": (e :number) => {
                    pageNumber = e;
                }
            }            
        });

        wrapper.findAllComponents('Button').find(component => component.text().includes('>'))?.trigger('click');
        expect(pageNumber).toBe(2);
    });

    test('Tests current page number is decreased when previous button clicked', () => {
        let pageNumber = 4;
        const wrapper = mount(Pagination, {
            props: {
                modelValue: pageNumber, 
                resultsPerPage: 5,
                totalResults: 33,
                "onUpdate:modelValue": (e :number) => {
                    pageNumber = e;
                }
            }            
        });
        
        wrapper.findAllComponents('Button').find(component => component.text().includes('<'))?.trigger('click');
        expect(pageNumber).toBe(3);
    });
});