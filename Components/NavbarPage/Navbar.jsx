import { useState, useRef, useEffect } from "react";
import "./Navbar.css"; // Import external CSS
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ConstructionIcon from '@mui/icons-material/Construction';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CloseIcon from '@mui/icons-material/Close';
import NewLead from "./NewLead";
import SearchIcon from '@mui/icons-material/Search';
import GenerateLead from "../Homepage/GenerateLead";
import { Link, useNavigate } from "react-router-dom"
import Filter from "../SearchDropDown/Filter";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EditIcon from '@mui/icons-material/Edit';
import FilterSelectedComponent from "../FilterSelectComponent/FilterSelectedComponent";
import { useContext } from "react";
import { LeadContext } from "../../leadProvider/LeadContext"
import NavbarSettingsDropdown from "../Homepage/NavbarSettingsDropdown";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ViewModeSelector from "./ViewModeSelector";



function Navbar() {
  const { leads, addLead } = useContext(LeadContext);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null); // always string or null
  const [selectedOption, setSelectedOption] = useState("Pipeline");
  const dropdownWrapperRef = useRef(null);
  const [hoverFilterIcon, sethoverFilterIcon] = useState(false)
  const [openLead, setOpenLead] = useState(false);
  const [UserProfile, setUserProfile] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const [showRightMenu, setShowRightMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [data, setData] = useState([]);

  // ✅ EXPORT CSV
  const handleExport = () => {
    let dataToExport = [];

    if (!data || Object.keys(data).length === 0) {
      alert("No data to export!");
      return;
    }

    if (type === "leads") {
      Object.keys(data).forEach((col) => {
        if (Array.isArray(data[col]) && data[col].length > 0) {
          data[col].forEach((item) => dataToExport.push({ ...item, stage: col }));
        }
      });
    } else {
      dataToExport = Array.isArray(data) ? data : [];
    }

    if (!dataToExport || dataToExport.length === 0) {
      alert("No data to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `pipeline_export.xlsx`);
  };



  // ✅ IMPORT CSV/EXCEL
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const importedData = XLSX.utils.sheet_to_json(worksheet);
      setData(importedData);
      alert("File imported successfully!");
    };
    reader.readAsBinaryString(file);
  };


  const handleSelect = (option) => {
    setSelectedOption(option); // update selected option

    setOpenMenu(null);         // close the dropdown after selecting

    // ⛔ Don't show "Team" in the search bar
    if (option !== "Activity_Types" && option !== "Activity-plans" && option !== "Team" && option !== "Customers" && option !== "SalesTeam") {
      setSearch(option);  // also push it into search bar
    } else {
      setSearch(""); // clear search if Team is clicked
    }
    setOpenMenu(null); // close the dropdown after selecting
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

  const typeMap = {
    Pipeline: "leads",
    Customers: "customers",
    SalesTeam: "salesTeam"
  };

  const type = typeMap[selectedOption] || "other";





  // Get first letter from firstName
  const firstLetter = user?.firstName ? user.firstName.charAt(0).toUpperCase() : "";
  const OrganizationName = user?.organizationName ?? "orgName";
  const fullname = user?.firstName ?? ""

  return (
    <div className="navbar" ref={dropdownWrapperRef}>
      {/* Left Section - Logo + Menu */}
      <div className="navbar-left">
        <div className="navbar-left-top">

          {/* Logo / Hamburger */}
          <div className="logo">
            {/* Hamburger icon (only visible on mobile) */}
            <button className="hamburger" onClick={() => setShowMenu(!showMenu)}>
              &#9776; {/* Unicode hamburger icon */}
            </button>

            {/* Normal Logo (hidden on mobile) */}
            <div className="logo-box"></div>
            <span className="logo-text">
              <Link to={"/home"}>CRM</Link>
            </span>
          </div>

          {/* Hamburger dropdown menu (mobile only) */}
          {showMenu && (
            <div className="hamburger-menu">
              <div className="salesIn-hamburger">
                <label> Sales</label>
                <Link to={"/pipeline"}>  <div className="menu-btn" onClick={() => handleSelect("Pipeline")}> Pipeline </div></Link>
                <Link to={"/pipeline"}> <div className="menu-btn" onClick={() => handleSelect("My Activity")}>My Activity</div> </Link>
                <Link to={"/team"}><div className="menu-btn" onClick={() => handleSelect("Team")}> Team</div></Link>
                <Link to={"/customer"}><div className="menu-btn" onClick={() => handleSelect("Customers")}>  Customers </div> </Link>
              </div>
              <div className="reportingIn-hamburger">
                <label>Reporting</label>
                <Link to={"/report/forecast"}> <div className="menu-btn" onClick={() => handleSelect("Forecast")}>Forecast</div></Link>
                <Link to={"/report/pipeline"}> <div className="menu-btn" onClick={() => handleSelect("Pipeline")}>Pipeline </div></Link>
                <Link to={"/report/leads"}>    <div className="menu-btn" onClick={() => handleSelect("Lead")}>Leads </div></Link>
                <Link to={"/report/activity"}> <div className="menu-btn" onClick={() => handleSelect("Activities")}> Activities</div></Link>
              </div>
              <div className="configurationIn-hamburger">
                <label>Configuration</label>
                <Link to={'/setting'}><div className="menu-btn">Setting </div></Link>
                <Link to={'/config/team'}> <div className="menu-btn">Sales team</div></Link>
                <div className="menu-btn"><b>Activities</b></div>
                <Link to={'/config/activitytypes'} > <div className="menu-btn"> Activity Types</div></Link>
                <Link to={'/config/activityplans'}><div className="menu-btn">Activity Types</div></Link>
                <div className="menu-btn"><b>Pipeline</b></div>
                <Link to={'/config/tags'}><div className="menu-btn"> Tags</div></Link>
                <Link to={'/config/lostreason'}><div className="menu-btn"> Lost Reason</div></Link>
                <div className="menu-btn"><b>Lead Generation</b></div>
                <Link to={'/config/leadmining'}> <div className="menu-btn">Lead Mining Request</div></Link>
              </div>
            </div>
          )}


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
                  <Link to={"/pipeline"}><div className="dropdown-item" onClick={() => handleSelect("Pipeline")}> Pipeline </div></Link>
                  <Link to={"/myActivity"}>  <div className="dropdown-item" onClick={() => handleSelect("My Activity")}>My Activity</div> </Link>
                  <Link to={"/team"}> <div className="dropdown-item" onClick={() => handleSelect("Team")}> Team</div></Link>
                  <Link to={"/customer"}><div className="dropdown-item" onClick={() => handleSelect("Customers")}>  Customers </div> </Link>
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
                  <Link to={"/report/forecast"}> <div className="dropdown-item" onClick={() => handleSelect("Forecast")}>Forecast</div></Link>
                  <Link to={"/report/pipeline"}> <div className="dropdown-item" onClick={() => handleSelect("Pipeline Analysis")}>Pipeline </div></Link>
                  <Link to={"/report/leads"}>    <div className="dropdown-item" onClick={() => handleSelect("Leads Analysis")}>Leads </div></Link>
                  <Link to={"/report/activity"}> <div className="dropdown-item" onClick={() => handleSelect("Activities")}>Activities</div></Link>
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
                  <Link to={'/setting'}> <div className="dropdown-item" onClick={() => handleSelect("Setting")}> Setting </div></Link>
                  <Link to={'/config/team'} ><div className="dropdown-item" onClick={() => handleSelect("Salesteam")}>Sales team</div></Link>
                  <div className="dropdown-item-heading" ><b>Activities</b></div>
                  <Link to={'/config/activitytypes'}>  <div className="dropdown-item" onClick={() => handleSelect("Activity_Types")}> Activity Types </div></Link>
                  <Link to={'/config/activityplans'}>  <div className="dropdown-item" onClick={() => handleSelect("Activity-plans")}>Activity Plans</div></Link>
                  <div className="dropdown-item-heading"><b>Pipeline</b></div>
                  <Link to={'/config/tags'}> <div className="dropdown-item" onClick={() => handleSelect("tags")}> Tags </div></Link>
                  <Link to={'/config/lostreason'} > <div className="dropdown-item" onClick={() => handleSelect("LostReason")}>Lost Reasons</div></Link>
                  <div className="dropdown-item-heading"><b>Lead Generation</b></div>
                  <Link to={'/config/leadmining'}> <div className="dropdown-item" onClick={() => handleSelect("Lead_Mining")}>Lead Mining Request</div></Link>
                </div>
              )}
            </span>
          </nav>
        </div>

        {/* Buttons */}
        <div className="navbar-left-bottom">
          <div className="actions">
            {!["Team", "Pipeline Analysis", "Leads Analysis", "Activities", "Setting"].includes(selectedOption) && (
              <button
                className="new-lead-btn"
                onClick={() => setOpenMenu(openMenu === "newLead" ? null : "newLead")}
              >
                New
              </button>)}
            {/* This is used when user click on config >> Setting  */}
            {selectedOption === "Setting" && (
              <button
                className="new-lead-btn">
                Save
              </button>
            )}




            {/* Lead box*/}
            {openMenu === "newLead" && <NewLead onAdd={(leadData) => { addLead("new", leadData) }} />}

            {/*  desktop code  */}
            {!["Team", "Customers", "Pipeline Analysis", "Leads Analysis", "Activities", "Salesteam", "Activity_Types", "Activity-plans", "Setting"].includes(selectedOption) && (
              <button className="generate-lead"
                onClick={() => setOpenLead(true)}>
                Generate Leads
              </button>
            )}
            <GenerateLead isOpen={openLead} onClose={() => setOpenLead(false)} />

            {/* this use when user click on config >> setting */}
            {
              selectedOption === 'Setting' && (
                <button className="generate-lead">
                  Discard
                </button>
              )
            }

            {/* for phone responsive code  */}
            <button
              className="generate-lead-dropdown"
              onClick={() => toggleMenu("generateLeadDropdown")}
            >
              ▼
            </button>
            {openMenu === "generateLeadDropdown" && (
              <div className="generate-lead-menu">
                <button className="generate-lead-mobile"
                  onClick={() => setOpenLead(true)}>
                  Generate Leads
                </button>
              </div>
            )}

            <span className="selected-field">
              {selectedOption ? selectedOption : "pipeline "}
            </span>

            <button
              onClick={() => toggleMenu("setting")}
              className="setting-icon"
              title="Action"
            > <SettingsIcon fontSize="small" />
            </button>

            {openMenu === "setting" && (
              <NavbarSettingsDropdown
                data={leads}
                type="leads"
                addLead={addLead}
                page={openMenu}
              />
            )}

            {/* {openMenu === "setting" && (
              <div className="dropdown-menu-setting">
                <div className="dropdown-item" onClick={handleExport}><FileUploadIcon /> Import</div>
                <div className="dropdown-item" onChange={handleImport}><GetAppIcon /> Export</div>
                <div className="dropdown-item"><CameraAltIcon /> Import Bussiness Card</div>
                <hr />
                <div className="dropdown-item"><BorderStyleIcon /> Spreadsheet</div>
              </div>
            )} */}
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

        {selectedOption &&
          !["Team", "Customers", "Salesteam", "Activity_Types", "Activity-plans"].includes(selectedOption) && (

            <button className="filter-btn"
              onMouseEnter={() => sethoverFilterIcon(true)}
              onMouseLeave={() => sethoverFilterIcon(false)}
            >
              <div onClick={() => setOpenMenu(openMenu === "filte`r-btn" ? null : "filter-btn")} >
                {hoverFilterIcon ?
                  <EditIcon sx={{ color: '#ffffff' }} />
                  : < FilterAltIcon sx={{ color: '#ffffff' }} />}
              </div>
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
          <span><QueryBuilderIcon /> </span>
          <Link to={'/setting'}><span><ConstructionIcon /></span></Link>
          <span className="organisationNameshow">{OrganizationName}</span>
          <button className="avatar" title={fullname} onClick={() => setUserProfile(!UserProfile)}>{firstLetter}</button>
          {UserProfile ? <UserIconDropDown /> : " "}
        </div>

        {/* Kanban Logo for Mobile */}
        <div className="kanban-mobile mobile-only">
          <span
            title="kanban"
            className={getClass("kanban")}
            onClick={() => setShowRightMenu(!showRightMenu)}
          >
            <ViewKanbanIcon />
          </span>
          {/* Search Icon for Mobile */}
          <span
            title="search"
            className="search-icon"
            onClick={() => setShowSearch(!showSearch)}
          >
            <SearchIcon />
          </span>
        </div>

        {/* Dropdown menu when Kanban clicked (mobile only) */}
        {showRightMenu && (
          <div className="kanban-dropdown">
            <ViewModeSelector activeMode={viewMode} setActiveMode={toggleView} />
          </div>
        )}

        {/* Search Box (mobile only, toggled by search icon) */}
        {showSearch && (
          <div className="mobile-search-bar mobile-only">
            {/* 🔍 Search Button */}
            <button
              title="Search"
              className="search-btn"
              onClick={handleSearch}
            >
              <SearchIcon />
            </button>

            {selectedOption && selectedOption !== "Team" && selectedOption !== "Customers" && (
              <button
                className="filter-btn"
                onMouseEnter={() => sethoverFilterIcon(true)}
                onMouseLeave={() => sethoverFilterIcon(false)}
              >
                <div onClick={() => setOpenMenu(openMenu === "filter-btn" ? null : "filter-btn")}>
                  {hoverFilterIcon ? <EditIcon sx={{ color: '#fff' }} /> : <FilterAltIcon sx={{ color: '#fff' }} />}
                </div>
                {selectedOption}
                <CloseIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption(null);
                  }}
                />
              </button>
            )}

            {openMenu === "filter-btn" && (
              <FilterSelectedComponent
                isOpen={true}
                onClose={() => setOpenMenu(null)}
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
            {openMenu === "filter" && <Filter
              isOpen={true}
              onClose={() => setOpenMenu(null)} />}
          </div>
        )}

        {/* Desktop view */}
        {!["Salesteam"].includes(selectedOption) && (
          <div className="navbar-right-bottom">
            <ViewModeSelector activeMode={active} setActiveMode={setActive} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

const UserIconDropDown = () => {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleToggle = () => setDarkMode(!darkMode);

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
          <span className="menu-text">Dark Mode</span>
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={handleToggle} />
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