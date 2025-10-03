import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';

import "./ReportActivity.css"
import { useState } from 'react';

function ReportActivity() {

    const headerMonths = [
        { name: 'GreenColor', color: 'green' },
        { name: 'RedColor', color: 'red' },
        { name: 'BlueColor', color: 'blue' },
        { name: 'PinkColor', color: 'pink' },
    ];
    const BarValue = ["September 2025", "October 2025", "November 2025", "December 2025"]
    const hasData = false; // Placeholder for the "No data" state
    const [showMeasureOption, setShowMeasureOption] = useState(false)

    function handleShowOption() {
        setShowMeasureOption(!showMeasureOption)
    }

    const [activeReportBtn, setActiveReportBtn] = useState("report-icon-btn");
    const getClassOfReportBtn = (name) =>
        `report-icon-btn ${activeReportBtn === name ? "report-active" : ""}`;


    return (
        <div className="report-dashboard-container-Activity">
            {/* 1. Header/Toolbar Area */}
            <div className="report-toolbar-header">
                {/* Left Side: Measures Dropdown and View Icons */}
                <div className="report-toolbar-left">
                    <button className="report-measures-dropdown" onClick={handleShowOption}>
                        {showMeasureOption ? "Measures ▲ " : "Measures ▼"}
                    </button>
                    {showMeasureOption ? <ShowMeasureOptions /> : null}
                    <button className="report-insert-spreadsheet">
                        Insert Spreadsheet
                    </button>
                    <div className="report-view-icons">
                        <button title="Chart View" className={getClassOfReportBtn("report-icon-btn")} onClick={() => setActiveReportBtn("report-icon-btn")}><BarChartIcon /></button>
                        <button className={getClassOfReportBtn("pie-chart-btn")} onClick={() => setActiveReportBtn("pie-chart-btn")} title="PieChart View"><PieChartIcon /></button>
                        <button className={getClassOfReportBtn("table-btn")} onClick={() => setActiveReportBtn("table-btn")} title="Stack View"><TableRowsIcon /></button>
                        <button className={getClassOfReportBtn("pivot-table-btn")} onClick={() => setActiveReportBtn("pivot-table-btn")} title="Pivot Table"><PivotTableChartIcon /></button>
                        <button className={getClassOfReportBtn("list-btn")} onClick={() => setActiveReportBtn("list-btn")} title="List View"><FormatListBulletedIcon /></button>
                        <button className={getClassOfReportBtn("cumulative-btn")} onClick={() => setActiveReportBtn("cumulative-btn")} title="Cumulative View"><SignalCellularAltOutlinedIcon /></button>
                        <button className={getClassOfReportBtn("descending-btn")} onClick={() => setActiveReportBtn("descending-btn")} title="Descending Order"><KeyboardDoubleArrowDownOutlinedIcon /></button>
                        <button className={getClassOfReportBtn("ascending-btn")} onClick={() => setActiveReportBtn("ascending-btn")} title="Ascending Order"><KeyboardDoubleArrowUpOutlinedIcon /></button>
                    </div>
                </div>

                {/* Right Side: "SAMPLE DATA" Banner and Legend */}
                <div className="report-toolbar-right">
                    <div className="report-header-legend">
                        {headerMonths.map((month, index) => (
                            <span key={index} className={`report-legend-item report-legend-${month.color}`}>
                                {month.name}
                            </span>
                        ))}
                    </div>
                    <div className="report-sample-data-banner">
                        SAMPLE DATA
                    </div>
                </div>
            </div>

            {/* 2. Main Content/Chart Area */}
            <div className="report-main-content">
                <div className="report-chart-area">
                    {hasData ? (
                        // Component to render the actual chart data
                        <ChartComponent data={[]} />
                    ) : (
                        // "No Data" Placeholder
                        <div className="report-no-data-placeholder">
                            <h3 className="report-no-data-title">
                                No data to display
                            </h3>
                            <p className="report-no-data-tip">
                                Try to add some records, or make sure that there is no active filter in the search bar.
                            </p>
                        </div>
                    )}

                    {/* Background elements */}
                    <div className="report-background-chart-elements">
                        <div className="report-x-axis-labels">
                            {BarValue.map((textOnBar, index) => (
                                <div className="report-x-axis-label" key={index}>{textOnBar}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportActivity

const ShowMeasureOptions = () => {
    // const [selectedMeasureOption, setSelectedMeasureOption] = useState([])
    // const measureOptions = [
    //     "Days to Assign",
    //     "Days to Close",
    //     "Days To Convert",
    //     "Exceeded Closing Days",
    //     "Expected Revenue",
    //     "Prorated Revenue",
    // ]

    // const handleMeasureOptionClick = (opt) => {
    //     setSelectedMeasureOption((prev) =>
    //         prev.includes(opt)
    //             ? prev.filter((item) => item !== opt)
    //             : [...prev, opt]
    //     );
    // };

    const [showCountOptionPipeline, setShowCountOptionPipeline] = useState(false)

    return (
        <div className='report-measure-options-container'>
            {/* {measureOptions.map((opt, index) => (
                <div key={index} className="report-measure-option" onClick={() => handleMeasureOptionClick(opt)}>
                    <span className="report-checkbox">
                        {selectedMeasureOption.includes(opt) ? '✔️' : ''}
                    </span>
                    {opt}
                </div>
            ))}
            <hr /> */}
            <div className="report-measure-count" onClick={() => setShowCountOptionPipeline(!showCountOptionPipeline)}>
                {showCountOptionPipeline ? '✔️' : ''} Count
            </div>
        </div>
    )
}
