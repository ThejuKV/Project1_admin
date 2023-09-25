import React from 'react';
import Admin_panel from './component/Admin/Admin_panel';
import Admin_register from './component/Admin/Admin_register';
import Admin_login from './component/Admin/Admin_login';
import Login_page from './component/Login/Login_page';
import Register_page from './component/Register/Register_page';
import Header from './component/AppHeader/Header';
import Images from './component/Images/Images';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import ImagePreview from './component/Images/ImagePreview';



function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Admin_panel />} />
      <Route path="/Admin_register" element={<Admin_register />} />
      <Route path="/Admin_login" element={<Admin_login />} />
      <Route path="/Login_page" element={<Login_page />} />
      <Route path="/Register_page" element={<Register_page />} />
      <Route path='/Header' element={<Header/>}/>
      <Route path='/Images' element={<Images/>}/>
      <Route path='/ImagePreview' element={<ImagePreview/>}/>

    </Routes>
  </Router>
  );
}

export default App;