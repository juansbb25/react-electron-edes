import InputsForm from "@components/atoms/InputsForm";
import { InitialValue } from "@components/atoms/InputsForm/types";
import UILayout from "@components/layout/UILayout";
import { createIngreso, IngresoInput } from "@database/controllers";
import React from "react";
import { createIngresosForm } from "./formDefinition";

const EntrysPage: React.FC = () => {
  const onSubmit = async (value: InitialValue) => {
    console.debug("Values", value);
    try {
      const response = await createIngreso(value as IngresoInput);
      console.debug("ingresada correctamente", response);
    } catch (error) {
      console.debug("ocurrio un error", error);
    }
  };
  return (
    <UILayout title="Ingresos">
      <InputsForm items={createIngresosForm()} onSubmit={onSubmit} />
    </UILayout>
  );
};
export default EntrysPage;
