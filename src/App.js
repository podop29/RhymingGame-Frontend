import './App.css';
import BackendApi from "./backend_api";
import RhymingApi from './rhymingApi';

const test  = async () =>{
  console.log(await RhymingApi.rhymesWithAndRelatedTo('time', "rhyme"))
}
test()

function App() {
  return (
    <div className="App">
      <h1 className='text-3xl font-bold underline'>Hello World</h1>
    </div>
  );
}

export default App;
