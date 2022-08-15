import {useState, useEffect} from 'react'
import BackendApi from "../backend_api";
import FriendsBanner from './friendBanner';
import {useParams} from 'react-router-dom'
import SearchFriends from './searchFriends';



const Friends = ({currUsername}) =>{
    const {username} = useParams()

    //state holds user object
    const [user, setUser] = useState({});
    //hold list of friends
    const [friends, setFriends] = useState([])
    //Controls if search from or friends list is shown
    const [showSearch, setShowSearch] = useState(false)
    //Holds value of search user input
    const [allUsers, setAllusers] = useState([])


    


    //on initial render, call backendapi to get user object
    //sets logged in user, and all users
    useEffect(()=>{
        const asyncFunc = async() =>{
            setUser(await BackendApi.getUser(username))
            //Gets list of all users for searching 
            setAllusers(await BackendApi.getAllUsers());
        }
        asyncFunc()
        
    },[])

    //populates friend list, if user is logged in
    useEffect(()=>{
        const func = async() => {
            if(user.userid !== undefined){
                setFriends(await BackendApi.seeFriendsList(user.userid))
            }
        }
        func()
    },[user])


    //Function responsible for deleting friends from the backend
    const removeFriend = async(e, id) =>{
        e.preventDefault();
        await BackendApi.deleteFriendRequest(id)
        //Updates state after deleting friend
        setFriends(await BackendApi.seeFriendsList(user.userid))

    }

    //Sends a user a request to play
    const sendGameRequest = async(e,user2_id) =>{
        e.preventDefault()
        e.target.classList.add('hidden')
        await BackendApi.sendGameRequest(user.userid, user2_id)
    }

return(
    <div className='w-5/6 md:w-4/12 mt-28 mx-auto bg-white text-center shadow-lg rounded-lg items-center pb-2'>
        <span className='inline-block mx-auto w-full '>
        <h1 className='text-4xl font-semibold mx-auto mb-4 ml-auto my-auto'>{username}'s Friends</h1>
            {/* If user is viewing their own profile, show add friends button */}
            {username === currUsername ? 
            <button onClick={()=> setShowSearch((showSearch)=>!showSearch)}
             className='text-md mx-auto bg-green-500 text-white rounded-lg h-10  mb-4 sm:h-8 sm:w-3/12 my-auto'>Add Friends</button>
            : null}
        </span>
        {/*Search for friends*/}
        {showSearch ?
            <SearchFriends user={user} allUsers={allUsers} />
        : 
        friends.length === 0 ? 
            <h2>
                This user has no friends yet
            </h2>
            :
            friends.map((f)=>{
                return(
                <FriendsBanner key={f.id} img_url={f.img_url} username={f.username} userParam={username} currUsername={currUsername} removeFriend={removeFriend}
                reqId={f.id} id={f.userid} sendGameRequest={sendGameRequest}/>
                )
            })
            }
    </div>
)

}

export default Friends;