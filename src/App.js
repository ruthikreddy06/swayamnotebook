
import About from './components/About';
import Notes from './components/Notes';
import Home from './components/Home';
import Addnote from './components/Addnote';
import Modify from './components/Modify';
//import Mycontext from './context/Createcontext';
import Setstate from './context/Setstate';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';

import { useState } from 'react';
import Profile from './components/Profile';
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

    
  return (
   <div>     
    <Setstate>
         <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <Routes>
          <Route exact path="/Login" element={<Login showalert={showAlert}/>} />
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/Profile" element={<Profile/>}/>
          <Route exact path="/Note" element={<Notes showalert={showAlert}/>} />
          <Route exact path="/Addnote" element={<Addnote showalert={showAlert}/>}/>
          <Route exact path="/Signup" element={<Signup  showalert={showAlert} />} />
          <Route exact path="/Modify" element={<Modify/>}>
          </Route>
          </Routes>
         </Router>
    </Setstate>
    </div>
  );
}

export default App;
