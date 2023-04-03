import 'bootstrap/dist/css/bootstrap.min.css';

import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Users from './components/Users';
import { useState } from 'react';
import Protected from './components/Protected';
import Cookies from 'universal-cookie';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [isBlocked, setisBlocked] = useState(false);
  const cookies = new Cookies();
    
  const successHandler = (data) => {
    cookies.set('user-info', `${data.id}`, {path:'/', maxAge:60*60*24*7});
    
    if (data.userstatus === 'blocked' || cookies.get('user-info', {path: '/'}) === undefined) {
      setisBlocked(true);
    } else {
      setisBlocked(false);
    }
  };


  const failureHandler = () => {
    console.log('Error!')
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onSuccess={successHandler} onFail={failureHandler} />}  />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/users" element={<Protected isBlocked={isBlocked}><Users setisBlocked={setisBlocked} /></Protected>} />
      </Routes>
    </Router>
  );
}

export default App;