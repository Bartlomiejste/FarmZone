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

import style from "../Home/Home.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";
import AddMachine from "./AddMachine";
import { supabase } from "../../../supabase/config";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function EditRow() {
  const { id } = useParams;
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(AppContext);

  const [errors, setErrors] = useState(null);
  const [namerow, setNamerow] = useState([]);
  const [Category, setCategory] = useState("");
  const [Name, setName] = useState("");
  const [Damage, setDamage] = useState("");
  const [Condition, setCondition] = useState("");
  const [Price, setPrice] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    getAllMachnies();
  }, []);

  const getAllMachnies = async () => {
    let { data: Machine, error } = await supabase.from("Machine").select("*");
    if (error) {
      setErrors(null);
      console.log(error);
    }
    if (Machine) {
      setNamerow(Machine);
      setErrors(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Category || !Name || !Condition || !Damage || !Price) {
      setFormError("Uzupełnij wszystkie pola");
    }
    const { data, error } = await supabase
      .from("Machine")
      .update({
        Category,
        Name,
        Damage,
        Condition,
        Price,
      })
      .eq("id", id);
    if (error) {
      console.log(error);
      setFormError("Uzupełnij wszystkie pola");
    }
    if (data) {
      console.log(data);
      setFormError(null);
      Navigate("/main");
    }
  };

  return (
    <div className={style.home__section}>
      <form onClick={handleSubmit} className={style.form__container}>
        <select
          name="category"
          defaultValue="Kategoria"
          onChange={(e) => setCategory(e.target.value)}
          className={style.form__option}
        >
          <option disabled value="Kategoria">
            Kategoria
          </option>
          <option>Pojazd</option>
          <option>Maszyna</option>
          <option>Inne</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Nazwa"
          autoComplete="off"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          className={style.form__option}
        />

        <select
          name="condition"
          defaultValue="Stan"
          onChange={(e) => setCondition(e.target.value)}
          className={style.form__option}
        >
          <option disabled value="Stan">
            Stan
          </option>
          <option>Nowy</option>
          <option>Używany</option>
        </select>

        <select
          name="damage"
          defaultValue="Uszkodzenia"
          onChange={(e) => setDamage(e.target.value)}
          className={style.form__option}
        >
          <option disabled value="Uszkodzenia">
            Uszkodzenia
          </option>
          <option>Tak</option>
          <option>Nie</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Cena w zł"
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
          className={style.form__option}
          autoComplete="off"
        />

        <button className={style.form__btn}>Zapisz</button>
        <button className={style.form__btn}>Anuluj</button>
        {formError && <p className={style.form__error}>{formError}</p>}
      </form>
    </div>
  );
}
