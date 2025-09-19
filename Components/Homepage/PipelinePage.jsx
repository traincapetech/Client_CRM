import { useState } from "react";
import "./PipelinePage.css";
import AddIcon from "@mui/icons-material/Add";
import NewLead from "../NavbarPage/NewLead";
import FastForwardIcon from "@mui/icons-material/FastForward";
import SettingsIcon from "@mui/icons-material/Settings";

function PipelinePage() {
  const [activeColumn, setActiveColumn] = useState(null); // which column popup is open
  const [active, setActive] = useState("pipeline-addStage");
  const [activeAddIcon,setActiveIcon]=useState(false)
  const getClass = (name) =>
    `iconshowAddStage ${active === name ? "active" : ""}`;

  const columns = ["new", "proposition", "qualified", "won"];
  

 

  function handleLead(column) {
    setActiveColumn((prev) => (prev === column ? null : column));
   
  }

  return (
    <div className="pipeline-container">
      <div className="pipeline-board">
        {columns.map((col) => (
          <div className="pipeline-column" key={col}>
            <div className="pipeline-items">
              <h3>{col.charAt(0).toUpperCase() + col.slice(1)}</h3>
              <div onClick={()=> setActiveIcon(!activeAddIcon)} className={activeAddIcon?"left-side-pipelineItems":"left-side-pipelineClick"}>
                <span className="setting-icon-pipeline">
                  <SettingsIcon fontSize="small" />
                </span>
                <button
                  type="button"
                  className="createLead-btn"
                  onClick={() => handleLead(col)}
                >
                  <AddIcon sx={{ color: "black" }} />
                </button>
              </div>

              {/* Popup toggled per column */}
              {activeColumn === col && (
                <div className="lead-popup">
                  <NewLead />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add Stage */}
        {/* <div className="pipeline-addStage">
          <span>
            <FastForwardIcon />
          </span>
          <div
            className={getClass("addStage-container")}
            onClick={() => setActive("")}
          >
            <button className="addstage-btn">ADD Stages</button>
          </div>
        </div> */}
      </div>

      <div className="pipeline-empty"></div>
    </div>
  );
}

export default PipelinePage;
