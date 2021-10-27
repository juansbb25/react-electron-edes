import InputsForm from "@components/atoms/InputsForm";
import {
  InitialValue,
  TextFieldProps,
} from "@components/atoms/InputsForm/types";
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
  const onSubmit = async (
    value: InitialValue<Presupuesto>,
    { resetForm }: { resetForm: any }
  ) => {
    showProgressBar();
    const response = await createPresupuesto(value);
    closeProgressBar();
    if (response.state) {
      showNotification("Presupuesto creado correctamente", "success");
      resetForm();
    } else {
      showNotification(
        response.message || "Ha ocurrido un error creando el presupuesto",
        "error"
      );
    }
  };

  const [presupuestoForm, setPresupuestoForm] = React.useState<
    TextFieldProps<Presupuesto>[] | null
  >(null);
  React.useEffect(() => {
    showProgressBar();
    createPresupuestoForm()
      .then((res) => {
        setPresupuestoForm(res);
      })
      .catch((err) => {
        setPresupuestoForm([]);
        console.debug(err);
      })
      .finally(() => closeProgressBar());
  }, []);

  return (
    <UILayout title="Crear Presupuesto">
      {presupuestoForm ? (
        <InputsForm items={presupuestoForm} onSubmit={onSubmit} />
      ) : (
        <></>
      )}
    </UILayout>
  );
};
export default withProgressBar(withNotifications(PresupuestoPage));
