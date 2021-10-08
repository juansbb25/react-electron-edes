import InputsForm from "@components/atoms/InputsForm";
import UILayout from "@components/layout/UILayout";
import React from "react";
type EntrysPageProps = {};
const EntrysPage: React.FC<EntrysPageProps> = () => {
  return (
    <UILayout title="Ingresos">
      <InputsForm items={[{ label: "ingresos", id: "ingresos" }]}></InputsForm>
    </UILayout>
  );
};
export default EntrysPage;
