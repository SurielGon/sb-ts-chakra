import { Button, Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Input from "src/components/Input";
import Github from "./assets/github.svg";

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
    label: "Email",
    placeholder: "Your Github email...",
    rightElement: <Github />,
  },
};
export const WithLeftIcon: Story = {
  args: {
    label: "Phone",
    placeholder: "99999-9999",
    leftElement: "+55",
  },
};
export const WithRightAndLeftIcon: Story = {
  args: {
    label: "oi",
    leftElement: "A",
    rightElement: "B",
  },
};
export const WithError: Story = {
  args: {
    label: "Age",
    placeholder: "Your age",
    error: "Your age is required!",
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
