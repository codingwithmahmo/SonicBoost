import React from "react";
import { Search, X } from "lucide-react";

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="relative w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={20} />
      </div>
      <input
        type="text"
        placeholder="Search songs, artists, genres..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-10 py-3 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-black transition-all duration-200"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;