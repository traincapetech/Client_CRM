
import './Setting.css';

import SettingSideBar from './SettingSideBar';

const FeatureItem = ({ title, description, isChecked = false, action = null, install = false, helpIcon = false, children = null }) => (
  <div className="feature-item">
    <div className="feature-content-wrapper">
      <input
        type="checkbox"
        defaultChecked={isChecked}
        className="feature-checkbox"
      />
      <div className="feature-text-container">
        <div className="feature-title">
          {title}
          {/* Conditional Help Icon */}
          {helpIcon && (
            <span className="feature-help-icon" title="Help Information">
              &#9432;
            </span>
          )}
        </div>
        <p className="feature-description">
          {description}
        </p>
        {install && <a href="#" className="action-link mt-3">→ {install}</a>}
        {/* Conditional Radio/Sub-options */}
        {children}
      </div>
    </div>
    {/* Conditional Action Button/Content */}
    {action}
  </div>
);

const LeadGenerationSection = () => {
  return (
    <div className="crm-settings-section">
      <h2 className="crm-section-title">Lead Generation</h2>

      <div className="feature-grid-container">
        {/* Left Column Features (Lead Enrichment & Visits to Leads) */}
        <div>
          <FeatureItem
            title="Lead Enrichment"
            description="Enrich your leads with company data based on their email addresses"
            isChecked={true}
          >
            {/* Sub-options for Lead Enrichment */}
            <div className="sub-options-group">
              <label className="sub-option-label">
                <input type="radio" name="enrichment" defaultChecked={false} className="sub-option-radio" />
                <span className="ml-2">Enrich leads on demand only</span>
              </label>
              <label className="sub-option-label">
                <input type="radio" name="enrichment" defaultChecked={true} className="sub-option-radio" />
                <span className="ml-2">Enrich all leads automatically</span>
              </label>
              {/* Management Links */}
              <a href="#" className="action-link mt-3">→ Manage Service & Buy Credits</a>
              <a href="#" className="action-link">→ View My Services</a>
            </div>
          </FeatureItem>

          <FeatureItem
            title="Visits to Leads"
            description="Convert visitors of your website into leads and perform data enrichment based on their IP address"
            isChecked={false}
          />
        </div>

        {/* Right Column Features (Lead Mining) */}
        <div>
          <FeatureItem
            title="Lead Mining"
            description="Generate new leads based on their country, industry, size, etc."
            isChecked={true}
            helpIcon={true}
          >
            <div className="sub-options-group">
              {/* Management Links */}
              <a href="#" className="action-link">→ Manage Service & Buy Credits</a>
              <a href="#" className="action-link">→ View My Services</a>
            </div>
          </FeatureItem>
        </div>
      </div>
    </div>
  );
}


const Setting = () => {

  const CRMSettingsContent = () => {
    
    const leftFeatures = [
      { title: "Recurring Revenues", description: "Define recurring plans and revenues on Opportunities." },
      { title: "Multi Teams", description: "Assign salespersons into multiple Sales Teams." },
      { title: "Membership / Partnership", description: "Manage members or partners. Members get grades and pricelists, partners allow lead assignment and commission plans." },
      // ... (rest of the CRM settings features)
      {
        title: "Predictive Lead Scoring",
        description: (<>The success rate is computed based on <span className="font-semibold"> Stage, State, Country, Phone Quality, Email Quality, Source, Language and Tags </span> for the leads created as of the <span className="font-semibold"> 22/08/2025</span>.</>),
        action: <button className="update-probabilities-btn">Update Probabilities</button>
      },
    ];

    const rightFeatures = [
      { title: "Leads", description: "Add a qualification step before the creation of an opportunity." },
      { title: "Ringover VOIP Phone", install: "install Extention", description: "Make and receive calls from Odoo with Ringover's dialer. Track calls, SMS messages, and get AI-powered transcripts of your conversations." },
      // ... (rest of the CRM settings features)
      {
        title: "Rule-Based Assignment",
        description: "Periodically assign leads based on priorities and filters.",
        helpIcon: true
      },
    ];

    return (
      <>
       
        <h1 className="crm-title">CRM</h1>
        <div className="feature-grid-container">
          <div>
            {leftFeatures.map((feature, index) => (
              <FeatureItem key={index} title={feature.title} description={feature.description} action={feature.action} />
            ))}
          </div>
          <div>
            {rightFeatures.map((feature, index) => (
              <FeatureItem key={index} title={feature.title} description={feature.description} helpIcon={feature.helpIcon} install={feature.install} />
            ))}
          </div>
        </div>
      </>
    );
  };


  return (
    <div className='setting-container'>
      {/* 1. Original CRM Settings Section */}
      <div className='crm-setting-sidebar-container'>
        <SettingSideBar />
      </div>
      <div className="crm-settings-container">
        <CRMSettingsContent />

        {/* A visual separator might be needed here depending on the UI context */}
        <div className="section-separator"></div>

        {/* 2. NEW Lead Generation Section */}
        <LeadGenerationSection />
      </div>
    </div>
  );
};

export default Setting;