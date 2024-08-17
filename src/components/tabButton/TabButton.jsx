import React from "react";
import "./TabButton.css"; 

function Button({ text, handleClick, selectedTab }) {
  const active = selectedTab === text;
  
 
  const buttonClass = `button ${active ? "active" : ""} ${text === "+" ? "plus" : "normal"}`;

  return (
    <button
      className={buttonClass}
      onClick={() => handleClick(text)}
    >
      {text}
    </button>
  );
}

export default Button;
