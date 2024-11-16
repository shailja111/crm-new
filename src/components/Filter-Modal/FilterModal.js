import React, { useState } from 'react';
import './FilterModal.css';

function FilterModal({ show, handleClose }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleExit = () => {
    setIsExiting(true); // Start exit animation
    setTimeout(() => {
      handleClose(); // Call handleClose after animation duration
      setIsExiting(false); // Reset the exit state
    }, 400); // Match this with the animation duration
  };

  if (!show && !isExiting) {
    return null;
  }

  return (
    <div className={`modalWrapperFilter ${isExiting ? 'exiting' : ''}`}>
      <div className="modalContainerFilter">
        <div className="modalFilter drawer right-align">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Filter</h5>
              <button type="button" className="btnCloseFilter" onClick={handleExit}>
                &times;
              </button>
            </div>
            <div className='more-filter-items'>
              <label>Date Filter On</label>
              <select className='select-filter'>
                <option>Created </option>
                <option>Updated On</option>
              </select>
            </div>

            <div className='more-filter-items'>
              <label>Deal Stage</label>
              <select className='select-filter'>
                <option>Generated </option>
                <option>Qualified</option>
              </select>
            </div>

            <div className='more-filter-items'>
              <label>Agent</label>
              <select className='select-filter'>
                <option>Generated </option>
                <option>Qualified</option>
              </select>
            </div>

            <div className='more-filter-items'>
              <label>Lead</label>
              <select className='select-filter'>
                <option>Generated </option>
                <option>Qualified</option>
              </select>
            </div>
            {/* <div className="modal-body">
              <p>...</p>
            </div> */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleExit}>Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
