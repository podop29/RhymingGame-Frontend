import {useState, useEffect} from 'react'
import BackendApi from "../backend_api";
import FriendsBanner from './friendBanner';
import {useParams} from 'react-router-dom'
import userPic from '../pics/user.png'




const Friends = ({currUsername}) =>{
    const {username} = useParams()



    //state holds user object
    const [user, setUser] = useState({});
    //hold list of friends
    const [friends, setFriends] = useState([])
    //Controls if search from or friends list is shown
    const [showSearch, setShowSearch] = useState(false)
    //Holds value of search user input
    const [formData, setFormData] = useState("")

    const [allUsers, setAllusers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])


    


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

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData(formData =>({
            ...formData,
            [name]:value
        }))
    }
    
    const handleSubmit = async(e) =>{
      e.preventDefault()
        
      }


    const removeFriend = async(e, id) =>{
        e.preventDefault();
        await BackendApi.deleteFriendRequest(id)
        setFriends(await BackendApi.seeFriendsList(user.userid))

    }

    const filterUsers = () =>{
        setFilteredUsers(allUsers.filter((user) =>user.username.includes(formData.value)).slice(0, 6))
    }

return(
    <div className='w-5/6 md:w-6/12 mt-28 mx-auto bg-white text-center shadow-lg rounded-lg items-center'>
        <span className='flex mx-auto w-full'>
        <h1 className='text-4xl font-semibold mb-4 ml-auto my-auto'>{username}'s Friends</h1>

            {/* If user is viewing their own profile, show add friends button */}
            {username === currUsername ? 
            <button onClick={()=> setShowSearch((showSearch)=>!showSearch)} className='text-sm sm:mr-auto sm:ml-8 mr-10 bg-sky-400 rounded-xl p-2 h-14 sm:h-10 my-auto'>Add Friends</button>
            : null}
        </span>

        {/*Search for friends*/}
        {showSearch ?
        <div className='flex-inline bg-slate-200 mx-auto py-8  w-8/12 rounded-lg mb-2'> 
            <span className='flex-col mx-auto'>
                <label  className='mt-2 mr-5' htmlFor="search">Search Users </label>
                <input className='bg-white rounded border-black border w-2/3 text-black mr-3 py-1 px-2'
                type="text" name="value" value={formData.value} onChange={handleChange}/>
                <button onClick={filterUsers} className='bg-red-500 text-white text-sm w-1/5 h-8 mt-2 rounded-full'>Search</button>
            </span>
            <div className='flex-col'>
            {filterUsers ? 
            filteredUsers.map((f)=>{
                return(
                    <div className='flex bg-slate-300 w-3/5 sm:w-72 mx-auto my-2 rounded-md overflow-hidden'>
                         <img className=' h-10 sm:h-12 sm:ml-4 my-auto ' src={f.img_url || userPic} />
                        <a href={`/profile/${f.username}`}><h1 className='sm:ml-8 my-auto text-3xl mx-1 sm:mx-4 underline'>{f.username}</h1></a>
                        
                    </div>
                )
            })
            :
            null
            }
            </div>
        </div>
        : 
        friends.length === 0 ?
            <h2>
                This user has no friends yet
            </h2>
            :
            friends.map((f)=>{
                return(
                <FriendsBanner img_url={f.img_url} username={f.username} level={f.level} removeFriend={removeFriend}
                reqId={f.id}/>
                )
            })
            }
        

       
    
        
    </div>
    
)

}

export default Friends;