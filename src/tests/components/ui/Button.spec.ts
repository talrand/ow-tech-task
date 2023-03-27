import { render, screen } from "@testing-library/vue";
import { mount, shallowMount } from "@vue/test-utils";
import { test, expect } from "vitest";
import Button from '../../../components/ui/Button.vue';

test("Tests button isn't clickable when disabled", async () => {
  const wrapper = shallowMount(Button);
  await wrapper.setProps({
    text: 'Test',
    disabled: true 
  });

  expect(wrapper.classes()).toContain('cursor-not-allowed');
})

test("Tests button displays the correct text", async () => {
  render(Button, {
    props: {
      text: 'Test Button'
    }
  });

  expect(screen.queryByText('Test Button')).toBeTruthy()
});