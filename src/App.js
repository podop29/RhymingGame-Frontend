import BackendApi from "./backend_api";
import RhymingApi from './rhymingApi';
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import {useState, useEffect} from 'react';

import Game from './components/game'
import Home from './components/home'
import NavBar from './components/navbar';
import Login from "./components/login";
import React from "react";


function App() {

  //State for storing user JWT token
const [token, setToken] = useState(localStorage.getItem('token'));


//Function that handles login logic
const handleLogin = (userData) =>{
  BackendApi.login(userData).then((json)=>{
    setToken(json.token)
    BackendApi.token = token;
    localStorage.setItem('token', json.token);
    localStorage.setItem('username', userData.username);
  }).catch(e=>{
    throw new Error("Username / password not found")
  })
}

const logout = () =>{
  localStorage.clear();
  setToken(null);
  BackendApi.token = null;
}



  return (
    <div className="w-screen h-screen mt-0 p-0 absolute bg-slate-200 ">
      
      

      <BrowserRouter>
      
      <NavBar token={token} logout={logout}/>

        <Routes>
          <Route exact path='/' element={<Home/>}/>

          <Route exact path='/practice-game' element={<Game time={60} difficultyParam={null}/>}/>

          <Route exact path='/login' element={<Login login={handleLogin}/>}/>


        </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
