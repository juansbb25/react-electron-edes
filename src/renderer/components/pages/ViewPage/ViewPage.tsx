import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Ingreso, Gasto } from "@models/Transaccion";
import { Presupuesto } from "@models/presupuesto";
import { getIngresos } from "@database/controllers";
import UILayout from "@components/layout/UILayout";
import { DataGrid } from "@mui/x-data-grid";
import { esESGrid } from "src/renderer/language";

type TableType = "ingreso" | "gasto" | "presupuesto" | "";

type ColumnType<T> = {
  field: keyof T;
  headerName: string;
  description?: string;
  sortable: boolean;
  width: number;
};

type TableState = {
  type: TableType;
  rows: Ingreso[] | Gasto[] | Presupuesto[];
  cols: ColumnType<Ingreso>[] | ColumnType<Gasto>[] | ColumnType<Presupuesto>[];
};
const ViewPage = () => {
  const [state, setState] = useState<TableState>({
    type: "",
    rows: [],
    cols: [],
  });
  const handleChange = async (type: TableType) => {
    console.debug("El tipo es", type);
    if (type === "ingreso") {
      const ingresos = await getIngresos();
      if (ingresos.state && ingresos.values) {
        const cols: ColumnType<Ingreso>[] = [];
        if (ingresos.values.length > 0) {
          const keys = Object.keys(ingresos.values[0]) as (keyof Ingreso)[];
          keys.forEach((key: keyof Ingreso) => {
            cols.push({
              field: key,
              headerName: key,
              sortable: true,
              width: 150,
              ...((key as string) == "id" && { hide: true }),
            });
          });
        }
        console.debug("ingresos", ingresos, cols);
        setState({
          type: "ingreso",
          rows: ingresos.values,
          cols: cols,
        });
      } else {
        console.debug("Error leyendo los datos");
      }
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
          </Select>
        </FormControl>
        <DataGrid
          rows={state.rows}
          columns={state.cols}
          pageSize={5}
          rowsPerPageOptions={[15]}
          //checkboxSelection
          disableSelectionOnClick
          localeText={esESGrid}
          style={{ minHeight: "200px" }}
        />
      </>
    </UILayout>
  );
};

export default ViewPage;

// : (
//   <Paper
//     elevation={2}
//     style={{ width: "60%" }}
//     sx={{
//       padding: 3,
//       boxShadow: 10,
//       borderRadius: 5,
//       textAlign: "center",
//       margin: 5,
//       background: "#003C71",
//       color: "#ffffff",
//     }}
//   >
//     Seleccione que tipo de archivo quiere ver
//   </Paper>
// )}
