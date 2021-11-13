import { TextFieldProps } from "@components/atoms/InputsForm/types";
import { createReport, Report } from "@database/controllers/estadistica";
import { Presupuesto } from "@models/presupuesto";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { esESGrid } from "src/renderer/language";
import { CircularProgress } from "@mui/material";
import { cleanData } from "@utils/string";

type Props = {
  items: TextFieldProps<Presupuesto>[];
  code: string;
  excludeList: string[];
};
const NotCreatedCategories: React.FC<Props> = ({
  items,
  code,
  excludeList,
}) => {
  const [report, setReport] = useState<Report | null>(null);
  useEffect(() => {
    createReport().then((data) => {
      console.debug(
        data,
        data.presupuestos.find((presupuesto) => presupuesto.code == code)
      );
      setReport(data);
    });
  }, []);
  const rubrosForm =
    items.find((iterator) => iterator.type == "array")?.arrayOptions || [];
  const cols: GridColumns = rubrosForm.map((key) => {
    return {
      field: key.id,
      headerName: key.label,
      sortable: true,
      width: 150,
      minWidth: 150,
      type: key.type,
      //resizable: true,
      ...(key.id === "rubro" && {
        flex: 1,
      }),
      ...(key.renderInTable && {
        renderCell: key.renderInTable,
      }),
      ...(key.renderInTable && {
        renderCell: key.renderInTable,
      }),
      ...(key.id == "id" && { hide: true }),
    };
  });
  return report ? (
    <DataGrid
      rows={(
        report.presupuestos
          .find((presupuesto) => presupuesto.code == code)
          ?.gastosRubro.filter(
            (rubro) =>
              !excludeList
                .map((itemList) => cleanData(itemList))
                .includes(cleanData(rubro.rubro))
          ) || []
      ).map((data) => ({ ...data, id: data.rubro }))}
      columns={cols}
      pageSize={16}
      // rowsPerPageOptions={[20]}
      //checkboxSelection
      //disableSelectionOnClick
      localeText={esESGrid}
      autoHeight={true}
      density="compact"
    />
  ) : (
    <CircularProgress />
  );
};

export default NotCreatedCategories;
