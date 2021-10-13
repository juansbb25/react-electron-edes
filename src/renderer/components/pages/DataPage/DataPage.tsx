import DataGrid from "@components/atoms/DataGrid";
import UILayout from "@components/layout/UILayout";
import {
  MenuItem,
  Select,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";
import React from "react";

const DataPage: React.FC = () => {
  return (
    <UILayout title="Resumen de Datos">
      <Stack spacing={6} justifyContent="center">
        <Stack direction="row" spacing={2}>
          <FormControl sx={{ width: 226 }}>
            <InputLabel>Seleccione un reporte</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Seleccione un reporte"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 226 }}>
            <InputLabel>Seleccione un filtro</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Seleccione un filtro"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <DataGrid
          tableName="Test"
          data={[
            {
              title: "H2",
              items: ["1", "2", "3", "4", "1", "2", "3", "4"],
            },
            {
              title: "H2",
              items: ["1", "2", "3", "4", "1", "2", "3", "4"],
            },
            {
              title: "H2",
              items: ["1", "2", "3", "4", "1", "2", "3", "4"],
            },
            {
              title: "H2",
              items: ["1", "2", "3", "4", "1", "2", "3", "4"],
            },
            {
              title: "H2",
              items: ["1", "2", "3", "4", "1", "2", "3", "4"],
            },
            {
              title: "H2",
              items: ["1", "2", "3", "4", "1", "2", "3", "4"],
            },
            {
              title: "H2",
              items: ["1", "2", "3", "4", "1", "2", "3", "4"],
            },
            {
              title: "H2",
              items: ["1", "2", "3", "4", "1", "2", "3", "4"],
            },
            {
              title: "H2",
              items: ["1", "2", "3", "4", "1", "2", "3", "4"],
            },
            {
              title: "H2",
              items: ["1", "2", "3", "4", "1", "2", "3", "4"],
            },
          ]}
        />
      </Stack>
    </UILayout>
  );
};

export default DataPage;
