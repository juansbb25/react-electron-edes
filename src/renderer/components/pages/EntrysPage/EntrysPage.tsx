import InputsForm from "@components/atoms/InputsForm";
import UILayout from "@components/layout/UILayout";
import React from "react";
import DatePicker from "@mui/lab/DatePicker";
import * as yup from "yup";
import { StandardTextFieldProps, TextField } from "@material-ui/core";
import moment from "moment";
import { Ingreso } from "@models/Transaccion";
type EntrysPageProps = {};
const EntrysPage: React.FC<EntrysPageProps> = () => {
  const [value, setValue] = React.useState(null);
  var date = new Date();
  var todayDate = moment(date).format("DD-MM-YYYY");
  const ingresosForm: any = [
    { initialValue: "", id: "dimension", label: "Dimension", type: "string" },
    { initialValue: "", id: "programa", label: "Programa", type: "string" },
    { initialValue: todayDate, id: "fecha", label: "Fecha", type: "date" },
    { initialValue: "", id: "factura", label: "Factura", type: "string" },
    { initialValue: "", id: "proveedor", label: "Proveedor", type: "string" },
    {
      initialValue: "",
      id: "responsable",
      label: "Responsable",
      type: "string",
    },
    { initialValue: "", id: "ciudad", label: "Ciudad", type: "string" },
    {
      initialValue: "",
      id: "observacion",
      label: "Observacion",
      type: "string",
    },
    { initialValue: "", id: "empresa", label: "Empresa", type: "string" },
    { initialValue: "", id: "cedula", label: "Cedula", type: "string" },
    { initialValue: "", id: "correo", label: "Correo", type: "string" },
    {
      initialValue: "",
      id: "montoCurso",
      label: "Monto en Curso",
      type: "number",
    },
    {
      initialValue: "",
      id: "porcentajeBeca",
      label: "Porcentaje De Beca",
      type: "number",
    },
    { initialValue: "", id: "montoBeca", label: "Monto Beca", type: "number" },
    { initialValue: "", id: "abono", label: "Abono", type: "number" },
    { initialValue: "", id: "saldo", label: "Saldo", type: "number" },
    {
      initialValue: "",
      id: "numBoucher",
      label: "Numero de Boucher",
      type: "string",
    },
    {
      initialValue: "",
      id: "numDeposito",
      label: "Numero de Deposito",
      type: "string",
    },
    {
      initialValue: "",
      id: "transferencia",
      label: "Transferencia",
      type: "string",
    },
  ];

  const newSchema = yup.string().required("Email is required");
  return (
    <UILayout title="Ingresos">
      <InputsForm items={ingresosForm} />
    </UILayout>
  );
};
export default EntrysPage;
