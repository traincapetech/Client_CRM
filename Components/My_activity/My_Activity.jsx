
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  IconButton
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';

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








const My_Activity = () => {
  const headers = ['Opportunity', 'Contact Name', 'Email', 'City', 'State', 'Salesperson', 'Priority'];
    const [ShowPopup,setShowPopup]=useState(false)

  return (
    <div className='myActivity-container'>
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell key={header}>
            {header === 'Opportunity' ? (
              <>
                <Checkbox color="primary" />
                {header}
              </>
            ) : (
              header
            )}
          </TableCell>
        ))}
        {/* The last cell for the sort/filter icon */}
        <TableCell align="right">
          <IconButton  onClick={() => setShowPopup(true)}>
            { ShowPopup? <FieldSelectionPopup />: " "}
           <TuneIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>

  </div>

  );
};

export default My_Activity;