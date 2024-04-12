import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  FormHelperText,
  InputProps,
  InputLeftElement,
} from "@chakra-ui/react";

export interface IBaseInputProps extends InputProps {
  /**
   * The label for the input, you can pass strings or even other react nodes
   */
  label?: React.ReactNode;
  /**
   * The error message for the input (will set `<FormController isInvalid={true}/>`), you can pass strings or even other react nodes
   */
  errorMessage?: React.ReactNode;
  /**
   * The helper text for the input
   */
  helperText?: React.ReactNode;
  /**
   * Will add the required symbol for the input
   */
  isRequired?: boolean;
  /**
   * A custom element which will stay in the right side, the width is dependant on the input "size" prop, per chakraUI docs
   */
  rightElement?: React.ReactNode;
  /**
   * A custom element which will stay in the left side, the width is dependant on the input "size" prop, per chakraUI docs
   */
  leftElement?: React.ReactNode;
}

export default function BaseInput(props?: IBaseInputProps) {
  props = { ...props };
  if (props.type === "date") {
    props.max = props.max || "9999-12-31";
  } else if (props.type === "datetime-local") {
    props.max = props.max || "9999-12-31T00:00";
  }
  const intern = {
    label: props?.label,
    helperText: props?.helperText,
    errorMessage: props?.errorMessage,
    isRequired: props?.isRequired,
    rightElement: props?.rightElement,
    leftElement: props?.leftElement
  };
  for (const key in intern) {
    delete props[key as keyof InputProps];
  }

  let component = <ChakraInput {...props} />;
  if (intern.leftElement || intern.rightElement) {
    component = (
      <InputGroup>
        {intern.leftElement && (
          <InputLeftElement
            p="0.3rem"
            minW={"var(--input-height)"}
            maxW={"var(--input-height)"}
            height={"100%"}
          >
            {intern.leftElement}
          </InputLeftElement>
        )}
        {component}
        {intern.rightElement && (
          <InputRightElement
            p="0.3rem"
            minW={"var(--input-height)"}
            maxW={"var(--input-height)"}
            height={"100%"}
          >
            {intern.rightElement}
          </InputRightElement>
        )}
      </InputGroup>
    );
  }
  if (intern.label) {
    component = (
      <div>
        <FormLabel>{intern.label}</FormLabel>
        {component}
      </div>
    );
  }
  component = (
    <FormControl
      isInvalid={Boolean(intern?.errorMessage)}
      isRequired={intern.isRequired}
    >
      {component}
      {intern?.errorMessage ? (
        <FormErrorMessage>{intern?.errorMessage}</FormErrorMessage>
      ) : intern?.helperText ? <FormHelperText>{intern.helperText}</FormHelperText> : null}
    </FormControl>
  );

  return component;
}
