import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabase/config";

const AddMachine = () => {
  const navigate = useNavigate();
  const [Category, setCategory] = useState("");
  const [Name, setName] = useState("");
  const [Damage, setDamage] = useState("");
  const [Condition, setCondition] = useState("");
  const [Price, setPrice] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Category || !Name || !Condition || !Damage || !Price) {
      setFormError("Uzupełnij wszystkie pola");
    }
    const { data, error } = await supabase
      .from("Machine")
      .insert([{ Category, Name, Damage, Condition, Price }]);
    if (error) {
      console.log(error);
      setFormError("Uzupełnij wszystkie pola");
    }
    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/main");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          name="category"
          defaultValue="Kategoria"
          onChange={(e) => setCategory(e.target.value)}
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
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          name="condition"
          defaultValue="Stan"
          onChange={(e) => setCondition(e.target.value)}
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
        />

        <button>Dodaj urządzenie</button>
        {formError && <p>{formError}</p>}
      </form>
    </div>
  );
};

export default AddMachine;
