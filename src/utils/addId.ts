import { TextFieldProps } from "@components/atoms/InputsForm/types";

export type WithId = {
  id: string;
};

/*  Basado en las mejrores practicas para componentes de react fuente abajo */
// https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/

export function withId<T>(
  form: TextFieldProps<T>[]
): TextFieldProps<T & WithId>[] {
  console.debug("Entra form", form);
  form.push({
    initialValue: "" as unknown as T[keyof T],
    id: "id" as unknown as Extract<keyof T, string>,
    label: "ID",
    type: "string",
    editable: false,
  });
  console.debug("form agregada el key", form);
  return form as unknown as TextFieldProps<T & WithId>[];
}

export function withIdData<T>(form: T[], remap: keyof T): T[] {
  return form.map((data) => {
    return {
      ...data,
      id: data[remap],
    };
  });
}
