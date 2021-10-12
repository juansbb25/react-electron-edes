import InputsForm from "@components/atoms/InputsForm";
import { InitialValue } from "@components/atoms/InputsForm/types";
import UILayout from "@components/layout/UILayout";
import { createGasto, GastoInput } from "@database/controllers/gasto";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import withProgressBar, { WithProgress } from "@hocs/withProgressBarDialog";
import React from "react";
import { createGastosForm } from "./formDefinition";

const GastoPage: React.FC<WithNotifications & WithProgress> = ({
  showNotification,
  showProgressBar,
  closeProgressBar,
}) => {
  const onSubmit = async (value: InitialValue<GastoInput>) => {
    showProgressBar();
    const response = await createGasto(value);
    closeProgressBar();
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
export default withProgressBar(withNotifications(GastoPage));
