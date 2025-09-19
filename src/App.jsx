
import {Routes, Route,useLocation  } from 'react-router-dom';
import './App.css'
import Homepage from '../Components/Homepage/Homepage';
import Login from '../Components/AuthenticationPage/Login';
import Signup from '../Components/AuthenticationPage/Signup';
import Navbar from '../Components/NavbarPage/Navbar';
import PipelinePage from '../Components/Homepage/PipelinePage';
import My_Activity from '../Components/My_activity/My_Activity';


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
          <Route path='/pipeline' element={<PipelinePage />} />
          <Route path='/myActivity' element={<My_Activity/>} />
          </Routes>
        
        
     </div>
    </>
  )
}

export default App
