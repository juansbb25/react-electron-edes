import InputsForm from "@components/atoms/InputsForm";
import { TextFieldProps } from "@components/atoms/InputsForm/types";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { GridRowData } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { createIngresosForm } from "../EntrysPage/formDefinition";
import { createGastosForm } from "../GastoPage/formDefinition";
import { createPresupuestoForm } from "../PresupuestoPage/formDefinition";
import { createRubroForm } from "../RubrosPage/formDefinition";
type TableType = "ingreso" | "gasto" | "presupuesto" | "rubro" | "";
type EditPageProps = {
  title: string;
  open: boolean;
  handleClose: () => void;
  row?: GridRowData;
  type: TableType;
};

const EditPage: React.FC<EditPageProps> = ({
  open,
  handleClose,
  title,
  row,
  type,
}) => {
  const handleSuccess = () => {
    console.debug("exito");
  };
  const onSubmit = () => {
    console.debug("submit");
  };

  const [items, setItems] = useState<TextFieldProps<any>[]>();

  useEffect(() => {
    (async () => {
      if (row && type) {
        if (type === "ingreso") {
          const ingresoForm = createIngresosForm();

          const enhancedIngreso = ingresoForm.map((form) => {
            return {
              ...form,
              ...(form.initialValue !== undefined && {
                initialValue: row[form.id],
              }),
            };
          });
          console.debug(ingresoForm, enhancedIngreso, row);
          setItems(enhancedIngreso);
        } else if (type === "gasto") {
          const ingresoForm = await createGastosForm();
          setItems(
            ingresoForm.map((form) => {
              return {
                ...form,
                ...(form.initialValue && { initialValue: row[form.id] }),
              };
            })
          );
        } else if (type === "presupuesto") {
          const ingresoForm = createPresupuestoForm();
          setItems(
            ingresoForm.map((form) => {
              return {
                ...form,
                ...(form.initialValue && { initialValue: row[form.id] }),
              };
            })
          );
        } else {
          const ingresoForm = createRubroForm();
          setItems(
            ingresoForm.map((form) => {
              return {
                ...form,
                ...(form.initialValue && { initialValue: row[form.id] }),
              };
            })
          );
        }
      } else {
        setItems(undefined);
      }
    })();
  }, [row]);

  items;
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          {items ? (
            <InputsForm items={items} onSubmit={onSubmit} />
          ) : (
            <CircularProgress color="primary" size={70} />
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Salir
          </Button>
          <Button onClick={handleSuccess}>Actualizar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditPage;
