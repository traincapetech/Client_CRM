import { useState, useEffect } from 'react';
import './TeamConfig.css';
import { VscSettings } from "react-icons/vsc";

const TeamConfig = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const Username = user?.firstName ?? "";
  const email = user?.email ?? "abc@gmail.com";

  return (
    <div className="configTeam-table-container">
      {/* Header Row */}
      <div className="configTeam-header">
        <div className="configTeam-header-cell configTeam-checkbox">
          <input type="checkbox" className="configTeam-table-checkbox header-checkbox" />
        </div>
        <div className="configTeam-header-cell">Sales Team</div>
        <div className="configTeam-header-cell">Alias</div>
        <div className="configTeam-header-cell">Team Leader</div>
        <div  className="configTeam-header-cell"> <VscSettings size={16} color='#212121'/></div>
      </div>

      {/* Data Rows */}
      <div className="configTeam-body">
        <div className="configTeam-row">
          <div className="configTeam-cell configTeam-checkbox">
            <input type="checkbox" className="configTeam-table-checkbox" />
          </div>
          <div className="configTeam-cell configTeam-team">Sales</div>
          <div className="configTeam-cell configTeam-alias">{email}</div>
          <div className="configTeam-cell configTeam-leader">
            <div className="configTeam-leader-badge">✓</div>
            {Username}
          </div>
           <div className="configTeam-cell configTeam-team"></div>
        </div>
      </div>
    </div>
  );
};

export default TeamConfig;
