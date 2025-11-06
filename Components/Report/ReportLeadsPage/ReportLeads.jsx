import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';

import "./ReportLeads.css"
import { useState } from 'react';

function ReportLeads(){

     const headerMonths = [
        { name: 'GreenColor', color: 'green' },
        { name: 'RedColor', color: 'red' },
        { name: 'BlueColor', color: 'blue' },
        { name: 'PinkColor', color: 'pink' },
    ];
    const BarValue = ["September 2025", "October 2025", "November 2025", "December 2025"]
    const hasData = false; 
    const [showMeasureOption, setShowMeasureOption] = useState(false)

    function handleShowOption() {
        setShowMeasureOption(!showMeasureOption)
    }

    const [activeReportBtn, setActiveReportBtn] = useState("reportlead-icon-btn");
    const getClassOfReportBtn = (name) =>
        `reportlead-icon-btn ${activeReportBtn === name ? "reportlead-active" : ""}`;

    return (
         <div className="reportlead-dashboard-container">
            {/* 1. Header/Toolbar Area */}
            <div className="reportlead-toolbar-header">
                {/* Left Side */}
                <div className="reportlead-toolbar-left">
                    <button className="reportlead-measures-dropdown" onClick={handleShowOption}>
                        {showMeasureOption ? "Measures ▲ " : "Measures ▼"}
                    </button>
                    {showMeasureOption ? <ShowMeasureOptions /> : null}
                    <button className="reportlead-insert-spreadsheet">
                        Insert Spreadsheet
                    </button>
                    <div className="reportlead-view-icons">
                        <button title="Chart View" className={getClassOfReportBtn("reportlead-icon-btn")} onClick={() => setActiveReportBtn("reportlead-icon-btn")}><BarChartIcon /></button>
                        <button className={getClassOfReportBtn("reportlead-pie-chart-btn")} onClick={() => setActiveReportBtn("reportlead-pie-chart-btn")} title="PieChart View"><PieChartIcon /></button>
                        <button className={getClassOfReportBtn("reportlead-table-btn")} onClick={() => setActiveReportBtn("reportlead-table-btn")} title="Stack View"><TableRowsIcon /></button>
                        <button className={getClassOfReportBtn("reportlead-pivot-table-btn")} onClick={() => setActiveReportBtn("reportlead-pivot-table-btn")} title="Pivot Table"><PivotTableChartIcon /></button>
                        <button className={getClassOfReportBtn("reportlead-list-btn")} onClick={() => setActiveReportBtn("reportlead-list-btn")} title="List View"><FormatListBulletedIcon /></button>
                        <button className={getClassOfReportBtn("reportlead-cumulative-btn")} onClick={() => setActiveReportBtn("reportlead-cumulative-btn")} title="Cumulative View"><SignalCellularAltOutlinedIcon /></button>
                        <button className={getClassOfReportBtn("reportlead-descending-btn")} onClick={() => setActiveReportBtn("reportlead-descending-btn")} title="Descending Order"><KeyboardDoubleArrowDownOutlinedIcon /></button>
                        <button className={getClassOfReportBtn("reportlead-ascending-btn")} onClick={() => setActiveReportBtn("reportlead-ascending-btn")} title="Ascending Order"><KeyboardDoubleArrowUpOutlinedIcon /></button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="reportlead-toolbar-right">
                    <div className="reportlead-header-legend">
                        {headerMonths.map((month, index) => (
                            <span key={index} className={`reportlead-legend-item reportlead-legend-${month.color}`}>
                                {month.name}
                            </span>
                        ))}
                    </div>
                    <div className="reportlead-sample-data-banner">
                        SAMPLE DATA
                    </div>
                </div>
            </div>

            {/* 2. Main Content */}
            <div className="reportlead-main-content">
                <div className="reportlead-chart-area">
                    {hasData ? (
                        <ChartComponent data={[]} />
                    ) : (
                        <div className="reportlead-no-data-placeholder">
                            <h3 className="reportlead-no-data-title">
                                No data to display
                            </h3>
                            <p className="reportlead-no-data-tip">
                                Try to add some records, or make sure that there is no active filter in the search bar.
                            </p>
                        </div>
                    )}

                    {/* Background elements */}
                    <div className="reportlead-background-chart-elements">
                        <div className="reportlead-x-axis-labels">
                            {BarValue.map((textOnBar, index) => (
                                <div className="reportlead-x-axis-label" key={index}>{textOnBar}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportLeads

const ShowMeasureOptions = () => {
    const [selectedMeasureOption, setSelectedMeasureOption] = useState([])
    const measureOptions = [
        "Days to Assign",
        "Days to Close",
        "Days To Convert",
        "Exceeded Closing Days",
        "Expected Revenue",
        "Prorated Revenue",
    ]

    const handleMeasureOptionClick = (opt) => {
        setSelectedMeasureOption((prev) =>
            prev.includes(opt)
                ? prev.filter((item) => item !== opt)
                : [...prev, opt]
        );
    };

    const [showCountOptionPipeline, setShowCountOptionPipeline] = useState(false)

    return (
        <div className='reportlead-measure-options-container'>
            {measureOptions.map((opt, index) => (
                <div key={index} className="reportlead-measure-option" onClick={() => handleMeasureOptionClick(opt)}>
                    <span className="reportlead-checkbox">
                        {selectedMeasureOption.includes(opt) ? '✔️' : ''}
                    </span>
                    {opt}
                </div>
            ))}
            <hr />
            <div className="reportlead-measure-count" onClick={() => setShowCountOptionPipeline(!showCountOptionPipeline)}>
                {showCountOptionPipeline ? '✔️' : ''} Count
            </div>
        </div>
    )
}
