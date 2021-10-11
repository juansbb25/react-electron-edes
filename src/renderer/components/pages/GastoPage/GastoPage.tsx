import InputsForm from "@components/atoms/InputsForm";
import { InitialValue } from "@components/atoms/InputsForm/types";
import UILayout from "@components/layout/UILayout";
import { createGasto, GastoInput } from "@database/controllers/gasto";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import React from "react";
import { createGastosForm } from "./formDefinition";

const GastoPage: React.FC<WithNotifications> = ({ showNotification }) => {
  const onSubmit = async (value: InitialValue<GastoInput>) => {
    const response = await createGasto(value);
    if (response.state) {
      showNotification("Ingreso creado correctamente", "success");
    } else {
      showNotification(
        response.message || "Ha ocurrido un error creando el ingreso",
        "error"
      );
    }
  };
  return (
    <UILayout title="Crear Gasto">
      <InputsForm items={createGastosForm()} onSubmit={onSubmit} />
    </UILayout>
  );
};
export default withNotifications(GastoPage);
