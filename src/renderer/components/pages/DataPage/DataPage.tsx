import DataGrid from "@components/atoms/DataGrid";
import UILayout from "@components/layout/UILayout";
import { DatePicker } from "@mui/lab";
import { HighlightOffOutlined } from "@mui/icons-material";
import {
  MenuItem,
  Select,
  Stack,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  TextField,
  Typography,
  Button,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import moment from "moment";
import { MonthNumber } from "@utils/date";
import {
  obtainTotalReport,
  currentDate,
  createMonthNumber,
  createYearNumber,
  createDate,
  obtainAnualReport,
  ReportTable,
  obtainMensualReport,
  fromColToRow,
} from "./utils";
import XLSX from "xlsx";
import "moment/locale/es-mx";
//import { constant} from "lodash";

type Options = "mensual" | "anual" | "total";
type ExtraInformation<T extends Options> = T extends "mensual"
  ? { information: { month: MonthNumber; year: number }[] }
  : T extends "anual"
  ? { year: number }
  : // eslint-disable-next-line @typescript-eslint/ban-types
    {};
type Filter<T extends Options> = {
  type: T;
} & ExtraInformation<T>;

export type RefObject = {
  submitForm: () => void;
};

const DataPage = (
  props: Record<string, never>,
  ref: Ref<RefObject>
): React.ReactElement => {
  const [filter, setFilter] = useState<
    Filter<"mensual"> | Filter<"anual"> | Filter<"total">
  >({
    type: "total",
  });

  const [data, setData] = useState<ReportTable[]>([]);

  useEffect(() => {
    setData([]);
  }, [filter]);

  const filterChange = (event: SelectChangeEvent) => {
    const type = event.target.value as Options;
    switch (type) {
      case "anual":
        setFilter({
          type,
          year: createYearNumber(currentDate()),
        });
        break;
      case "mensual":
        setFilter({
          type,
          information: [
            {
              month: createMonthNumber(currentDate()),
              year: createYearNumber(currentDate()),
            },
          ],
        });
        break;
      case "total":
        setFilter({
          type,
        });
        break;
    }
  };

  const addMonth = () => {
    if (filter.type === "mensual") {
      setFilter({
        type: "mensual",
        information: [
          ...filter.information,
          {
            month: createMonthNumber(currentDate()),
            year: createYearNumber(currentDate()),
          },
        ],
      });
    }
  };

  const replaceMonth = (
    index: number,
    value: { month: MonthNumber; year: number }
  ) => {
    if (filter.type === "mensual") {
      const ret = filter.information.slice(0);
      ret[index] = value;
      return ret;
    } else {
      return [];
    }
  };

  const removeMonth = (index: number) => {
    if (filter.type === "mensual") {
      return filter.information.filter((element, i) => i !== index);
    } else {
      return [];
    }
  };

  const createReport = async () => {
    if (filter.type == "total") {
      const report = await obtainTotalReport();
      setData(report);
    } else if (filter.type == "anual") {
      const report = await obtainAnualReport(filter.year);
      setData(report);
    } else {
      const report = await obtainMensualReport(filter.information);
      setData(report);
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm() {
      createReport();
    },
  }));

  const downloadExcel = () => {
    //react electron show dialog
    const { remote } = require("electron");
    const dialog = remote.dialog;
    const browserWindow = remote.getCurrentWindow();
    const options = {
      title: "Guardar archivo como...",
      name: "data.xlsx",
      filters: [{ name: "xlsx", extensions: ["xlsx"] }],
    };
    //excel creato sheet
    console.debug("downloadExcel");
    console.debug();
    const workSheet = XLSX.utils.aoa_to_sheet([["Tabla De Reporte"]]);
    data.forEach((item) => {
      XLSX.utils.sheet_add_aoa(workSheet, [[]], { origin: -1 });
      XLSX.utils.sheet_add_aoa(workSheet, [[item.title]], { origin: -1 });
      XLSX.utils.sheet_add_aoa(workSheet, fromColToRow(item.data), {
        origin: -1,
      });
    });
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "data");
    //Download
    const o = dialog.showSaveDialog(browserWindow, options);
    o.then((path) => XLSX.writeFile(workBook, path.filePath!));
  };
  return (
    <Stack spacing={6} justifyContent="center">
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FormControl sx={{ width: 226 }} size="small">
          <InputLabel>Seleccione un reporte</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Seleccione un reporte"
            value={filter.type}
            onChange={filterChange}
          >
            <MenuItem value={"total"}>Total</MenuItem>
            <MenuItem value={"anual"}>Anual</MenuItem>
            <MenuItem value={"mensual"}>Mensual</MenuItem>
          </Select>
        </FormControl>
        {filter.type == "anual" && (
          <FormControl size="small">
            <DatePicker
              views={["year"]}
              label="Seleccione el a??o"
              value={createDate(filter.year)}
              onChange={(newValue) => {
                if (newValue)
                  setFilter({
                    type: "anual",
                    year: createYearNumber(
                      newValue as unknown as moment.Moment
                    ),
                  });
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} size="small" />
              )}
            />
          </FormControl>
        )}
        {filter.type == "mensual" && (
          <Box
            sx={{
              borderRadius: "10px",
              borderColor: "#b9bbbd",
              borderBlockColor: "#b9bbbd",
              border: 1,
              padding: 2,
            }}
          >
            <Stack spacing={2}>
              <Typography
                variant="body1"
                component="h2"
                sx={{ fontWeight: "bold" }}
              >
                Meses para el informe:
              </Typography>
              <Grid container rowSpacing={1} columnSpacing={1}>
                {filter.information.map((info, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={
                        filter.information.length >= 3
                          ? 4
                          : filter.information.length == 2
                          ? 6
                          : 12
                      }
                      key={index}
                    >
                      <Stack
                        direction="row"
                        spacing={0}
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <FormControl size="small">
                          <DatePicker
                            views={["year", "month"]}
                            label="Mes y a??o"
                            value={createDate(
                              filter.information[index].year,
                              filter.information[index].month
                            )}
                            onChange={(newValue) => {
                              if (newValue)
                                setFilter({
                                  type: "mensual",
                                  information: replaceMonth(index, {
                                    year: createYearNumber(
                                      newValue as unknown as moment.Moment
                                    ),
                                    month: createMonthNumber(
                                      newValue as unknown as moment.Moment
                                    ),
                                  }),
                                });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                helperText={null}
                                fullWidth
                                // variant="standard"
                                size="small"
                              />
                            )}
                          />
                        </FormControl>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => {
                            setFilter({
                              type: "mensual",
                              information: removeMonth(index),
                            });
                          }}
                        >
                          <HighlightOffOutlined />
                        </IconButton>
                      </Stack>
                    </Grid>
                  );
                })}
              </Grid>
              <Button variant="outlined" onClick={addMonth} size="small">
                Agregar mes
              </Button>
            </Stack>
          </Box>
        )}
      </Stack>
      {data.length > 0 && (
        <Button
          onClick={downloadExcel}
          color="success"
          variant="contained"
          size="small"
          sx={{ width: 200 }}
        >
          Exportar
        </Button>
      )}
      {data.map((table, i) => (
        <DataGrid
          tableName={table.title}
          data={fromColToRow(table.data)}
          key={i}
        />
      ))}
    </Stack>
  );
};

const DataPageWithRef = forwardRef(DataPage);
const DataPageWithContainer: React.FC = () => {
  return (
    <UILayout title="Resumen de Datos" buttonTitle={"Crear reporte"}>
      <DataPageWithRef />
    </UILayout>
  );
};
export default DataPageWithContainer;
