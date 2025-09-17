import React, { useState } from 'react';
import './Filter.css'; // Import the external CSS file

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
  const [selectedFilters, setSelectedFilters] = useState(['My Pipeline']);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedDatefilter, setSelectedDatefilter] = useState([])
  const [selectedOpportunity, setSelectedOpportunity] = useState([])
  const [selectDategroup, setSelectedDategroup] = useState([])


  const handleFilterClick = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };



  const handleDatesClick = (dates) => {
    setSelectedDatefilter((prev) =>
      prev.includes(dates)
        ? prev.dates((item) => item !== dates)
        : [...prev, dates]
    );
  };

  const handleOpportunityClick = (opportunity) => {
    setSelectedOpportunity((prev) =>
      prev.includes(opportunity)
        ? prev.opportunity((item) => item !== opportunity)
        : [...prev, opportunity]
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
                  {selectedFilters.includes(filter) ? '✔️' : '◻️'}
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
                onClick={() => handleDatesClick(dates)}
              >
                <span className="checkbox">
                  {selectedDatefilter.includes(dates) ? '✔️' : '◻️'}
                </span>
                {dates}
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
                  {selectedOpportunity.includes(opportunity) ? '✔️' : '◻️'}
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
                  {selectedGroups.includes(group) ? '✔️' : '◻️'}
                </span>
                {group}
              </div>
            ))}

            {/* dates for group */}
            




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