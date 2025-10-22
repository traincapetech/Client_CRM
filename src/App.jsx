
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Homepage from '../Components/Homepage/Homepage';
import Login from '../Components/AuthenticationPage/Login';
import Signup from '../Components/AuthenticationPage/Signup';
import Navbar from '../Components/NavbarPage/Navbar';
import PipelinePage from '../Components/Homepage/PipelinePage';
import My_Activity from '../Components/My_activity/My_Activity';
import Team from '../Components/Teams/Team';
import Customer from '../Components/Customers/Customer';
import Forecast from '../Components/Report/ForecastPage/Forecast';
import ReportPipeline from '../Components/Report/ReportPipelinePage/ReportPipeline';
import ReportActivity from '../Components/Report/ReportActivitiesPage/ReportActivity';
import ReportLeads from '../Components/Report/ReportLeadsPage/ReportLeads';
import TeamConfig from '../Components/Teams/TeamConfig';
import ConfigActivityTypes from '../Components/My_activity/ConfigActivityTypes';
import ConfigActivityPlans from '../Components/My_activity/ConfigActivityPlans';
import Setting from '../Components/SettingPage/Setting';
import GeneralSetting from '../Components/SettingPage/GeneralSetting';
import Tags from '../Components/ConfigPipelineOption/Tags';
import Lost_Reason from '../Components/ConfigPipelineOption/Lost_Reason';
import LeadMiningPage from '../Components/Teams/LeadMiningPage';
import EditLeadPage from '../Components/Homepage/EditLeadPage';
// import KanbanView from '../Components/NavbarPage/KanbanView';
// import ListView from '../Components/NavbarPage/ListView';
// import { ViewModeProvider } from '../ContextViewProvider/ViewModeProvider';

function App() {
  const location = useLocation()
  const hideNavbar = location.pathname === "/" || location.pathname === "/login";

  return (

    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Homepage />} />

        <Route path="/pipeline" element={<PipelinePage view="kanban" />} />
           {/* List view route */}
           <Route path="/pipeline/list" element={<PipelinePage view="list" />} />

        {/* pipeline sub route  */}
        <Route path='/myActivity' element={<My_Activity />} />
        <Route path='/team' element={<Team />} />
        <Route path='/customer' element={<Customer />} />

        {/* Reporting Routes */}
        <Route path='/report/forecast' element={<Forecast />} />
        <Route path='/report/pipeline' element={<ReportPipeline />} />
        <Route path='/report/activity' element={<ReportActivity />} />
        <Route path='/report/leads' element={<ReportLeads />} />

        {/* Configuration Routes */}
        <Route path='/config/team' element={<TeamConfig />} />
        <Route path='/config/activitytypes' element={<ConfigActivityTypes />} />
        <Route path='/config/activityplans' element={<ConfigActivityPlans />} />
        <Route path='/config/tags' element={<Tags />} />
        <Route path='/config/lostreason' element={<Lost_Reason />} />
        <Route path='/config/leadmining' element={<LeadMiningPage />} />

        {/* Setting Routes */}
        <Route path='/setting' element={<Setting />} />
        <Route path='/generalsetting' element={<GeneralSetting />} />

        {/* Edit page */}
        <Route path="/edit/:col/:index" element={<EditLeadPage />} />
      </Routes>
{/* </ViewModeProvider> */}
    </div>

  )
}

export default App


 