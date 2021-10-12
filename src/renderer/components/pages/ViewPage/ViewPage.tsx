import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Ingreso, Gasto } from "@models/Transaccion";
import { Presupuesto } from "@models/presupuesto";
import { getIngresos } from "@database/controllers";
import UILayout from "@components/layout/UILayout";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { esESGrid } from "src/renderer/language";
import { ServerResponse } from "@database/types";
import { getGastos } from "@database/controllers/gasto";
import { getPresupuestos } from "@database/controllers/presupuesto";
import { TextFieldProps } from "@components/atoms/InputsForm/types";
import { createIngresosForm } from "../EntrysPage/formDefinition";
import { createGastosForm } from "../GastoPage/formDefinition";
import { createPresupuestoForm } from "../PresupuestoPage/formDefinition";
import withId, { WithId } from "@utils/addId";

type TableType = "ingreso" | "gasto" | "presupuesto" | "";

type RowsType = Ingreso[] | Gasto[] | Presupuesto[];

type TableState = {
  type: TableType;
  rows: RowsType;
  cols: GridColumns;
};

const ViewPage: React.FC = () => {
  const [state, setState] = useState<TableState>({
    type: "",
    rows: [],
    cols: [],
  });

  const manageData = (
    response: ServerResponse<RowsType>,
    colsDefinition:
      | TextFieldProps<Ingreso>[]
      | TextFieldProps<Gasto>[]
      | TextFieldProps<Presupuesto & WithId>[],
    type: TableType
  ) => {
    if (response.state && response.values) {
      const cols: GridColumns = colsDefinition.map((key) => {
        return {
          field: key.id,
          headerName: key.label,
          sortable: true,
          //width: 150,
          type: key.type,
          editable: true,
          ...(key.renderInTable && { valueGetter: key.renderInTable }),
          ...(key.id == "id" && { hide: true }),
          ...(key.id == "id" && { editable: false }),
          ...(key.render && { editable: false }),
        };
      });
      setState({
        type: type,
        rows: response.values,
        cols: cols,
      });
    } else {
      console.debug("Error leyendo los datos");
    }
  };
  const handleChange = async (type: TableType) => {
    if (type === "ingreso") {
      const ingresos = await getIngresos();
      manageData(ingresos, withId(createIngresosForm()), type);
    } else if (type === "gasto") {
      const gastos = await getGastos();
      manageData(gastos, withId(createGastosForm()), type);
    } else {
      const presupuestos = await getPresupuestos();
      manageData(presupuestos, withId(createPresupuestoForm(), "code"), type);
    }
  };
  return (
    <UILayout title="Tabla de datos">
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
          rows={state.rows}
          columns={state.cols}
          pageSize={20}
          rowsPerPageOptions={[20]}
          //checkboxSelection
          disableSelectionOnClick
          localeText={esESGrid}
          style={{ minHeight: "400px", marginTop: "40px" }}
        />
      </>
    </UILayout>
  );
};

export default ViewPage;
