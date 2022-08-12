import {useState, useEffect} from 'react';
import BackendApi from '../backend_api';
import {useParams} from 'react-router-dom'
import Game from './game';


function MultiplayerGame({username}) {
    const {gameId} = useParams()

    //holds object for current game
    const [game,setGame] = useState({});

    //sets game state
    useEffect(()=>{
        const asyncFunc = async() =>{
            setGame(await BackendApi.getGameById(gameId))
        }
        asyncFunc()
    },[])


  return (

    <div className='mt-20'>
          <div className='bg-white mx-auto w-3/4 sm:w-2/4 md:w-1/4 mb-2 shadow-lg shadow-indigo-200 rounded-2xl  '>
            <h1 className='mx-auto text-center text-3xl text-gray-500'>{game.username1} Vs {game.username2} </h1>
            <h1 className='mx-auto text-center text-3xl text-gray-500'>Round {game.round_num}</h1>
          </div>
        <Game time={60} difficultyParam={2} username={username} practice={false} multiplayer={true} mpGame={game}/>

    </div>



  );
}


export default MultiplayerGame;
