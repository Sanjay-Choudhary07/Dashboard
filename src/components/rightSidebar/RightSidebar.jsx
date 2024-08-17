import React, { useEffect, useState } from "react";
import Button from "../tabButton/TabButton";
import { useDispatch, useSelector } from "react-redux";
import { removeWidget } from "../../store/widgetSlice";
import ToggleCheckbox from "../toggleCheckbox/ToggleCheckbox";
import { toast } from 'react-toastify';
import './RightSidebar.css'; 

function RightSidebar({ isOpen, onClose, handleAddCategory }) {
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedWidget, setSelectedWidget] = useState([]);
  const [CategoryWidget, setCategoryWidget] = useState([]);
  const { widget } = useSelector((state) => state.widget);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && widget.length > 0) {
      const firstCategory = widget[0];
      setSelectedTab(firstCategory.name);
      setCategoryWidget(firstCategory.widgets);
    }
  }, [isOpen, widget]);

  const handleTabChange = (text) => {
    const categorySelected = widget.find((wt) => wt.name === text);
    if (categorySelected) {
      setCategoryWidget(categorySelected.widgets);
      setSelectedTab(categorySelected.name);
      setSelectedWidget([]);
    }
  };

  const handleSelectWidget = (wid) => {
    setSelectedWidget((prev) => {
      if (Array.isArray(prev)) {
        return [...prev, wid];
      } else {
        return [wid];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedWidget.length <= 0) {
      toast("Please Select any Widget to delete !!");
      return;
    }
    selectedWidget.forEach((widgetId) => deleteWidget(widgetId));
    toast("Selected widget Deleted Successfully !!");
    onClose();
  };

  const deleteWidget = (widgetId) => {
    dispatch(removeWidget({ categoryId: selectedTab, widgetId: widgetId }));
  };

  if (!isOpen) return null;

  return (
    <div className="left-modal-container">
      <div className="left-modal-button-container">
        {widget.map((wid) => (
          <Button
            key={wid.name}
            text={wid.name}
            selectedTab={selectedTab}
            handleClick={handleTabChange}
          />
        ))}
        <Button
          selectedTab={selectedTab}
          text={"+"}
          handleClick={handleAddCategory}
        />
      </div>

      <div className="left-modal-widget-list">
        {CategoryWidget.map((wid) => (
          <div key={wid.id} className="left-modal-widget-item">
            <ToggleCheckbox onClick={() => handleSelectWidget(wid.id)} />
            <div
              className={`left-modal-widget-text ${
                selectedWidget.includes(wid.id) ? "selected" : ""
              }`}
            >
              {wid.name}
            </div>
          </div>
        ))}
      </div>

      <div className="left-modal-footer">
        <button
          onClick={handleConfirm}
          className="left-modal-footer-button confirm"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="left-modal-footer-button cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RightSidebar;
