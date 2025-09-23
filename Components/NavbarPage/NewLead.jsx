
import { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
// import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteIcon from "@mui/icons-material/Delete";
import "./NewLead.css";

function NewLead({ onAdd,onClose }) {
    const [rating, setRating] = useState(0);
    const [company, setCompany] = useState("");
    const [opportunity, setOpportunity] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [value, setValue] = useState(0);

    const handleAdd = () => {
        const leadData = { company, opportunity, email, phone, value, rating };
        onAdd(leadData); // pass data back to PipelinePage
    };

    return (
        <div className="opportunity-card">
            <div className="input-group">
                <BusinessIcon className="icon" />
                <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>

            <div className="input-group">
                <WorkIcon className="icon" />
                <input type="text" placeholder="Opportunity's Name" value={opportunity} onChange={(e) => setOpportunity(e.target.value)} />
            </div>

            <div className="input-group">
                <MailIcon className="icon" />
                <input type="email" placeholder="Contact Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="input-group">
                <PhoneIcon className="icon" />
                <input type="number" placeholder="Contact Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="value-rating">
                <div className="input-group">
                    <CurrencyRupeeIcon className="icon" />
                    <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <div className="stars">
                    {[1, 2, 3].map((star) => {
                        let title = star === 1 ? "Priority: Medium" : star === 2 ? "Priority: High" : "Priority: Very High";
                        return (
                            <span
                                key={star}
                                title={title}
                                onClick={() => setRating(star)}
                                className={`star ${rating >= star ? "selected" : ""}`}
                            >
                                ★
                            </span>
                        );
                    })}
                </div>
            </div>

            <div className="buttons">
                <div className="left-buttons">
                    <button className="add-btn" onClick={handleAdd} >
                        Add
                    </button>
                    <button className="edit-btn" >Edit</button>
                </div>
                <button className="right-button" onClick={onClose} >
                    <DeleteIcon fontSize="small" />
                </button>
            </div>
        </div>
    );
}

export default NewLead

