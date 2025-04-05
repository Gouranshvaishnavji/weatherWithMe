import React from "react";
import "./SearchBar.css";
const SearchBar = ({ location, setLocation, onSearch }) => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city"
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
