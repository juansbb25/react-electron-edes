import * as React from "react";
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
import { getIngresos, updateIngreso } from "@database/controllers";
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
import { getGastos } from "@database/controllers/gasto";
import { getPresupuestos } from "@database/controllers/presupuesto";
import { TextFieldProps } from "@components/atoms/InputsForm/types";
import { createIngresosForm } from "../EntrysPage/formDefinition";
import { createGastosForm } from "../GastoPage/formDefinition";
import { createPresupuestoForm } from "../PresupuestoPage/formDefinition";
import { withId, WithId, withIdData } from "@utils/addId";
import { useStyles } from "../../../../renderer/antdTheme";

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
  props: Record<string, unknown>,
  ref: Ref<RefObject>
): React.ReactElement => {
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
      };
    });
    setState({
      type: type,
      rows: response,
      cols: cols,
    });
  };
  const handleChange = async (type: TableType) => {
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
  };

  const updateData = async () => {
    const data = childRef.current?.getRows();
    if (data) {
      if (state.type === "ingreso") {
        console.debug(data);
        await updateIngreso(data as Ingreso[]);
      } else if (state.type === "gasto") {
        console.debug("gasto");
      } else {
        console.debug("presupuesto");
      }
    }
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
    </>
  );
};

const ViewContainerWrapper = forwardRef(ViewPageContainer);
export const ViewPage: React.FC = () => (
  <UILayout title="Tabla de datos">
    <ViewContainerWrapper></ViewContainerWrapper>
  </UILayout>
);
export default ViewPage;
