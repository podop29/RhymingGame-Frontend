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

            <h1 className='mx-auto text-center text-3xl'>{game.username1} Vs {game.username2} </h1>
            <h1 className='mx-auto text-center text-3xl'>Round {game.round_num}</h1>
            <h1 className='mx-auto text-center text-3xl'>Your turn</h1>

        <Game time={20} difficultyParam={2} username={username} practice={false} multiplayer={true} mpGame={game}/>

    </div>



  );
}


export default MultiplayerGame;
