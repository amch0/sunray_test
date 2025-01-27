import React, { useState } from "react";
import NumberInput from "./components/NumberInput";
import SortButtons from "./components/SortButtons";
import NumberSorter from "./components/NumberSorter";

const App = () => {
  const [numbers, setNumbers] = useState(Array(10).fill(0));
  const [order, setOrder] = useState("asc");
  const [sortedNumbers, setSortedNumbers] = useState([]); // Sortirani brojevi
  const [isFilterActive, setIsFilterActive] = useState(false); // Aktivacija filtra
  const [operator, setOperator] = useState(">"); // Operator za filter
  const [filterNumber, setFilterNumber] = useState(9); // Broj za filter

  // Funkcija za proveru prostih brojeva
  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  // Funkcija za popunjavanje slučajnim brojevima
  const fillRandomNumbers = () => {
    const randomNumbers = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100)
    );
    setNumbers(randomNumbers);
  };

  // Funkcija za sortiranje brojeva
  const sortNumbers = async (order) => {
    try {
      const response = await fetch("http://localhost:5000/api/sort", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numbers,
          order,
        }),
      });

      const data = await response.json();
      setSortedNumbers(data.sortedNumbers);
    } catch (error) {
      console.error("Greška pri slanju podataka na server:", error);
    }
  };

  const filteredNumbers = isFilterActive
    ? numbers.filter((num) => {
        if (operator === ">") return num < filterNumber;
        if (operator === "<") return num > filterNumber;
        if (operator === "=") return num === filterNumber;
        return num;
      })
    : numbers;

  return (
    <div className="app-container">
      <h1 className="header">Sortiranje Brojeva</h1>

      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={isFilterActive}
            onChange={(e) => setIsFilterActive(e.target.checked)}
          />
          Aktiviraj Filter
        </label>

        {isFilterActive && (
          <div className="filter-settings">
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
            >
              <option value=">">Manje od</option>
              <option value="<">Veće od</option>
              <option value="=">Jednako</option>
            </select>
            <input
              type="number"
              value={filterNumber}
              onChange={(e) => setFilterNumber(Number(e.target.value))}
              className="number-input"
            />
          </div>
        )}
      </div>

      <NumberInput numbers={filteredNumbers} setNumbers={setNumbers} />

      <SortButtons
        fillRandomNumbers={fillRandomNumbers}
        setOrder={setOrder}
        order={order}
        sortNumbers={sortNumbers}
      />

      {/* Prikaz sortirane liste */}
      <NumberSorter
        sortedNumbers={sortedNumbers}
        isPrime={isPrime}
        numbers={filteredNumbers}
      />
    </div>
  );
};

export default App;
