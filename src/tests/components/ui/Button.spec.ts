import { shallowMount } from "@vue/test-utils";
import { test, expect, describe } from "vitest";
import Button from '../../../components/ui/Button.vue';

describe('Button', () => {
  test("Tests button isn't clickable when disabled", () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        text: 'Test',
        disabled: true 
      }
    });

    expect(wrapper.vm.disabled).toBeTruthy();
    expect(wrapper.classes()).toContain('cursor-not-allowed');
  });
  
  test("Tests button displays the correct text", () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        text: 'Click Me'
      }
    });
  
    expect(wrapper.vm.text).toBe('Click Me');
    expect(wrapper.text()).toContain('Click Me');
  });
  
  test('Tests button emits click when clicked', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        text: 'Click Me'
      }
    });
 
    wrapper.find('button').trigger('click'); 
    expect(wrapper.emitted()['click']).toBeTruthy();
  });
});