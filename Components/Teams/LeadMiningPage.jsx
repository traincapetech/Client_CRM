
import "./LeadMiningPage.css"
// Mock data based on the image
const requestsData = [
  {
    id: 'LMR001',
    target: '3 Companies',
    countries: ['Afghanistan'],
    industries: ['Media'],
    salesTeam: 'Sales',
    salesperson: 'Amit',
    tags: ['need urgent'],
    status: 'Done',
  },
  {
    id: 'LMR002',
    target: '1 Companies',
    countries: ['India'],
    industries: ['Software & Services'],
    salesTeam: 'Sales',
    salesperson: 'Amit',
    tags: ['need urgent'],
    status: 'Done',
  },
];

const LeadMiningPage  = () => {
  const getInitials = (name) => name.charAt(0).toUpperCase();

  return (
    <div className="lead-mining-container">
      <table className="lead-mining-table">
        <thead className="table-header">
          <tr>
            <th className="header-checkbox"><input type="checkbox" /></th>
            <th className="header-sort">Request Number</th>
            <th className="header-sort">Number ... Target</th>
            <th className="header-sort">Countries</th>
            <th className="header-sort">Industries</th>
            <th className="header-sort">Sales Team</th>
            <th className="header-sort">Salesperson</th>
            <th className="header-sort">Tags</th>
            <th className="header-sort status-col">Status <span className="sort-icon">⇅</span></th>
          </tr>
        </thead>
        <tbody>
          {requestsData.map((request) => (
            <tr key={request.id} className="table-row">
              <td className="data-checkbox"><input type="checkbox" /></td>
              <td className="data-id">{request.id}</td>
              <td className="data-target">{request.target}</td>
              <td className="data-countries">
                {request.countries.map((c) => (
                  <span key={c} className="tag-pill tag-country">
                    {c}
                  </span>
                ))}
              </td>
              <td className="data-industries">
                {request.industries.map((i) => (
                  <span key={i} className="tag-pill tag-industry">
                    {i}
                  </span>
                ))}
              </td>
              <td className="data-team">{request.salesTeam}</td>
              <td className="data-salesperson">
                <div className="salesperson-info">
                  <span className="salesperson-avatar avatar-green">
                    {getInitials(request.salesperson)}
                  </span>
                  <span className="salesperson-name">{request.salesperson}</span>
                </div>
              </td>
              <td className="data-tags">
                {request.tags.map((t) => (
                  <span key={t} className="tag-pill tag-urgent">
                    {t}
                  </span>
                ))}
              </td>
              <td className="data-status">
                <span className="status-pill status-done">{request.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadMiningPage;