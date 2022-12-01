import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import style from "../Home/Home.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";
import AddMachine from "./AddMachine";
import { supabase } from "../../../supabase/config";

export default function Home() {
  const { isDarkTheme } = useContext(AppContext);

  const [editing, setEditing] = useState(false);
  const [rowname, setRowName] = useState([]);
  const [formError, setFormError] = useState(null);

  const [Category, setCategory] = useState("");
  const [Name, setName] = useState("");
  const [Damage, setDamage] = useState("");
  const [Condition, setCondition] = useState("");
  const [Price, setPrice] = useState("");

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

  // const updateMachine = async (id) => {
  //   const { data: Machine, error } = await supabase
  //     .from("Machine")
  //     .update(Category, Name, Condition, Damage, Price)
  //     .eq("id", id);
  //   if (error) throw error;
  //   window.location.reload();
  //   if (Machine) {
  //     setRowName(Machine);
  //   }
  // };

  /*jak pobierać !!!!!!!!!!??????????????????????????????????????????????????????????????????????? try czy jak w bazie */

  async function updateMachine(id) {
    try {
      const { data, error } = await supabase
        .from("Machine")
        .update({
          Category: Category,
          Name: Name,
          Condition: Condition,
          Damage: Damage,
          Price: Price,
        })
        .eq("id", id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

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
    <div className={style.home__section}>
      <AddMachine />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* zmiana koloru nagłówków !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! bg-black/ color:white*/}

              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Kategoria
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Nazwa
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Stan
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Uszkodzenia
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Cena w zł
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Akcja
              </TableCell>
            </TableRow>
          </TableHead>
          {editing === false ? (
            <TableBody>
              {rowname.map((name, id) => (
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
                    {name.Category}
                  </TableCell>

                  <TableCell align="center">{name.Name}</TableCell>

                  <TableCell align="center">
                    {name.Condition === "Nowy" ? "Nowy" : "Używany"}
                  </TableCell>

                  <TableCell align="center">
                    {name.Damage === "Tak" ? "Tak" : "Nie"}
                  </TableCell>

                  <TableCell align="center" type="number">
                    {name.Price}
                  </TableCell>
                  <TableCell align="left" sx={{ width: 90 }}>
                    <div className={style.table__icon}>
                      <EditIcon onClick={() => setEditing(true)} />
                      <DeleteIcon
                        color="primary"
                        onClick={() => deleteMachine(name.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {rowname.map((name, id) => (
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
                  <TableCell align="center">
                    <select
                      name="category"
                      defaultValue={name.Category}
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
                  </TableCell>
                  <TableCell align="center">
                    <input
                      name="name"
                      placeholder="Nazwa"
                      autoComplete="off"
                      defaultValue={name.Name}
                      onChange={(e) => setName(e.target.value)}
                      className={style.form__option_edit}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <select
                      name="condition"
                      defaultValue={name.Condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className={style.form__option_edit}
                    >
                      <option disabled value="Stan">
                        Stan
                      </option>
                      <option>Nowy</option>
                      <option>Używany</option>
                    </select>
                  </TableCell>
                  <TableCell align="center">
                    <select
                      name="damage"
                      defaultValue={name.Damage}
                      onChange={(e) => setDamage(e.target.value)}
                      className={style.form__option_edit}
                    >
                      <option disabled value="Uszkodzenia">
                        Uszkodzenia
                      </option>
                      <option>Tak</option>
                      <option>Nie</option>
                    </select>
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="number"
                      name="price"
                      placeholder="Cena w zł"
                      defaultValue={name.Price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={style.form__option_edit}
                      autoComplete="off"
                    />
                  </TableCell>
                  {formError && <p>{formError}</p>}
                  <TableCell align="left" sx={{ width: 90 }}>
                    <div className={style.table__icon}>
                      <CheckIcon onClick={() => updateMachine(name.id)} />
                      <CloseIcon
                        color="primary"
                        onClick={() => setEditing(false)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
