import { Controller, useFormContext } from "react-hook-form";
import BaseInput, { IBaseInputProps } from "./BaseInput";
import mergeHandler from "src/utils/mergeHandler";

//const rightRef = useRef<HTMLDivElement>(null);
// const [t, sett] = useState<number>();
// useEffect(() => {
//   sett(rightRef.current?.clientWidth);
// }, [rightRef.current?.clientWidth]);

export default function Input(props: IBaseInputProps) {
  props = { ...props };
  const form = useFormContext();
  return form?.control && props.name ? (
    <Controller
      control={form.control}
      name={props.name}
      render={(control) => {
        if (control.fieldState.error?.message) {
          props.errorMessage = control.fieldState.error?.message;
        }
        props.onChange = mergeHandler(props.onChange, (e) => {
          control.field.onChange(
            props.mask
              ? unMask(props.mask(e?.currentTarget?.value))
              : e?.currentTarget.value
          );
        });
        props.onBlur = mergeHandler(props.onBlur, () => {
          control.field.onBlur();
        });
        if (control.field.value) {
          if (props.mask) {
            props.defaultValue = props.mask(control.field.value) || "";
          } else {
            props.defaultValue = control.field.value;
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
  return value?.replace(/\W/g, "");
}
