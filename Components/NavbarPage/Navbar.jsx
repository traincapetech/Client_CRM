import { useState, useRef, useEffect } from "react";
import "./Navbar.css"; // Import external CSS
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ForumIcon from '@mui/icons-material/Forum';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ConstructionIcon from '@mui/icons-material/Construction';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import ReorderIcon from '@mui/icons-material/Reorder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import CloseIcon from '@mui/icons-material/Close';
import NewLead from "./NewLead";
import SearchIcon from '@mui/icons-material/Search';
import GenerateLead from "../Homepage/GenerateLead";
import {Link, Navigate} from "react-router-dom"
import Filter from "../SearchDropDown/Filter";


function Navbar() {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null); // always string or null
  const [selectedOption, setSelectedOption] = useState("Pipeline");
  const dropdownWrapperRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedOption(option); // update selected option
    setSearch(option);         // also push it into search bar
    setOpenMenu(null);         // close the dropdown after selecting
  };


  // Function when search is triggered
 const handleSearch = () => {
    if (search.trim() !== "") {
     alert(`Searched word : ${search}`)
      // 🔹 Put your logic here (API call, filter, redirect, etc.)
    }
  };

  //for make the button toggle
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownWrapperRef.current &&
        !dropdownWrapperRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // to make the first icon selected default 
  const [active, setActive] = useState("kanban");
  const getClass = (name) =>
    `icon-btn ${active === name ? "active" : ""}`;

  // For handling the Search button while enter press search start searching 
   const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

   const [openLead, setOpenLead] = useState(false);

  return (
    <div className="navbar" ref={dropdownWrapperRef}>
      {/* Left Section - Logo + Menu */}
      <div className="navbar-left">
        <div className="navbar-left-top">
          {/* Logo */}
          <div className="logo">
            <div className="logo-box"></div>
            
            <span className="logo-text"><Link to={"/home"}>CRM</Link></span>
          </div>

          {/* Menu Items */}
          <nav className="menu">
            {/* Sales */}
            <span
              onMouseEnter={() => setOpenMenu("sales")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                onClick={() =>
                  setOpenMenu(openMenu === "sales" ? null : "sales")
                }
                className="sale-btn"
              >
                Sales
              </button>
              {openMenu === "sales" && (
                <div className="dropdown-menu-sales">
                  <div className="dropdown-item" onClick={() => handleSelect("Pipeline")}> <Link to={"/pipeline"}>Pipeline</Link> </div>
                  <div className="dropdown-item" onClick={() => handleSelect("My Activity")}> <Link> My Activity </Link></div>
                  <div className="dropdown-item" onClick={() => handleSelect("Lead")}> <Link>Lead</Link></div>
                  <div className="dropdown-item" onClick={() => handleSelect("Customers")}> <Link> Customers </Link> </div>
                </div>
              )}
            </span>

            {/* Report */}
            <span
              onMouseEnter={() => setOpenMenu("report")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                onClick={() =>
                  setOpenMenu(openMenu === "report" ? null : "report")
                }
                className="report-btn"
              >
                Reporting
              </button>
              {openMenu === "report" && (
                <div className="dropdown-menu-report">
                  <div className="dropdown-item" onClick={() => handleSelect("Forecast")}> <Link>Forecast</Link> </div>
                  <div className="dropdown-item" onClick={() => handleSelect("Pipeline")}> <Link>Pipeline</Link> </div>
                  <div className="dropdown-item" onClick={() => handleSelect("Lead")}> <Link>Lead</Link> </div>
                  <div className="dropdown-item" onClick={() => handleSelect("My Activity")}> <Link> My Activity </Link></div>
                </div>
              )}
            </span>

            {/* Configuration */}
            <span
              onMouseEnter={() => setOpenMenu("configuration")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                onClick={() =>
                  setOpenMenu(openMenu === "configuration" ? null : "configuration")
                }
                className="configuration-btn"
              >
                Configuration
              </button>
              {openMenu === "configuration" && (
                <div className="dropdown-menu-configuration">
                  <div className="dropdown-item"> <Link>Setting</Link> </div>
                  <div className="dropdown-item"><Link>Sales team</Link></div>
                  <div className="dropdown-item"><b>Activities</b></div>
                  <div className="dropdown-item"> <Link>Activity Types</Link> </div>
                  <div className="dropdown-item"><Link>Activity Types</Link></div>
                  <div className="dropdown-item"><b>Pipeline</b></div>
                  <div className="dropdown-item"> <Link>Tags</Link> </div>
                  <div className="dropdown-item"><Link>Lost Reasons</Link></div>
                  <div className="dropdown-item"><b>Lead Generation</b></div>
                  <div className="dropdown-item"><Link>Lead Mining Request</Link></div>
                </div>
              )}
            </span>
          </nav>
        </div>

        {/* Buttons */}
        <div className="navbar-left-bottom">
          <div className="actions">
            <button
              className="new-lead-btn"
              onClick={() => setOpenMenu(openMenu === "newLead" ? null : "newLead")}
            >
              New
            </button>
            {openMenu === "newLead" && <NewLead />}

            <button className="generate-lead"  onClick={() => setOpenLead(true)}>Generate Leads</button>
            <GenerateLead isOpen={openLead} onClose={() => setOpenLead(false)} />
            <span className="selected-field">
              {selectedOption ? selectedOption : "pipeline "}
            </span>

            <button
              onClick={() => toggleMenu("setting")}
              className="setting-icon"
              title="Action"
            >
              <SettingsIcon fontSize="small" />
            </button>
            {openMenu === "setting" && (
              <div className="dropdown-menu-setting">
                <div className="dropdown-item"><FileUploadIcon /> Import</div>
                <div className="dropdown-item"><GetAppIcon /> Export</div>
                <div className="dropdown-item"><CameraAltIcon /> Import Bussiness Card</div>
                <hr />
                <div className="dropdown-item"><BorderStyleIcon /> Spreadsheet</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Center - Search */}
      <div className="search-bar">
         {/* 🔍 Search Button */}
        <button 
        title="Search"
          className="search-btn"
          onClick={(handleSearch)}
        >
          <SearchIcon />
        </button>
        {selectedOption && (
          <button className="filter-btn">
            {selectedOption}
            <CloseIcon
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOption(null); // remove selected option
              }}
            />
          </button>
        )}
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
           onKeyDown={handleKeyDown}
        />
        <button onClick={() => toggleMenu("filter")} className="filter-btn">
          <ArrowDropDownIcon />
        </button>
       

        {openMenu === "filter" && <Filter/>}
      </div>

      {/* Right Section - Icons */}
      <div className="navbar-right">
        <div className="navbar-right-top">
          <span className="notif">
            <ForumIcon />
            <span className="badge">4</span>
          </span>
          <span><QueryBuilderIcon /> </span>
          <span><ConstructionIcon /></span>
          <span>TTTT</span>
          <button className="avatar">A</button>
        </div>

        <div className="navbar-right-bottom">
          <span title="kanban" className={getClass("kanban")} onClick={() => setActive("kanban")}>
            <ViewKanbanIcon />
          </span>
          <span title="list" className={getClass("list")} onClick={() => setActive("list")}>
            <ReorderIcon />
          </span>
          <span
            title="calender"
            className={getClass("calendar")}
            onClick={() => setActive("calendar")}
          >
            <CalendarMonthIcon />
          </span>
          <span
            title="pivot"
            className={getClass("pivot")}
            onClick={() => setActive("pivot")}
          >
            <PivotTableChartIcon />
          </span>
          <span
            title="Areachart"
            className={getClass("areaChart")}
            onClick={() => setActive("areaChart")}
          >
            <AreaChartIcon />
          </span>
          <span
            title="location"
            className={getClass("location")}
            onClick={() => setActive("location")}
          >
            <LocationOnIcon />
          </span>
          <span
            title="Activity"
            className={getClass("activity")}
            onClick={() => setActive("activity")}
          >
            <AccessTimeIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
