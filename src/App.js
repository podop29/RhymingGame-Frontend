import './App.css';
import BackendApi from "./backend_api";
import RhymingApi from './rhymingApi';
import { BrowserRouter, Route, Routes  } from "react-router-dom";

import Game from './components/game'
import Home from './components/home'

const test = async () =>{
  console.log(await RhymingApi.rhymesWithAndRelatedTo("grape","breakfast"))
}
test()



function App() {
  return (
    <div className="App w-screen h-screen bg-blue-500">
      <h1 className='text-3xl font-bold underline'>Hello World</h1>

      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<Game/>}></Route>

        </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
