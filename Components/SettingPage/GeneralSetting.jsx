import './GeneralSetting.css'
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import SettingSideBar from './SettingSideBar';


const User = () => {
    return (
        <div className="general-settings-section-user">
            <h2 className="general-section-title-user">User</h2>
            <div className="generalsetting-feature-container-user">
                {/* Left Column Features */}
                <div className='left-column-feature-user'>
                    <label>Invite a user</label>
                    <div className='email-left-column-feature-user'>
                        <input type="email" placeholder='Enter an Email' required className='userInputgeneralsetting' />
                        <button className='invite-btn-user'>Invite</button>
                    </div>
                </div>
                {/* Right Column Features  */}
                <div className='right-column-feature-user'>
                    <div className='items-right-column-feature-user' >
                        <div className='itemsActive-right-column-feature-user'>
                            <span><Groups2OutlinedIcon fontSize='large' /></span>
                            <label>  1 Active User ?</label>
                        </div>
                        <a href="#">→ Manage users</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LanguageGeneralSetting = () => {
    return (
        <div className='general-settings-section-language'>
            <h2 className="general-section-title-language">Language</h2>
            <div className='general-settings-section-items'>
                <label>1 Language </label>
                <a href="#">→ Add Languages</a>
            </div>
        </div>
    )
}

const CompaniesGeneralSetting = () => {
    return (
        <div className="general-settings-section-companies">
            <h2 className="general-section-title-companies">Companies</h2>
            <div className="generalsetting-feature-container-companies">
                {/* Left Column Features */}
                <div className='left-column-feature-companies'>
                    <div className='left-column-feature-companies-top'>
                        <label>TTTT</label>
                        <span>India</span>
                        <a href="#">→ Update Info</a>
                    </div>
                    <div className='left-column-feature-companies-bottom'>
                        <label>Document Layout</label>
                        <p>Choose the layout of your documents</p>
                        <a href="#">→ Configure Document Layout</a>
                    </div>
                </div>
                {/* Right Column Features  */}
                <div className='right-column-feature-companies'>
                    <div className='items-right-column-feature-companies' >
                        <div className='right-column-feature-companies-top'>
                            <label>1 Company</label>
                            <a href="#">→ Manage Company</a>
                        </div>


                        <div className='right-column-feature-companies-bottom'>
                            <label className='emailTemplateRightCompany'>Email Templates</label>
                            <p>Customize the look and feel of automated emails</p>
                            <div className='choseColorText'>
                                <label>Text Color</label>
                                <input type="color" className='text-colorComapany' value="#ffffff" />
                            </div>
                            <div className='choseColorbtn'>
                                <label >Text Button</label>
                                <input type="color" className='btn-colorCompany' value="#934cbf" />
                            </div>
                            <a href="#">→ Review All Template</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const EmailGeneralSetting = () => {
    return (
        <div className="general-settings-section-email">
            <h2 className="general-section-title-email">Emails</h2>
            <div className="generalsetting-feature-container-email">

                {/* Left Column Features */}
                <div className='left-column-feature-email'>

                    {/* Use Custom Email Servers */}
                    <div className='left-email-feature-item-top'>
                        <input type="checkbox" id="useCustomServers" className='email-checkbox' />
                        <div className='left-email-feature-item-top-all '>
                            <div className='checkbox-with-label'>
                                <label htmlFor="useCustomServers">
                                    Use Custom Email Servers <span className="help-icon">?</span>
                                </label>
                            </div>
                            <p className='feature-description'>
                                Configure your own email servers
                            </p>
                        </div>
                    </div>

                    {/* Digest Email */}
                    <div className='left-email-feature-item-bottom'>
                        <input type="checkbox" id="digestEmail" className='email-checkbox' defaultChecked />
                        <div className='left-email-feature-item-bottom-all'>
                            <div className='checkbox-with-label'>
                                <label htmlFor="digestEmail">
                                    Digest Email <span className="help-icon">?</span>
                                </label>
                            </div>
                            <p className='feature-description'>
                                Add new users as recipient of a periodic email with key metrics
                            </p>

                            <div className='digest-email-config'>
                                <label className='digest-email-label'>Digest Email</label>
                                <div className='digest-dropdown-group'>
                                    <select className='digest-dropdown'>
                                        <option>Your Odoo Periodic Dig...</option>
                                    </select>
                                    <a href="#" className='arrow-link'>→</a>
                                </div>
                                <a href="#" className='configure-link'>→ Configure Digest Emails</a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column Features */}
                <div className='right-column-feature-email'>

                    {/* Alias Domain */}
                    <div className='right-email-feature-item-top'>
                        <label className='feature-heading'>
                            Alias Domain <span className="help-icon">?</span>
                        </label>
                        <p className='feature-description'>
                            Use different domains for your mail aliases
                        </p>
                        <div className='alias-domain-input-group'>
                            <span className='at-symbol'>@</span>
                            <input type="text" value="tttt.odoo.com" className='alias-domain-input' />
                            <a href="#" className='arrow-link'>→</a>
                        </div>
                    </div>

                    {/* Restrict Template Rendering */}
                    <div className='right-email-feature-item-bottom' >
                        <input type="checkbox" id="restrictRendering" className='email-checkbox' defaultChecked />
                        <div className='right-email-feature-item-bottom-all'>
                            <div className='checkbox-with-label'>
                                <label htmlFor="restrictRendering">
                                    Restrict Template Rendering
                                </label>
                            </div>
                            <p className='feature-description'>
                                Restrict mail templates edition and QWEB placeholders usage.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

const IntegrationsGeneralSetting = () => {
    return (
        <div className="general-settings-section-integrations">
            {/* Section Header */}
            <h2 className="general-section-title-integrations">Integrations</h2>
            <div className="generalsetting-feature-container-integrations">

                {/* Left Column Features (Mail Plugin, LDAP, Geolocation, reCAPTCHA, Google Address) */}
                <div className='left-column-feature-integrations'>


                    {/* Geolocation */}
                    <div className='integrations-feature-group-Geolocation'>
                        <div className='checkbox-with-label'>
                            <input type="checkbox" id="geolocation" className='integrations-checkbox' />
                            <label htmlFor="geolocation">Geolocation <span className="help-icon">?</span></label>
                        </div>
                        <p className='feature-description'>Geolocate your partners</p>
                    </div>

                    {/* reCAPTCHA */}
                    <div className='integrations-feature-group-reCAPTCHA'>
                        <div className='checkbox-with-label'>
                            <input type="checkbox" id="recaptcha" className='integrations-checkbox' />
                            <label htmlFor="recaptcha">reCAPTCHA</label>
                        </div>
                        <p className='feature-description'>Protect your forms from spam and abuse.</p>
                    </div>

                    {/* Google Address Autocomplete */}
                    <div className='integrations-feature-group-googleAddressAutocomplete'>
                        <div className='checkbox-with-label'>
                            <input type="checkbox" id="googleAddress" className='integrations-checkbox' />
                            <label htmlFor="googleAddress">Google Address Autocomplete</label>
                        </div>
                        <p className='feature-description'>Autocomplete partner addresses with Google Places</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AboutGeneralSetting = () => {
    return (
        <div className="general-settings-section-about">
            {/* Section Header */}
            <h2 className="general-section-title-about">About</h2>

            {/* Main content container */}
            <div className="generalsetting-feature-container-about">

                {/* Left Column (Version and Copyright Info) */}
                <div className='left-column-feature-about'>
                    <p className='about-version-info'>CRM saas~18.4+e (Enterprise Edition)</p>
                    <p className='about-copyright'>
                        Copyright © 2025
                        <a href="#" className='about-link'>CRM</a>,
                        <a href="#" className='about-link'>CRM Enterprise Edition License v1.0</a>
                    </p>
                </div>
            </div>
        </div>
    );
}


function GeneralSetting() {
    return (
        <div className='generalsetting-container'>
            <div className='general-setting-sidebar-container'>
                <SettingSideBar />
            </div>
            <div className='generalsetting-container-body'>
                <div>
                    <User />
                </div>
                <div className='generalsetting-container-body'>
                    <LanguageGeneralSetting />
                </div>
                <div className='generalsetting-container-body'>
                    <CompaniesGeneralSetting />
                </div>
                <div className='generalsetting-container-body'>
                    <EmailGeneralSetting />
                </div>

                <div className='generalsetting-container-body'>
                    <IntegrationsGeneralSetting />
                </div>

                <div className='generalsetting-container-body'>
                    <AboutGeneralSetting />
                </div>
            </div>
        </div>
    )
}


export default GeneralSetting;