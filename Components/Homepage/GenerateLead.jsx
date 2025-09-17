import { useState, useRef, useEffect } from "react";
import "./GenerateLead.css";

export default function GenerateLead({ isOpen, onClose }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  // Center modal when open
  useEffect(() => {
    if (isOpen) {
      const centerX = window.innerWidth / 2 - 100; // adjust for modal width
      const centerY = window.innerHeight / 2 - 50; // adjust for modal height
      setPosition({ x: centerX, y: centerY });
    }
  }, [isOpen]);

  const handleMouseDown = (e) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };
  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };
  const handleMouseUp = () => setDragging(false);

  // Generic dropdown state
  const [openDropdown, setOpenDropdown] = useState(null); // "country", "state", "industry", "salesperson","default"

  // Selected values for each field
  const [selected, setSelected] = useState({
    country: [],
    state: [],
    industry: [],
    salesperson: [],
    default:[]
  });

  // Options
  const options = {
    country: ["India", "USA", "UK", "Canada", "Australia"],
    state: ["Delhi", "Gurugram", "J&K", "Uttar Pradesh"],
    industry: [
      "Consumer Discretionary",
      "Banks & Insurance",
      "Retailing",
      "Consumer Staples",
      "Software & Services",
    ],
    salesperson: ["Alice", "Bob", "Charlie", "David"],
    default:["Need urgent", "very urgent"]
  };

  const [showSizefilter,setshowSizefilter]=useState(false)
  function handleSizefilter(){
    setshowSizefilter(!showSizefilter)
    
  }

  // Generic select handler
  const handleSelect = (field, value) => {
    if (!selected[field].includes(value)) {
      setSelected({
        ...selected,
        [field]: [...selected[field], value],
      });
    }
    setOpenDropdown(null); // close after selection
  };

  // Generic remove handler
  const handleRemove = (field, value) => {
    setSelected({
      ...selected,
      [field]: selected[field].filter((v) => v !== value),
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={onClose}
    >
      <div
        className="modal"
        style={{ left: position.x, top: position.y }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header" onMouseDown={handleMouseDown}>
          <h2>Need help reaching your target?</h2>
          <button onClick={onClose} className="close-btn">✖</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <h3>How many leads would you like?</h3>
          <div className="inline-input">
            <input type="number" placeholder="1" />
            <span>Companies</span>
          </div>

          <div className="form-grid">
            {Object.keys(options).map((field) => (
              <div className="form-group" key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <div className="dropdown-field">
                  <div className="selected-items">
                    {selected[field].map((item, i) => (
                      <span key={i} className="tag">
                        {item}
                        <button
                          className="remove-tag"
                          onClick={() => handleRemove(field, item)}
                        >
                          ✖
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder={`Select ${field}`}
                    readOnly
                    onClick={() =>
                      setOpenDropdown(openDropdown === field ? null : field)
                    }
                  />
                  {openDropdown === field && (
                    <ul className={`dropdown-menu ${field}`}>
                      {options[field].map((opt, i) => (
                        <li
                          key={i}
                          className="dropdown-item-li"
                          onClick={() => handleSelect(field, opt)}
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
            
          </div>

          <div className="checkbox-row">
            <label onClick={handleSizefilter}> Filter on Size <input type="checkbox" /></label>
            {showSizefilter && 
            <div className="filterSizeClass">
              <span>from</span>
              <input type="number" placeholder="1"/>
              <span>To</span>
              <input type="number" placeholder="1000"/>
              <span>Employee</span>
            </div>
            }
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="generate-btn"
            onClick={() => {
              alert("Lead Generated!");
              onClose();
            }}
          >
            Generate Leads
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
