
import { Route, Routes, useNavigate,useLocation  } from 'react-router-dom';
import Home from './Screens/Home';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import Addinfo from './Screens/Addinfo';
import Compost from './Screens/Compost';
import ResumeForm from './Screens/Addresume';
import Profiles from './Screens/Profiles';
import Offcampus from './Screens/Offcampus';
import Oncampus from './Screens/oncampus';
import Companies from './Screens/Companies';
import ApplicantsList from './Screens/Studentlist';
import { useAuth } from './context/authContext';
import { useEffect } from 'react';
import Shortlist from './Screens/Shortlist';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
  }
  
  function App() {
  const {  setAuthToken, setIsLoggedIn } = useAuth();
  const navigate=useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = getCookie("authCookie");
    console.log(token)
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      if (!['/', '/login', '/signup'].includes(location.pathname)) {
        navigate("/login");
      }
    }
  }, [setAuthToken, setIsLoggedIn, navigate,location.pathname]);

  return (
   <>
   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/info' element={<Addinfo/>}/>
   <Route path='/compost' element={<Compost/>}/>
   <Route path='/addresume' element={<ResumeForm/>}/>
   <Route path='/profile/:id?' element={<Profiles/>}/>
   <Route path='/offc' element={<Offcampus/>}/>
   <Route path='/onc' element={<Oncampus/>}/>
   <Route path='/comps' element={<Companies/>}/>
   <Route path='comps/appstu/:id' element={<ApplicantsList/>}/>
   <Route path='comps/shortlist/:id' element={<Shortlist/>}/>
   </Routes>
   </>
  );
}

export default App;
