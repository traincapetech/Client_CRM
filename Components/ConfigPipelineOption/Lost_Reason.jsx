import './Lost_Reason.css'
const Lost_Reason = () => {
    return (
        <div className="lostReason-container">
            {/* Header Row */}
            <div className="LostReason-header">
                <div className="LostReason-header-cell LostReason-checkbox">
                    <input type="checkbox" className="LostReason-table-checkbox header-checkbox" />
                    <div className="LostReason-header-cell">Tag Name</div>
                </div>
                <div className="LostReason-header-cell">Color</div>
            </div>

            {/* Data Rows */}
            <div className="LostReason-body">
                <div className="LostReason-row">
                    <div className="LostReason-cell LostReason-checkbox">
                        <input type="checkbox" className="LostReason-table-checkbox" />
                        <div className="LostReason-cell LostReason-team">need urgent</div>
                    </div>
                    <div>
                        <div className="LostReason-cell LostReason-alias">color</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lost_Reason;
