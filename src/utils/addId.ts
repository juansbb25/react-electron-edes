import { TextFieldProps } from "@components/atoms/InputsForm/types";

export type WithId = {
  id: string;
};

/*  Basado en las mejrores practicas para componentes de react fuente abajo */
// https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
function withId<T>(
  form: TextFieldProps<T>[],
  remap?: string
): TextFieldProps<T & WithId>[] {
  form.push({
    initialValue: "id" as unknown as T[keyof T],
    id: (remap ? remap : "id") as unknown as Extract<keyof T, string>,
    label: "ID",
    type: "string",
  });
  return form as unknown as TextFieldProps<T & WithId>[];
}

export default withId;
