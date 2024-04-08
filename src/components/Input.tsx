import {
  FormLabel,
  Input as InputChakra,
  InputGroup,
  InputLeftElement,
  InputProps as InputPropsChakra,
  InputRightElement,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

interface InputProps extends InputPropsChakra {
  label?: ReactNode;
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  error?: string;
}

export default function Input(props: InputProps) {
  props = { ...props };
  //const rightRef = useRef<HTMLDivElement>(null);
  // const [t, sett] = useState<number>();
  // useEffect(() => {
  //   sett(rightRef.current?.clientWidth);
  // }, [rightRef.current?.clientWidth]);
  const intern = {
    label: props.label,
    rightElement: props.rightElement,
    leftElement: props.leftElement,
    error: props.error,
  };
  for (const key in intern) {
    delete props[key as keyof InputProps];
  }
  let component = <InputChakra {...props} />;
  if (intern.rightElement || intern.leftElement) {
    component = (
      <InputGroup minW={"fit-content"} position={"relative"}>
        {intern.leftElement && (
          <InputLeftElement
            p="0.3rem"
            minW={"var(--input-height)"}
            width={"fit-content"}
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
            width={"fit-content"}
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
      <FormLabel>
        {intern.label}
        {component}
      </FormLabel>
    );
  }
  return component;
}
