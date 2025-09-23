import { useState } from 'react';
import './My_Activity.css';
import SortIcon from '@mui/icons-material/Sort';


const FieldSelectionPopup = () => {
  const fields = [
    'Salesperson',
    'Sales Team',
    'Stage',
    'City',
    'Country',
    'Lost Reason',
    'Campaign',
    'Medium',
    'Source',
    'Properties',
  ];
   const [selectedGroups, setSelectedGroups] = useState([]);
   
  const handleGroupClick = (group) => {
    setSelectedGroups((prev) =>
      prev.includes(group)
        ? prev.filter((item) => item !== group)
        : [...prev, group]
    );
  };

  return (
    <div className='selection-container'>
      <div className="selection-box">
          <div className='section-groupInMyActivity'>
            {fields.map((group) => (
              <div
                key={group}
                className="optionInMyActivity"
                onClick={() => handleGroupClick(group)}
              >
                <span className="checkbox">
                  {selectedGroups.includes(group) ? '✔️' : ''}
                </span>
                {group}
              </div>
            ))}
            </div>
            </div>
            </div>
  )
}


const My_Activity = () => {
  const options = ["Created on", "Opportunity",
    "Customer",
    "Contact Name",
    "Email",
    "Priority",
    "My Deadline",
    "Medium"
  ]

  const [showOptions, setshowOptions] = useState(false)

  return (
    <div className="table-header-container">
      <div className="table-header-row">
        <div className='header-container-items'>
          <div className="header-cell checkbox-cell">
            <input type="checkbox" className="header-checkbox" />
          </div>
          {options.map((item, index) => (
            <div className="header-cell" key={index}>{item}</div>
          ))}
        </div>
        <div className='addheader-option'> <button className='sortOption' onClick={() => setshowOptions(!showOptions)}> <SortIcon /></button> </div>
        <div className='optionDropDownField'>{showOptions ? <FieldSelectionPopup /> : " "}</div>
      </div>
    </div>
  );
};

export default My_Activity;
