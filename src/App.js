import BackendApi from "./backend_api";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import {useState} from 'react';

import Game from './components/game'
import Home from './components/home'
import NavBar from './components/navbar';
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import Friends from "./components/friends";
import GamePage from "./components/gamePage";
import React from "react";
import MultiplayerGame from "./components/multiplayerGame";


function App() {

  //State for storing user JWT token
const [token, setToken] = useState(localStorage.getItem('token'));
const [username, setUsername] = useState(localStorage.getItem('username'))

//Function that handles login logic
const handleLogin = (userData) =>{
  BackendApi.login(userData).then((json)=>{
    setToken(json.token)
    setUsername(userData.username)

    BackendApi.token = json.token;
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
    <div className="w-full overflow-hidden min-h-full mt-0 p-0 absolute bg-slate-200 ">
      
      

      <BrowserRouter>
      
      <NavBar token={token} logout={logout} username={username}/>

        <Routes>
          <Route exact path='/' element={<Home token={token}/>}/>


          <Route exact path='/play' element={<Game time={60} difficultyParam={null} username={username} practice={false}/>}/>

          <Route exact path='/game' element={<GamePage username={username}/>}/>

          <Route exact path='/practice-game' element={<Game time={60} difficultyParam={null} username={username} practice={true}/>}/>

          <Route  path={'/multiplayer/:gameId'} element={<MultiplayerGame username={username}/>}/>
          {/**<Game time={60} difficultyParam={2} username={username} practice={false} multiplayer={true}/>**/}
          



          <Route exact path='/login' element={<Login login={handleLogin}/>}/>

          <Route exact path='/register' element={<Register login={handleLogin}/>}/>

          <Route  path={`/profile/:username`} element={<Profile currUsername={username}/>}/>

          <Route  path={`/profile/:username/friends`} element={<Friends currUsername={username}/>}/>





        </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
