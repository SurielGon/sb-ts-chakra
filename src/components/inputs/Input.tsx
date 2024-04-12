import { Controller, useFormContext } from "react-hook-form";
import BaseInput, { IBaseInputProps } from "./BaseInput";
import pipeEventHandlers from "src/utils/pipeEventHandlers";
import { useCallback, useMemo, useState } from "react";

type StringOrEmpty = string | null | undefined;
type MaskFunction = (value: StringOrEmpty) => StringOrEmpty;
export interface IInputProps extends IBaseInputProps {
  /**
   * A function to return the masked value, (currentValue)=>{ return maskedValue }
   */
  mask?: MaskFunction;
  /**
   * By default we use `value.replace(/\W/g, "").replace(/[a-zA-Z]/g,"")`, you can use this to set your own unMask function for your use case
   */
  unMask?: MaskFunction;
  /**
   * Will insert the value of the input in the `<FormHelperText/>` (below the input), any changes made inside the onChange can also be observed here
   */
  debug?: boolean;
}

export default function Input(props: IInputProps) {
  const form = useFormContext();
  const [debug, setDebug] = useState<string>();
  const intern = {
    mask: props?.mask,
    unMask: props?.unMask || unMask,
    debug: props?.debug,
  };
  props = { ...props } as IBaseInputProps;
  for (const key in intern) {
    delete props[key as keyof IInputProps];
  }
  props.onChange = pipeEventHandlers(
    (e) => {
      if (intern.mask) {
        e.currentTarget.value = intern.unMask(e.currentTarget.value) || '';
      }
    },
    props.onChange,
    (e) => {
      if (intern.debug) {
        setDebug(e.currentTarget.value);
      }
    },    
    (e) => {
      if (intern.mask) {
        e.currentTarget.value = intern.mask(e.currentTarget.value) || '';
      }
    }
  );
  if (debug) {
    props.helperText = debug;
  }
  return form?.control && props.name ? (
    <Controller
      control={form.control}
      name={props.name}
      render={(control) => {
        if (control.fieldState.error?.message) {
          props.errorMessage = control.fieldState.error?.message;
        }
        props.onChange = pipeEventHandlers(props.onChange, (e) => {
          let value: StringOrEmpty = e.currentTarget.value;
          if (intern.mask) {
            value = intern.unMask(intern.mask(e?.currentTarget?.value));
          }
          control.field.onChange(value);
        });
        props.onBlur = pipeEventHandlers(props.onBlur, () => {
          control.field.onBlur();
        });
        if (control.field.value) {
          if (intern.mask) {
            props.value = intern.mask(control.field.value) || "";
          } else {
            props.value = control.field.value;
          }
        }
        return <BaseInput {...props} />;
      }}
    />
  ) : (
    <BaseInput {...props} />
  );
}

function unMask(value?: string | null) {
  return value?.replace(/\W/g, "")?.replace(/[a-zA-Z]/g,"")
}
