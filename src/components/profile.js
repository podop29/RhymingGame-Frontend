import {useState, useEffect} from 'react';
import BackendApi from '../backend_api';
import userPic from '../pics/user.png'
import {useParams} from 'react-router-dom'


function Profile({currUsername}) {
    const {username} = useParams()

    //state holds user object
    const [user, setUser] = useState({});
    const [progress, setProgress] = useState("w-0")
    //hold list of friends
    const [friends, setFriends] = useState([])

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
            }
        }
        func()
    },[user])

    //Helper function that sets with attribute of the progress bars
    const progressBrHelper = () =>{
        const xp = user.exp
        const maxXp = 100 * parseInt(`1.${user.level}`)
        let num =  (Math.floor((xp / maxXp) * 12)).toString();

        if(num === '0'){
        setProgress(`w-0`)
        }else{
            setProgress(`w-${num}/12`)
        }

    }
 

  return (
    <div className='w-5/6 md:w-6/12 mt-28 mx-auto bg-white text-center shadow-lg rounded-lg items-center'>

        
        <h1 className='block text-4xl font-semibold mb-6 '>{username}'s profile</h1>

        <span className='flex flex-row justify-evenly '>
            <img className='block h-24 lg:h-28  xl:h-36 ml-4 mb-2 ' src={user.img_url || userPic} />

            <ul className=' md:text-2xl xl:text-4xl my-auto'>
                <li>Games Played: {user.games_played}</li>
                <li>High Score: {user.high_score}</li>
                <li>Friends: <a className='underline text-blue-400' href={`${user.username}/friends`}>{friends.length}</a></li>

            </ul>

            
        </span>

        



        <span className='flex flex-col justify-evenly my-2 '>
            <h1 className='text-3xl'>Level {user.level}</h1>
            <div className="mb-1 text-xl font-medium ">Level Progress: {user.exp} Xp</div>
            <div className="w-8/12 bg-gray-200 rounded-full h-3 mb-4 mx-auto">
            <div className={`bg-green-500  h-3 rounded-full   ${progress}`}></div>
       </div>
            
        </span>
    </div>

  );
}
//<label className='mb-2' for="file">Level Progress:</label>
//<progress className='mx-auto mb-4 bg-red-500'  value={50} max={100 * parseInt(`1.${user.level}`)}></progress>

export default Profile;
