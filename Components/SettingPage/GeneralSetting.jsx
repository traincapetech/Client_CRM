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

const LanguageGeneralSetting=()=>{
    return(
        <div>
            <h2 className="general-section-title-language">Language</h2>
            
        </div>
    )
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
            </div>
        </div>
    )
}

export default GeneralSetting;