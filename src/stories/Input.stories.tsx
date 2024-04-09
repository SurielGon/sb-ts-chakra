import type { Meta, StoryObj } from "@storybook/react";
import Input from "src/components/inputs/Input";
import Github from "src/stories/assets/github.svg";
import Discord from "src/stories/assets/discord.svg";
import Eye from "src/stories/assets/eye.svg";
import EyeSlash from "src/stories/assets/eye-slash.svg";
import { toPattern } from "vanilla-masker";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { Flex, IconButton, Link } from "@chakra-ui/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
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

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithLabel: Story = {
  name: "With Label and Placeholder",
  render: () => {
    return (
      <Flex gap={4} direction="column">
        <Input label="Name" placeholder="Example: John Smith..." />
      </Flex>
    );
  },
};
export const WithDateTime: Story = {
  name: "With Date/Time",
  render: () => {
    return (
      <Flex gap={4} direction="column">
        <Input label="Birthday" type={"date"} />
        <Input label="Next match" type={"datetime-local"} />
      </Flex>
    );
  },
};
export const WithLeftElement: Story = {
  args: {
    label: "Phone",
    placeholder: "99999-9999",
    leftElement: "+55",
  },
  name: "With Left Icon/Element",
};
export const WithRightElement: Story = {
  name: "With Right Icon/Element",
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
        />
      </Flex>
    );
  },
};
export const WithRightAndLeftElement: Story = {
  args: {
    label: "Nickname",
    leftElement: <b>@</b>,
    rightElement: (
      <Link href="https://discord.com/" isExternal>
        <Discord />
      </Link>
    ),
  },
  name: "With Left and Right Icon/Element",
};
export const WithError: Story = {
  args: {
    label: "Age",
    type: "number",
    isRequired: true,
    placeholder: "Your age",
    errorMessage: "Your age is required!",
  },
};
export const WithMask: Story = {
  args: {
    label: "CPF",
    placeholder: "999.999.999.99",
    mask: (value) => {
      return toPattern(value || "", "999.999.999-99");
    },
  },
};
export const WithMultipleMasks: Story = {
  args: {
    label: "CPF/CNPJ",
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
    const [cpfCnpj, setCpfCnpj] = useState<string>("11.222.333/4444-44");
    const form = useForm({ defaultValues: { cpfCnpj: "11222333444444" } });
    return (
      <Flex gap={4} direction="column">
        <div>
          Uncontrolled: {cpfCnpj}
          <Input
            {...args}
            defaultValue={cpfCnpj}
            maxLength={18}
            onChange={(e) => setCpfCnpj(e.currentTarget.value)}
          />
        </div>
        <div>
          Controlled: {form.watch("cpfCnpj") as string}
          <FormProvider {...form}>
            <Input {...args} name="cpfCnpj" />
          </FormProvider>
        </div>
      </Flex>
    );
  },
};
