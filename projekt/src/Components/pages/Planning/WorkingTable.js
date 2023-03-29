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
import WorkRow from "../Planning/WorkRow";

const WorkingTable = () => {
  const { isDarkTheme } = useContext(AppContext);

  const [work, setWork] = useState([]);

  const [checkedAll, setCheckedAll] = useState(false);
  const [typeofwork, setTypeOfWork] = useState();
  const [scheduledstartdate, setscheduledstartdate] = useState();
  const [numberoffield, setNumberOfField] = useState();

  const selectAll = (value) => {
    setCheckedAll(value);
  };

  useEffect(() => {
    getWork();
  }, []);

  const getWork = async (e) => {
    let { data: Working, error } = await supabase
      .from("Working")
      .select(typeofwork, numberoffield, scheduledstartdate);
    if (error) {
      console.log(error);
    }
    if (Working) {
      setWork(Working);
    }
  };

  const deleteAllSelected = async (id) => {
    const { data: Working, error } = await supabase
      .from("Working")
      .delete()
      .in(
        "id",
        work.map((el) => el.id)
      );
    if (error) throw error;

    if (Working) {
    }
    setCheckedAll(false);
    getWork();
  };

  const deleteServis = async (id) => {
    const { data: Working, error } = await supabase
      .from("Working")
      .delete()
      .eq("id", id);
    if (error) throw error;

    if (getWork) {
    }
    getWork();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              Rodzaj pracy
            </TableCell>
            <TableCell
              align="center"
              style={{
                fontWeight: "bold",
                background: isDarkTheme ? "#000" : "#4caf4faf",
                color: isDarkTheme ? "#ffff" : "#000",
              }}
            >
              Nr działki
            </TableCell>
            <TableCell
              align="center"
              style={{
                fontWeight: "bold",
                background: isDarkTheme ? "#000" : "#4caf4faf",
                color: isDarkTheme ? "#ffff" : "#000",
              }}
            >
              Data planowanej pracy
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
          {work.map((row) => (
            <WorkRow
              checkedAll={checkedAll}
              deleteServis={deleteServis}
              rowData={row}
              key={row.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkingTable;
