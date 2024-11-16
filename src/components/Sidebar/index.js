import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { RxDashboard } from 'react-icons/rx';
import { FaAngleRight } from 'react-icons/fa';
import { BsChatSquareDots } from 'react-icons/bs';
import { SiGoogleadsense } from 'react-icons/si';
import { MdEditCalendar } from 'react-icons/md';
import { GrApps } from 'react-icons/gr';
import { BsPeople } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './style.css';
import { MyContext } from '../../App';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(null); // Set to null initially
    const [isMobile, setIsMobile] = useState(false);

    const context = useContext(MyContext)

    const toggleSubmenu = (index) => {
        setActiveTab(activeTab === index ? null : index); // Toggle the active tab or close it
    };


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
        };
        
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const closeSidebar = () => {
        if (isMobile) {
            context.setIsToggleSidebar(false); // Assuming `setSidebarOpen` in MyContext to control sidebar visibility
        }
    };


    return (
        <div className={`sidebar ${isMobile ? 'mobile' : ''}`}>
            <ul>
                <li>
                    {/* Logo Wrapper */}
                    <div className="d-flex  part1">
                            <Link to="/" className="d-flex align-items-center logo">
                                {/* <img src={logo} alt="logo" /> */}
                                <span className="ms-2 text-center">MASS-CRM</span>
                            </Link>
                        </div>
                </li>
                <li>
                    <Link to="/dashboard" onClick={closeSidebar}>
                        <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`}  onClick={() => toggleSubmenu(0)}>
                            <span className="icon">
                                <RxDashboard />
                            </span>
                            Dashboard
                            
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/leadshomepage" onClick={closeSidebar}>
                        <Button className={`w-100 ${activeTab === 1 ? 'active' : ''}`}  onClick={() => toggleSubmenu(1)}>
                            <span className="icon">
                                <SiGoogleadsense />
                            </span>
                            Leads
                            
                        </Button>
                    </Link>
                </li>


                {/* <li>

                     <Button
                        className={`w-100 ${activeTab === 2 ? 'active' : ''}`}
                        onClick={() => toggleSubmenu(2)}
                    >
                        <span className="icon"><BsPeople /></span>
                        HR
                        <span className="arrow"><FaAngleRight /></span>
                    </Button>
                    {activeTab === 2 && (
                        <div className="submenuWrapper">
                            <ul className="submenu">
                                <li>
                                    <Link to="/employees" onClick={closeSidebar}>Employees</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    
                </li> */}

                <li>
                    <Link to="/chats" onClick={closeSidebar}>
                        <Button className={`w-100 ${activeTab === 3 ? 'active' : ''}`}  onClick={() => toggleSubmenu(3)}>
                            <span className="icon">
                                <BsChatSquareDots />
                            </span>
                            Chats
                           
                        </Button>
                    </Link>
                </li>

                <li>
                   
                    <Button
                        className={`w-100 ${activeTab === 4 ? 'active' : ''}`}
                        onClick={() => toggleSubmenu(4)}
                    >
                        <span className="icon">
                            <GrApps />
                        </span>
                        Apps
                        <span className="arrow">
                            <FaAngleRight />
                        </span>
                    </Button>
                    <div
                        className={`submenuWrapper ${
                            activeTab === 4 ? 'colapse' : 'colapsed'
                        }`}
                    >
                        <ul className="submenu">
                            <li>
                                <Link to="/whatsapp" onClick={closeSidebar}>WhatsApp</Link>
                            </li>
                            <li>
                                <Link to="/facebook" onClick={closeSidebar}>Facebook</Link>
                            </li>
                        </ul>
                    </div>
                    
                </li>

                <li>
                    <Link to="/calendar" onClick={closeSidebar}>
                        <Button className={`w-100 ${activeTab === 5 ? 'active' : ''}`}  onClick={() => toggleSubmenu(5)}>
                            <span className="icon">
                                <MdEditCalendar />
                            </span>
                            Calendar
                            <span className="arrow">
                                <FaAngleRight />
                            </span>
                        </Button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
