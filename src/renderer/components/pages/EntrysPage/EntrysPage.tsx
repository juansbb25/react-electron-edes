import InputsForm from "@components/atoms/InputsForm";
import { InitialValue } from "@components/atoms/InputsForm/types";
import UILayout from "@components/layout/UILayout";
import { createIngreso, IngresoInput } from "@database/controllers";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import withProgressBar, { WithProgress } from "@hocs/withProgressBarDialog";
import React from "react";
import { createIngresosForm } from "./formDefinition";

const EntrysPage: React.FC<WithNotifications & WithProgress> = ({
  showNotification,
  showProgressBar,
  closeProgressBar,
}) => {
  const onSubmit = async (
    ingreso: InitialValue<IngresoInput>,
    { resetForm }: { resetForm: any }
  ) => {
    console.debug({ ingreso });
    showProgressBar();
    const response = await createIngreso(ingreso);
    closeProgressBar();
    if (response.state) {
      showNotification("Ingreso creado correctamente", "success");
      resetForm();
    } else {
      showNotification(
        response.message || "Ha ocurrido un error creando el ingreso",
        "error"
      );
    }
  };
  return (
    <UILayout title="Crear Ingreso">
      <InputsForm items={createIngresosForm()} onSubmit={onSubmit} />
    </UILayout>
  );
};
export default withProgressBar(withNotifications(EntrysPage));
