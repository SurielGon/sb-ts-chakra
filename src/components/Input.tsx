import {
  FormLabel,
  Input as InputChakra,
  InputGroup,
  InputLeftElement,
  InputProps as InputPropsChakra,
  InputRightElement,
} from "@chakra-ui/react";
import { ReactNode, isValidElement } from "react";

interface InputProps extends InputPropsChakra {
  label?: ReactNode;
  rightElement?: ReactNode;
  leftElement?: ReactNode;
}

export default function Input(props: InputProps) {
  props = { ...props };

  const intern = {
    label: props.label,
    rightElement: props.rightElement,
    leftElement: props.leftElement,
  };
  for (const key in intern) {
    delete props[key as keyof InputProps];
  }
  let component = <InputChakra {...props} />;
  if (intern.rightElement || intern.leftElement) {
    component = (
      <InputGroup
        maxW={"300px"}
        position={"relative"}
        display="inline-block"
        paddingBottom="1.125em"
      >
        {intern.leftElement && (
          <InputLeftElement>{intern.leftElement}</InputLeftElement>
        )}
        {component}
        {intern.rightElement && (
          <InputRightElement id="setter">
            {intern.rightElement}
          </InputRightElement>
        )}
      </InputGroup>
    );
  }
  if (intern.label) {
    component = (
      <FormLabel>
        {intern.label}
        {component}
      </FormLabel>
    );
  }
  return component;
}
