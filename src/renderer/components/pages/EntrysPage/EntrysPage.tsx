import InputsForm from "@components/atoms/InputsForm";
import UILayout from "@components/layout/UILayout";
import React from "react";
type EntrysPageProps = {};
const EntrysPage: React.FC<EntrysPageProps> = () => {
  return (
    <UILayout>
      <InputsForm items={["1", "2", "3", "4", "5", "6", "7"]}></InputsForm>
    </UILayout>
  );
};
export default EntrysPage;
