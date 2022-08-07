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
    useEffect(()=>{
        const asyncFunc = async() =>{
            setUser(await BackendApi.getUser(username))
            //Gets list of all users for searching 
            setAllusers(await BackendApi.getAllUsers());
        }
        asyncFunc()
        
    },[])

    //populates friend list
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
        setFriends(await BackendApi.seeFriendsList(user.userid))

    }

return(
    <div className='w-5/6 md:w-6/12 mt-28 mx-auto bg-white text-center shadow-lg rounded-lg items-center pb-2'>
        <span className='inline-block mx-auto w-full '>
        <h1 className='text-4xl font-semibold mx-auto mb-4 ml-auto my-auto'>{username}'s Friends</h1>
            {/* If user is viewing their own profile, show add friends button */}
            {username === currUsername ? 
            <button onClick={()=> setShowSearch((showSearch)=>!showSearch)}
             className='text-sm mx-auto bg-green-500 text-white rounded-xl p-2 h-14 mb-4 sm:h-10 my-auto'>Add Friends</button>
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
                <FriendsBanner img_url={f.img_url} username={f.username} userParam={username} currUsername={currUsername} level={f.level} removeFriend={removeFriend}
                reqId={f.id} friends={friends}/>
                )
            })
            }
    </div>
)

}

export default Friends;