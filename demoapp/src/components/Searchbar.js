///Searchbar
import React, { useState } from "react";
import "./../style/Searchbar.css"; // Make sure to create and import this CSS file   
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
 
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
 
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title, author or category"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};
 
export default SearchBar;