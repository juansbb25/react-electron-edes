import * as React from "react";
import CloseFormDialog from "@components/atoms/CloseFormDialog";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { Ingreso, Gasto, Rubro } from "@models/Transaccion";
import { Presupuesto } from "@models/presupuesto";
import { deleteIngreso, getIngresos } from "@database/controllers";
import UILayout from "@components/layout/UILayout";
import {
  DataGrid,
  GridColumns,
  GridRowData,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { esESGrid } from "../../../../renderer/language";
import { deleteGasto, getGastos } from "@database/controllers/gasto";
import {
  deletePresupuesto,
  getPresupuestos,
} from "@database/controllers/presupuesto";
import { deleteRubro, getRubros } from "@database/controllers/rubro";
import { TextFieldProps } from "@components/atoms/InputsForm/types";
import { createIngresosForm } from "../EntrysPage/formDefinition";
import { createGastosForm } from "../GastoPage/formDefinition";
import { createPresupuestoForm } from "../PresupuestoPage/formDefinition";
import { createRubroForm } from "../RubrosPage/formDefinition";
import { withId, WithId, withIdData } from "@utils/addId";
import { useStyles } from "../../../../renderer/antdTheme";
import withNotifications, { WithNotifications } from "@hocs/withNotifications";
import withProgressBar, { WithProgress } from "@hocs/withProgressBarDialog";
import moment from "moment";
import EditPage from "../EditPage";

type TableType = "ingreso" | "gasto" | "presupuesto" | "rubro" | "";

type RowsType = Ingreso[] | Gasto[] | Presupuesto[] | Rubro[];

type TableState = {
  type: TableType;
  rows: RowsType;
  cols: GridColumns;
};

export type RefObject = {
  submitForm: () => void;
};

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const ViewPageContainer = ({
  showNotification,
  showProgressBar,
  closeProgressBar,
}: WithNotifications & WithProgress): React.ReactElement => {
  //This is to modal message
  const [open, setOpen] = useState<{ state: boolean; row?: GridRowData }>({
    state: false,
  });

  const [editMode, setEditMode] = useState<{
    isEditing: boolean;
    row?: GridRowData;
  }>();
  const handleClose = () => {
    console.debug("llamando a handle close");
    handleChange(state.type);
    setOpen({ state: false, row: undefined });
  };

  const handleCloseEdit = () => {
    console.debug("llamando a handle close");
    handleChange(state.type);
    setEditMode({ isEditing: false });
  };

  const [state, setState] = useState<TableState>({
    type: "",
    rows: [],
    cols: [],
  });

  const classes = useStyles();

  const manageData = (
    response: RowsType,
    colsDefinition:
      | TextFieldProps<Ingreso>[]
      | TextFieldProps<Gasto>[]
      | TextFieldProps<Rubro>[]
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
        ...(key.renderInTable && {
          renderCell: key.renderInTable,
        }),
        ...(key.id == "id" && { hide: true }),
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
    console.debug("cambiando los datos");
    showProgressBar();
    if (type === "ingreso") {
      const ingresos = await getIngresos();
      manageData(ingresos.values, withId(createIngresosForm()), type);
    } else if (type === "gasto") {
      const gastos = await getGastos();
      manageData(gastos.values, withId(await createGastosForm()), type);
    } else if (type === "presupuesto") {
      const presupuestos = await getPresupuestos();
      manageData(
        withIdData(presupuestos.values, "code"),
        withId(createPresupuestoForm()),
        type
      );
    } else {
      const rubros = await getRubros();
      manageData(rubros.values, withId(createRubroForm()), type);
    }
    closeProgressBar();
  };

  const deleteData = async () => {
    showProgressBar();
    if (open.row) {
      if (state.type === "ingreso") {
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
      } else if (state.type === "presupuesto") {
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
      } else {
        const response = await deleteRubro(open.row as Rubro);
        if (response.state) {
          showNotification("Rubro eliminado correctamente", "success");
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
          <MenuItem value={"rubro"}>Rubro</MenuItem>
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
          Toolbar: CustomToolbar,
        }}
        autoHeight={true}
        density="compact"
        onRowDoubleClick={(params) => {
          setEditMode({
            isEditing: true,
            row: params.row,
          });
        }}
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
      <EditPage
        open={editMode?.isEditing || false}
        handleClose={() => handleCloseEdit()}
        title="Editar "
        type={state.type}
        row={editMode?.row}
      ></EditPage>
    </>
  );
};

export const ViewPage: React.FC<WithNotifications & WithProgress> = (props) => (
  <UILayout title="Tabla de datos" save={false}>
    <ViewPageContainer {...props}></ViewPageContainer>
  </UILayout>
);
export default withProgressBar(withNotifications(ViewPage));
