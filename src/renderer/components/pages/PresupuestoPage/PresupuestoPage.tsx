import InputsForm from "@components/atoms/InputsForm";
import { InitialValue } from "@components/atoms/InputsForm/types";
import UILayout from "@components/layout/UILayout";
import { createPresupuesto } from "@database/controllers/presupuesto";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import { Presupuesto } from "@models/presupuesto";
import React from "react";
import { createPresupuestoForm } from "./formDefinition";

const PresupuestoPage: React.FC<WithNotifications> = ({ showNotification }) => {
  const onSubmit = async (value: InitialValue<Presupuesto>) => {
    const response = await createPresupuesto(value);
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
      <InputsForm items={createPresupuestoForm()} onSubmit={onSubmit} />
    </UILayout>
  );
};
export default withNotifications(PresupuestoPage);
