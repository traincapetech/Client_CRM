
import { useContext, useState } from "react";
import "./Forecast.css";
import AddIcon from "@mui/icons-material/Add";
import NewLead from "../../NavbarPage/NewLead"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import { LeadContext } from "../../../leadProvider/LeadContext"
import FastForwardIcon from '@mui/icons-material/FastForward';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';



function Forecast() {
    const { leads, addLead } = useContext(LeadContext);
    const [activeColumn, setActiveColumn] = useState(null);
    const [openCard, setOpenCard] = useState(null); // { col, index } or null

    const [columns, setColumns] = useState(["September ", "October", "November", "December"]);

    const [AddStage, setAddStage] = useState(false)
    function handleAddStage() {
        setAddStage(!AddStage)
    }

    const handleLead = (column) => {
        setActiveColumn((prev) => (prev === column ? null : column));
    }
    return (
        <div className="ForecastContainer">
            <div className="forecast-board">
                {columns.map((col) => (
                    <div className="forecast-column" key={col}>
                        <div className="forecast-header">
                            <h3>{col.charAt(0).toUpperCase() + col.slice(1)}</h3>
                            <div className="forecast-actions">
                                <span className="forecast-setting-icon">
                                    <SettingsIcon fontSize="small" />
                                </span>
                                <button
                                    type="button"
                                    className="forecast-createLead-btn"
                                    onClick={() => handleLead(col)}
                                >
                                    <AddIcon sx={{ color: "black" }} />
                                </button>
                            </div>
                        </div>

                        {/* Leads as cards */}
                        {leads[col] &&
                            leads[col].map((lead, index) => (
                                <div key={index} className="forecast-lead-card">
                                    <div className="forecast-product-card">
                                        <div className="forecast-product-header">
                                            <h3 className="forecast-product-title">{lead.company}</h3>
                                            <button
                                                className="forecast-options-button"
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
                                                <div className="forecast-showoptionCardEdit">
                                                    <ShowLeadCardOption col={col} index={index} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="forecast-product-price">₹{lead.value}</div>
                                        <div className="forecast-product-tag-container">
                                            <span className="forecast-product-tag">need urgent</span>
                                        </div>
                                        <div className="forecast-product-rating">
                                            {[1, 2, 3].map((star) => (
                                                <span
                                                    key={star}
                                                    className={`forecast-star ${lead.rating >= star ? "selected" : ""
                                                        }`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                            <span className="forecast-clock-icon">🕒</span>
                                        </div>
                                        <div className="forecast-product-action">
                                            <button className="forecast-action-button">A</button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        {/* Popup BELOW header */}
                        {activeColumn === col && (
                            <div className="forecast-lead-popup">
                                <NewLead
                                    onAdd={(data) => addLead(col, data)}
                                    onClose={() => setActiveColumn(null)}
                                />
                            </div>
                        )}
                    </div>
                ))}

                <div className="forecast-AddStage-mobile">
                    <span className="forecast-iconshowAddStage">
                        <FastForwardIcon sx={{ color: "#212121" }} />
                    </span>
                    <button className="forecast-addstage-btn" onClick={handleAddStage}>
                        Add stages...
                    </button>
                    {AddStage && (
                        <AddStageInputBox
                            onClose={() => setAddStage(false)}
                            onAddStage={(stage) => setColumns([...columns, stage])}
                        />
                    )}
                </div>
            </div>

            <div className="forecast-AddStage">
                <button className="forecast-addstage-btn" onClick={handleAddStage}>
                   Add Month
                </button>
                <span className="forecast-iconshowAddStage">
                    <FastForwardIcon sx={{ color: "#212121" }} />
                </span>
                {AddStage && (
                    <AddStageInputBox
                        onClose={() => setAddStage(false)}
                        onAddStage={(stage) => setColumns([...columns, stage])}
                    />
                )}
            </div>
        </div>
    )

}
export default Forecast



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
                placeholder="Add month"
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
