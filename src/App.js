import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createContext, useState, useEffect } from "react";
import Leads from "./components/Leads";
import Chat from "./components/Chat";
import LeadsHomePage from "./components/LeadsHomePage/LeadsHomePage";
import AddLeads from "./components/AddLeads/AddLeads";
import 'boxicons/css/boxicons.min.css';
import ImportFile from "./pages/ImportFile/ImportFile";
import Employees from "./components/Employees/Employees";
import Login from "./components/Login/Login";
import View from "./pages/View-LeadsHomePage/View";
import FilterModal from "./components/Filter-Modal/FilterModal";


// Context to manage global state
const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state
  const [selectedLead, setSelectedLead] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState({});


  useEffect(() => {
    // Check if the user is logged in by checking localStorage/sessionStorage
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");  
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); 
  };

  
  const handleAddLeadShow = () => {
    console.log("Add Lead Button Clicked");
    setShowAddLead(true);
  };

  const handleAddLeadClose = () => setShowAddLead(false);
  const handleImportShow = () => setShowImportModal(true);
  const handleImportClose = () => setShowImportModal(false);

  const handleFilterShow = () => setShowFilterModal(true);
  const handleFilterClose = () => setShowFilterModal(false);


  const handleOpenForm = (isEdit = false, leadData = null) => {
    setIsEditing(isEdit); 
    setInitialValues(leadData || {}); 
    handleAddLeadShow(); 
  };


  // Context values
  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    handleAddLeadShow,
    handleAddLeadClose,
    handleImportShow,
    handleImportClose,
    handleLogout,
    setSelectedLead,
    handleFilterShow,
    handleFilterClose,
    handleOpenForm

  };


  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>

          <div className="main d-flex">
            {isLoggedIn && (
              <div className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""}`}>
                <Sidebar />
              </div>
            )}

            <div className={`content ${isToggleSidebar ? "" : ""}`}>
              {isLoggedIn && <Header />}
              <Routes>
                {/* If not logged in, navigate to login page */}
                {!isLoggedIn && <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />}

                {/* Only render these routes if logged in */}
                {isLoggedIn && (
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/chats" element={<Chat />} />
                    <Route path="/leadshomepage" element={<LeadsHomePage />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/view" element={<View />} />
                  </>
                )}

                {/* Redirect to login if the user is not logged in and tries to access protected pages */}
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>

              <AddLeads
                show={showAddLead}
                handleClose={handleAddLeadClose}
                leadData={selectedLead}
                isEditing={isEditing}
                initialValues={initialValues}
              />

              <ImportFile show={showImportModal} handleClose={handleImportClose} />
              <FilterModal show={showFilterModal} handleClose={handleFilterClose} />
            </div>
          </div>

        </MyContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
export { MyContext };
