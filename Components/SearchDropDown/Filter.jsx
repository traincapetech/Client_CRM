import { useState } from 'react';
import './Filter.css'; // Import the external CSS file
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const options = {
  filters: [
    'My Pipeline',
    'Unassigned',
    'Open Opportunities',
  ],
  opportunities: [
    'Won',
    'Ongoing',
    'Lost',
  ],

  groupBy: [
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
  ],
};

const Dateoption = {
  filterdate: [
    'Creation Date',
    'Closed Date',
  ],
  groupdate: [
    'Creation Date',
    'Expected Closing',
    'Closed Date',
  ]
}


const Filter = () => {
  const [openFilterDates, setOpenFilterDates] = useState({});

  const [selectedFilters, setSelectedFilters] = useState(['My Pipeline']);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedDatefilter, setSelectedDatefilter] = useState([])
  const [selectedOpportunity, setSelectedOpportunity] = useState([])
  const [selectDategroup, setSelectedDategroup] = useState([])
  // const [toggleOngroupbtn, settoggleOnGroupbtn] = useState(false)
  const [openGroupDates, setOpenGroupDates] = useState({});

  const toggleDateGroup = (gpdate) => {
    setOpenGroupDates((prev) => ({
      ...prev,
      [gpdate]: !prev[gpdate],   // flip only this gpdate
    }));
  };


  const handleDatesClickgroup = (gpdate) => {
    setSelectedDategroup((prev) =>
      prev.includes(gpdate)
        ? prev.filter((item) => item !== gpdate)
        : [...prev, gpdate]
    );
  };

  const handleDatesClickfilter = (dates) => {
    setSelectedDatefilter((prev) =>
      prev.includes(dates)
        ? prev.filter((item) => item !== dates)
        : [...prev, dates]
    );
  };

  const handleOpportunityClick = (opportunity) => {
    setSelectedOpportunity((prev) =>
      prev.includes(opportunity)
        ? prev.filter((item) => item !== opportunity)
        : [...prev, opportunity]
    );
  };

  const handleFilterClick = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };


  const handleGroupClick = (group) => {
    setSelectedGroups((prev) =>
      prev.includes(group)
        ? prev.filter((item) => item !== group)
        : [...prev, group]
    );
  };

  return (
    <div className="dropdown-menu-Search">
      <div className="section-container">
        {/* Filters Section */}
        <div className="section">
          <div className='section-filter'>
            <h4 className="section-header">
              <span className="icon">▼</span> Filters
            </h4>
            {options.filters.map((filter) => (
              <div
                key={filter}
                className="option"
                onClick={() => handleFilterClick(filter)}
              >
                <span className="checkbox">
                  {selectedFilters.includes(filter) ? '✔️' : ''}
                </span>
                {filter}
              </div>
            ))}

            
            {/* Date handling task */}
            <hr />
            {Dateoption.filterdate.map((dates) => (
              <div
                key={dates}
                className="option"
                onClick={() => handleDatesClickfilter(dates)} // your original function
              >
                {/* Checkbox */}
                <span
                  className="checkbox"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent div click
                    handleDatesClickfilter(dates); // keep your function name
                  }}
                >
                  {selectedDatefilter.includes(dates) ? '✔️' : ''}
                </span>

                {/* Date label */}
                {dates}

                {/* Arrow toggle */}
                <span
                  className="arrow-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenFilterDates((prev) => ({
                      ...prev,
                      [dates]: !prev[dates], // toggle only this date
                    }));
                  }}
                >
                  {openFilterDates[dates] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </span>
              </div>
            ))}


            {/* won lost condition  */}
            <hr />
            {options.opportunities.map((opportunity) => (
              <div
                key={opportunity}
                className="option"
                onClick={() => handleOpportunityClick(opportunity)}
              >
                <span className="checkbox">
                  {selectedOpportunity.includes(opportunity) ? '✔️' : ''}
                </span>
                {opportunity}
              </div>
            ))}
            <hr />
            <div className="option">
              <span className="icon">+</span> Custom Filter...
            </div>
          </div>
        </div>

        {/* Group By Section */}
        <div className="section">
          <div className='section-group'>
            <h4 className="section-header">
              <span className="icon">👥</span> Group By
            </h4>
            {options.groupBy.map((group) => (
              <div
                key={group}
                className="option"
                onClick={() => handleGroupClick(group)}
              >
                <span className="checkbox">
                  {selectedGroups.includes(group) ? '✔️' : ''}
                </span>
                {group}
              </div>
            ))}
            <hr />
            {/* dates for group */}
            {Dateoption.groupdate.map((gpdate) => (
              <div
                key={gpdate}
                className="option"
                onClick={() => handleDatesClickgroup(gpdate)}
              >
                <span
                  className="checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDateGroup(gpdate);
                  }}
                >{selectDategroup.includes(gpdate) ? '✔️' : ''}
                </span>
                {gpdate}
                <span
                  className="arrow-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDateGroup(gpdate);
                  }}
                >
                  {openGroupDates[gpdate] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </span>
              </div>
            ))}


            <hr />
            <div className="option">
              Properties 
              <span className='dropdown-field'
              ><ArrowDropDownIcon />
              </span>
            </div>
            <hr />
            <div className="option">
              <span className="icon">+</span> Custom Group
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="section">
          <h4 className="section-header">
            <span className="icon">⭐</span> Favorites
          </h4>
          <div className="option">Save current search</div>
        </div>
      </div>
    </div >
  );
};

export default Filter;