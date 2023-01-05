import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './router/navbar'
import MainPage from './router/mainPage'
import Invited from './router/invited'
import Home from './router/home'
import Note from './router/note'
import {Login,Signup} from './router/account'
import './App.css'

export default function App() {
  const {token,setToken}=useState('')
  const {title,setTitle}=useState('')
  if(token===''){
    //console.log('out')
    return (
      <div className="App">
        <Router>
          <NavBar token={token} setToken={setToken} title={title} setTitle={setTitle}/>
          <Routes>
            <Route path="/" element={<MainPage token={token} setToken={setToken} title={title} setTitle={setTitle}/>} />
            <Route path="/signup" element={<Signup className="login" token={token} setToken={setToken} title={title} setTitle={setTitle}></Signup>}></Route>
            <Route path="/login" element={<Login className="login" token={token} setToken={setToken} title={title} setTitle={setTitle}></Login>}></Route>
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
          <NavBar token={token} setToken={setToken} title={title} setTitle={setTitle}/>
          <Routes>
            <Route path="/homepage" element={<Home token={token} setToken={setToken} title={title} setTitle={setTitle}/>} />
            <Route path="/invited" element={<Invited token={token} setToken={setToken} title={title} setTitle={setTitle}/>} />
            <Route path="/invited/:noteid" element={<Invited token={token} setToken={setToken} title={title} setTitle={setTitle}/>} />
            <Route path="/homepage/note/:noteid" element={<Note token={token} setToken={setToken} title={title} setTitle={setTitle}/>} />
          </Routes>
        </Router>
      </div>
    );
  }
  
}
