import InputsForm from "@components/atoms/InputsForm";
import { InitialValue } from "@components/atoms/InputsForm/types";
import UILayout from "@components/layout/UILayout";
import { createIngreso, IngresoInput } from "@database/controllers";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import React from "react";
import { createIngresosForm } from "./formDefinition";

const EntrysPage: React.FC<WithNotifications> = ({ showNotification }) => {
  const onSubmit = async (value: InitialValue<IngresoInput>) => {
    try {
      const response = await createIngreso(value);
      showNotification("Ingreso creado correctamente", "success");
      console.debug("ingresada correctamente", response);
    } catch (error) {
      showNotification("Ha ocurrido un error creando el ingreso", "error");
      console.debug("ocurrio un error", error);
    }
  };
  return (
    <UILayout title="Ingresos">
      <InputsForm items={createIngresosForm()} onSubmit={onSubmit} />
    </UILayout>
  );
};
export default withNotifications(EntrysPage);
