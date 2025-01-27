import React from "react";

const SortButtons = ({ fillRandomNumbers, sortNumbers, setOrder, order }) => {
  const handleSortAscending = () => {
    setOrder("asc");
    sortNumbers("asc");
  };

  const handleSortDescending = () => {
    setOrder("desc");
    sortNumbers("desc");
  };

  return (
    <div className="flex justify-center mb-6 gap-4">
      <button
        onClick={fillRandomNumbers}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Fill Random Numbers
      </button>

      <button
        onClick={handleSortAscending}
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Sort Ascending
      </button>

      <button
        onClick={handleSortDescending}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Sort Descending
      </button>
    </div>
  );
};

export default SortButtons;
