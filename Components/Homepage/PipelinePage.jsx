import { useContext, useState } from "react";
import "./PipelinePage.css";
import AddIcon from "@mui/icons-material/Add";
import NewLead from "../NavbarPage/NewLead";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import { LeadContext } from "../../leadProvider/LeadContext";
import FastForwardIcon from '@mui/icons-material/FastForward';

function PipelinePage() {
  const { leads, addLead } = useContext(LeadContext);
  const [activeColumn, setActiveColumn] = useState(null);
  const [openCard, setOpenCard] = useState(null); // { col, index } or null

  const columns = ["new", "proposition", "qualified", "won"];

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
      </div>

      <div className="pipeline-empty">
        <button>Add stages...</button>
        <span><FastForwardIcon /></span>
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