import { Box } from "@mui/material";
import React, { useState } from "react";
import { supabase } from "../../../supabase/config";
import style from "../Home/Home.module.css";

const AddMachine = () => {
  const [Category, setCategory] = useState("");
  const [Name, setName] = useState("");
  const [Damage, setDamage] = useState("");
  const [Condition, setCondition] = useState("");
  const [Price, setPrice] = useState("");
  const [formError, setFormError] = useState(null);
  const [machines, setMachines] = useState([]);

  const CreateMachine = async (e) => {
    e.preventDefault();
    machines ? setFormError("Uzupełnij wszystkie pola") : setFormError(null);
    const { data, error } = await supabase
      .from("Machine")
      .insert([{ Category, Name, Damage, Condition, Price }]);
    if (error) {
      return error;
    }
    if (data) {
      setMachines(data);
      setFormError(null);
    }
    window.location.reload();
  };

  return (
    <Box>
      <form onSubmit={CreateMachine} className={style.form__container}>
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
          name="name"
          type="text"
          placeholder="Nazwa"
          autoComplete="off"
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
          min="0"
          name="price"
          type="number"
          placeholder="Cena w zł"
          autoComplete="off"
          onChange={(e) => setPrice(e.target.value)}
          className={style.form__option}
        />

        <button className={style.form__btn}>Dodaj urządzenie</button>
        {formError && <p className={style.form__error}>{formError}</p>}
      </form>
    </Box>
  );
};

export default AddMachine;
