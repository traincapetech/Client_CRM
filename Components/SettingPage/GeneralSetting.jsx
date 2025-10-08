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

const DiscussGeneralSetting = () => {
    return (
        <div className="general-settings-section-discuss">
            {/* Section Header */}
            <h2 className="general-section-title-discuss">Discuss</h2>
            <div className="generalsetting-feature-container-discuss">

                {/* Left Column Features */}
                <div className='left-column-feature-discuss'>

                    {/* Activities */}
                    <div className='left-discuss-feature-group-top'>
                        <label className='feature-heading'>Activities</label>
                        <p className='feature-description'>Configure your activity types</p>
                        <a href="#" className='configure-link'>→ Activity Types</a>
                    </div>

                    {/* SFU server */}
                    <div className='left-discuss-feature-group-middle'>
                        <label className='feature-heading'>SFU server</label>
                        <div className='input-field-container'>
                            <label htmlFor="sfu-url" className='input-label-discuss'>URL</label>
                            <input type="text" id="sfu-url" className='discuss-input' />
                        </div>
                        <div className='input-field-container'>
                            <label htmlFor="sfu-key" className='input-label-discuss'>Key</label>
                            <input type="text" id="sfu-key" className='discuss-input' />
                        </div>
                    </div>

                    {/* Tenor GIF API key */}
                    <div className='left-discuss-feature-group-bottom'>
                        <label className='feature-heading'>
                            Tenor GIF API key <span className="help-icon">?</span>
                        </label>
                        <p className='feature-description'>Add a Tenor GIF API key to enable GIFs support.</p>
                        <input
                            type="text"
                            placeholder="Paste your API key"
                            className='discuss-input full-width-input'
                        />
                    </div>

                </div>

                {/* Right Column Features */}
                <div className='right-column-feature-discuss'>

                    {/* Use Twilio ICE servers */}
                    <div className='right-discuss-feature-group-top'>
                        <div className='checkbox-with-label'>
                            <input type="checkbox" id="useTwilio" className='discuss-checkbox' defaultChecked />
                            <label htmlFor="useTwilio">Use Twilio ICE servers</label>
                        </div>
                        <p className='feature-description'>Add your twilio credentials for ICE servers</p>

                        <div className='twilio-credentials'>
                            <div className='credential-item'>
                                <label className='input-label-discuss'>Twilio Account SID</label>
                                <input
                                    type="text"
                                    placeholder="e.g. ACd65543ad0b45f4a4C7f9..."
                                    className='discuss-input'
                                />
                            </div>
                            <div className='credential-item'>
                                <label className='input-label-discuss'>Twilio Account Auth Token</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 65ea49e4a8b6f93d15..."
                                    className='discuss-input'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Custom ICE server list */}
                    <div className='right-discuss-feature-group-middle'>
                        <label className='feature-heading'>Custom ICE server list</label>
                        <p className='feature-description'>Configure your ICE server list for WebRTC</p>
                        <a href="#" className='configure-link'>→ ICE Servers</a>
                    </div>

                    {/* Message Translation */}
                    <div className='right-discuss-feature-group-bottom'>
                        <label className='feature-heading'>
                            Message Translation <span className="help-icon">?</span>
                        </label>
                        <p className='feature-description'>Google Translate Integration</p>
                        <input
                            type="text"
                            placeholder="Paste your API key"
                            className='discuss-input full-width-input'
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

const ContactsGeneralSetting = () => {
    return (
        <div className="general-settings-section-contacts">
            {/* Section Header */}
            <h2 className="general-section-title-contacts">Contacts</h2>
            <div className="generalsetting-feature-container-contacts">

                {/* Left Column Features */}
                <div className='left-column-feature-contacts'>

                    {/* Send SMS */}
                    <div className='left-contacts-feature-group-top'>
                        <label className='feature-heading'>
                            Send SMS <span className="help-icon">?</span>
                        </label>
                        <p className='feature-description'>Send texts to your contacts</p>
                        <a href="#" className='configure-link'>→ Manage Service & Buy Credits</a>
                    </div>

                    {/* Odoo IAP */}
                    <div className='left-contacts-feature-group-bottom'>
                        <label className='feature-heading'>
                            Odoo IAP <span className="help-icon">?</span>
                        </label>
                        <p className='feature-description'>View your IAP services and recharge your credits</p>
                        <a href="#" className='configure-link'>→ View My Services</a>
                    </div>

                </div>

                {/* Right Column Features */}
                <div className='right-column-feature-contacts'>

                    {/* Partner Autocomplete */}
                    <div className='right-contacts-feature-group-all'>
                        <input type="checkbox" id="partnerAutocomplete" className='contacts-checkbox' defaultChecked />
                        <div className='right-contacts-feature-group-top'>
                            <div className='checkbox-with-label'>
                                <label htmlFor="partnerAutocomplete">
                                    Partner Autocomplete
                                </label>
                            </div>
                            <p className='feature-description'>Automatically enrich your contact base with company data</p>
                            <a href="#" className='configure-link'>→ Manage Service & Buy Credits</a>
                        </div>
                    </div>

                    {/* The right column is shorter, so we leave the rest of the space empty or for future features */}
                    <div style={{ flexGrow: 1 }}></div>

                </div>
            </div>
        </div>
    );
}

const PermissionsGeneralSetting = () => {
    return (
        <div className="general-settings-section-permissions">
            {/* Section Header */}
            <h2 className="general-section-title-permissions">Permissions</h2>
            <div className="generalsetting-feature-container-permissions">

                {/* Left Column Features */}
                <div className='left-column-feature-permissions'>

                    {/* Customer Account */}
                    <div className='left-permissions-feature-group-top'>
                        <label className='feature-heading'>Customer Account</label>
                        <p className='feature-description'>Let your customers log in to see their documents</p>

                        {/* Radio buttons for sign-up method */}
                        <div className='radio-option-group'>
                            <div className='radio-option'>
                                <input type="radio" id="onInvitation" name="customerSignup" defaultChecked={false} className='permissions-radio' />
                                <label htmlFor="onInvitation" className='radio-label'>On invitation</label>
                            </div>
                            <div className='radio-option'>
                                <input type="radio" id="freeSignup" name="customerSignup" defaultChecked={true} className='permissions-radio' />
                                <label htmlFor="freeSignup" className='radio-label'>Free sign up</label>
                            </div>
                        </div>
                        <a href="#" className='configure-link'>→ Default Access Rights</a>
                    </div>

                    {/* Default Access Rights */}
                    <div className='left-permissions-feature-group-middle'>
                        <label className='feature-heading'>Default Access Rights</label>
                        <p className='feature-description'>Set custom access rights for new users</p>
                        <a href="#" className='configure-link'>→ Default Access Rights</a>
                    </div>

                    {/* Enforce two-factor authentication */}
                    <div className='left-permissions-feature-group-bottom'>
                        <div className='checkbox-with-label'>
                            <input type="checkbox" id="enforceTwoFactor" className='permissions-checkbox' />
                            <label htmlFor="enforceTwoFactor">Enforce two-factor authentication</label>
                        </div>
                        <p className='feature-description long-description'>
                            Enforce the two-factor authentication by email for employees or
                            for all users (including portal users) if they didn't enable any
                            other two-factor authentication method.
                        </p>
                    </div>

                </div>

                {/* Right Column Features */}
                <div className='right-column-feature-permissions'>

                    {/* Password Reset */}
                    <div className='right-permissions-feature-group-top'>
                        <div className='checkbox-with-label'>
                            <input type="checkbox" id="passwordReset" className='permissions-checkbox' defaultChecked />
                            <label htmlFor="passwordReset">Password Reset</label>
                        </div>
                        <p className='feature-description'>Enable password reset from Login page</p>
                    </div>

                    {/* API Keys */}
                    <div className='right-permissions-feature-group-bottom'>
                        <label className='feature-heading'>API Keys</label>
                        <p className='feature-description'>
                            API Keys allow your users to access Odoo with external tools
                            when multi-factor authentication is enabled.
                        </p>
                        <a href="#" className='configure-link'>→ Manage API Keys</a>
                    </div>

                    {/* Placeholder to push items up if needed, though usually flex handles it */}
                    <div style={{ flexGrow: 1 }}></div>

                </div>
            </div>
        </div>
    );
}

const IntegrationsGeneralSetting = () => {
    return (
        <div className="general-settings-section-integrations">
            {/* Section Header */}
            <h2 className="general-section-title-integrations">Integrations</h2>
            <div className="generalsetting-feature-container-integrations">

                {/* Left Column Features (Mail Plugin, LDAP, Geolocation, reCAPTCHA, Google Address) */}
                <div className='left-column-feature-integrations'>

                    {/* Mail Plugin */}
                    <div className='integrations-feature-group-mail'>
                        <div className='checkbox-with-label'>
                            <input type="checkbox" id="mailPlugin" className='integrations-checkbox' />
                            <label htmlFor="mailPlugin">Mail Plugin <span className="help-icon">?</span></label>
                        </div>
                        <p className='feature-description'>Integrate with mail client plugins</p>
                    </div>

                    {/* LDAP Authentication */}
                    <div className='integrations-feature-group-LDAP '>
                        <div className='checkbox-with-label'>
                            <input type="checkbox" id="ldapAuth" className='integrations-checkbox' />
                            <label htmlFor="ldapAuth">LDAP Authentication <span className="help-icon">?</span></label>
                        </div>
                        <p className='feature-description'>Use LDAP credentials to log in</p>
                    </div>

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

                {/* Right Column Features (OAuth, Unsplash, Map Routes, Cloudflare) */}
                <div className='right-column-feature-integrations'>

                    {/* OAuth Authentication */}
                    <div className='integrations-feature-group-oAuth'>
                        <div className='checkbox-with-label'>
                            <input type="checkbox" id="oauth" className='integrations-checkbox' />
                            <label htmlFor="oauth">OAuth Authentication</label>
                        </div>
                        <p className='feature-description'>Use external accounts to log in (Google, Facebook, etc.)</p>
                    </div>

                    {/* Unsplash Image Library */}
                    <div className='integrations-feature-group-unsplash'>
                        <div className='checkbox-with-label'>
                            <input type="checkbox" id="unsplash" className='integrations-checkbox' defaultChecked />
                            <label htmlFor="unsplash">Unsplash Image Library <span className="help-icon">?</span></label>
                        </div>
                        <p className='feature-description'>Find free high-resolution images from Unsplash</p>
                    </div>

                    {/* Map Routes */}
                    <div className='integrations-feature-group-map'>
                        <label className='feature-heading'>Map Routes</label>
                        <p className='feature-description'>Set a MapBox account to activate routes and style</p>
                        <div className='map-token-section'>
                            <label className='input-label-integrations'>Token</label>
                            <a href="#" className='configure-link'>→ Sign up to MapBox to get a free token</a>
                        </div>
                    </div>

                    {/* Cloudflare Turnstile */}
                    <div className='integrations-feature-group-cloudflare'>
                        <div className='checkbox-with-label'>
                            <input type="checkbox" id="cloudflare" className='integrations-checkbox' />
                            <label htmlFor="cloudflare">Cloudflare Turnstile</label>
                        </div>
                        <p className='feature-description'>Protect your forms from CF Turnstile.</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

const DeveloperToolsGeneralSetting = () => {
    return (
        <div className="general-settings-section-developer">
            {/* Section Header */}
            <h2 className="general-section-title-developer">Developer Tools</h2>
            <div className="generalsetting-feature-container-developer">

                {/* Single Column for Links */}
                <div className='developer-tools-column'>

                    <div className='developer-link-group'>
                        <a href="#" className='developer-tool-link'>Activate the developer mode</a>
                    </div>

                    <div className='developer-link-group'>
                        <a href="#" className='developer-tool-link'>Activate the developer mode (with assets)</a>
                    </div>

                    <div className='developer-link-group'>
                        <a href="#" className='developer-tool-link'>Activate the developer mode (with tests assets)</a>
                    </div>

                </div>
            </div>
        </div>
    )
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
                    <p className='about-version-info'>Odoo saas~18.4+e (Enterprise Edition)</p>
                    <p className='about-copyright'>
                        Copyright © 2004
                        <a href="#" className='about-link'>Odoo S.A.</a>,
                        <a href="#" className='about-link'>Odoo Enterprise Edition License v1.0</a>
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
                    <DiscussGeneralSetting />
                </div>
                <div className='generalsetting-container-body'>
                    <ContactsGeneralSetting />
                </div>
                <div className='generalsetting-container-body'>
                    <PermissionsGeneralSetting />
                </div>
                <div className='generalsetting-container-body'>
                    <IntegrationsGeneralSetting />
                </div>
                <div className='generalsetting-container-body'>
                    <DeveloperToolsGeneralSetting />
                </div>
                <div className='generalsetting-container-body'>
                    <AboutGeneralSetting />
                </div>
            </div>
        </div>
    )
}


export default GeneralSetting;