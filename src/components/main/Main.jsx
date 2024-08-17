import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, addWidget } from "../../store/widgetSlice";
import Card from "../card/Card";
import Modal from "../addWidgetModal/AddWidgetModal"; 
import Sidebar from "../rightSidebar/RightSidebar";
import { toast } from 'react-toastify';
import './Main.css'; 

function Main() {
  const dispatch = useDispatch();
  const { widget: widgetData } = useSelector((state) => state.widget);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [widgetCategory, setWidgetCategory] = useState("");
  const [isEditable, setIsEditable] = useState(true);

  const openSideBar = () => {
    setSideBarOpen(true);
  };

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setWidgetName("");
    setWidgetText("");
    setWidgetCategory("");
    setIsEditable(true);
  };

  const openAddWidgetModal = (categoryName) => {
    setWidgetCategory(categoryName);
    setIsModalOpen(true);
    setIsEditable(false);
  };

  const saveWidget = () => {
    const existingCategory = widgetData.find(
      (category) => category.name === widgetCategory
    );
    if (existingCategory) {
      dispatch(
        addWidget({
          categoryName: existingCategory.name,
          widget: { name: widgetName, text: widgetText },
        })
      );
    } else {
      dispatch(addCategory({ name: widgetCategory }));
      dispatch(
        addWidget({
          categoryName: widgetCategory,
          widget: { name: widgetName, text: widgetText },
        })
      );
    }

    closeModal();
    toast("Widget Saved !!");
  };

  return (
    <div className="main-container">
      <div className="main-header">
        <h1 className="main-title">CNAPP DASHBOARD</h1>
        <button
          onClick={openSideBar}
          className="main-button"
        >
          + Add Category
        </button>
        <Sidebar
          isOpen={sideBarOpen}
          onClose={closeSideBar}
          handleAddCategory={handleAddCategory}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={saveWidget}
          title="Add Widget"
        >
          <input
            id="widget-category"
            type="text"
            placeholder="Widget Category"
            className="border border-gray-300 p-2 mb-4 w-full rounded"
            value={widgetCategory}
            readOnly={!isEditable}
            onChange={(e) => setWidgetCategory(e.target.value)}
          />
          <input
            id="widget-name"
            type="text"
            placeholder="Widget Name"
            className="border border-gray-300 p-2 mb-4 w-full rounded"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
          />
          <textarea
            id="widget-text"
            placeholder="Widget Text"
            className="border border-gray-300 p-2 mb-4 w-full rounded"
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
          ></textarea>
        </Modal>
      </div>
      <div className="widget-container">
        {widgetData.map((widget, index) => (
          <Card
            key={index}
            category={widget.name}
            widget={widget.widgets}
            openAddWidgetModal={openAddWidgetModal}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;

