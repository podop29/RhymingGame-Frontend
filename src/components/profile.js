import {useState, useEffect} from 'react';
import BackendApi from '../backend_api';
import userPic from '../pics/user.png'
import {useParams} from 'react-router-dom'
import GameBanner from './gameBanner';


function Profile({currUsername}) {
    const {username} = useParams()

    //state holds user object
    const [user, setUser] = useState({});
    const [progress, setProgress] = useState(0)
    //hold list of friends
    const [friends, setFriends] = useState([])
    //holds list of friend requests
    const [friendRequests, setFriendRequests] = useState([])

    //Holds list of all games user is playing
    const [games, setGames] = useState([])
    //holds list of all games user has finish recently
    const [finishedGames, setFinishedGames] = useState([])


    //on initial render, call BackEndApi to get user object
    useEffect(()=>{
        const asyncFunc = async() =>{
            setUser(await BackendApi.getUser(username))
        }
        asyncFunc()    
    },[])
    //Updated progress bar
    //sets friends, requests, games
    useEffect(()=>{
        progressBrHelper()
        const func = async() => {
            if(user.userid !== undefined){
                setFriends(await BackendApi.seeFriendsList(user.userid))
                setFriendRequests(await BackendApi.seeFriendRequest(user.userid))
                setGames(await BackendApi.seeGameRequest(user.userid))
                setFinishedGames(await BackendApi.seeFinishedGames(user.userid))
            }
        }
        func()
    },[user])

    //Helper function that sets width for progress bar
    //gets percentage to fill up progress bar and sets the progress state
    const progressBrHelper = () =>{
        const xp = user.exp
        const maxXp = 100 * parseFloat(`1.${user.level}`)
        let percent = (Math.floor((xp/maxXp) * 100)) 
        setProgress(percent)   
    }

    //accepts friend requests and updates friend requests state
    const acceptFriendRequest = async(reqId) =>{
        await BackendApi.acceptFriendRequest(reqId)
        setFriends(await BackendApi.seeFriendsList(user.userid))
        setFriendRequests(await BackendApi.seeFriendRequest(user.userid))
        

    }
    //declines friend requests and updates friend requests state
    const declineFriendRequest = async(reqId) =>{
        await BackendApi.deleteFriendRequest(reqId)
        setFriends(await BackendApi.seeFriendsList(user.userid))
        setFriendRequests(await BackendApi.seeFriendRequest(user.userid))
    }

    //Accept game requests and updates state
    const acceptGameRequest = async(reqId) =>{
        await BackendApi.acceptGameRequest(reqId)
        setGames(await BackendApi.seeGameRequest(user.userid))
    }

    //declines game requests and updates state
    const declineGameRequest = async(reqId) =>{
        await BackendApi.declineGameRequest(reqId)
        setGames(await BackendApi.seeGameRequest(user.userid))
    }



  return (
    <>
    <div className='w-5/6 md:w-6/12 mt-28 mx-auto bg-white text-center shadow-lg rounded-lg items-center'>

        
        <h1 className='block text-4xl font-semibold mb-6 '>{username}'s profile</h1>

        <span className='flex flex-row justify-evenly '>
            <span className='flex-col'>
                <img alt='Profile' className='block h-24 lg:h-28  xl:h-36 ml-4 mb-1 ' src={userPic} />
            </span>
            <ul className='md:text-2xl xl:text-4xl my-auto text-left'>
                <li>Games Played: {user.games_played}</li>
                <li>High Score: {user.high_score}</li>
                <li>Friends:
                     <a className=' text-blue-400 mr-2 underline' href={`${user.username}/friends`}>{friends.length}</a>    
                </li>

            </ul>

            
        </span>

        



        <span className='flex flex-col justify-evenly my-2 '>
            <h1 className='text-3xl'>Level {user.level}</h1>
            <div className="mb-1 text-xl font-medium ">{user.exp} / {parseInt(100 * parseFloat(`1.${user.level}`))} Xp</div>
                <div className="w-8/12 bg-gray-200 rounded-full h-3 mb-4 mx-auto">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${progress}%`}}></div>
                </div>
        </span>

    </div>

    <div className='mx-auto w-4/6 md:w-3/6  text-center'>
    { currUsername !== username ? null: 
         games.length === 0 ?<h1>No current games</h1>:
        <>
         <h1 className='text-2xl'>Games</h1>  
        <div>
            {games.map((g)=>{
                if(!g.game_over){
                return(
                <GameBanner key={g.id} id={g.id} username1={g.username1} username2={g.username2} currUsername={currUsername}
                user1_id={g.user1_id} user2_id={g.user2_id}
                user1_score={g.user1_score} user2_score={g.user2_score}
                accepted={g.accepted}
                acceptGameRequest={acceptGameRequest}
                declineGameRequest={declineGameRequest}
                round={g.round_num}
                    />
                )

            }})}


        </div>
        </>
    }


    </div>

    {/**If there are any friend requests it will render them below */}
    
    { currUsername !== username ? null: 
         friendRequests.length === 0 ? null
        :
        <div className='w-4/6 sm:w-3/6 mt-8 mx-auto text-center '>
            {friendRequests.length === 1 ?
            <h1 className='text-2xl'>{`${friendRequests.length} Friend Request`}</h1>
            :
            <h1 className='text-2xl'>{`${friendRequests.length} Friend Requests`}</h1>
            }
            {friendRequests.map((fr)=>{
                return(
                    <div key={fr.id} className='grid grid-rows-none grid-cols-3 w-full p-3 bg-white shadow-lg rounded my-2 '>
                        <h1 className='text-1xl text-center sm:text-left w-1/3'>{fr.username}</h1>
                        <button onClick={()=>acceptFriendRequest(fr.id)}
                         className='bg-green-500 text-white sm:w-full mr-2 rounded'>Accept</button>
                        <button onClick={()=>declineFriendRequest(fr.id)}
                        className='bg-red-500 text-white sm:w-full ml-2 rounded'>Decline</button>

                    </div>
                )
            })} 
            
        </div>
    }

    {finishedGames.length !== 0
    ?
    <div className='w-5/6 sm:w-4/6 mt-8 mx-auto text-center'>
        <h1 className='text-2xl'>Recent Games</h1>
        {finishedGames.map((g)=>{
            return(
                <div key={g.id} className='grid grid-rows-none justify-items-center grid-cols-2 w-full sm:w-2/3 p-3 bg-white shadow-lg rounded my-2 mx-auto justify-end '>
                    <h1 className='text-left ml-auto mr-4'>{g.username1} vs {g.username2}</h1>
                    {g.user1_score > g.user2_score?
                    <h1 className='mr-auto ml-4'>{g.username1} Wins</h1>
                    :
                    <h1 className='mr-auto ml-4'>{g.username2} Wins</h1>
                    }
                </div>
            )

        })}

    </div>
    :null
    }


    </>

  );
}


export default Profile;
