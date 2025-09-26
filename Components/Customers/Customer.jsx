import "./Customer.css";
import { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";

function Customer() {
    const [columns, setColumns] = useState([
        { name: "Name", data: ["Amit Yadav", "Riya Sharma", "John Doe"] },
        { name: "Email", data: ["amit@example.com", "riya@example.com", "john@example.com"] },
        { name: "Phone", data: ["+91-9876543210", "+91-9123456780", "+1-555-123-4567"] },
        { name: "Country", data: ["India", "India", "USA"] },
        { name: "Activity", data: ["Call", "Meeting", "Email"] },
        { name: "City", data: ["Delhi", "UP", "J&K"] }
    ]);

    const [showOptionsCustomer, setShowOptionsCustomer] = useState(false);

    return (
        <div className="customer-page-container">
            <div className="customer-pipeline-scroll">
                {columns.map((col, index) => (
                    <div className="customer-pipeline-card" key={index}>
                        <div className="customer-pipeline-card-header">
                            {col.name}
                        </div>


                        <div className="customer-pipeline-card-body">
                            {col.data.map((item, idx) => (
                                <div className="customer-pipeline-card-item" key={idx}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    className="customer-sort-option"
                    onClick={() => setShowOptionsCustomer(!showOptionsCustomer)}
                >
                    <SortIcon />
                </button>
                {showOptionsCustomer && (
                    <div className="customer-option-dropdown-field">
                        <CustomerFieldSelectionPopup
                            onSelectField={(field) => {
                                if (!columns.find((c) => c.name === field)) {
                                    setColumns([...columns, { name: field, data: [] }]);
                                    // 👇 remove auto-close here
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Customer;

// Field Selection Popup
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
