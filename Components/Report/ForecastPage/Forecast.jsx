
import { useContext, useState,useRef,useEffect } from "react";
import "./Forecast.css";
import AddIcon from "@mui/icons-material/Add";
import NewLead from "../../NavbarPage/NewLead"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import { LeadContext } from "../../../leadProvider/LeadContext"
import FastForwardIcon from '@mui/icons-material/FastForward';



function Forecast() {

// here is the code for the make the page grabbable to scroll the page //



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



  /////////////////////

    const { leads, addLead } = useContext(LeadContext);
    const [activeColumn, setActiveColumn] = useState(null);
    const [openCard, setOpenCard] = useState(null);

    const [columns, setColumns] = useState([
        "September 2025",
        "October 2025",
        "November 2025",
        "December 2025",
    ]);

    const [AddStage, setAddStage] = useState(false);

    // months array for reference
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // ✅ logic: add the next month automatically
    function handleAddStage() {
        setColumns((prev) => {
            const last = prev[prev.length - 1].trim(); // e.g. "December 2025"
            const [lastMonthName, lastYear] = last.split(" ");
            const monthIndex = months.indexOf(lastMonthName);

            let nextMonthIndex = (monthIndex + 1) % 12;
            let nextYear = parseInt(lastYear, 10);

            if (monthIndex === 11) {
                nextYear++;
            }

            const nextMonthName = months[nextMonthIndex];
            return [...prev, `${nextMonthName} ${nextYear}`];
        });
    }

    const handleLead = (column) => {
        setActiveColumn((prev) => (prev === column ? null : column));
    };

    return (
        <div className="ForecastContainer"  ref={containerRef}>
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
                                                    className={`forecast-star ${
                                                        lead.rating >= star ? "selected" : ""
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
    
                    {/* this is used only for the responsive view  */}
                <div className="forecast-AddStage-mobile">
                    <span className="forecast-iconshowAddStage">
                        <FastForwardIcon sx={{ color: "#212121" }} />
                    </span>
                    <button className="forecast-addstage-btn" onClick={handleAddStage}>
                        Add Month
                    </button>
                </div>

                <div className="forecast-AddStage">
                <button className="forecast-addstage-btn" onClick={handleAddStage}>
                    Add Month
                </button>
                
            </div>

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

