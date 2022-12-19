import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import stylePlanning from "../Planning/Planning.module.css";
import { differenceInCalendarDays } from "date-fns";

const ServisRow = ({ checkedAll, deleteServis, rowData }) => {
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
            onClick={() => deleteServis(rowData.id)}
          />
        ) : null}
      </TableCell>

      <TableCell align="center">{rowData.vehicleName}</TableCell>

      <TableCell align="center">{rowData.registrationNumber}</TableCell>

      <TableCell align="center">
        {differenceInCalendarDays(new Date(rowData.dates), new Date())}
        <span>dni</span>
      </TableCell>

      <TableCell align="center" sx={{ width: 150 }}>
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

export default ServisRow;
