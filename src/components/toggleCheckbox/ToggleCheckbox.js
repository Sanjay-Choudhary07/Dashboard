import React, { useState } from "react";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import './ToggleCheckbox.css'; 

function ToggleCheckbox({ onClick }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onClick();
  };

  return (
    <div onClick={handleToggle} className="checkbox-container">
      {isChecked ? (
        <FaCheckSquare className="checkbox-checked" />
      ) : (
        <FaSquare className="checkbox-unchecked" />
      )}
    </div>
  );
}

export default ToggleCheckbox;
