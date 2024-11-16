import React, { useContext, useEffect, useRef, useState } from "react";
import "./leadshomepage.css";
import { IoSearchSharp } from "react-icons/io5";
import { MdFilterListAlt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaEllipsisV, FaListUl } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { MyContext } from "../../App"; // Import the context
import * as XLSX from "xlsx"; // Import SheetJS for exporting data to Excel
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faFileArrowUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"; // Import the icon
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import { GrFormView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads } from "../../redux/leadsSlice";

function LeadsHomePage() {
  const { handleAddLeadShow, handleImportShow, setSelectedLead, handleFilterShow, handleOpenForm } = useContext(MyContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalLeads, setTotalLeads] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [loading1, setLoading] = useState(false);
  const [durationOption, setDurationOption] = useState(""); // State for selected duration option
  const [startDate, setStartDate] = useState(null); // State for start date
  const [endDate, setEndDate] = useState(null); // State for end date
  const [isCustomRange, setIsCustomRange] = useState(false); // State to toggle custom range
  const [progress, setProgress] = React.useState(0);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchText, setSearchText] = useState('')

  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  


  const handleViewClick = (Id) => {

    const selectedLead = filteredLeads.find(lead => lead.Id === Id);


    if (selectedLead) {
      // Navigate to the view component with lead details as state
      navigate('/view', { state: { leadDetails: selectedLead } });
    }
  }


  const handleViewClick2 = (Id, event) => {
    event.preventDefault();
    const selectedLead = filteredLeads.find(lead => lead.Id === Id);

    setActiveDropdown(null);
    if (selectedLead) {
      // Navigate to the view component with lead details as state
      navigate('/view', { state: { leadDetails: selectedLead } });
    }
  }

  const handleAddLeadsClick = () => {
    handleOpenForm(false);
  };

  const handleFilterClick = () => {
    if (handleFilterShow) {
      handleFilterShow();
    }
    else {
      console.error("handleFilterShow function is not available in context");
    }
  }

  const handleImportClick = () => {
    if (handleImportShow) {
      handleImportShow();
    } else {
      console.error("handleImportShow function is not available in context");
    }
  };

  

  const handleEditClick = async (id) => {
    const leadToEdit = filteredLeads.find((lead) => lead.id === id || lead.Id === id);
    setSelectedLead(leadToEdit); 
    setActiveDropdown(null);
    if (leadToEdit) {
     
      handleOpenForm(true, leadToEdit); // Open AddLeads modal
    }
  };


  const handleExportToExcel = () => {
    // Select the table element
    const table = document.querySelector("table");

    // Convert the table into a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(table);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    // Generate the Excel file and download it
    XLSX.writeFile(workbook, "leads_export.xlsx");
  };


  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  const getFilteredLeads = () => {

    if (searchText.trim() === '') return filteredLeads
    return filteredLeads.filter((leads) =>
      leads.FullName.toLowerCase().includes(searchText.toLowerCase()) ||
      leads.Email.toLowerCase().includes(searchText.toLowerCase()) ||
      leads.PhoneNumber.toLowerCase().includes(searchText.toLowerCase())
    )
  }
  const searchFilteredLeads = getFilteredLeads();

  const getPaginatedLeads = () => {
    
    const startIndex = (currentPage - 1) * pageSize;
    return searchFilteredLeads.slice(startIndex, startIndex + pageSize);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when page size is changed
  };

  const toggleDropdown = (index) => {
    console.log(`Toggling dropdown at index: ${index}`);
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up to the document

  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      console.log("Clicked outside dropdown, closing dropdown.");
      setActiveDropdown(null);
    }
  };


  const handleDurationChange = (event) => {
    const selectedOption = event.target.value;
    setDurationOption(selectedOption);

    if (selectedOption === "custom") {
      setIsCustomRange(true);
      setStartDate(null); // Reset start date
      setEndDate(null);   // Reset end date
      setIsCalendarVisible(true); // Show calendar for custom date selection
      setLoading(false);
    } else {
      setIsCustomRange(false);
      setIsCalendarVisible(false); // Hide calendar for preset options
      handlePresetRange(selectedOption); // Set dates based on preset option
      setLoading(true);
    }
  };



  const handlePresetRange = (option) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    let start = null;
    let end = today;

    switch (option) {
      case "today":
        start = today;
        end = endOfDay;
        break;
      case "last30":
        start = new Date(today);
        start.setDate(today.getDate() - 30);
        break;
      case "thisMonth":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case "lastMonth":
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        break;
      case "last90":
        start = new Date(today);
        start.setDate(today.getDate() - 90);
        break;
      case "last6Months":
        start = new Date(today);
        start.setMonth(today.getMonth() - 6);
        break;
      case "last1Year":
        start = new Date(today);
        start.setFullYear(today.getFullYear() - 1);
        break;
      default:
        break;
    }

    setStartDate(start);
    setEndDate(end);
    setLoading(false);
  };



  const handleStartDateChange = (date) => {
    setStartDate(date);


    if (date && endDate) {
      setIsCustomRange(false);
      setLoading(true);
      setIsCalendarVisible(false);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    // Hide calendar after selecting end date

    if (startDate && date) {
      setIsCustomRange(false); // Disable custom range if both dates are set
      setLoading(true);
      setIsCalendarVisible(false);
    }
  };

  const capitalizeName = (name) => {
    return name
      .split(' ') // Split the name into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
      .join(' '); // Join the words back together
  };

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);




  useEffect(() => {
    setLoading(true);
    console.log("Redux response received", leads)

    if (leads.length > 0) {
      let filteredData = [...leads];

      if (startDate && endDate) {
        filteredData = filteredData.filter((lead) => {
          const leadDate = new Date(lead.CreatedTime)

          if (isNaN(leadDate)) {
            console.warn(`Invalid date format for lead:`, lead.CreatedTime);
            return false; // Skip leads with invalid dates
          }

          if (startDate.getTime() === endDate.getTime()) {
            // If start and end dates are the same, filter for that specific date
            return leadDate.toDateString() === startDate.toDateString();
          } else {
            return (
              leadDate.getTime() >= startDate.getTime() &&
              leadDate.getTime() <= endDate.getTime()
            );
          }
        });
      }

      filteredData.sort((a, b) => new Date(b.CreatedTime).getTime() - new Date(a.CreatedTime).getTime());
      console.log(filteredData)
      setFilteredLeads(filteredData);
      setTotalLeads(filteredData.length);
      setLoading(false);

    }

  }, [leads, startDate, endDate]);



  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const displayedLeadsCount = searchFilteredLeads.length;
  const totalPages = Math.ceil(totalLeads / pageSize);

  const getPaginationRange = () => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 3);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <>
      <div className="leads-homepage container-fluid" id="leads-homepage">
        <div className="date-search">
          <p>Duration</p>
          <div className="d-flex date-select">
            <select
              className="form-control mr-sm-2 mt-1"
              onChange={handleDurationChange}
              value={durationOption}

            >
              <option value="">Select Duration</option>
              <option value="today">Today</option>
              <option value="last30">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="last90">Last 90 Days</option>
              <option value="last6Months">Last 6 Months</option>
              <option value="last1Year">Last 1 Year</option>
              <option value="custom">Custom Range</option>
            </select>

            {isCustomRange && (
              <div className="custom-range d-flex align-items-center ml-2 position-relative">
                <div className="calendar-container d-flex" id="km" style={{
                  position: 'relative',
                  top: '160px', zIndex: '99'
                }}
                >
                  <div className="calendar-box">
                    <p>Start Date</p>
                    <Calendar
                      value={startDate}
                      onChange={handleStartDateChange}
                      maxDate={endDate} // Set the max date to be the end date
                    />
                  </div>
                  <div className="calendar-box">
                    <p>End Date</p>
                    <Calendar
                      value={endDate}
                      onChange={handleEndDateChange}
                      minDate={startDate} // Set the min date to be the start date
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="type-search" id="type-search">
          <p className="flex-item1">Type</p>
          <div className="select-li flex-item1">
            <select name="cars" id="cars">
              <option value="volvo">All</option>
              <option value="saab">Leads</option>
              <option value="mercedes">Client</option>
            </select>
          </div>
        </div>

        <div className="status-search" id="status-search">
          <div className="search-bar">
            <div className="icon-search">
              <IoSearchSharp />
            </div>
            <input
              type="text"
              className="form-control f-14 p-1 border-additional-grey"
              id="search-text-field"
              placeholder="Start typing to search"
              autoComplete="off"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div
          className="filter-div ml-auto d-flex align-items-center"
          id="filter-div"
        >
          <div className="">
            <button className="filter" onClick={handleFilterClick}><MdFilterListAlt className="filter-icon  " />

              Filter</button>

          </div>
        </div>
      </div>

      <div className="container-fluid table-div">
        <div className="row ">
          <div className="col-md-8 col-10">
            <ul className="leads-buttons">
              <li>
                {/* Trigger the Add Leads Offcanvas */}
                <button
                  className="btn btn-primary"
                  onClick={handleAddLeadsClick}
                >
                  <FontAwesomeIcon icon={faPlus} id="add-icon" />
                  ADD Leads
                </button>
              </li>
              <li>
                <button className="btn btn-primary" onClick={handleImportClick}>
                  <FontAwesomeIcon icon={faFileArrowUp} id="import-icon" />
                  Import
                </button>
              </li>
              <li>
                <button
                  className="btn btn-primary"
                  onClick={handleExportToExcel}
                >
                  <FontAwesomeIcon icon={faFileArrowDown} id="export-icon" />
                  Export
                </button>
              </li>
            </ul>
          </div>

          <div className="col-md-4 col-2">
            <ul className="icon-right">
              <li className="icons-together">
                <Link to="/leadshomepage" className="pagal">
                  <button className="btn btn-primary">
                    <FaListUl />
                  </button>
                </Link>
                <Link to="/leads" className="pagal">
                  <button className="btn btn-primary">
                    <FaChartBar />
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>


        {loading1 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', top: '50vh' }}>
            <Stack spacing={2} direction="row">

              <CircularProgress variant="determinate" value={progress} />
            </Stack> 
          </div>
        ) : (

          <div className="container-fluid table-leads ">
            <div className="table-responsive1">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact Details</th>
                    {/* <th scope="col">Created</th> */}
                    <th scope="col">Next Follow Up</th>
                    <th scope="col">Lead Agent/Lead Source</th>
                    <th scope="col">Stage</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedLeads().map((lead, index) => (
                    <tr key={lead.Id || index}>
                      <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
                      <td><Link

                        className="name-anchor"
                        onClick={(event) => handleViewClick2(lead.Id, event)}
                      >
                        {capitalizeName(lead.FullName)}
                      </Link>
                        <br />
                        <span className="lead-campaignname">{lead.CampaignName}</span>

                      </td>

                      <td>
                        {lead.Email ? (
                          <a className="email-anchor" href={`mailto:${lead.Email}`}>{lead.Email}</a>
                        ) : (
                          "------"
                        )}<br />
                        {lead.PhoneNumber
                          ? lead.PhoneNumber.replace(/^p:/, '') // Removes "p:" prefix
                            .replace(/\D/g, '')              // Removes all non-digit characters
                            .replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3')  // Formats the number
                          : "------"}
                      </td>


                      {/* <td>
                        {new Date(lead.CreatedTime).toLocaleString('en-GB', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false, // Set to true for 12-hour format
                        })}
                      </td> */}

                      <td>{lead.AllowFollowUp ? "Yes" : "No"}</td>
                      <td>{lead.agent ? lead.agent : lead.Platform}</td>
                      <td >
                        <select className='select-filter'>
                          <option>Pending Quotation</option>
                          <option>Not Interested</option>
                          <option>Interested</option>
                          <option>Data</option>
                          <option> Meeting</option>
                          <option>Quotation Send</option>
                          <option>Quotation Win</option>
                          <option>Quotation Loss</option>
                          <option>No Answer</option>
                        </select>
                      </td>
                      <td>
                        <div style={{ position: "relative" }}> {/* Add relative positioning */}
                          <div
                            className="btn1 btn-link p-0"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event from bubbling up
                              toggleDropdown(index);
                            }}
                          >
                            <FaEllipsisV />
                          </div>
                          {activeDropdown === index && (
                            <div
                              ref={dropdownRef}
                              className="dropdown-menu show"
                              style={{
                                top: "100%",
                                right: 0,
                                zIndex: 20000,
                              }}
                              onClick={handleDropdownClick}
                            >
                              <button className="dropdown-item btn-warning btn-sm" onClick={() => handleViewClick(lead.Id)}>
                                <GrFormView className="ic-view1" /> &nbsp;
                                View
                              </button>
                              <button className="dropdown-item btn-warning btn-sm" onClick={() => handleEditClick(lead.Id)}>
                                <FaEdit className="ic-view2" /> &nbsp;
                                Edit
                              </button>
                              <button className="dropdown-item btn-danger btn-sm">
                                <RiDeleteBinFill className="ic-view3" /> &nbsp;
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row ">
              <div className="flex-grow-1">
                <div className="dataTables_length" id="leads-table_length">
                  <label>Show</label>
                  <select
                    name="leads-table_length"
                    aria-controls="leads-table"
                    className="custom-select custom-select-sm form-control form-control-sm"
                    onChange={handlePageSizeChange}
                    value={pageSize}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>{" "}
                  <label>entries</label>
                </div>
              </div>
              <div>
                <div
                  className="dataTables_info"
                  id="leads-table_info"
                  role="status"
                  aria-live="polite"
                >
                  Showing {(currentPage - 1) * pageSize + 1} to{" "}
                  {Math.min(currentPage * pageSize, displayedLeadsCount)} of {displayedLeadsCount} entries (out of {totalLeads} total)
                </div>
              </div>
              <div>
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="leads-table_paginate"
                >
                  <ul className="pagination">
                    <li className={`paginate_button page-item previous ${currentPage === 1 ? "disabled" : ""}`}>

                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="page-link"
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {/* Pagination numbers */}
                    {getPaginationRange().map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`paginate_button page-item ${currentPage === pageNumber ? "active" : ""}`}
                      >
                        <button
                          onClick={() => handlePageChange(pageNumber)}
                          className="page-link"
                        >
                          {pageNumber}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`paginate_button page-item next ${currentPage === totalPages ? "disabled" : ""}`}
                    >
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="page-link"
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LeadsHomePage;
