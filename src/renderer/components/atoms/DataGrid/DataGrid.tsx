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
  data: {
    title: string;
    items: string[];
  }[];
  tableName: string;
};

const DataGrid: React.FC<DataGridProps> = ({ data, tableName }) => {
  const tableRowTitleComponent = data.map((item, i) => {
    return <TableCell key={i}>{item.title}</TableCell>;
  });
  const tableSize = {
    x: data.length,
    y: data.length ? data[0].items.length : 0,
  };
  const array = Array.from({ length: tableSize.y }, (_, i) => i + 1);
  console.debug(array);
  const tableRowItemsComponent = array.map((item, i) => {
    const reorderItems = data.map((item, j) => {
      const value = item.items[i];
      return <TableCell key={j}>{value}</TableCell>;
    });
    return <TableRow key={i}>{reorderItems}</TableRow>;
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
