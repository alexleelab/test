import './App.css';
import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {useToken,useTitle} from "./components/useToken";

function App() {
  const {token,setToken}=useToken('nothing')
  const {title,setTitle}=useTitle('nothing')
  if(token=='nothing'|token=='"nothing"'){
    //console.log('out')
    return (
      <div className="App">
        <Router>
         // <NavBar setToken={setToken} setTitle={setTitle}/>
          <Routes>
            <Route path="/" element={Mainpage} />
            <Route path="/signup" element={Signup}></Route>
            <Route path="/login" element={Login}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
  else{
    //console.log('in')
    return (
      <div className="App">
        <Router>
          <NavBar setToken={setToken} setTitle={setTitle}/>
          <Routes>
            <Route path="/homepage" element={Home} />
            <Route path="/invited" element={Invited} />
            <Route path="/invited/:noteid" element={Invited}/>} />
            <Route path="/homepage/note/:noteid" element={Note} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
