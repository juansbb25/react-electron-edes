import InputsForm from "@components/atoms/InputsForm";
import { RefObject } from "@components/atoms/InputsForm/InputsForm";
import {
  InitialValue,
  TextFieldProps,
} from "@components/atoms/InputsForm/types";
import { IngresoInput, updateIngreso } from "@database/controllers";
import { GastoInput, updateGasto } from "@database/controllers/gasto";
import { updatePresupuesto } from "@database/controllers/presupuesto";
import { RubroInput, updateRubro } from "@database/controllers/rubro";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import withProgressBar, { WithProgress } from "@hocs/withProgressBarDialog";
import { Presupuesto } from "@models/presupuesto";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { GridRowData } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
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

const EditPage: React.FC<EditPageProps & WithNotifications & WithProgress> = ({
  open,
  handleClose,
  title,
  row,
  type,
  showProgressBar,
  closeProgressBar,
  showNotification,
}) => {
  const [items, setItems] = useState<TextFieldProps<any>[]>();
  const childRef = useRef<RefObject | null>(null);

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

  const manageUpdate = async (
    value:
      | InitialValue<IngresoInput>
      | InitialValue<GastoInput>
      | InitialValue<Presupuesto>
      | InitialValue<RubroInput>,
    { resetForm }: { resetForm: any }
  ) => {
    console.debug(resetForm);
    if (row && type) {
      if (type === "ingreso") {
        showProgressBar();
        const response = await updateIngreso({
          ...(value as IngresoInput),
          id: row.id,
        });
        closeProgressBar();
        if (response.state) {
          showNotification("Actualizado correctamente", "success");
          handleClose();
        } else {
          showNotification(response.message || "Ha ocurrido un error", "error");
        }
      } else if (type === "gasto") {
        showProgressBar();
        const response = await updateGasto({
          ...(value as GastoInput),
          id: row.id,
        });
        closeProgressBar();
        if (response.state) {
          showNotification("Actualizado correctamente", "success");
          handleClose();
        } else {
          showNotification(response.message || "Ha ocurrido un error", "error");
        }
      } else if (type === "presupuesto") {
        showProgressBar();
        const response = await updatePresupuesto({
          ...(value as Presupuesto),
          code: row.code,
        });
        closeProgressBar();
        if (response.state) {
          showNotification("Actualizado correctamente", "success");
          handleClose();
        } else {
          showNotification(response.message || "Ha ocurrido un error", "error");
        }
      } else {
        showProgressBar();
        const response = await updateRubro({
          ...(value as RubroInput),
          id: row.id,
        });
        closeProgressBar();
        if (response.state) {
          showNotification("Actualizado correctamente", "success");
          handleClose();
        } else {
          showNotification(response.message || "Ha ocurrido un error", "error");
        }
      }
    } else {
      setItems(undefined);
    }
  };
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
            <InputsForm items={items} onSubmit={manageUpdate} ref={childRef} />
          ) : (
            <CircularProgress color="primary" size={70} />
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Salir
          </Button>
          <Button
            onClick={() => {
              childRef?.current?.submitForm();
            }}
          >
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withProgressBar(withNotifications(EditPage));
