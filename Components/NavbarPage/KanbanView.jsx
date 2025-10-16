import { useContext, useState,useRef,useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewLead from "../NavbarPage/NewLead";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import { LeadContext } from "../../leadProvider/LeadContext";
import FastForwardIcon from '@mui/icons-material/FastForward';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {Link} from 'react-router-dom'

const KanbanView = () => {
  const { leads, addLead } = useContext(LeadContext);
  const [activeColumn, setActiveColumn] = useState(null);
  const [openCard, setOpenCard] = useState(null); // { col, index } or null

  const [columns, setColumns] = useState(["new", "proposition", "qualified", "won","Lost"]);

  const [AddStage, setAddStage] = useState(false)
  function handleAddStage() {
    setAddStage(!AddStage)
  }

  const handleLead = (column) => {
    setActiveColumn((prev) => ( prev === column ? null : column ));
  };

  const stageProbabilities = {
    new: 10,
    proposition: 40,
    qualified: 70,
    won: 100,
    lost:0,
  };

  const handleDrop = (e, targetCol) => {
    const sourceCol = e.dataTransfer.getData("col");
    const index = e.dataTransfer.getData("index");

    if (sourceCol === targetCol) return; // same column, do nothing

    const draggedLead = leads[sourceCol][index];

    // Remove from old column and add to new one
    const updatedLeads = { ...leads };
    updatedLeads[sourceCol] = updatedLeads[sourceCol].filter(
      (_, i) => i !== Number(index)
    );
    updatedLeads[targetCol] = [...(updatedLeads[targetCol] || []), draggedLead];

    // Update context
    addLead(targetCol, draggedLead, sourceCol, index);
  };

    const containerRef = useRef(null);
  
    useEffect(() => {
      const el = containerRef.current;
      let isDown = false;
      let startX;
      let scrollLeft;
  
      const mouseDown = (e) => {
        isDown = true;
        el.classList.add("active");
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
      };
  
      const mouseLeave = () => {
        isDown = false;
        el.classList.remove("active");
      };
  
      const mouseUp = () => {
        isDown = false;
        el.classList.remove("active");
      };
  
      const mouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fastness factor
        el.scrollLeft = scrollLeft - walk;
      };
  
      el.addEventListener("mousedown", mouseDown);
      el.addEventListener("mouseleave", mouseLeave);
      el.addEventListener("mouseup", mouseUp);
      el.addEventListener("mousemove", mouseMove);
  
      return () => {
        el.removeEventListener("mousedown", mouseDown);
        el.removeEventListener("mouseleave", mouseLeave);
        el.removeEventListener("mouseup", mouseUp);
        el.removeEventListener("mousemove", mouseMove);
      };
    }, []);
  


  return (
    <div className="pipeline-container" >
      <div className="pipeline-board" ref={containerRef}>
        {columns.map((col) => (
          <div
            className="pipeline-column"
            key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, col)}
          >
            <div className="pipeline-header">
              <h3>{col.charAt(0).toUpperCase() + col.slice(1)}
                <span className="stage-probability">
                  {stageProbabilities[col] ? stageProbabilities[col] + "%" : "0%"}
                </span>
              </h3>
              <div className="pipeline-actions">
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
            </div>

            {/* Leads as cards */}
            {leads[col] &&
              leads[col].map((lead, index) => (
                <div
                  key={index}
                  className="lead-card"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("col", col);
                    e.dataTransfer.setData("index", index);
                  }}
                >
                  <div className="product-card">
                    <div className="product-header">
                      <h3 className="product-title">{lead.company}</h3>
                      <button
                        className="options-button"
                        onClick={() =>
                          setOpenCard(
                            openCard?.col === col && openCard?.index === index
                              ? null
                              : { col, index }
                          )
                        }
                      >
                        <MoreVertIcon />
                      </button>

                      {/* Only open on the clicked card */}
                      {openCard?.col === col && openCard?.index === index && (
                        <div className="showoptionCardEdit">
                          <ShowLeadCardOption col={col} index={index} />
                        </div>
                      )}
                    </div>

                    <div className="product-price">₹{lead.value}</div>
                    <div className="product-tag-container">
                      <span className="product-tag">need urgent</span>
                    </div>
                    <div className="product-rating">
                      {[1, 2, 3].map((star) => (
                        <span
                          key={star}
                          className={`star ${lead.rating >= star ? "selected" : ""}`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="clock-icon">🕒</span>
                    </div>
                    <div className="product-action">
                      <button className="action-button">A</button>
                    </div>
                  </div>
                </div>
              ))}

            {/* Popup BELOW header */}
            {activeColumn === col && (
              <div className="lead-popup">
                <NewLead
                  onAdd={(data) => addLead(col, data)}
                  onClose={() => setActiveColumn(null)}
                />
              </div>
            )}
          </div>
        ))}

        {/* Mobile Add Stage */}
        <div className="pipeline-AddStage-mobile">
          <span className="iconshowAddStage">
            <FastForwardIcon sx={{ color: "#212121" }} />
          </span>
          {!AddStage ? (
            <button className="addstage-btn" onClick={handleAddStage}>
              Add stages...
            </button>
          ) : (
            <AddStageInputBox
              onClose={() => setAddStage(false)}
              onAddStage={(stage) => setColumns([...columns, stage])}
            />
          )}
        </div>
      </div>

      {/* Desktop Add Stage */}
      <div className="pipeline-AddStage">
        {!AddStage ? (
          <button className="addstage-btn" onClick={handleAddStage}>
            Add stages...
          </button>
        ) : (
          <AddStageInputBox
            onClose={() => setAddStage(false)}
            onAddStage={(stage) => setColumns([...columns, stage])}
          />
        )}
      </div>
    </div>
  );

};

export default KanbanView;


const ShowLeadCardOption = ({ col, index }) => {
  const { deleteLead } = useContext(LeadContext);
 
  return (
    <div className="editCard-container-pipeline">
      <div className="editCard-model">

        <Link to={`/edit/${col}/${index}`}>
          <button className="edit-btn">Edit</button>
        </Link>
        <button className="delete-btn" onClick={() => deleteLead(col, index)}>Delete</button>
      </div>
    </div>
  );
};

// This is used to show the Edit and Delete option for each card

const AddStageInputBox = ({ onClose, onAddStage }) => {
  const [inputAddStage, setinputAddStage] = useState("");

  function handleChangeInStage(event) {
    setinputAddStage(event.target.value);
  }

  function handleAddStage() {
    if (inputAddStage.trim()) {
      onAddStage(inputAddStage.trim()); // send stage to parent
      setinputAddStage("");
      onClose(); // close after adding
    }
  }

  return (
    <div className="addStageBox">
      <input
        type="text"
        placeholder="StageName"
        value={inputAddStage}
        onChange={handleChangeInStage}
        className="addStageInput"
      />
      <div className="addStageButtons">
        <button onClick={onClose} className="closeBtn">
          <CloseIcon />
        </button>
        <button onClick={handleAddStage} className="checkBtn">
          <CheckIcon />
        </button>
      </div>
    </div>
  );
};




