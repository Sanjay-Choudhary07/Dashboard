import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { searchWidget } from "../../store/widgetSlice";
import './Header.css';

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch(searchWidget(searchTerm));
  };

  return (
    <div className="header-container">
      <div className="breadcrumb">
        <div>Home</div>
        <div className="breadcrumb-divider">{">"}</div>
        <div className="breadcrumb-text">Dashboard</div>
      </div>
      <div className="search-container">
        <div className="relative">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search anything..."
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
        <button
          onClick={handleSearchSubmit}
          className="search-button"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Header;

  