import { useState } from 'react';
import './FilterSelectedComponent.css';
import DeleteIcon from '@mui/icons-material/Delete';

// A simple component to represent the 'Select a field' popup
const FieldSelectionPopup = ({ onSelectField, onClose }) => {
  const fields = [
    "Action Needed", "Active", "Activities", "Activity Exception Decoration", "Activity State",
    "Activity Type Icon", "Assignment Date", "Automated Probability", "Blacklist", "Bounce",
    "Campaign", "City", "Closed Date", "Color Index", "Company", "Company Name", "Contact Name",
    "Conversion Date", "Country", "Created by", "Created on", "Customer", "Days To Convert",
    "Days to Assign", "Days to Close", "Display Name", "Email", "Email Domain Criterion",
    "Email Quality", "Email cc", "Enrichment Done", "Exceeded Closing Days", "Expected Closing",
    "Expected MRR", "Expected revenue", "Followers", "Followers (partners)", "has message", "ID",
    "Is Followers", "job position", "Language", "Last Action", "Last Stage Update",
    "Last Updated by", "Last Updated on", "Lead mining Request", "Locale Code", "Lost Reason",
    "Medium", "Meeting", "Message Delivers Error", "messages", "My Activity Deadline",
    "Next Activity Deadline", "Next Activity Summary", "Next Activity Type", "Normalized Email",
    "Notes", "Opportunity", "Partner is Blacklisted", "Phone", "Phone Blacklisted", "Phone Number",
    "Phone Quality", "Priority", "Probability", "Properties", "Prorated MRR",
    "Prorated Recurring Revenue", "Prorated revenue", "Recurring Plan", "Recurring Revenue",
    "Referred by", "Responsible User", "Reveal id", "SMS Delivery Error", "Sales Team",
    "Salesperson", "Sanitized Number", "Source", "Stage", "State", "Street", "Streets", "Tags",
    "Types", "website", "website messages", "won/Lost", "Zip"
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredFields = fields.filter(field =>
    field.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="field-selection-popup">
      <div className="popup-header">
        <span className="popup-title">Select a field</span>
        <button className="popup-close" onClick={onClose}>×</button>
      </div>
      <div className="popup-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="field-list">
        {filteredFields.map((field, index) => (
          <li key={index} onClick={() => onSelectField(field)}>
            {field}
          </li>
        ))}
      </ul>
    </div>
  );
};

const FilterSelectedComponent = ({ isOpen, onClose }) => {
  const [matchAll, setMatchAll] = useState(true);
  const [includeArchived, setIncludeArchived] = useState(false);
  const [rules, setRules] = useState([{ field: 'Salesperson', condition: 'equals', value: 'uid' }]);

  // State to manage the popup visibility for a specific rule
  const [popupIndex, setPopupIndex] = useState(null);

  const handleMatchAllChange = () => {
    setMatchAll(!matchAll);
  };

  const handleIncludeArchivedChange = () => {
    setIncludeArchived(!includeArchived);
  };

  const handleRuleChange = (index, event) => {
    const { name, value } = event.target;
    const newRules = [...rules];
    newRules[index][name] = value;
    setRules(newRules);
  };

  // Show popup for selecting a field
  const handleShowPopup = (index) => {
    setPopupIndex(index);
  };

  // Select a field from popup
  const handleSelectField = (field) => {
    const newRules = [...rules];
    newRules[popupIndex].field = field;
    setRules(newRules);
    setPopupIndex(null); // Close popup
  };

  const handleAddRule = () => {
    setRules([...rules, { field: '', condition: '', value: '' }]);
  };

  const handleRemoveRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1); // this line use to remove the rules by slicing it
    setRules(newRules);
  };

  if (!isOpen) return null;

  return (
      <div className='custom-filter-model-overlay'>         
    <div className="custom-filter-container">
      <div className="custom-filter-header">
        <h2>Custom Filter</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="custom-filter-body">
        <div className="filter-options">
          <div className="match-rules-container">
            <select
              className="match-all-dropdown"
              value={matchAll ? "Match all" : "Match any"}
              onChange={handleMatchAllChange}
            >
              <option value="Match all">Match all</option>
              <option value="Match any">Match any</option>
            </select>
            <span className="of-the-following-rules"> of the following rules:</span>
          </div>
          <div className="include-archived-container">
            <label className="switch">
              <input type="checkbox" checked={includeArchived} onChange={handleIncludeArchivedChange} />
              <span className="slider round"></span>
            </label>
            <span>Include archived</span>
          </div>
        </div>

        {rules.map((rule, index) => (
          <div key={index} className="rule-row">
            <div className="rule-input-container">
              <input
                type="text"
                name="field"
                value={rule.field}
                onClick={() => handleShowPopup(index)}
                onChange={(e) => handleRuleChange(index, e)}
                className="rule-input"
                readOnly
              />
              {/* Conditionally render the popup */}
              {popupIndex === index && (
                <div className='filterfieldshow'>
                  <FieldSelectionPopup
                    onSelectField={handleSelectField}
                    onClose={() => setPopupIndex(null)}
                  />
                </div>
              )}
            </div>
            <select
              name="condition"
              value={rule.condition}
              onChange={(e) => handleRuleChange(index, e)}
              className="rule-dropdown"
            >
              <option value="equals">equals</option>
              <option value="not equals">not equals</option>
              <option value="contains">contains</option>
              <option value="does not contain">does not contain</option>
            </select>
            <input
              type="text"
              name="value"
              value={rule.value}
              onChange={(e) => handleRuleChange(index, e)}
              className="rule-input"
            />
            <button className="rule-action-button delete-button" onClick={() => handleRemoveRule(index)}>
              <span role="img" aria-label="Delete"><DeleteIcon /></span>
            </button>
            <button className="rule-action-button copy-button">
              <span role="img" aria-label="Copy">📋</span>
            </button>
          </div>
        ))}

        <a href="#" className="new-rule-link" onClick={handleAddRule}>
          New Rule
        </a>
      </div>

      <div className="custom-filter-footer">
        <button className="search-button">Search</button>
        <button className="discard-button">Discard</button>
      </div>
        </div>
    </div>
  );
};

export default FilterSelectedComponent;
