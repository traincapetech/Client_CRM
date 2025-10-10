import React, { useState } from 'react';
import "./Homepage.css"
// Assuming you will import your external CSS in your entry file (e.g., index.js)
// import './styles.css'; 

// Mock data for the dashboard (unchanged)
const initialData = {
  totalRevenue: 1.2,
  revenueChange: 18,
  newLeads: 450,
  leadsChange: -3,
  winRate: 55,
  winRateChange: 5,
  topPerformers: [
    { name: 'Justin D', revenue: 218000, color: 'indigo' }, // Changed to simple color name
    { name: 'Jane E', revenue: 173000, color: 'blue' },
    { name: 'Scott L', revenue: 85000, color: 'green' },
  ],
  dailyActivities: [
    { label: 'Calls', progress: 80, color: '#10b981' }, // Changed to hex for easier CSS use
    { label: 'Emails Sent', progress: 92, color: '#3b82f6' },
    { label: 'Meetings', progress: 65, color: '#6366f1' },
  ],
  pipeline: [
    { stage: 'PROSPECTING', amount: 350000, count: 250, total: 500000 },
    { stage: 'QUALIFICATION', amount: 180000, count: 180, total: 450000 },
    { stage: 'PROPOSAL', amount: 90000, count: 90, total: 250000 },
    { stage: 'NEGOTIATION', amount: 40000, count: 40, total: 200000 },
  ],
  upcomingTasks: [
    { time: '10:00 AM', description: 'Call with Barry Connery' },
    { time: '11:00 AM', description: 'Q3 Review Prep' },
    { time: '1:30 PM', description: 'Team Pipeline Sync' },
  ],
};

// Component for the KPI Cards
const KPICard = ({ title, value, change, units }) => {
  const isPositive = change > 0;
  const arrow = isPositive ? '↑' : '↓';
  const changeClass = isPositive ? 'text-positive' : 'text-negative';

  return (
    <div className="kpi-card">
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">
        {value}
        {units}
      </div>
      <div className={`kpi-change ${changeClass}`}>
        <span className="font-bold">{arrow} {Math.abs(change)}%</span> from last month
      </div>
    </div>
  );
};

// Component for the Daily Activity Gauges
const ActivityGauge = ({ label, progress, color }) => (
  <div className="activity-gauge-container">
    <div className="circle-chart" style={{'--progress': progress, '--color': color, '--bg-color': '#e5e7eb'}}>
      <span className="gauge-text">{progress}%</span>
    </div>
    <div className="activity-label">{label}</div>
  </div>
);

// Component for the Top Performers Bar
const PerformanceBar = ({ name, revenue, color }) => {
  const percentage = (revenue / Math.max(...initialData.topPerformers.map(p => p.revenue))) * 100;
  const formattedRevenue = `$${(revenue / 1000).toFixed(0)}K`;

  return (
    <div className="performance-bar-item">
      <div className="performance-header">
        <div className="performer-info">
          {/* Simple avatar placeholder */}
          <div className="performer-avatar">
            {name.charAt(0)}
          </div>
          <span className="performer-name">{name}</span>
        </div>
        <span className="performer-revenue">{formattedRevenue}</span>
      </div>
      <div className="progress-bar-bg">
        <div className={`progress-bar-fill color-${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

// Component for the Sales Pipeline Funnel
const SalesFunnel = ({ pipeline }) => {
  const totalValue = pipeline.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="funnel-wrapper">
      <div className="funnel-container">
        {pipeline.map((item, index) => {
          return (
            <div key={item.stage} className={`funnel-stage funnel-stage-${index}`}>
              <div className="stage-content">
                <div className="stage-label">{item.stage}</div>
                <div className="stage-amount">${(item.amount / 1000).toFixed(0)}K</div>
              </div>
              <div className="stage-metrics">
                <div className="stage-metric-text">{item.count} / ${item.total / 1000}K</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="funnel-footer">
          <p className="funnel-total-text">Total Pipeline Value: <span className="funnel-total-value">${(totalValue / 1000000).toFixed(1)}M</span></p>
      </div>
    </div>
  );
};

const Homepage = () => {
  const [data] = useState(initialData);

  // Mock data for the line chart
  const forecastData = [
    { actual: 100, forecast: 150 },
    { actual: 200, forecast: 250 },
    { actual: 400, forecast: 350 },
    { actual: 550, forecast: 500 },
    { actual: 700, forecast: 650 },
    { actual: 850, forecast: 900 },
    { actual: 950, forecast: 1100 },
  ];
  const maxRevenue = Math.max(...forecastData.flatMap(d => [d.actual, d.forecast])) * 1.2;
  const maxYAxis = Math.ceil(maxRevenue / 100) * 100;
  const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'];

  // Helper function to calculate Y position percentage
  const getYPos = (value) => 100 - (value / maxYAxis) * 100;

  const TimeFilter = ({ label }) => (
    <button className="time-filter-button">{label}</button>
  );

  return (
    <div className="dashboard-container">
      
      {/* Header/Title */}
      <h1 className="dashboard-title">DASHBOARD</h1>

      {/* Main Grid Layout */}
      <div className="dashboard-grid">

        {/* === COLUMN 1 (Main Content: KPIs, Pipeline, Activities) === */}
        <div className="main-content-column">
          
          {/* 1. KPIs at the top */}
          <div className="kpi-group">
            <KPICard title="Total Revenue" value={data.totalRevenue} change={data.revenueChange} units="M" />
            <KPICard title="New Leads This Week" value={data.newLeads} change={data.leadsChange} units="" />
            <KPICard title="Win Rate" value={data.winRate} change={data.winRateChange} units="%" />
          </div>

          {/* 2. Sales Pipeline & Daily Activities */}
          <div className="card-group-2col">
            
            {/* Sales Pipeline Funnel */}
            <div className="dashboard-card pipeline-card">
              <h2 className="card-title">SALES PIPELINE</h2>
              <SalesFunnel pipeline={data.pipeline} />
            </div>
            
            {/* Daily Activities */}
            <div className="dashboard-card activity-card">
              <h2 className="card-title">DAILY ACTIVITIES</h2>
              <div className="activity-gauges-container">
                {data.dailyActivities.map(activity => (
                  <ActivityGauge key={activity.label} {...activity} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === COLUMN 2 (Center Content: Performers, Forecast) === */}
        <div className="center-content-column">
          
          {/* Top Performers (Revenue) */}
          <div className="dashboard-card">
            <h2 className="card-title">TOP PERFORMERS (REVENUE)</h2>
            <div className="performer-list">
              {data.topPerformers.map(performer => (
                <PerformanceBar key={performer.name} {...performer} />
              ))}
            </div>
          </div>

          {/* Monthly Revenue Forecast */}
          <div className="dashboard-card">
            <h2 className="card-title">MONTHLY REVENUE FORECAST</h2>
            
            <div className="chart-legend-container">
              <span className="chart-legend actual-legend">
                <span className="legend-dot actual-dot"></span> Actual
              </span>
              <span className="chart-legend forecast-legend">
                <span className="legend-dot forecast-dot"></span> Forecast
              </span>
            </div>

            {/* Mock Line Chart Area */}
            <div className="line-chart-area">
              
              {/* Y-Axis Labels */}
              <div className="chart-y-axis-labels">
                <span>{maxYAxis}</span>
                <span>{maxYAxis * 0.75}</span>
                <span>{maxYAxis * 0.5}</span>
                <span>{maxYAxis * 0.25}</span>
                <span>0</span>
              </div>
              
              {/* Chart Grid Lines */}
              <div className="chart-grid">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="chart-grid-line"></div>
                ))}
              </div>

              {/* Data Points and Lines (MOCK using divs) */}
              <div className="chart-data-area">
                {/* Plotting points and drawing lines */}
                {forecastData.map((d, i) => {
                  if (i === 0) return null; 
                  
                  const prevActual = forecastData[i-1].actual;
                  const currentActual = d.actual;
                  const prevForecast = forecastData[i-1].forecast;
                  const currentForecast = d.forecast;
                  
                  return (
                    <React.Fragment key={i}>
                      {/* Actual Line Segment (Drawing between previous and current point) */}
                      <div 
                        className="chart-line actual-line"
                        style={{
                            clipPath: `polygon(
                                ${((i - 1) / (forecastData.length - 1)) * 100}% ${getYPos(prevActual)}%,
                                ${(i / (forecastData.length - 1)) * 100}% ${getYPos(currentActual)}%,
                                ${(i / (forecastData.length - 1)) * 100}% ${getYPos(currentActual) + 1}%,
                                ${((i - 1) / (forecastData.length - 1)) * 100}% ${getYPos(prevActual) + 1}%
                            )`,
                        }}
                      ></div>

                      {/* Forecast Line Segment (Drawing between previous and current point) */}
                       <div 
                        className="chart-line forecast-line"
                        style={{
                            clipPath: `polygon(
                                ${((i - 1) / (forecastData.length - 1)) * 100}% ${getYPos(prevForecast)}%,
                                ${(i / (forecastData.length - 1)) * 100}% ${getYPos(currentForecast)}%,
                                ${(i / (forecastData.length - 1)) * 100}% ${getYPos(currentForecast) + 1}%,
                                ${((i - 1) / (forecastData.length - 1)) * 100}% ${getYPos(prevForecast) + 1}%
                            )`,
                        }}
                      ></div>

                      {/* Current Actual Point */}
                      <div 
                        className="chart-data-point actual-dot" 
                        style={{
                          left: `${(i / (forecastData.length - 1)) * 100}%`, 
                          top: `${getYPos(currentActual)}%`
                        }}
                      ></div>

                      {/* Current Forecast Point */}
                      <div 
                        className="chart-data-point forecast-dot" 
                        style={{
                          left: `${(i / (forecastData.length - 1)) * 100}%`, 
                          top: `${getYPos(currentForecast)}%`
                        }}
                      ></div>
                    </React.Fragment>
                  );
                })}
                {/* First points for context */}
                <div 
                  className="chart-data-point actual-dot" 
                  style={{
                    left: `0%`, 
                    top: `${getYPos(forecastData[0].actual)}%`
                  }}
                ></div>
                <div 
                  className="chart-data-point forecast-dot" 
                  style={{
                    left: `0%`, 
                    top: `${getYPos(forecastData[0].forecast)}%`
                  }}
                ></div>
              </div>

              {/* X-Axis Labels */}
              <div className="chart-x-axis-labels">
                {labels.map(label => (
                  <span key={label} className="chart-x-label">{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === COLUMN 3 (Sidebar: Filters, Deals, Tasks) === */}
        <div className="sidebar-column">
          
          {/* Filters */}
          <div className="dashboard-card filter-card">
            <h2 className="filter-section-title">TIME PERIOD</h2>
            <div className="filter-buttons-group">
              <TimeFilter label="Last 30 Days" />
              <TimeFilter label="QTD" />
              <TimeFilter label="YTD" />
            </div>

            <h2 className="filter-section-title mt-4">SALES REP</h2>
            <select className="filter-select">
              <option>All Reps</option>
              <option>Justin D</option>
              <option>Jane E</option>
            </select>

            <h2 className="filter-section-title mt-4">REGION</h2>
            <select className="filter-select">
              <option>Western US</option>
              <option>Eastern US</option>
            </select>
          </div>

          {/* Deals to Watch */}
          <div className="dashboard-card">
            <h2 className="card-title">DEALS TO WATCH</h2>
            <div className="deal-list">
              <div className="deal-item warning-red">
                <p className="deal-name">Acme Corp - $150K</p>
                <p className="deal-status text-red-600">Stuck in negotiation for 45 days. Needs follow-up.</p>
              </div>
              <div className="deal-item warning-amber">
                <p className="deal-name">Innovate Tech - $90K</p>
                <p className="deal-status text-amber-600">Proposal sent, review pending. Due next week.</p>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="dashboard-card">
            <h2 className="card-title">UPCOMING TASKS</h2>
            <div className="task-list">
              {data.upcomingTasks.map((task, index) => (
                <div key={index} className="task-item">
                  <div className="task-bullet"></div>
                  <div>
                    <p className="task-description">{task.description}</p>
                    <p className="task-time">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Homepage;