import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import style from "../Home/Home.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";
import AddMachine from "./AddMachine";
import { supabase } from "../../../supabase/config";

function createData(id, category, name, condition, damage, value) {
  return { category, name, condition, damage, value };
}

const rows = [
  createData(1, "Pojazd", "Ciągnik", "Używany", "Nie", "30.000"),
  createData(2, "Maszyna", "Brony", "Używany", "Tak", "2.000"),
  createData(3, "Maszyna", "Siewnik", "Nowy", "Nie", "10.000"),
  createData(4, "Pojazd", "Kombajn", "Używany", "Tak", "150.000"),
];

export default function Home() {
  const { isDarkTheme } = useContext(AppContext);
  const { namerow, setNamerow } = useState([]);

  useEffect(() => {
    getAllMachnies();
  }, []);

  const getAllMachnies = async (
    id,
    category,
    name,
    condition,
    damage,
    price
  ) => {
    let { data: Machines } = await supabase.from("Machines").select("*");

    console.log("machines supabase", Machines);
  };
  return (
    <div className={style.home__section}>
      <AddMachine />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={style.home__tablerow} align="center">
                Kategoria
              </TableCell>
              <TableCell className={style.home__tablerow} align="center">
                Nazwa
              </TableCell>
              <TableCell className={style.home__tablerow} align="center">
                Stan
              </TableCell>
              <TableCell className={style.home__tablerow} align="center">
                Uszkodzonie
              </TableCell>
              <TableCell className={style.home__tablerow} align="center">
                Cena&nbsp;(zl)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, id) => (
              <TableRow
                key={id}
                sx={
                  ({ "&:last-child td, &:last-child th": { border: 0 } },
                  {
                    "&:nth-of-type(odd)": {
                      backgroundColor: "lightgray",
                    },
                  })
                }
              >
                <TableCell component="th" scope="row" align="center">
                  {row.category}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.condition}</TableCell>
                <TableCell align="center">{row.damage}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
