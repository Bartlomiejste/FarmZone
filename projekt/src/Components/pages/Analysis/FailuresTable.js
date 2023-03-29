import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import stylePlanning from "../Planning/Planning.module.css";
import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";
import { supabase } from "../../../supabase/config";
import { useState } from "react";
import { useEffect } from "react";
import FailuresRow from "./FailuresRow";

const FailuresTable = () => {
  const { isDarkTheme } = useContext(AppContext);

  const [damage, setDamage] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [cost, setCost] = useState();
  const [damageelement, setDamageElement] = useState();

  const selectAll = (value) => {
    setCheckedAll(value);
  };

  useEffect(() => {
    getDamage();
  }, []);

  const getDamage = async () => {
    let { data: Damage, error } = await supabase
      .from("Damage")
      .select(cost, damageelement);
    if (error) {
      console.log(error);
    }
    if (Damage) {
      setDamage(Damage);
    }
  };

  const deleteAllSelected = async () => {
    const { data: Damage, error } = await supabase
      .from("Damage")
      .delete()
      .in(
        "id",
        damage.map((el) => el.id)
      );
    if (error) throw error;

    if (Damage) {
    }
    setCheckedAll(false);
    getDamage();
    window.location.reload();
  };

  const deleteDamage = async (id) => {
    const { error } = await supabase.from("Damage").delete().eq("id", id);
    if (error) throw error;

    if (getDamage) {
    }
    getDamage();
    window.location.reload();
  };
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              style={{
                fontWeight: "bold",
                background: isDarkTheme ? "#000" : "#4caf4faf",
                color: isDarkTheme ? "#ffff" : "#000",
              }}
            >
              {checkedAll ? (
                <DeleteIcon
                  className={stylePlanning.deleteIcon}
                  onClick={deleteAllSelected}
                />
              ) : null}
            </TableCell>

            <TableCell
              align="center"
              style={{
                fontWeight: "bold",
                background: isDarkTheme ? "#000" : "#4caf4faf",
                color: isDarkTheme ? "#ffff" : "#000",
              }}
            >
              Koszt awarii
            </TableCell>
            <TableCell
              align="center"
              style={{
                fontWeight: "bold",
                background: isDarkTheme ? "#000" : "#4caf4faf",
                color: isDarkTheme ? "#ffff" : "#000",
              }}
            >
              Uszkodzony element
            </TableCell>
            <TableCell
              align="center"
              style={{
                fontWeight: "bold",
                background: isDarkTheme ? "#000" : "#4caf4faf",
                color: isDarkTheme ? "#ffff" : "#000",
              }}
            >
              <input
                name="inputAll"
                type="checkbox"
                onChange={(event) => selectAll(event.target.checked)}
                checked={checkedAll}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {damage.map((row) => (
            <FailuresRow
              checkedAll={checkedAll}
              deleteDamage={deleteDamage}
              rowData={row}
              key={row.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FailuresTable;
