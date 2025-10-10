import "./Customer.css";
import { useState,useEffect,useRef } from "react";

const customerData = [
  { 
    id: 1, 
    name: 'Amit', 
    initial: 'A', 
    statusColor: 'green', 
    email: 'amit@traincapetech.in', 
    phone: '+91 96650 54555', 
    activities: true, 
    country: '' 
  },
  { 
    id: 2, 
    name: 'TTTT', 
    initial: 'T', 
    statusColor: 'purple', 
    email: 'amit@traincapetech.in', 
    phone: '', 
    activities: true, 
    country: 'India' 
  },
  { 
    id: 3, 
    name: 'TTTT, amir', 
    initial: 'T', 
    statusColor: 'orange', 
    email: 'abc@gmail.com', 
    phone: '+91 1234 567 890', 
    activities: true, 
    country: '' 
  },
  { 
    id: 3, 
    name: 'TTTT, amir', 
    initial: 'T', 
    statusColor: 'orange', 
    email: 'abc@gmail.com', 
    phone: '+91 1234 567 890', 
    activities: true, 
    country: '' 
  },
  { 
    id: 1, 
    name: 'Amit', 
    initial: 'A', 
    statusColor: 'green', 
    email: 'amit@traincapetech.in', 
    phone: '+91 96650 54555', 
    activities: true, 
    country: '' 
  },
  { 
    id: 3, 
    name: 'TTTT, amir', 
    initial: 'T', 
    statusColor: 'orange', 
    email: 'abc@gmail.com', 
    phone: '+91 1234 567 890', 
    activities: true, 
    country: '' 
  },
  // ... more customer objects
];

function Customer({ customers = customerData }) {
  

    const [showOptionsCustomer, setShowOptionsCustomer] = useState(false);
      const OptionCustomerRef = useRef(null);
    
  useEffect(() => {
    function handleClickOutside(event) {
      if (OptionCustomerRef.current && !OptionCustomerRef.current.contains(event.target)) {
        setShowOptionsCustomer(false); // close if clicked outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const renderInitialBadge = (initial, color) => (
    <div 
      className="initial-badge" 
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  );

  return (
    <div className="customer-table-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th> {/* Checkbox column */}
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Activities</th>
            <th>Country</th>
            <th><button className="sort-icon"   onClick={() => setShowOptionsCustomer(!showOptionsCustomer)}>⇵</button></th> {/* Sort/Settings Icon */}
          </tr>
        </thead>
        {showOptionsCustomer && (
          <div ref={OptionCustomerRef}>
            <CustomerFieldSelectionPopup />
          </div>
        )}
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              {/* Checkbox Column */}
              <td>
                <input type="checkbox" />
              </td>

              {/* Name Column (Badge + Name) */}
              <td className="customer-name-cell">
                <div className="name-content">
                  {renderInitialBadge(customer.initial, customer.statusColor)}
                  <span>{customer.name}</span>
                </div>
              </td>

              {/* Email Column */}
              <td>{customer.email}</td>

              {/* Phone Column */}
              <td>{customer.phone}</td>

              {/* Activities Column (Icon) */}
              <td>
                {customer.activities && (
                  <div className="activity-icon-container">
                    <span className="activity-icon">
                      {/* Placeholder for a circular icon, maybe an eye or info symbol */}
                      &#x24D8; 
                    </span>
                  </div>
                )}
              </td>

              {/* Country Column */}
              <td>{customer.country}</td>
              
              {/* Empty Column for alignment/spacer */}
              <td></td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default Customer;


const CustomerFieldSelectionPopup = ({ onSelectField }) => {

  const fields = [
    "Created on", "Customer", "Contact Name", "City", "State", "Salesperson",
    "Sales Team", "Priority", "Activities", "Activity by", "My Deadline",
    "Campaign", "Medium", "Source", "Expected Revenue", "Expected Closing",
    "Stage", "Probability (%)", "Lost Reason", "Tags",
  ];

  return (
    <div className="customer-fields-menu-container">
      <ul className="customer-fields-list">
        {fields.map((field, index) => (
          <li className="customer-field-item" key={index}>
            <label className="customer-checkbox-container">
              {/* bind onChange here */}
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    onSelectField(field);
                  }
                }}
              />
              <span className="customer-checkmark"></span>
              <span className="customer-field-name">{field}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

};