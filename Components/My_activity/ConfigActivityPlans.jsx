

import './ConfigActivityPlans.css'

const userData=[
    {name : "R12545",apply:"Rahul",stepcount:"41"},
    {name : "R1254",apply:"Amit",stepcount:"1"},
    {name : "R1245",apply:"Ayush",stepcount:"11"}
]

const ConfigActivityPlans = () => {
    return (
        <div className="configActivityPlans-table-container">
            {/* Header Row */}
            <div className="configActivityPlans-header">
                <div className="configActivityPlans-header-cell configActivityPlans-checkbox">
                    <input type="checkbox" className="configActivityPlans-table-checkbox header-checkbox" />
                </div>
                <div className="configActivityPlans-header-cell">Name</div>
                <div className="configActivityPlans-header-cell">Apply to</div>
                <div className="configActivityPlans-header-cell">Step Count</div>
            </div>

            {/* Data Rows */}
            <div className="configActivityPlans-body">
                {userData.map((items,index)=>( 
                <div className="configActivityPlans-row" key={index}>
                    <div className="configActivityPlans-cell configActivityPlans-checkbox">
                        <input type="checkbox" className="configActivityPlans-table-checkbox" />
                    </div>
                    <div className="configActivityPlans-cell configActivityPlans-team">{items.name}</div>
                    <div className="configActivityPlans-cell configActivityPlans-alias">{items.apply}</div>
                    <div className="configActivityPlans-cell configActivityPlans-leader">{items.stepcount}</div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default ConfigActivityPlans;
