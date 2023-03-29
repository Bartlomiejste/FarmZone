import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import style from "../Home/Home.module.css";
import { supabase } from "../../../supabase/config";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";

export const SingleMachine = ({ machine, getMachines }) => {
  const [Category, setCategory] = useState(machine.Category);
  const [Name, setName] = useState(machine.Name);
  const [Damage, setDamage] = useState(machine.Damage);
  const [Condition, setCondition] = useState(machine.Condition);
  const [Price, setPrice] = useState(machine.Price);

  const [isEditing, setIsEditing] = useState(false);

  const updateMachine = async (id) => {
    const { error } = await supabase
      .from("Machine")
      .update({
        Category,
        Name,
        Condition,
        Damage,
        Price,
      })
      .eq("id", id);

    if (error) throw error;
    getMachines();
    setIsEditing(false);
  };

  const deleteMachine = async (id) => {
    const { data: Machine, error } = await supabase
      .from("Machine")
      .delete()
      .eq("id", id);
    if (error) throw error;

    if (Machine) {
      console.log(Machine);
    }
    getMachines();
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
      <TableCell align="center">
        {isEditing ? (
          <select
            name="category"
            defaultValue={machine.Category}
            onChange={(e) => setCategory(e.target.value)}
            className={style.form__option_edit}
          >
            <option disabled value="Kategoria">
              Kategoria
            </option>
            <option>Pojazd</option>
            <option>Maszyna</option>
            <option>Inne</option>
          </select>
        ) : (
          machine.Category
        )}
      </TableCell>

      <TableCell align="center">
        {isEditing ? (
          <input
            name="name"
            placeholder="Nazwa"
            autoComplete="off"
            defaultValue={machine.Name}
            onChange={(e) => setName(e.target.value)}
            className={style.form__option_edit}
          />
        ) : (
          machine.Name
        )}
      </TableCell>

      <TableCell align="center">
        {isEditing ? (
          <select
            name="condition"
            defaultValue={machine.Condition}
            onChange={(e) => setCondition(e.target.value)}
            className={style.form__option_edit}
          >
            <option disabled value="Stan">
              Stan
            </option>
            <option>Nowy</option>
            <option>Używany</option>
          </select>
        ) : (
          machine.Condition
        )}
      </TableCell>

      <TableCell align="center">
        {isEditing ? (
          <select
            name="damage"
            defaultValue={machine.Damage}
            onChange={(e) => setDamage(e.target.value)}
            className={style.form__option_edit}
          >
            <option disabled value="Uszkodzenia">
              Uszkodzenia
            </option>
            <option>Tak</option>
            <option>Nie</option>
          </select>
        ) : (
          machine.Damage
        )}
      </TableCell>

      <TableCell align="center">
        {isEditing ? (
          <input
            type="number"
            name="price"
            placeholder="Cena w zł"
            defaultValue={machine.Price}
            onChange={(e) => setPrice(e.target.value)}
            className={style.form__option_edit}
            autoComplete="off"
          />
        ) : (
          machine.Price
        )}
      </TableCell>

      <TableCell align="left" sx={{ width: 90 }}>
        <Box className={style.table__icon}>
          {isEditing ? (
            <>
              <CheckIcon onClick={() => updateMachine(machine.id)} />
              <CloseIcon color="primary" onClick={() => setIsEditing(false)} />
            </>
          ) : (
            <>
              <EditIcon onClick={() => setIsEditing(true)} />
              <DeleteIcon
                color="primary"
                onClick={() => deleteMachine(machine.id)}
              />
            </>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};
