import React from "react";

const NumberInput = ({ numbers, setNumbers }) => {
  const handleInputChange = (index, value) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-4">
      {numbers.map((num, index) => (
        <input
          key={index}
          type="number"
          value={num}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="border rounded p-3 text-center w-16"
          placeholder="Num"
        />
      ))}
    </div>
  );
};

export default NumberInput;
