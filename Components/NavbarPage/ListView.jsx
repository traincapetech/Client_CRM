
import "./ListView.css"

const ListView = ({ leads = {} }) => {
  // flatten leads object into array safely
  const allLeads = Object.values(leads || {}).flat();

  return (
    <div className="list-view">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allLeads.map((lead, idx) => (
            <tr key={idx}>
              <td>{lead.company}</td>
              <td>₹{lead.value}</td>
              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
