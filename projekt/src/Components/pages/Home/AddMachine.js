import React from "react";

const AddMachine = () => {
  return (
    <div>
      <select name="category" defaultValue="Kategoria">
        <option disabled value="Kategoria">
          Kategoria
        </option>
        <option value="Pojazd">Pojazd</option>
        <option value="Maszyna">Maszyna</option>
        <option value="Inne">Inne</option>
      </select>

      <label>
        <input type="text" name="name" autoComplete="off" placeholder="Nazwa" />
      </label>

      <select name="condition" defaultValue="Stan">
        <option disabled value="Stan">
          Stan
        </option>
        <option value="Nowy">Nowy</option>
        <option value="Używany">Używany</option>
      </select>

      <select name="damage" defaultValue="Do naprawy">
        <option disabled value="Do naprawy">
          Do naprawy
        </option>
        <option value="Tak">Tak</option>
        <option value="Nie">Nie</option>
      </select>

      <label>
        <input type="text" name="price" placeholder="Cena" />
      </label>

      <button>Dodaj urządzenie</button>
    </div>
  );
};

export default AddMachine;
