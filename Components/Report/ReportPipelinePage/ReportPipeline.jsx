import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import "./ReportPipeline.css"
import { useState } from 'react';

function ReportPipeline() {

    const headerMonths = [
        { name: 'August 2025', color: 'green' },
        { name: 'September 2025', color: 'red' },
        { name: 'October 2025', color: 'blue' },
        { name: 'November 2025', color: 'pink' },
    ];
    const hasData = false; // Placeholder for the "No data" state
    const [showMesureOption, setshowMesureOption] = useState(false)

    function handleShowOption() {
        setshowMesureOption(!showMesureOption)
    }

    const [activeReportBtn, setActiveReportBtn] = useState("report-icon-btn");
    const getClassofPipeline = (name) =>
        `icon-btn-report ${activeReportBtn === name ? "active" : ""}`;


    return (
        <div className="dashboard-container">
            {/* 1. Header/Toolbar Area */}
            <div className="toolbar-header">
                {/* Left Side: Measures Dropdown and View Icons */}
                <div className="toolbar-left">
                    <button className="measures-dropdown" onClick={handleShowOption}>
                        {showMesureOption ? "Measures ▲ " : "Measures ▼"}
                    </button>
                    <button className="insertSpreadsheet">
                        insert Spreadsheet
                    </button>
                    <div className="view-icons">
                        <button title="Chart View" className={getClassofPipeline("report-icon-btn")} onClick={() => setActiveReportBtn("report-icon-btn")}><BarChartIcon /></button>
                        <button className={getClassofPipeline("pie-chart-btn")} onClick={() => setActiveReportBtn("pie-chart-btn")} title="PieChart View"><PieChartIcon /></button>
                        <button className={getClassofPipeline("table-btn")} onClick={() => setActiveReportBtn("table-btn")} title="Table View"><TableRowsIcon /></button>
                        <button className={getClassofPipeline("pivot-Table-btn")} onClick={() => setActiveReportBtn("pivot-Table-btn")} title="Pivot Table"><PivotTableChartIcon /></button>
                        <button className={getClassofPipeline("bulletedIcon-btn")} onClick={() => setActiveReportBtn("BulletedIcon-btn")} title="List View"><FormatListBulletedIcon /></button>
                    </div>
                </div>

                {/* Right Side: "SAMPLE DATA" Banner and Legend */}
                <div className="toolbar-right">
                    <div className="header-legend">
                        {headerMonths.map((month, index) => (
                            <span key={index} className={`legend-item legend-${month.color}`}>
                                {month.name}
                            </span>
                        ))}
                    </div>
                    <div className="sample-data-banner">
                        SAMPLE DATA
                    </div>
                </div>
            </div>

            {/* 2. Main Content/Chart Area */}
            <div className="main-content">
                <div className="chart-area">
                    {hasData ? (
                        // Component to render the actual chart data
                        <ChartComponent data={[]} />
                    ) : (
                        // "No Data" Placeholder
                        <div className="no-data-placeholder">
                            <h3 className="no-data-title">
                                No data to display
                            </h3>
                            <p className="no-data-tip">
                                Try to add some records, or make sure that there is no active filter in the search bar.
                            </p>
                        </div>
                    )}

                    {/* This section would hold the axis labels and partial bars seen in the background
              even when the "No data" message is present */}
                    <div className="background-chart-elements">
                        <div className="x-axis-labels">
                            <div className="x-axis-label">Lead/Call ID</div>
                            <div className="x-axis-label">Volus/Shared</div>
                            <div className="x-axis-label">Manager notes</div>
                            <div className="x-axis-label">Internal notes</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportPipeline