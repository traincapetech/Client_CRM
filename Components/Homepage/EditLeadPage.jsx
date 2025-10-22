import { useState,useEffect } from 'react';
import './EditLeadPage.css';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import DatePicker from 'react-datepicker'; // 💡 Import the DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // 💡 Import the DatePicker styles
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PersonIcon from '@mui/icons-material/Person';
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { LeadContext } from "../../leadProvider/LeadContext";



// Link to the external CSS file
// ===============================================
// Reusable Components 
// ===============================================
// Helper component for standard editable fields


const EditableField = ({ label, type = 'text', initialValue, className }) => (
    <div className={`info-field ${className || ''}`}>
        {/* Only show info icon if the label includes a '?' */}
        <span className="info-label">{label} {label.includes('?') && <i className="fas fa-info-circle"></i>}</span>
        <input
            type={type}
            defaultValue={initialValue}
            className="editable-input"
            placeholder={`Enter ${label.replace(' ?','')}`}
        />
    </div>
);

// Helper component for address fields in the Contacts tab
const AddressField = ({ placeholder }) => (
    <div className="info-field contact-info-field">
        <span className="info-label address-placeholder-label">{placeholder}</span>
        <input
            type="text"
            defaultValue=""
            placeholder={placeholder}
            className="editable-input contact-input"
        />
    </div>
);

// ===============================================
// NEW: Date Picker Field Component
// ===============================================
const DatePickerField = ({ label, initialValue }) => {
    // State for the selected date. DatePicker works best with a Date object or null.
    // We'll initialize it by trying to parse the initial string, or null if it fails.
    const [selectedDate, setSelectedDate] = useState(
        initialValue === "No closing estimate" ? null : new Date(initialValue)
    );

    // Function to format the display value for the input
    const displayValue = selectedDate
        ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : initialValue;

    return (
        <div className="info-field datepicker-info-field">
            <span className="info-label">{label} <i className="fas fa-info-circle"></i></span>

            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                customInput={
                    <input
                        className="editable-input date-input-custom"
                        value={displayValue}
                        readOnly // Prevent manual typing
                    />
                }
                dateFormat="MMM d, yyyy"
                placeholderText={initialValue}
                popperClassName="custom-datepicker-popper" // Custom class for styling the popup position
            />
        </div>
    );
};


// ===============================================
// Contacts Tab Content Component
// ===============================================

const OpportunityContactsTab = ({ EditableField }) => {
    return (
        <div className="contact-tab-content">
            <div className="contact-info-grid">

                {/* --- LEFT COLUMN: Company Information & Marketing --- */}
                <div className="info-column left-column">

                    <h3 className="section-header">COMPANY INFORMATION</h3>

                    <EditableField label="Company Name ?" initialValue="TTTT" className="contact-info-field" />

                    <div className="address-group">
                        <span className="info-label">Address</span>
                        <div className="address-fields">
                            <AddressField placeholder="Street 1..." />
                            <AddressField placeholder="Street 2..." />
                            <AddressField placeholder="City" />

                            <div className="zip-state-row">
                                <AddressField placeholder="ZIP" />
                                <AddressField placeholder="State" />
                            </div>
                            <AddressField placeholder="Country" />
                        </div>
                    </div>

                    <h3 className="section-header marketing-header">MARKETING</h3>
                    <EditableField label="Campaign ?" initialValue="" className="contact-info-field" />
                    <EditableField label="Medium ?" initialValue="" className="contact-info-field" />
                    <EditableField label="Source ?" initialValue="" className="contact-info-field" />
                    <EditableField label="Referred By" initialValue="" className="contact-info-field" />

                </div>

                {/* --- RIGHT COLUMN: Contact Information & Ownership --- */}
                <div className="info-column right-column">

                    <h3 className="section-header">CONTACT INFORMATION</h3>
                    <EditableField label="Contact Name" initialValue="" className="contact-info-field" />
                    <EditableField label="Job Position" initialValue="" className="contact-info-field" />

                    {/* Custom Website Field to include the example placeholder */}
                    <div className="info-field contact-info-field">
                        <span className="info-label">Website ? <i className="fas fa-info-circle"></i></span>
                        <input
                            type="text"
                            defaultValue=""
                            placeholder="e.g. https://www.Traincapetech.com"
                            className="editable-input contact-input"
                        />
                    </div>

                    <h3 className="section-header ownership-header">OWNERSHIP</h3>
                    <EditableField label="Sales Team" initialValue="Sales" className="contact-info-field" />

                </div>
            </div>
        </div>
    );
};


// ===============================================
// Main Page Component
// ===============================================

const EditLeadPage = () => {
    const [activeTab, setActiveTab] = useState('Notes'); // State to manage active tab
    const [value, setValue] = useState(2);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isFollowerVisible, setIsFollowerVisible] = useState(false);

    const { col, index } = useParams();
    const { leads } = useContext(LeadContext);

    // Get the specific lead
    const lead = leads[col]?.[index];

    if (!lead) {
        return <div>Lead not found!</div>;
    }

    useEffect(() => {
        if (lead && lead.star !== undefined) {
            setValue(lead.star);
        }
    }, [lead]);

    // Now you can use lead.company, lead.value, lead.rating, etc.
    // Use them as initialValue in your input fields.


    // Function to toggle the state (true <-> false)
    const handleSearchClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };
    const userhandle = () => {
        setIsFollowerVisible(!isFollowerVisible)
    }
    // Conditional rendering function for the tab content
    const renderTabContent = () => {
        if (activeTab === 'Notes') {
            return (
                <textarea
                    className="description-textarea"
                    placeholder="Add a description..."
                    defaultValue=""
                ></textarea>
            );
        } else if (activeTab === 'Contacts') {
            // Render the Contacts form, passing the EditableField component
            return <OpportunityContactsTab EditableField={EditableField} />;
        }
    };


    return (
        <div className="crm-container">
            {/* --- Top Navigation Bar --- */}
            <header className="header-bar">
                <div className="status-buttons">
                    <button className="status-button won">Won</button>
                    <button className="status-button lost">Lost</button>
                </div>
                <nav className="pipeline-stages">
                    <button className="stage-button new active">New 1m</button>
                    <span className="stage-separator">&gt;</span>
                    <button className="stage-button">Proposition</button>
                    <span className="stage-separator">&gt;</span>
                    <button className="stage-button">Qualified</button>
                    <span className="stage-separator">&gt;</span>
                    <button className="stage-button">Won</button>
                    <span className="stage-separator">&gt;</span>
                    <button className="stage-button">lost</button>
                    <span className="stage-separator">&gt;</span>
                    <button className="stage-button">asdf</button>
                </nav>

            </header>

            {/* --- Main Content Area --- */}
            <main className="opportunity-main-content">
                {/* --- Left Column: Details --- */}
                <section className="opportunity-details-panel">

                    {/* Opportunity Title (Editable) */}
                    <input
                        type="text"
                        defaultValue={lead.company || "TTTT Opp"}
                        className="opportunity-title-input"
                    />

                    {/* Key Metrics Row (Editable) */}
                    <div className="metrics-row">
                        <div className="metric-item">
                            <span className="metric-label">Expected Revenue <i className="fas fa-info-circle"></i></span>
                            <div className="editable-metric-group">
                                <span className="currency-symbol">₹</span>
                                <input
                                    type="number"
                                    defaultValue={lead.value || "5445.00"}
                                    className="metric-value amount editable-input"
                                />
                            </div>
                        </div>
                        <div className="metric-item probability">
                            <span className="metric-label">Probability <i className="fas fa-info-circle"></i></span>
                            <div className="editable-metric-group">
                                <span className="at-text">at</span>
                                <input
                                    type="number"
                                    defaultValue="50.00"
                                    className="metric-value percentage editable-input"
                                />
                                <span className="percent-symbol">%</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact and Sales Info (Editable) */}
                    <div className="info-grid">
                        <div className="info-group contact-info">
                            <EditableField label="Contact" initialValue="" />
                            <EditableField label="Email" type="email" initialValue={lead.email || "abc3@gmail.com"} />
                            <EditableField label="Phone" type="tel" initialValue={lead.phone || "455678912"} />
                        </div>

                        <div className="info-group sales-info">
                            <div className="info-field">
                                <span className="info-label">
                                    Salesperson <i className="fas fa-info-circle"></i>
                                </span>

                                <div className="salesperson editable-select-wrapper">
                                    <span className="salesperson-avatar">A</span>
                                    <select className="editable-select" defaultValue="Amit">
                                        <option value="Amit">Amit</option>
                                        <option value="saurav@traincapetech.in">saurav@traincapetech.in</option>
                                        <option value="search">Search more...</option>
                                    </select>
                                </div>
                            </div>


                            {/* ========== UPDATED FIELD WITH DATE PICKER ========== */}
                            <div className="expected-closing-wrapper">
                                {/* Replace the old input div with the new DatePickerField */}
                                <DatePickerField
                                    label="Expected Closing ?"
                                    initialValue="No closing estimate"
                                />
                                <div className="rating">
                                    <Box sx={{ '& > legend': { mt: 2 } }}>
                                        <Rating
                                            name="simple-controlled"
                                            value={value ?? lead.star ?? 0} // ✅ Show existing stars or default 0
                                            max={3}
                                            onChange={(event, newValue) => {
                                                setValue(newValue); // ✅ Updates UI immediately
                                            }}
                                        />
                                    </Box>
                                </div>
                            </div>
                            {/* ==================================================== */}

                            <EditableField label="Tags" initialValue="" />
                        </div>
                    </div>

                    {/* Notes/Contacts Tabs and Content Area */}
                    <div className="bottom-tabs-area">
                        <div className="tabs">
                            <button
                                className={`tab-button ${activeTab === 'Notes' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Notes')}
                            >
                                Notes
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'Contacts' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Contacts')}
                            >
                                Contacts
                            </button>
                        </div>

                        <div className="description-area tab-content-wrapper">
                            {renderTabContent()}
                        </div>
                    </div>
                </section>

                {/* --- Right Column: Activity Log --- */}
                <aside className="activity-log-panel">
                    <div className='activity-log-panel-header' >
                        <div className="header-actions">
                            <button className="action-button-edit primary">Send message</button>
                            <button className="action-button-edit">Log note</button>
                            <button className="action-button-edit">Activity</button>
                            {/* Note: Font Awesome icons (i tags) assumed to be available */}
                            <button className="action-icon search-icon" aria-label="Search"><i className="fas fa-search"></i></button>
                            <button className="action-icon user-icon" aria-label="User profile"><i className="fas fa-user"></i></button>
                        </div>
                        <div className='activity-log-panel-right'>
                            {/* Search Icon Button */}
                            <button className='activity-log-panel-right-btn'
                                onClick={handleSearchClick}
                            ><SearchIcon />
                            </button>
                            <button className='activity-log-panel-right-btn'>
                                < AttachFileIcon />
                            </button>
                            <div onClick={userhandle}>
                                <button className='activity-log-panel-right-btn'> < PersonIcon /></button>
                                <span className='userNumber'>1</span>
                            </div>
                            {/* Conditional Rendering of the Search Input Box */}
                            {isSearchVisible && (
                                <div className='editsearchbox'>
                                    <input
                                        type="text"
                                        placeholder="Search here..."
                                        autoFocus
                                    />
                                </div>
                            )}
                            {isFollowerVisible && (
                                <div className="followers-menu-popup">
                                    <div className="menu-item unfollow">
                                        <span>Unfollow</span>
                                        <i className="fas fa-pencil-alt"></i> {/* Pencil icon for edit */}
                                    </div>
                                    <div className="menu-item add-followers">
                                        Add Followers
                                    </div>
                                </div>
                            )}
                        </div>



                    </div>
                    <p className="activity-date-header">Today</p>
                    <div className="activity-item">
                        <div className="activity-avatar">A</div>
                        <div className="activity-content">
                            <p className="activity-meta">
                                <span className="activity-user">Amit</span>
                                <span className="activity-timestamp">11:01 am</span>
                            </p>
                            <p className="activity-text">Lead/Opportunity created</p>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default EditLeadPage;