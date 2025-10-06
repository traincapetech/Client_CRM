import  { useState } from "react";
import "./ConfigActivityTypes.css";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialActivityData = [
  { id: "1", name: "To-Do", summary: "To-Do", planned: "5 days", type: "after previous activity deadline" },
  { id: "2", name: "To-Do", summary: "To-Do", planned: "5 days", type: "after previous activity deadline" },
  { id: "3", name: "Email", summary: "Email", planned: "0 days", type: "after previous activity deadline" },
  { id: "4", name: "Call", summary: "Call", planned: "2 days", type: "after previous activity deadline" },
  { id: "5", name: "Meeting", summary: "Meeting", planned: "0 days", type: "after previous activity deadline" },
  { id: "6", name: "Document", summary: "Document", planned: "5 days", type: "after previous activity deadline" },
];

const ConfigActivityTypes = () => {
  const [activities, setActivities] = useState(initialActivityData);

  // Handle drag end
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(activities);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setActivities(reordered);
  };

  return (
    <div className="config-activity-table">
      {/* Header Row */}
      <div className="config-activity-header">
        <div className="config-header-name">
          <input type="checkbox" className="config-checkbox" />
          <span className="config-header-text">Name</span>
        </div>
        <div className="config-header-summary">Default Summary</div>
        <div className="config-header-planned">Planned in</div>
        <div className="config-header-type">Type</div>
        <div className="config-header-actions">
          <svg
            className="config-filter-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>

      {/* Draggable Rows */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="activities">
          {(provided) => (
            <div
              className="config-activity-body"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {activities.map((activity, index) => (
                <Draggable
                  key={activity.id}
                  draggableId={activity.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="config-activity-row"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      {/* Column 1: Checkbox + Name + Drag Handle */}
                      <div className="config-cell-name">
                        <input type="checkbox" className="config-checkbox" />
                        {/* 👇 Only this icon acts as drag handle */}
                        <span
                          {...provided.dragHandleProps}
                          className="config-drag-icon"
                        >
                          <DragIndicatorOutlinedIcon />
                        </span>
                        <span className="config-name-text">
                          {activity.name}
                        </span>
                      </div>

                      {/* Column 2: Default Summary */}
                      <div className="config-cell-summary">
                        {activity.summary}
                      </div>

                      {/* Column 3: Planned in */}
                      <div className="config-cell-planned">
                        {activity.planned}
                      </div>

                      {/* Column 4: Type */}
                      <div className="config-cell-type">
                        {activity.type}
                      </div>

                      {/* Column 5: Empty/Actions */}
                      <div className="config-cell-actions"></div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ConfigActivityTypes;
