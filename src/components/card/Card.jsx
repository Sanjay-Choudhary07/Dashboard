import React from "react";
import { useDispatch } from "react-redux";
import { removeWidget, deleteCategory } from "../../store/widgetSlice";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';
import './Card.css'; 

function Card({ category, widget, openAddWidgetModal }) {
  const dispatch = useDispatch();

  const handleDelete = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
    toast("Widget Deleted Successfully !!");
  };

  const handleDeleteCategory = (categoryName) => {
    dispatch(deleteCategory({ categoryName }));
    toast("Category Deleted Successfully !!");
  };

  return (
    <div className="card-container">
      <h1 className="card-header">
        <div className="card-header-content">
          <div>{category}</div>
          <div
            className="card-header-title"
            onClick={() => handleDeleteCategory(category)}
          >
            <AiOutlineClose size={20} />
          </div>
        </div>
      </h1>
      <div className="card-widget-container">
        {widget.map((wid) => (
          <div key={wid.id} className="card-widget">
            <button
              className="card-widget-delete-button"
              onClick={() => handleDelete(category, wid.id)}
            >
              <AiOutlineClose size={20} />
            </button>
            <h2 className="card-widget-title">{wid.name}</h2>
            <p className="card-widget-text">{wid.text}</p>
          </div>
        ))}
        <div className="card-add-widget">
          <button
            className="card-add-widget-button"
            onClick={() => openAddWidgetModal(category)}
          >
            + Add Widget
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
