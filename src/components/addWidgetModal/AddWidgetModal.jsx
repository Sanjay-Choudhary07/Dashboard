import React from "react";
import './AddWidgetModal.css'; 
function AddWidgetModal({ isOpen, onClose, onSave, children, title }) {
  if (!isOpen) return null;

  return (
    <div id="widget-modal" className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">{title}</h3>
        {children}
        <div className="modal-footer">
          <button
            onClick={onSave}
            className="modal-button-save"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="modal-button-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddWidgetModal;
