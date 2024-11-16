import React, { useEffect, useState } from "react";
import "./AddLeads.css";
import LeadForm from "../LeadForm/LeadForm";

function AddLeads({ show, handleClose, isEditing, initialValues }) {
  const [isExiting, setIsExiting] = useState(false);
  

 

  


  const handleExit = () => {
    setIsExiting(true); 
    setTimeout(() => {
      handleClose(); 
      setIsExiting(false); 
    }, 400); 
  };

  if (!show && !isExiting) {
    return null;
  }

  
  return (
    <div className={`modalWrapperleads ${isExiting ? "exiting" : ""}`}>
      <div className="modalContainerleads">
        <div>
          <button onClick={handleExit} className="btnCloseleads ">
            &times;
          </button>
        </div> 

        <div className="modalleads">
        <LeadForm leadData={initialValues} isEditing={isEditing} />
        </div>
      </div>
    </div>
  );
}

export default AddLeads;
