// import NavbarSettingsDropdown from "../Homepage/NavbarSettingsDropdown";
import "./Customer.css";
import { useState, useEffect, useRef } from "react";


// Sample customer data (ensure unique IDs)
const customerData = [
  { id: 1, name: "Amit", initial: "A", statusColor: "green", email: "amit@traincapetech.in", phone: "+91 96650 54555", activities: true, country: "" },
  { id: 2, name: "TTTT", initial: "T", statusColor: "purple", email: "amit@traincapetech.in", phone: "", activities: true, country: "India" },
  { id: 3, name: "TTTT, Amir", initial: "T", statusColor: "orange", email: "abc@gmail.com", phone: "+91 1234 567 890", activities: true, country: "" },
  { id: 4, name: "Rohan", initial: "R", statusColor: "blue", email: "rohan@gmail.com", phone: "+91 98765 43210", activities: false, country: "USA" },
  { id: 5, name: "Amit K", initial: "A", statusColor: "green", email: "amitk@traincapetech.in", phone: "+91 96650 12345", activities: true, country: "India" },
];

function Customer({ customers = customerData }) {
  const [showOptionsCustomer, setShowOptionsCustomer] = useState(false);
  const OptionCustomerRef = useRef(null);

  // const [customersState, setCustomersState] = useState(customers);
  // Close popup on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (OptionCustomerRef.current && !OptionCustomerRef.current.contains(event.target)) {
        setShowOptionsCustomer(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderInitialBadge = (initial, color) => (
    <div className="initial-badge" style={{ backgroundColor: color }}>
      {initial}
    </div>
  );

  return (
    
    <div className="customer-table-container" style={{ position: "relative" }}>
      
      <table className="customer-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Activities</th>
            <th>Country</th>
            <th>
              <button
                className="sort-icon"
                onClick={() => setShowOptionsCustomer(!showOptionsCustomer)}
              >
                ⇵
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id || index}>
              <td><input type="checkbox" /></td>
              <td className="customer-name-cell">
                <div className="name-content">
                  {renderInitialBadge(customer.initial, customer.statusColor)}
                  <span>{customer.name}</span>
                </div>
              </td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                {customer.activities && (
                  <div className="activity-icon-container">&#x24D8;</div>
                )}
              </td>
              <td>{customer.country}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup outside the table */}
      {showOptionsCustomer && (
        <div ref={OptionCustomerRef} className="customer-popup absolute-popup">
          <CustomerFieldSelectionPopup />
        </div>
      )}
    </div>
  );
}

export default Customer;

// ------------------ Customer Popup Component ------------------

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
              <input
                type="checkbox"
                onChange={(e) => e.target.checked && onSelectField?.(field)}
              />
              <span className="customer-checkmark"></span>
              <span className="customer-field-name">{field}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
