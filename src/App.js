import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {useToken,useTitle} from "./components/useToken";
import NavBar from './router/navbar'
import MainPage from './router/mainPage'
import Invited from './router/invited'
import Home from './router/home'
import Note from './router/note'
import {Login,Signup} from './router/account'
import './App.css'

export default function App() {
  const {token,setToken}=useToken('nothing')
  const {title,setTitle}=useTitle('nothing')
  //console.log(token)
  if(token=='nothing'|token=='"nothing"'){
    //console.log('out')
    return (
      <div className="App">
        <Router>
          <NavBar setToken={setToken} setTitle={setTitle}/>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<Signup className="login"></Signup>}></Route>
            <Route path="/login" element={<Login className="login" setToken={setToken}></Login>}></Route>
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
            <Route path="/homepage" element={<Home token={token} setToken={setToken} setTitle={setTitle}/>} />
            <Route path="/invited" element={<Invited token={token}/>} />
            <Route path="/invited/:noteid" element={<Invited token={token}/>} />
            <Route path="/homepage/note/:noteid" element={<Note />} />
          </Routes>
        </Router>
      </div>
    );
  }

}
