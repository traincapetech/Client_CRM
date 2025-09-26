import { useState } from 'react';
import './My_Activity.css';
import SortIcon from '@mui/icons-material/Sort';


const FieldSelectionPopup = ({ onSelectField }) => {
  const fields = [
    "Created on",
    "Customer",
    "Contact Name",
    "Phone",
    "City",
    "State",
    "Country",
    "Salesperson",
    "Sales Team",
    "Priority",
    "Activities",
    "Activity by",
    "My Deadline",
    "Campaign",
    "Medium",
    "Source",
    "Expected Revenue",
    "Expected Closing",
    "Stage",
    "Probability (%)",
    "Lost Reason",
    "Tags"
  ];
  return (
    <div className="custom-fields-menu-container">
      <ul className="fields-list">
        {fields.map((field, index) => (
          <li
            className="field-item checked"
            key={index}
            onClick={() => onSelectField(field)} // ✅ handle click
          >
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <span className="field-name">{field}</span>
          </li>
        ))}
      </ul>
    </div>

  )
}


const My_Activity = () => {
  const [optionMyActivity,setoptionMyActivity] =useState([
    "Created on",
    "Opportunity",
    "Customer",
    "Contact Name",
    "Email",
    "Priority",
    "My Deadline",
    "Medium"
  ])

  const [showoptionMyActivity, setshowoptionMyActivity] = useState(false)

  return (
    <div className="table-header-container">
      <div className="table-header-row">
        <div className='header-container-items'>
          <div className="header-cell checkbox-cell">
            <input type="checkbox" className="header-checkbox" />
          </div>
          {optionMyActivity.map((item, index) => (
            <div className="header-cell" key={index}>{item}</div>
          ))}
        </div>
        <div className='addheader-option'> <button className='sortOption'
          onClick={() => setshowoptionMyActivity(!showoptionMyActivity)}> <SortIcon /></button> </div>
        <div className='optionDropDownField'>
          {showoptionMyActivity ?
            <FieldSelectionPopup
              onSelectField={(field) => {
                if (!optionMyActivity.includes(field)) {
                  setoptionMyActivity([...optionMyActivity, field]);
                }
              }} /> : " "}</div>
      </div>
    </div>
  );
};

export default My_Activity;
