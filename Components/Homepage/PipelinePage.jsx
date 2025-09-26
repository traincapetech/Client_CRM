import { useContext, useState } from "react";
import "./PipelinePage.css";
import AddIcon from "@mui/icons-material/Add";
import NewLead from "../NavbarPage/NewLead";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import { LeadContext } from "../../leadProvider/LeadContext";
import FastForwardIcon from '@mui/icons-material/FastForward';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

function PipelinePage() {
  const { leads, addLead } = useContext(LeadContext);
  const [activeColumn, setActiveColumn] = useState(null);
  const [openCard, setOpenCard] = useState(null); // { col, index } or null

  const [columns, setColumns] = useState(["new", "proposition", "qualified", "won"]);

  const [AddStage, setAddStage] = useState(false)
  function handleAddStage() {
    setAddStage(!AddStage)
  }

  const handleLead = (column) => {
    setActiveColumn((prev) => (prev === column ? null : column));
  };

  return (
    <div className="pipeline-container">
      <div className="pipeline-board">
        {columns.map((col) => (
          <div className="pipeline-column" key={col}>
            <div className="pipeline-header">
              <h3>{col.charAt(0).toUpperCase() + col.slice(1)}</h3>
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
                <div key={index} className="lead-card">
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
                          className={`star ${lead.rating >= star ? "selected" : ""
                            }`}
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
        <div className="pipeline-AddStage-mobile">
          <span className="iconshowAddStage" ><FastForwardIcon sx={{ color: "#212121" }} />   </span>

          <button className="addstage-btn" onClick={handleAddStage}>Add stages...</button>
          {AddStage && (
            <AddStageInputBox
              onClose={() => setAddStage(false)}
              onAddStage={(stage) => setColumns([...columns, stage])}
            />
          )}
        </div>
      </div>

      <div className="pipeline-AddStage">
        <button className="addstage-btn" onClick={handleAddStage}>Add stages...</button>
        <span className="iconshowAddStage" ><FastForwardIcon sx={{ color: "#212121" }} /></span>
        {AddStage && (
          <AddStageInputBox
            onClose={() => setAddStage(false)}
            onAddStage={(stage) => setColumns([...columns, stage])}
          />
        )}
      </div>
    </div>
  );
}

export default PipelinePage;



// This is use to show the Edti and Delete option for the each card

const ShowLeadCardOption = ({ col, index }) => {
  const { deleteLead } = useContext(LeadContext);

  return (
    <div className="editCard-container">
      <div className="editCard-model">
        <button>Edit</button>
        <button onClick={() => deleteLead(col, index)}>Delete</button>
      </div>
    </div>
  );
};
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
    <div>
      <input
        type="text"
        placeholder="StageName"
        value={inputAddStage}
        onChange={handleChangeInStage}
      />
      <div>
        <button onClick={onClose}>
          <CloseIcon sx={{ background: "red" }} />
        </button>
        <button onClick={handleAddStage}>
          <CheckIcon sx={{ background: "green" }} />
        </button>
      </div>
    </div>
  );
};
