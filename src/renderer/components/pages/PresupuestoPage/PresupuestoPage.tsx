import InputsForm from "@components/atoms/InputsForm";
import { InitialValue } from "@components/atoms/InputsForm/types";
import UILayout from "@components/layout/UILayout";
import { createPresupuesto } from "@database/controllers/presupuesto";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import withProgressBar, { WithProgress } from "@hocs/withProgressBarDialog";
import { Presupuesto } from "@models/presupuesto";
import React from "react";
import { createPresupuestoForm } from "./formDefinition";

const PresupuestoPage: React.FC<WithNotifications & WithProgress> = ({
  showNotification,
  showProgressBar,
  closeProgressBar,
}) => {
  const onSubmit = async (value: InitialValue<Presupuesto>) => {
    showProgressBar();
    const response = await createPresupuesto(value);
    closeProgressBar();
    if (response.state) {
      showNotification("Presupuesto creado correctamente", "success");
    } else {
      showNotification(
        response.message || "Ha ocurrido un error creando el presupuesto",
        "error"
      );
    }
  };
  return (
    <UILayout title="Crear Presupuesto">
      <InputsForm items={createPresupuestoForm()} onSubmit={onSubmit} />
    </UILayout>
  );
};
export default withProgressBar(withNotifications(PresupuestoPage));
