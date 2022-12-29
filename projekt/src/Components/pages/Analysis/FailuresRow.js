import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import stylePlanning from "../Planning/Planning.module.css";

const FailuresRow = ({ checkedAll, deleteDamage, rowData: rowDamage }) => {
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
            onClick={() => deleteDamage(rowDamage.id)}
          />
        ) : null}
      </TableCell>

      <TableCell align="center">{rowDamage.cost}</TableCell>
      <TableCell align="center">{rowDamage.damageelement}</TableCell>

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

export default FailuresRow;
