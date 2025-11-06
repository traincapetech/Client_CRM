import { useContext } from "react";
import "./PipelinePage.css";
import KanbanView from "../NavbarPage/KanbanView";
import ListView from "../NavbarPage/ListView";
import { LeadContext } from "../../leadProvider/LeadContext";

function PipelinePage({view}) {
  const { leads } = useContext(LeadContext);

  return (
    <div className="pipeline-page-container">
      <div className="pipeline-view">
        {view === "kanban" ? <KanbanView leads={leads} /> : <ListView leads={leads} />}
      </div>
    </div>

  );
}

export default PipelinePage;
