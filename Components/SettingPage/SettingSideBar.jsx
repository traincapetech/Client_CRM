import { Link } from 'react-router-dom';
import './SettingSideBar.css'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function SettingSideBar() {
    return (
        <div className="setting-sidebar-container">
            <Link to={'/generalsetting'}>
                <button className="general-settingSideNavbar">
                    <span><SettingsOutlinedIcon sx={{ color: "#212121" }} /></span>
                    General setting
                </button>
            </Link>
            <Link to='/setting'>
                <button className="crm-settingSideNavbar">
                    <span>
                        <HandshakeOutlinedIcon sx={{ color: "#212121" }} />
                    </span>
                    CRM Setting
                </button>
            </Link>
        </div>
    )
}

export default SettingSideBar