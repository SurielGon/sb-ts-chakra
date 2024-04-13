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

export default function BaseInput({ label, helperText, errorMessage, isRequired, rightElement, leftElement, ...props}: IBaseInputProps) {
  props = { ...props } as InputProps;
  if (props.type === "date") {
    props.max = props.max || "9999-12-31";
  } else if (props.type === "datetime-local") {
    props.max = props.max || "9999-12-31T00:00";
  }
  let component = <ChakraInput {...props} />;
  if (leftElement || rightElement) {
    component = (
      <InputGroup>
        {leftElement && (
          <InputLeftElement
            p="0.3rem"
            minW={"var(--input-height)"}
            maxW={"var(--input-height)"}
            height={"100%"}
          >
            {leftElement}
          </InputLeftElement>
        )}
        {component}
        {rightElement && (
          <InputRightElement
            p="0.3rem"
            minW={"var(--input-height)"}
            maxW={"var(--input-height)"}
            height={"100%"}
          >
            {rightElement}
          </InputRightElement>
        )}
      </InputGroup>
    );
  }
  if (label) {
    component = (
      <div>
        <FormLabel>{label}</FormLabel>
        {component}
      </div>
    );
  }
  component = (
    <FormControl
      isInvalid={Boolean(errorMessage)}
      isRequired={isRequired}
    >
      {component}
      {errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );

  return component;
}
