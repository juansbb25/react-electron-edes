import InputsForm from "@components/atoms/InputsForm";
import { InitialValue } from "@components/atoms/InputsForm/types";
import UILayout from "@components/layout/UILayout";
import { createRubro, RubroInput } from "@database/controllers/rubro";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import withProgressBar, { WithProgress } from "@hocs/withProgressBarDialog";
import React from "react";
import { createRubroForm } from "./formDefinition";

const RubrosPage: React.FC<WithNotifications & WithProgress> = ({
  showNotification,
  showProgressBar,
  closeProgressBar,
}) => {
  const onSubmit = async (
    value: InitialValue<RubroInput>,
    { resetForm }: { resetForm: any }
  ) => {
    showProgressBar();
    const response = await createRubro(value);
    closeProgressBar();
    if (response.state) {
      showNotification("Rubro creado correctamente", "success");
      resetForm();
    } else {
      showNotification(
        response.message || "Ha ocurrido un error creando el rubro",
        "error"
      );
    }
  };
  return (
    <UILayout title="Crear Rubro">
      <InputsForm items={createRubroForm()} onSubmit={onSubmit} />
    </UILayout>
  );
};
export default withProgressBar(withNotifications(RubrosPage));
