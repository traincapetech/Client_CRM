
import {Routes, Route,useLocation  } from 'react-router-dom';
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


function App() {
const location=useLocation()
const hideNavbar = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
     <div>
       {!hideNavbar && <Navbar />}
         
        <Routes>
          <Route path='/' element={<Signup/> } />
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<Homepage />} />

          {/* this is the part of Sales option  */}
          <Route path='/pipeline' element={<PipelinePage />} />
          <Route path='/myActivity' element={<My_Activity/>} />
          <Route path='/team' element={<Team/>} />
          <Route path='/customer' element={<Customer/>} />

          {/* this is a part of reporting option */}
          <Route path='/report/forecast' element={<Forecast/>} />
          <Route path='/report/pipeline' element={<ReportPipeline/>} />
          <Route path='/report/activity' element={<ReportActivity/>} />
          <Route path='/report/leads' element={<ReportLeads/>} />
          </Routes>
        
        
     </div>
    </>
  )
}

export default App
