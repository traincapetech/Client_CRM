

import './ConfigActivityPlans.css'
const ConfigActivityPlans = () => {
    return (
        <div className="configActivityPlans-table-container">
            {/* Header Row */}
            <div className="configActivityPlans-header">
                <div className="configActivityPlans-header-cell configActivityPlans-checkbox">
                    <input type="checkbox" className="configActivityPlans-table-checkbox header-checkbox" />
                </div>
                <div className="configActivityPlans-header-cell">Sales Team</div>
                <div className="configActivityPlans-header-cell">Alias</div>
                <div className="configActivityPlans-header-cell">Team Leader</div>
            </div>

            {/* Data Rows */}
            <div className="configActivityPlans-body">
                <div className="configActivityPlans-row">
                    <div className="configActivityPlans-cell configActivityPlans-checkbox">
                        <input type="checkbox" className="configActivityPlans-table-checkbox" />
                    </div>
                    <div className="configActivityPlans-cell configActivityPlans-team">Sales</div>
                    <div className="configActivityPlans-cell configActivityPlans-alias">email</div>
                    <div className="configActivityPlans-cell configActivityPlans-leader">
                        <div className="configActivityPlans-leader-badge">✓</div>
                        username
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigActivityPlans;
