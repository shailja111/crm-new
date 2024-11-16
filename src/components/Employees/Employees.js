import React, { useEffect, useState } from 'react';
import './Employees.css';
import Select, { components } from 'react-select';
import { IoSearchSharp } from "react-icons/io5";

function Employees() {
    // State to store selected employee
    const [employee, setEmployee] = useState('');
    const [designation, setDesignation] = useState('');
    const [employeeWidth, setEmployeeWidth] = useState('150px');
    const [designationWidth, setDesignationWidth] = useState('150px');

    // Handle change in dropdown selection
    const handleEmployeeChange = (selectedOption) => {
        setEmployee(selectedOption ? selectedOption.value : '');
        console.log('Selected value: ', selectedOption ? selectedOption.value : ''); // Log the selected value
    };


    const handleDesignationChange = (selectedOption) => {
        setDesignation(selectedOption ? selectedOption.value : '');
        console.log('Selected designation: ', selectedOption ? selectedOption.value : ''); // Log the selected designation
    };

    // Define options for the dropdown
    const employeeOptions = [
        { value: "0", label: "All" },
        { value: "1", label: "Hyderabad" },
        { value: "2", label: "Vizag" },
        { value: "3", label: "Kochi" },
        { value: "4", label: "Anantapur" },
        { value: "5", label: "Dharmavaram" },
        { value: "6", label: "Bengaluru" },
        { value: "7", label: "Lucknow" },
        { value: "8", label: "Madurai" }
    ];

    const employeeDesignation = [
        { value: "0", label: "All" },
        { value: "1", label: "Trainee" },
        { value: "2", label: "Junior" },
        { value: "3", label: "Senior" },
        { value: "4", label: "Team Lead" },
        { value: "5", label: "Project Manager" },
    ]

    const CustomMenuList = (props) => {
        const { children, innerRef, innerProps } = props;
        return (
            <components.MenuList {...props} innerRef={innerRef} innerProps={innerProps}>
                {children}
                <div style={{ padding: '10px', color: 'gray', fontStyle: 'italic' }}>
                    Search
                </div>
            </components.MenuList>
        );
    };
    const getDynamicWidth = (label) => {
        const length = label ? label.length : 'All'.length;
        return `${Math.max(150, length * 10)}px`; // Set minimum width to 150px, scale the width with content length
    };

    useEffect(() => {
        if (employee) {
            const selectedLabel = employeeOptions.find(option => option.value === employee)?.label;
            setEmployeeWidth(getDynamicWidth(selectedLabel));
        }
    }, [employee]); // Update width when employee selection changes

    useEffect(() => {
        if (designation) {
            const selectedLabel = employeeDesignation.find(option => option.value === designation)?.label;
            setDesignationWidth(getDynamicWidth(selectedLabel));
        }
    }, [designation]); // Update width when designation selection changes

    return (
        <div className='container-fluid employees'>
            <div className='row'>
                <div className='col-md-3 outline '>
                    <div className='d-flex '>
                    <label className='mt-2 mr-1'> Employee &nbsp;</label>
                    {/* Use react-select for the dropdown */}
                    <Select
                        id="SelExample"
                        value={employee ? { value: employee, label: employeeOptions.find(option => option.value === employee)?.label } : null}
                        options={employeeOptions}
                        onChange={handleEmployeeChange}
                        placeholder="All"
                        components={{ MenuList: CustomMenuList }} // Use custom MenuList for adding "Search"
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: employeeWidth, // Dynamically set width based on the selected label
                            }),
                            menu: (base) => ({
                                ...base,
                                width: '200px', // Fixed width for the dropdown menu
                            })
                        }}
                        className='mt-1'
                    />
                    </div>
                    
                </div>
                <div className='col-md-3 outline '>
                    <div className='d-flex'>
                    <label className='mt-2 mr-1'> &nbsp;&nbsp;Designation &nbsp;</label>
                    {/* Use react-select for the dropdown */}
                    <Select
                        id="designationSelect"
                        value={designation ? { value: designation, label: employeeDesignation.find(option => option.value === designation)?.label } : null}
                        options={employeeDesignation}
                        onChange={handleDesignationChange}
                        placeholder="All"
                        components={{ MenuList: CustomMenuList }}  // Use custom MenuList for adding "Search"
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: designationWidth, // Dynamically set width based on the selected label
                            }),
                            menu: (base) => ({
                                ...base,
                                width: '250px', // Fixed width for the dropdown menu
                            })
                        }}
                        className='mt-1'
                    />
                    </div>
                    
                </div>
                <div className='col-md-3'>
                <div className="status-search" id="status-search">
          <div className="search-bar">
            <div className="icon-employee-search">
              <IoSearchSharp />
            </div>
            <input
              type="text"
              className="form-control f-14 p-1 border-additional-grey"
              id="search-text-field"
              placeholder="Start typing to search"
              autoComplete="off"
            />
          </div>
        </div>
                </div>
                <div className='col-md-4'></div>
                <div className='col-md-1'></div>
            </div>
        </div>
    );
}












export default Employees;
