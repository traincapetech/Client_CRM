import { useNavigate } from "react-router-dom";
import "./ListView.css";

const ListView = ({ leads = {} }) => {
  const navigate = useNavigate();

  // Flatten leads with stage and index info
  const allLeads = Object.entries(leads || {}).flatMap(([stage, leadsInStage]) =>
    (leadsInStage || []).map((lead, indexInStage) => ({
      ...lead,
      stage: stage.charAt(0).toUpperCase() + stage.slice(1).toLowerCase(),
      stageKey: stage, // for lowercase navigation
      indexInStage,    // preserve actual index
    }))
  );

  return (
    <div className="list-view">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Value</th>
            <th>Email</th>
            <th>Created By</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>
          {allLeads.map((lead, idx) => (
            <tr
              key={idx}
              onClick={() => navigate(`/edit/${lead.stageKey}/${lead.indexInStage}`)} // ✅ correct stage/index
              className="clickable-row"
            >
              <td>{lead.company}</td>
              <td>₹{lead.value}</td>
              <td>{lead.email}</td>
              <td>Amit</td>
              <td>{lead.stage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
