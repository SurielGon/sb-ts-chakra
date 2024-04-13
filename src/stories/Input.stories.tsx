import type { Meta, StoryObj } from "@storybook/react";
import Input from "src/components/inputs/Input";
import Github from "src/stories/assets/github.svg";
import Discord from "src/stories/assets/discord.svg";
import Eye from "src/stories/assets/eye.svg";
import EyeSlash from "src/stories/assets/eye-slash.svg";
import { toPattern } from "vanilla-masker";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { Divider, Flex, IconButton, Link, Text } from "@chakra-ui/react";

const meta: Meta<typeof Input> = {
  title: "Example/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  name: "With Label and Placeholder",
  args: {
    label: "Name",
    placeholder: "Example: John Smith...",
  },
  render: (args) => {
    return (
      <Flex gap={4} direction="column">
        <Input {...args} debug/>
      </Flex>
    );
  },
};
export const DateTime: Story = {
  name: "Date/Time",
  render: () => {
    const form = useForm();
    return (
      <Flex gap={4} direction="row">
        <Flex gap={4} direction="column">
          <Text as="b">Uncontrolled</Text>
          <Input label="Birthday" type={"date"} debug />
          <Input label="Next match" type={"datetime-local"} debug />
        </Flex>
        <Flex>
          <Divider orientation="vertical" />
        </Flex>
        <Flex gap={4} direction="column">
          <Text as="b">Controlled</Text>
          <FormProvider {...form}>
            <Input label="Birthday" type={"date"} debug />
            <Input label="Next match" type={"datetime-local"} debug />
          </FormProvider>
        </Flex>
      </Flex>
    );
  },
};
export const LeftElement: Story = {
  args: {
    label: "Phone",
    maxLength: 10,
    placeholder: "99999-9999",
    leftElement: '+55',
    defaultValue: '936699635',
    mask: (value) => {
      return toPattern(value || "", "99999-9999");
    },
  },
  name: "Left Icon/Element",
  render: (args) => {
    const form = useForm()
    return (
      <Flex gap={4} direction="row">
        <Flex gap={4} direction="column">
          <Text as="b">Uncontrolled</Text>
          <Input {...args} debug/>
        </Flex>
        <Flex>
          <Divider orientation="vertical" />
        </Flex>
        <Flex gap={4} direction="column">
          <Text as="b">Controlled</Text>
          <FormProvider {...form}>
            <Input {...args} debug />
          </FormProvider>
        </Flex>
      </Flex>
    );
  },
};
export const RightElement: Story = {
  name: "Right Icon/Element",
  render: () => {
    const [isPassword, setIsPassword] = useState(true);
    return (
      <Flex gap={4} direction="column">
        <Input
          label="Email"
          placeholder="Your Github email..."
          rightElement={
            <Link href="https://github.com/" isExternal>
              <Github />
            </Link>
          }
          debug
        />
        <Input
          label="Password"
          type={isPassword ? "password" : "text"}
          placeholder="Type your password"
          rightElement={
            <IconButton
              aria-label=""
              height={"100%"}
              width={"100%"}
              p={1}
              minW={"fit-content"}
              icon={isPassword ? <Eye /> : <EyeSlash />}
              onClick={() => {
                setIsPassword(!isPassword);
              }}
            />
          }
          debug
        />
      </Flex>
    );
  },
};
export const RightAndLeftElement: Story = {
  args: {
    label: "Nickname",
    leftElement: <b>@</b>,
    rightElement: (
      <Link href="https://discord.com/" isExternal>
        <Discord />
      </Link>
    ),
  },
  name: "Left and Right Icon/Element",
};
export const WithLoading: Story = {
  args: {
    label: "Choose your username",
    defaultValue: 'TheAmazingMeerkat',
    isLoading: true,
    isDisabled: true,
    helperText: 'Checking availability...'
  },
  name: "Is Loading",
  render: (args)=>{
    return (<Flex gap={4} direction="column">
      <Input {...args} />
      <Input {...args} isLoadingPosition="left"/>
    </Flex>)
  }
};
export const WithError: Story = {
  args: {
    label: "Age",
    type: "number",
    isRequired: true,
    placeholder: "Your age",
    errorMessage: "Your age is required!",
    debug: true,
  },
};
export const WithMask: Story = {
  args: {
    label: "CPF",
    placeholder: "999.999.999.99",
    debug: true,
    mask: (value) => {
      return toPattern(value || "", "999.999.999-99");
    },
  },
};
export const WithMultipleMasks: Story = {
  args: {
    label: "CPF/CNPJ",
    maxLength: 18,
    mask: (value) => {
      if (value) {
        if (value.replace(/\W/g, "").length < 12) {
          return toPattern(value || "", "999.999.999-99");
        } else {
          return toPattern(value || "", "99.999.999/9999-99");
        }
      }
      return value;
    },
  },
  render: (args) => {
    const form = useForm({ defaultValues: { cpfCnpj: "11222333444444" } });
    return (
      <Flex gap={4} direction="row">
        <Flex gap={4} direction="column">
          <Text as="b">Uncontrolled</Text>
          <Input {...args} defaultValue={"11222333444444"} debug />
        </Flex>
        <Flex>
          <Divider orientation="vertical" />
        </Flex>
        <Flex gap={4} direction="column">
          <Text as="b">Controlled</Text>
          <FormProvider {...form}>
            <Input {...args} name="cpfCnpj" debug />
          </FormProvider>
        </Flex>
      </Flex>
    );
  },
};
