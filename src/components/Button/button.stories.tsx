import { Meta, StoryObj } from "@storybook/react";
import Button from "./index";
import { ButtonProp } from "./type";

export default {
  title: "Button/Button",
  component: Button,
  args: {
    active: true,
    title: "button",
    disabled: false,
    loading: false,
  },
} as Meta<ButtonProp>;

export const Default: StoryObj<ButtonProp> = {
  args: {
    active: true,
    title: "button",
    disabled: false,
    loading: false,
  },
};
export const Disabled: StoryObj<ButtonProp> = {
  args: {
    active: false,
    title: "button",
    disabled: true,
    loading: false,
  },
};
export const loading: StoryObj<ButtonProp> = {
  args: {
    active: true,
    title: "button",
    disabled: false,
    loading: true,
  },
};
