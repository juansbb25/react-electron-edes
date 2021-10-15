import * as React from "react";
import CloseFormDialog from "@components/atoms/CloseFormDialog";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import { Ingreso, Gasto } from "@models/Transaccion";
import { Presupuesto } from "@models/presupuesto";
import {
  deleteIngreso,
  getIngresos,
  updateIngreso,
} from "@database/controllers";
import UILayout from "@components/layout/UILayout";
import {
  DataGrid,
  GridColumns,
  GridRowData,
  GridToolbarContainer,
  GridToolbarExport,
  useGridSlotComponentProps,
} from "@mui/x-data-grid";
import { esESGrid } from "../../../../renderer/language";
import {
  deleteGasto,
  getGastos,
  updateGasto,
} from "@database/controllers/gasto";
import {
  deletePresupuesto,
  getPresupuestos,
  updatePresupuesto,
} from "@database/controllers/presupuesto";
import { TextFieldProps } from "@components/atoms/InputsForm/types";
import { createIngresosForm } from "../EntrysPage/formDefinition";
import { createGastosForm } from "../GastoPage/formDefinition";
import { createPresupuestoForm } from "../PresupuestoPage/formDefinition";
import { withId, WithId, withIdData } from "@utils/addId";
import { useStyles } from "../../../../renderer/antdTheme";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import withProgressBar, { WithProgress } from "@hocs/withProgressBarDialog";
import moment from "moment";

type TableType = "ingreso" | "gasto" | "presupuesto" | "";

type RowsType = Ingreso[] | Gasto[] | Presupuesto[];

type TableState = {
  type: TableType;
  rows: RowsType;
  cols: GridColumns;
};

export type RefObject = {
  submitForm: () => void;
};

type RefGetRows = {
  getRows: () => GridRowData[];
};

const CustomToolbar = forwardRef<RefGetRows>((props, ref) => {
  const { rows } = useGridSlotComponentProps();
  useImperativeHandle(ref, () => ({
    getRows() {
      return rows;
    },
  }));
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <Button
        onClick={() => {
          console.debug(rows);
        }}
      ></Button>
    </GridToolbarContainer>
  );
});

const ViewPageContainer = (
  {
    showNotification,
    showProgressBar,
    closeProgressBar,
  }: WithNotifications & WithProgress,
  ref: Ref<RefObject>
): React.ReactElement => {
  //This is to modal message
  const [open, setOpen] = useState<{ state: boolean; row?: GridRowData }>({
    state: false,
  });
  const handleClose = () => {
    setOpen({ state: false, row: undefined });
  };

  const [state, setState] = useState<TableState>({
    type: "",
    rows: [],
    cols: [],
  });

  const classes = useStyles();
  const childRef = useRef<RefGetRows | null>(null);
  const ToolbarWithRef = () => {
    return <CustomToolbar ref={childRef}></CustomToolbar>;
  };
  const manageData = (
    response: RowsType,
    colsDefinition:
      | TextFieldProps<Ingreso>[]
      | TextFieldProps<Gasto>[]
      | TextFieldProps<Presupuesto & WithId>[],
    type: TableType
  ) => {
    const cols: GridColumns = colsDefinition.map((key) => {
      return {
        field: key.id,
        headerName: key.label,
        sortable: true,
        width: 150,
        type: key.type,
        //resizable: true,
        editable: key.editable ? key.editable : true,
        ...(key.renderInTable && { valueGetter: key.renderInTable }),
        ...(key.render && { editable: false }),
        ...(key.id == "id" && { hide: true }),
        ...(key.id == "id" && { editable: false }),
        ...(key.id == "fecha" && {
          renderCell: (params) =>
            moment(new Date(params.value as string)).format("DD-MM-YYYY"),
        }),
      };
    });
    cols.push({
      field: "eliminar",
      headerName: "Eliminar",
      sortable: false,
      width: 150,
      //resizable: true,
      editable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => setOpen({ state: true, row: params.row })}>
            Eliminar
          </Button>
        );
      },
    });
    setState({
      type: type,
      rows: response,
      cols: cols,
    });
  };
  const handleChange = async (type: TableType) => {
    showProgressBar();
    if (type === "ingreso") {
      const ingresos = await getIngresos();
      manageData(ingresos.values, withId(createIngresosForm()), type);
    } else if (type === "gasto") {
      const gastos = await getGastos();
      manageData(gastos.values, withId(createGastosForm()), type);
    } else {
      const presupuestos = await getPresupuestos();
      manageData(
        withIdData(presupuestos.values, "code"),
        withId(createPresupuestoForm()),
        type
      );
    }
    closeProgressBar();
  };

  const updateData = async () => {
    showProgressBar();
    const data = childRef.current?.getRows();
    if (data) {
      if (state.type === "ingreso") {
        const response = await updateIngreso(data as Ingreso[]);
        if (response.state) {
          showNotification("Ingreso actualizado correctamente", "success");
        } else {
          showNotification(response.message || "Ha ocurrido un error", "error");
        }
      } else if (state.type === "gasto") {
        const response = await updateGasto(data as Gasto[]);
        if (response.state) {
          showNotification("Gasto actualizado correctamente", "success");
        } else {
          showNotification(response.message || "Ha ocurrido un error", "error");
        }
      } else {
        const response = await updatePresupuesto(data as Presupuesto[]);
        if (response.state) {
          showNotification("Presupuesto actualizado correctamente", "success");
        } else {
          showNotification(response.message || "Ha ocurrido un error", "error");
        }
      }
    }
    closeProgressBar();
  };

  const deleteData = async () => {
    showProgressBar();
    if (open.row) {
      if (state.type === "ingreso") {
        console.debug("estoy en ingreso");
        const response = await deleteIngreso(open.row as Ingreso);
        if (response.state) {
          showNotification("Ingreso eliminado correctamente", "success");
          setState({
            type: state.type,
            cols: state.cols,
            rows: response.values,
          });
        } else {
          showNotification(response.message || "Ha ocurrido un error", "error");
        }
      } else if (state.type === "gasto") {
        const response = await deleteGasto(open.row as Gasto);
        if (response.state) {
          showNotification("Gasto eliminado correctamente", "success");
          setState({
            type: state.type,
            cols: state.cols,
            rows: response.values,
          });
        } else {
          showNotification(response.message || "Ha ocurrido un error", "error");
        }
      } else {
        const response = await deletePresupuesto(open.row as Presupuesto);
        if (response.state) {
          showNotification("Presupuesto eliminado correctamente", "success");
          setState({
            type: state.type,
            cols: state.cols,
            rows: response.values,
          });
        } else {
          showNotification(response.message || "Ha ocurrido un error", "error");
        }
      }
    }
    handleClose();
    closeProgressBar();
  };

  useImperativeHandle(ref, () => ({
    submitForm() {
      updateData();
    },
  }));

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Seleccione el tipo de búsqueda
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state?.type}
          label="Seleccione el tipo de búsqueda"
          onChange={(event) => handleChange(event.target.value as TableType)}
        >
          <MenuItem value={"ingreso"}>Ingreso</MenuItem>
          <MenuItem value={"gasto"}>Gasto</MenuItem>
          <MenuItem value={"presupuesto"}>Presupuesto</MenuItem>
        </Select>
      </FormControl>
      <DataGrid
        className={classes.root}
        rows={state.rows}
        columns={state.cols}
        pageSize={20}
        rowsPerPageOptions={[20]}
        //checkboxSelection
        //disableSelectionOnClick
        localeText={esESGrid}
        style={{ marginTop: "40px" }}
        components={{
          Toolbar: ToolbarWithRef,
        }}
        autoHeight={true}
        density="compact"
      />
      <CloseFormDialog
        open={open.state}
        handleClose={handleClose}
        title={`¿Esta seguro que desea eliminar este ${state.type}?`}
        contentText="Este cambio no sera revertible"
        warningReturnButtonText="Eliminar"
        successButtonText="Cancelar"
        handleSuccess={deleteData}
      />
    </>
  );
};

const ViewContainerWrapper = forwardRef(ViewPageContainer);
export const ViewPage: React.FC<WithNotifications & WithProgress> = (props) => (
  <UILayout title="Tabla de datos">
    <ViewContainerWrapper {...props}></ViewContainerWrapper>
  </UILayout>
);
export default withProgressBar(withNotifications(ViewPage));
