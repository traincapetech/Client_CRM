import "./Team.css"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmailIcon from '@mui/icons-material/Email';
import { useState,useEffect } from "react";


function Team() {
    
  const [user, setUser] = useState(null);
  const [OpenTeamOption,setOpenTeamOption]=useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const firstLetter = user?.firstName ? user.firstName.charAt(0).toUpperCase() : "";
  const email=user?.email ?? "abc@gmail.com";
    return (
        <div className="contact-card">
            <div className="contact-card-border"></div>
            <div className="contact-card-content">
                <div className="card-header">
                    <h3 className="card-title-sales">Sales</h3>
                    <button className="options-menu" onClick={()=>setOpenTeamOption(!OpenTeamOption)}>
                       <MoreVertIcon />
                    </button>
                    <div className="opened-editCard">
                    {OpenTeamOption && <OpenEditOptionInTeam />}
                </div>
                </div>
                <div className="card-email">
                    <span className="email-icon"> <EmailIcon sx={{color:"#a1917d"}} /></span>
                    <span className="email-address">{email}</span>
                </div>
            </div>
            <div className="card-action">
                <button className="action-button">{firstLetter}</button>
            </div>
        </div>

    )
}

export default Team


const OpenEditOptionInTeam=()=>{
    
    return (
       <div className="dropdown-menu">
      <div className="dropdown-columns">
        <div className="menu-column">
          <h4 className="column-title">View</h4>
          <ul className="menu-list">
            <li className="menu-item">Opportunities</li>
          </ul>
        </div>
        <div className="menu-column">
          <h4 className="column-title">New</h4>
          <ul className="menu-list">
            <li className="menu-item">Opportunity</li>
          </ul>
        </div>
        <div className="menu-column">
          <h4 className="column-title">Reporting</h4>
          <ul className="menu-list">
            <li className="menu-item">Opportunities</li>
            <li className="menu-item">Activities</li>
          </ul>
        </div>
      </div>
      <hr className="menu-divider" />
      <div className="dropdown-footer">
        <div className="color-palette">
          <div className="color-row">
            <div className="color-box red"></div>
            <div className="color-box orange"></div>
            <div className="color-box yellow"></div>
            <div className="color-box blue"></div>
            <div className="color-box purple"></div>
          </div>
          <div className="color-row">
            <div className="color-box brown"></div>
            <div className="color-box cyan"></div>
            <div className="color-box green"></div>
            <div className="color-box pink"></div>
            <div className="color-box violet"></div>
          </div>
        </div>
        <div className="configuration-text">Configuration</div>
      </div>
    </div>
  
    )
}