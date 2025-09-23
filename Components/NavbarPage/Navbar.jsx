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
import { Link, Navigate, useNavigate } from "react-router-dom"
import Filter from "../SearchDropDown/Filter";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EditIcon from '@mui/icons-material/Edit';
import FilterSelectedComponent from "../FilterSelectComponent/FilterSelectedComponent";
import { useContext } from "react";
import { LeadContext } from "../../leadProvider/LeadContext"


function Navbar() {
    const { addLead } = useContext(LeadContext);
  const [openNewLead, setOpenNewLead] = useState(false);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null); // always string or null
  const [selectedOption, setSelectedOption] = useState("Pipeline");
  const dropdownWrapperRef = useRef(null);
  const [hoverFilterIcon, sethoverFilterIcon] = useState(false)
  // const [openFilter, setopenFilter] = useState(false)
  const [openLead, setOpenLead] = useState(false);
  const [UserProfile, setUserProfile] = useState(false)


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


  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Get first letter from firstName
  const firstLetter = user?.firstName ? user.firstName.charAt(0).toUpperCase() : "";
  const OrganizationName = user?.organizationName ?? "orgName";

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
                  <div className="dropdown-item" onClick={() => handleSelect("My Activity")}> <Link to={"/myActivity"}> My Activity </Link></div>
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
            {openMenu === "newLead" &&    <NewLead onAdd={(leadData) => {addLead("new", leadData)} }/>}

            <button className="generate-lead" onClick={() => setOpenLead(true)}>Generate Leads</button>
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

          <button className="filter-btn"
            onMouseEnter={() => sethoverFilterIcon(true)}
            onMouseLeave={() => sethoverFilterIcon(false)}
          >

            <div onClick={() => setOpenMenu(openMenu === "filter-btn" ? null : "filter-btn")}>{hoverFilterIcon ? <EditIcon sx={{ color: '#ffffff' }} /> : < FilterAltIcon sx={{ color: '#ffffff' }} />} </div>
            {selectedOption}
            <CloseIcon
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOption(null); // remove selected option
              }}
            />
          </button>
        )}

        {openMenu === "filter-btn" && (
          <FilterSelectedComponent
            isOpen={openMenu === "filter-btn"}
            onClose={() => setOpenMenu(null)}   // ✅ close popup properly
          />
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


        {openMenu === "filter" && <Filter />}
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
          <span className="organisationNameshow">{OrganizationName}</span>
          <button className="avatar" onClick={() => setUserProfile(!UserProfile)}>{firstLetter}</button>
          {UserProfile ? <UserIconDropDown /> : " "}
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

const UserIconDropDown = () => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("logout Successfully !")
      navigate("/login");
    }
  };
  // redirect


  return (

    <div className="menu-container">
      <ul className="menu-list">
        <li className="menu-item">
          <button href="#" className="menu-link">Help</button>
        </li>
        <li className="menu-item">
          <span className="menu-text">Shortcuts</span>
          <span className="menu-shortcut">CTRL+K</span>
        </li>
        <li className="menu-item">
          <span className="menu-text">Dark Mode</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </li>
      </ul>

      <hr className="menu-divider" />

      <ul className="menu-list">
        <li className="menu-item selected">

          <span className="menu-text">Offline</span>
        </li>
        <li className="menu-item">
          <button href="#" className="menu-link">Preferences</button>
        </li>
        <li className="menu-item">
          <button href="#" className="menu-link">My databases</button>
        </li>
        <li className="menu-item">
          <button href="#" className="menu-link">My subscription</button>
        </li>
      </ul>

      <hr className="menu-divider" />

      <ul className="menu-list">
        <li className="menu-item">
          <button href="#" className="menu-link">Install App</button>
        </li>
        <li className="menu-item">
          <button className="menu-link" onClick={handleLogOut}>Log out</button>
        </li>
      </ul>
    </div>

  )
}