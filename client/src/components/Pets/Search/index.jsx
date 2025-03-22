import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = ({ handleSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    handleSearchChange(searchQuery);
  };

  return (
    <div className="container mx-auto mt-6">
      <div className="flex justify-end mb-6">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search Pets"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearchChange(e.target.value);
            }}
            className="border p-2 rounded-xl w-full pl-4 text-black"
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 bottom-0 ml-2 p-2 bg-yellow-500 text-white rounded-r-xl"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
