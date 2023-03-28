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
import CorpsRow from "./CropsRow";

const CropsTable = () => {
  const { isDarkTheme } = useContext(AppContext);
  const [checkedAll, setCheckedAll] = useState(false);

  const [crops, setCrops] = useState([]);
  const [kindofcrops, setKindOfCrops] = useState();
  const [quantitycrops, setQuantityCrops] = useState();
  const [pricecrops, setPriceCrops] = useState();

  const selectAll = (value) => {
    setCheckedAll(value);
  };

  useEffect(() => {
    getCrops();
  }, []);

  const getCrops = async (e) => {
    let { data: Crops, error } = await supabase
      .from("Crops")
      .select(kindofcrops, quantitycrops, pricecrops);
    if (error) {
      console.log(error);
    }
    if (Crops) {
      setCrops(Crops);
    }
  };

  const deleteAllSelected = async (id) => {
    const { data: Crops, error } = await supabase
      .from("Crops")
      .delete()
      .in(
        "id",
        crops.map((el) => el.id)
      );
    if (error) throw error;

    if (Crops) {
    }
    setCheckedAll(false);
    getCrops();
    window.location.reload();
  };

  const deleteCrops = async (id) => {
    const { data: Crops, error } = await supabase
      .from("Crops")
      .delete()
      .eq("id", id);
    if (error) throw error;

    if (getCrops) {
    }
    getCrops();
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
              Rodzaj plonu
            </TableCell>
            <TableCell
              align="center"
              style={{
                fontWeight: "bold",
                background: isDarkTheme ? "#000" : "#4caf4faf",
                color: isDarkTheme ? "#ffff" : "#000",
              }}
            >
              Ilość plonu (t)
            </TableCell>
            <TableCell
              align="center"
              style={{
                fontWeight: "bold",
                background: isDarkTheme ? "#000" : "#4caf4faf",
                color: isDarkTheme ? "#ffff" : "#000",
              }}
            >
              Cena (zł/t)
            </TableCell>
            <TableCell
              align="center"
              style={{
                fontWeight: "bold",
                background: isDarkTheme ? "#000" : "#4caf4faf",
                color: isDarkTheme ? "#ffff" : "#000",
              }}
            >
              Zysk (zł)
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
          {crops.map((row) => (
            <CorpsRow
              checkedAll={checkedAll}
              deleteCrops={deleteCrops}
              rowData={row}
              key={row.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CropsTable;
