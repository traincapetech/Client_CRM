import './Lost_Reason.css'
const Lost_Reason = () => {
    return (
       <div className="tags-container">
            {/* Header Row */}
            <div className="tags-header">
                <div className="tags-header-cell tags-checkbox">
                    <input type="checkbox" className="tags-table-checkbox header-checkbox" />
                    <div className="tags-header-cell">Description</div>
                </div>
                <div className="tags-header-cell">Color</div>
            </div>

            {/* Data Rows */}
            <div className="tags-body">
                <div className="tags-row">
                    <div className="tags-cell tags-checkbox">
                        <input type="checkbox" className="tags-table-checkbox" />
                        <div className="tags-cell tags-team">Too expensive</div>
                        
                    </div>

                </div>
                <div className="tags-row">
                    <div className="tags-cell tags-checkbox">
                        <input type="checkbox" className="tags-table-checkbox" />
                        <div className="tags-cell tags-team">We don't have people/skills</div>
                    </div>

                </div>
                <div className="tags-row">
                    <div className="tags-cell tags-checkbox">
                        <input type="checkbox" className="tags-table-checkbox" />
                        <div className="tags-cell tags-team">Not enough stock</div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Lost_Reason;
