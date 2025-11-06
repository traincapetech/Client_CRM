// ViewModeSelector.jsx
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import ReorderIcon from '@mui/icons-material/Reorder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import "./ViewModelSelector.css"; // optional separate styling
import { Link } from 'react-router-dom';
const ViewModeSelector = ({ activeMode, setActiveMode }) => {
  const getClass = (name) => `icon-btn ${activeMode === name ? "active" : ""}`;

  return (
    <div className="view-mode-selector">
      <Link to={'/pipeline'}>
        <span title="kanban" className={getClass("kanban")} onClick={() => setActiveMode("kanban")}>
          <ViewKanbanIcon />
        </span></Link>
        <Link to={'/pipeline/list'}>
      <span title="list" className={getClass("list")} onClick={() => setActiveMode("list")}>
        <ReorderIcon />
      </span>
      </Link>
      <span title="calendar" className={getClass("calendar")} onClick={() => setActiveMode("calendar")}>
        <CalendarMonthIcon />
      </span>
      <span title="pivot" className={getClass("pivot")} onClick={() => setActiveMode("pivot")}>
        <PivotTableChartIcon />
      </span>
      <span title="areaChart" className={getClass("areaChart")} onClick={() => setActiveMode("areaChart")}>
        <AreaChartIcon />
      </span>
      <span title="location" className={getClass("location")} onClick={() => setActiveMode("location")}>
        <LocationOnIcon />
      </span>
      <span title="activity" className={getClass("activity")} onClick={() => setActiveMode("activity")}>
        <AccessTimeIcon />
      </span>
    </div>
  );
};

export default ViewModeSelector;
