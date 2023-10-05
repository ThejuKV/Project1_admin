import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import User_register from './component/users/User_register';
import User_login from './component/users/User_login';

function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<User_register/>} />
      <Route path='/login' element={<User_login/>}/>
    </Routes>
  </Router>
  );
}
export default App;

