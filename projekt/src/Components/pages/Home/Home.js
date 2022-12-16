import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddMachine from "./AddMachine";
import style from "../Home/Home.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";
import { supabase } from "../../../supabase/config";
import { SingleMachine } from "./SingleMachine";

export default function Home() {
  const { isDarkTheme } = useContext(AppContext);
  const [rowname, setRowName] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    getMachines();
  }, []);

  const getMachines = async () => {
    let { data: Machine, error } = await supabase.from("Machine").select("*");
    if (error) {
      setFormError(null);
      console.log(error);
    }
    if (Machine) {
      setRowName(Machine);
      setFormError(null);
    }
  };

  let buyDevice = 0;
  rowname.forEach(myFunction);
  function myFunction(price) {
    buyDevice -= price.Price;
  }

  return (
    <>
      <div className={style.home__section}>
        <div className={style.home__information}>
          <p style={{ fontWeight: "bold" }}>Ogólne podsumowanie:</p>
          <p>
            Saldo:
            <span className={style.darkgreen}>2600</span>
          </p>
          <p>
            Zakup maszyn:<span className={style.yellow}> {buyDevice}</span>
          </p>
          <p>
            Awarie:<span className={style.red}> -2000</span>
          </p>
          <p>
            Zebrane plony:<span className={style.green}> +40000</span>
          </p>
        </div>
        <AddMachine />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    background: isDarkTheme ? "#000" : "#4caf4faf",
                    color: isDarkTheme ? "#ffff" : "#000",
                  }}
                >
                  Kategoria
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    background: isDarkTheme ? "#000" : "#4caf4faf",
                    color: isDarkTheme ? "#ffff" : "#000",
                  }}
                >
                  Nazwa
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    background: isDarkTheme ? "#000" : "#4caf4faf",
                    color: isDarkTheme ? "#ffff" : "#000",
                  }}
                >
                  Stan
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    background: isDarkTheme ? "#000" : "#4caf4faf",
                    color: isDarkTheme ? "#ffff" : "#000",
                  }}
                >
                  Uszkodzenia
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    background: isDarkTheme ? "#000" : "#4caf4faf",
                    color: isDarkTheme ? "#ffff" : "#000",
                  }}
                >
                  Cena w zł
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    background: isDarkTheme ? "#000" : "#4caf4faf",
                    color: isDarkTheme ? "#ffff" : "#000",
                  }}
                >
                  Akcja
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowname &&
                rowname
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((name) => (
                    <SingleMachine
                      machine={name}
                      key={name.id}
                      getMachines={getMachines}
                    />
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
