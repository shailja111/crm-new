// src/components/Toaster.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './Toaster.css';
import 'react-toastify/dist/ReactToastify.css';

// Functions to trigger toasts
const triggerSuccess = () => {
  toast.success("Operation Successful!", {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
  });
};

const triggerError = () => {
  toast.error("Something went wrong. Please try again.", {
    position: "top-right",
    autoClose: 3000,
  });
};

const triggerInfo = () => {
  toast.info("Here is some information.", {
    position: "top-right",
    autoClose: 2000,
  });
};

const triggerCustomHTML = () => {
  toast(<div>Custom HTML content</div>, {
    position: "top-right",
    autoClose: 4000,
    className: 'custom-toast',
  });
};

const triggerCustomMessage = () => {
  toast("This is a custom toast.", {
    className: 'custom-toast',
    position: "top-right",
  });
};

// Toaster component that renders the ToastContainer
const Toaster = () => {
  return (
    <>
      {/* ToastContainer will hold and manage the toasts */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </>
  );
};

// Export the trigger functions so they can be used in other parts of the app
export const useToasts = () => {
  return {
    triggerSuccess,
    triggerError,
    triggerInfo,
    triggerCustomHTML,
    triggerCustomMessage,
  };
};

export default Toaster;
