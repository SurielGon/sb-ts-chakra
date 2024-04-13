import { Controller, useFormContext } from "react-hook-form";
import BaseInput, { IBaseInputProps } from "./BaseInput";
import pipeEventHandlers from "src/utils/pipeEventHandlers";
import { useCallback, useMemo, useState } from "react";
import { Spinner } from "@chakra-ui/react";

type StringOrEmpty = string | null | undefined;
type MaskFunction = (value: StringOrEmpty) => StringOrEmpty;
export interface IInputProps extends IBaseInputProps {
  /**
   * Will set a temporary `<Spinner/>` inside the `rightElement` prop
   */
  isLoading?: boolean;
  /**
   * 'left' for the `leftElement`, 'right' for the `rightElement`
   */
  isLoadingPosition?: 'left' | 'right'
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

export default function Input({ mask, unMask = defaultUnMask, debug, isLoadingPosition = 'right', isLoading, ...props }: IInputProps) {
  const form = useFormContext();
  const [debugMessage, setDebugMessage] = useState<string>();
  const _props = { ...props } ;
  _props.onChange = pipeEventHandlers(
    (e) => {
      if (mask) {
        e.currentTarget.value = unMask(e.currentTarget.value) || '';
      }
    },
    _props.onChange,
    (e) => {
      if (debug) {
        setDebugMessage(e.currentTarget.value);
      }
    },    
    (e) => {
      if (mask) {
        e.currentTarget.value = mask(e.currentTarget.value) || '';
      }
    }
  );
  if(_props.defaultValue){
    if (mask) {
      _props.defaultValue = mask(_props.defaultValue.toString()) || ''
    }
  }
  if (debug) {
    _props.helperText = debugMessage;
  }
  if(isLoading){
    if(isLoadingPosition === 'right'){
      _props.rightElement = <Spinner/>
    }else if(isLoadingPosition === 'left'){
      _props.leftElement = <Spinner/>
    }
  }
  return form?.control && _props.name ? (
    <Controller
      control={form.control}
      name={_props.name}
      render={(control) => {
        if (control.fieldState.error?.message) {
          _props.errorMessage = control.fieldState.error?.message;
        }
        _props.onChange = pipeEventHandlers(_props.onChange, (e) => {
          let value: StringOrEmpty = e.currentTarget.value;
          if (mask) {
            value = unMask(mask(e?.currentTarget?.value));
          }
          control.field.onChange(value);
        });
        _props.onBlur = pipeEventHandlers(_props.onBlur, () => {
          control.field.onBlur();
        });
        if (control.field.value) {
          if (mask) {
            _props.value = mask(control.field.value) || "";
          } else {
            _props.value = control.field.value;
          }
        }
        return <BaseInput {..._props} />;
      }}
    />
  ) : (
    <BaseInput {..._props} />
  );
}

function defaultUnMask(value?: string | null) {
  return value?.replace(/\W/g, "")?.replace(/[a-zA-Z]/g,"")
}
