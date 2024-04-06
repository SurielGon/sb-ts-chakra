import { Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Input from "src/components/Input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Input> = {
  title: "Example/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithLabel: Story = {
  args: {
    label: "Name",
    placeholder: "Example: John Smith...",
  },
};
export const WithRightIcon: Story = {
  args: {
    label: "oi",
    rightElement: "I am in the Right!",
  },
};
export const WithLeftIcon: Story = {
  args: {
    label: "oi",
    leftElement: "I am in the Left!",
  },
};
export const WithRightAndLeftIcon: Story = {
  args: {
    label: "oi",
    rightElement: "Both!",
    leftElement: "Both!",
  },
};
export const WithError: Story = {
  args: {
    label: "oi",
  },
};
export const WithMask: Story = {
  args: {
    label: "oi",
  },
};
export const WithMultipleMasks: Story = {
  args: {
    label: "oi",
  },
};
