import './App.css';
import BackendApi from "./backend_api";
import RhymingApi from './rhymingApi';
import { BrowserRouter, Route, Routes  } from "react-router-dom";

import Game from './components/game'
import Home from './components/home'



function App() {
  return (
    <div className="w-screen h-screen bg-slate-300 p-5">

      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<Game/>}></Route>

        </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
