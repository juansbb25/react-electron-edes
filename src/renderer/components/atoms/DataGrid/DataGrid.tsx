import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
type DataGridProps = {
  data: string[][];
  tableName: string;
};

const DataGrid: React.FC<DataGridProps> = ({ data, tableName }) => {
  const [header, ...rows] = data;
  console.debug(header, rows);
  const tableRowTitleComponent = header.map((item: string, i) => {
    return <TableCell key={i}>{item}</TableCell>;
  });
  const tableRowItemsComponent = rows.map((item, i) => {
    return (
      <TableRow key={i}>
        {item.map((cell, i) => (
          <TableCell key={i}>{cell}</TableCell>
        ))}
      </TableRow>
    );
  });

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Typography variant="subtitle1">{tableName}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>{tableRowTitleComponent}</TableRow>
          </TableHead>
          <TableBody>{tableRowItemsComponent}</TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default DataGrid;
