import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import stylePlanning from "../Planning/Planning.module.css";

const CorpsRow = ({ checkedAll, deleteCrops, rowData: rowCrops }) => {
  const [checked, setChecked] = useState(false);

  const toggleCheck = () => {
    setChecked((prevState) => !prevState);
  };

  return (
    <TableRow
      sx={
        ({ "&:last-child td, &:last-child th": { border: 0 } },
        {
          "&:nth-of-type(odd)": {
            backgroundColor: "lightgray",
          },
        })
      }
    >
      <TableCell align="left">
        {checked || checkedAll ? (
          <DeleteIcon
            className={stylePlanning.deleteIcon}
            onClick={() => deleteCrops(rowCrops.id)}
          />
        ) : null}
      </TableCell>

      <TableCell align="center">{rowCrops.kindofcrops}</TableCell>
      <TableCell align="center">{rowCrops.quantitycrops}</TableCell>
      <TableCell align="center">{rowCrops.pricecrops}</TableCell>
      <TableCell align="center">
        {rowCrops.quantitycrops * rowCrops.pricecrops}
      </TableCell>
      <TableCell align="center">
        <input
          type="checkbox"
          name="input"
          onChange={toggleCheck}
          checked={checked || checkedAll}
        />
      </TableCell>
    </TableRow>
  );
};

export default CorpsRow;
