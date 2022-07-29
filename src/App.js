import './App.css';
import BackendApi from "./backend_api";
import RhymingApi from './rhymingApi';
import { BrowserRouter, Route, Routes  } from "react-router-dom";

import Game from './components/game'
import Home from './components/home'
import NavBar from './components/navbar';



function App() {
  return (
    <div className="w-screen h-screen m-0 bg-slate-300 p-5">
      <NavBar/>

      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<Home/>}></Route>

          <Route exact path='/practice-game' element={<Game time={60} difficultyParam={null}/>}></Route>

        </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
