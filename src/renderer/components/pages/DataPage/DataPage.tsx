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
import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
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
} from "./utils";

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
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm() {
      createReport();
    },
  }));

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
              label="Seleccione el año"
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
                            label="Mes y año"
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
      {data.map((table) => (
        <DataGrid tableName={table.title} data={table.data} key={table.title} />
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
