import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';

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
                    {showMesureOption ? <ShowMeasureOptions /> : ""}
                    <button className="insertSpreadsheet">
                        Insert Spreadsheet
                    </button>
                    <div className="view-icons">
                        <button title="Chart View" className={getClassofPipeline("report-icon-btn")} onClick={() => setActiveReportBtn("report-icon-btn")}><BarChartIcon /></button>
                        <button className={getClassofPipeline("pie-chart-btn")} onClick={() => setActiveReportBtn("pie-chart-btn")} title="PieChart View"><PieChartIcon /></button>
                        <button className={getClassofPipeline("table-btn")} onClick={() => setActiveReportBtn("table-btn")} title="Stack View"><TableRowsIcon /></button>
                        <button className={getClassofPipeline("pivot-Table-btn")} onClick={() => setActiveReportBtn("pivot-Table-btn")} title="Pivot Table"><PivotTableChartIcon /></button>
                        <button className={getClassofPipeline("list-btn")} onClick={() => setActiveReportBtn("list-btn")} title="List View"><FormatListBulletedIcon /></button>
                        <button className={getClassofPipeline("cumulative-btn")} onClick={() => setActiveReportBtn("cumulative-btn")} title="cumulative View"><SignalCellularAltOutlinedIcon /></button>
                        <button className={getClassofPipeline("descending-btn")} onClick={() => setActiveReportBtn("descending-btn")} title="Desending Order"><KeyboardDoubleArrowDownOutlinedIcon /></button>
                        <button className={getClassofPipeline("ascending-btn")} onClick={() => setActiveReportBtn("ascending-btn")} title="Ascending Order"><KeyboardDoubleArrowUpOutlinedIcon /></button>
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

const ShowMeasureOptions = () => {
    const [selectedMeasureOption, setselectedMeasureOption] = useState([])
    const measurOptions = [
        "Days to Assign",
        "Days to Close",
        "Days To Convert",
        "Exceeded Closing Days",
        "Expected Revenue",
        "Prorated Revenue",

    ]
    const handleMeasureOptionClick = (Opt) => {
        setselectedMeasureOption((prev) =>
            prev.includes(Opt)
                ? prev.filter((item) => item !== Opt)
                : [...prev, Opt]
        );
    };

    const [showCountOptionPipeline, setshowCountOptionPipeline] = useState(false)


    return (
        <div className='measureOption-container'>
            {measurOptions.map((Opt, index) => (
                <div key={index} onClick={() => handleMeasureOptionClick(Opt)}>
                    <span className="checkbox">
                        {selectedMeasureOption.includes(Opt) ? '✔️' : ''}
                    </span>
                    {Opt}</div>
            ))}
            <hr />
            <div onClick={() => setshowCountOptionPipeline(!showCountOptionPipeline)}>
                {showCountOptionPipeline ? '✔️' : ''}
                Count
            </div>
        </div>

    )
}