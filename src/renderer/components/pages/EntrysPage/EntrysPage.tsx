import InputsForm from "@components/atoms/InputsForm";
import { InitialValue } from "@components/atoms/InputsForm/types";
import UILayout from "@components/layout/UILayout";
import { createIngreso, IngresoInput } from "@database/controllers";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import React from "react";
import { createIngresosForm } from "./formDefinition";

const EntrysPage: React.FC<WithNotifications> = ({ showNotification }) => {
  const onSubmit = async (value: InitialValue<IngresoInput>) => {
    const response = await createIngreso(value);
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
    <UILayout title="Ingresos">
      <InputsForm items={createIngresosForm()} onSubmit={onSubmit} />
    </UILayout>
  );
};
export default withNotifications(EntrysPage);
