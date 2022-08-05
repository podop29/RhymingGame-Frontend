import {useState, useEffect} from 'react';
import BackendApi from '../backend_api';
import userPic from '../pics/user.png'
import {useParams} from 'react-router-dom'


function Profile({currUsername}) {
    const {username} = useParams()

    //state holds user object
    const [user, setUser] = useState({});
    const [progress, setProgress] = useState(`w-0`)
    //hold list of friends
    const [friends, setFriends] = useState([])
    //holds list of friend requests
    const [friendRequests, setFriendRequests] = useState([])

  



    //on initial render, call backendapi to get user object
    useEffect(()=>{
        const asyncFunc = async() =>{
            setUser(await BackendApi.getUser(username))
        }
        asyncFunc()
        
    },[])
    //Updated progress bar
    useEffect(()=>{
        progressBrHelper()
        const func = async() => {
            if(user.userid !== undefined){
                setFriends(await BackendApi.seeFriendsList(user.userid))
                setFriendRequests(await BackendApi.seeFriendRequest(user.userid))
            }
        }
        func()
    },[user])

    //Helper function that sets with attribute of the progress bars
    const progressBrHelper = () =>{
        const xp = user.exp
        const maxXp = 100 * parseFloat(`1.${user.level}`)
        let num =  (Math.floor((xp / maxXp) * 12)).toString();

        if(num === '0'){
        setProgress(`w-0`)
        }else{
            setProgress(`w-${num}/12`)
        }
    }

    const acceptFriendRequest = async(reqId) =>{
        await BackendApi.acceptFriendRequest(reqId)
        setFriends(await BackendApi.seeFriendsList(user.userid))
        setFriendRequests(await BackendApi.seeFriendRequest(user.userid))
        

    }

    const declineFriendRequest = async(reqId) =>{
        await BackendApi.deleteFriendRequest(reqId)
        setFriends(await BackendApi.seeFriendsList(user.userid))
        setFriendRequests(await BackendApi.seeFriendRequest(user.userid))
    }

  return (
    <>
    <div className='w-5/6 md:w-6/12 mt-28 mx-auto bg-white text-center shadow-lg rounded-lg items-center'>

        
        <h1 className='block text-4xl font-semibold mb-6 '>{username}'s profile</h1>

        <span className='flex flex-row justify-evenly '>
            <img className='block h-24 lg:h-28  xl:h-36 ml-4 mb-2 ' src={user.img_url || userPic} />

            <ul className=' md:text-2xl xl:text-4xl my-auto'>
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
                <div className={`bg-green-500  h-3 rounded-full ${progress}`}></div>
            </div>
        </span>

        <div></div>

    </div>

    {/**If there are any friend requests it will render them below */}
    
    { currUsername !== username ? null: 
         friendRequests.length === 0 ? null
        :
        <div className='w-4/6 sm:w-2/6 mt-8 mx-auto text-center '>
            {friendRequests.length === 1 ?
            <h1 className='text-2xl'>{`${friendRequests.length} Friend Request`}</h1>
            :
            <h1 className='text-2xl'>{`${friendRequests.length} Friend Requests`}</h1>
            }
            {friendRequests.map((fr)=>{
                return(
                    <div className='grid grid-rows-none grid-cols-3 w-full p-3 bg-white shadow-lg rounded my-2 '>
                        <h1 className='text-1xl text-left w-1/3'>{fr.username}</h1>
                        <button onClick={()=>acceptFriendRequest(fr.id)}
                         className='bg-green-500 text-white sm:w-full mr-2 rounded'>Accept</button>
                        <button onClick={()=>declineFriendRequest(fr.id)}
                        className='bg-red-500 text-white sm:w-full ml-2 rounded'>Decline</button>

                    </div>
                )
            })} 
            
        </div>
    }


    </>

  );
}


export default Profile;
