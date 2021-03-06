import InputsForm from "@components/atoms/InputsForm";
import {
  InitialValue,
  TextFieldProps,
} from "@components/atoms/InputsForm/types";
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
  const onSubmit = async (
    value: InitialValue<GastoInput>,
    { resetForm }: { resetForm: any }
  ) => {
    showProgressBar();
    const response = await createGasto(value);
    closeProgressBar();
    if (response.state) {
      showNotification("Gasto creado correctamente", "success");
      resetForm();
    } else {
      showNotification(
        response.message || "Ha ocurrido un error creando el gasto",
        "error"
      );
    }
  };
  const [gastoForm, setGastoForm] = React.useState<
    TextFieldProps<GastoInput>[] | null
  >(null);
  React.useEffect(() => {
    showProgressBar();
    createGastosForm()
      .then((res) => {
        setGastoForm(res);
      })
      .catch((err) => {
        setGastoForm([]);
        console.debug(err);
      })
      .finally(() => closeProgressBar());
  }, []);
  return (
    <UILayout title="Crear Gasto">
      {gastoForm ? <InputsForm items={gastoForm} onSubmit={onSubmit} /> : <></>}
    </UILayout>
  );
};
export default withProgressBar(withNotifications(GastoPage));
