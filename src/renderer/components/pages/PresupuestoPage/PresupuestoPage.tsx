import InputsForm from "@components/atoms/InputsForm";
import UILayout from "@components/layout/UILayout";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import React from "react";
import { createGastosForm } from "./formDefinition";

const PresupuestoPage: React.FC<WithNotifications> = () => {
  /*const onSubmit = async (value: InitialValue<Gasto>) => {
      const response = createGasto(value);
    if (response.state) {
      showNotification("Ingreso creado correctamente", "success");
    } else {
      showNotification(
        response.message || "Ha ocurrido un error creando el ingreso",
        "error"
      );
    }
  };*/
  const onSubmit = () => {
    console.debug("sumbited");
  };
  return (
    <UILayout title="Ingresos">
      <InputsForm items={createGastosForm()} onSubmit={onSubmit} />
    </UILayout>
  );
};
export default withNotifications(PresupuestoPage);
