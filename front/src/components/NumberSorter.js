import React from "react";
import "../App.css";
const NumberSorter = ({ sortedNumbers, isPrime, numbers }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      {sortedNumbers.length > 0 ? (
        sortedNumbers.map((num, index) => {
          return (
            <input
              key={index}
              type="number"
              value={num}
              readOnly
              className={`border rounded p-3 text-center w-16 ${
                isPrime(num) ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            />
          );
        })
      ) : (
        <p className="text-center text-gray-500">No sorted numbers yet.</p>
      )}
    </div>
  );
};

export default NumberSorter;
