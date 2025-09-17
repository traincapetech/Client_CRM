
import { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteIcon from "@mui/icons-material/Delete";
import "./NewLead.css";

function NewLead() {
    {
        const [rating, setRating] = useState(0);

        return (
            <div className="opportunity-card">
                <div className="input-group">
                    <BusinessIcon className="icon" />
                    <input type="text" placeholder="Company" />
                </div>

                <div className="input-group">
                    <WorkIcon className="icon" />
                    <input type="text" placeholder="Opportunity's Name" />
                </div>

                <div className="input-group">
                    <MailIcon className="icon" />
                    <input type="email" placeholder="Contact Email" />
                </div>

                <div className="input-group">
                    <PhoneIcon className="icon" />
                    <input type="number" placeholder="Contact Phone" />
                </div>

                <div className="value-rating">
                    <div className="input-group">
                        <CurrencyRupeeIcon className="icon" />
                        <input type="number" defaultValue="0.00" />
                    </div>
                    <div className="stars">
                        {[1, 2, 3].map((star) => {
                            let title = "";
                            if (star === 1) title = "Priority: Medium";
                            else if (star === 2) title = "Priority: High";
                            else if (star === 3) title = "Priority: Very High";

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
                        <button className="add-btn" onClick={()=>{alert("Added successfully")}}>
                            Add
                        </button>
                        <button className="edit-btn" onClick={()=>{alert("Request for edit")}}>Edit</button>
                    </div>
                    <button className="right-button" onClick={()=>{alert("Deleted")}}>
                        <DeleteIcon fontSize="small" />
                    </button>
                </div>
            </div>
        );
    }

}


export default NewLead