import {useState} from 'react'
import BackendApi from "../backend_api";
import userPic from '../pics/user.png'




const SearchFriends = ({allUsers,user}) =>{

    const [filteredUsers, setFilteredUsers] = useState([])
    


    const [formData, setFormData] = useState("")

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData(formData =>({
            ...formData,
            [name]:value
        }))
    }
    
      const filterUsers = () =>{
        setFilteredUsers(
            allUsers.filter((user) =>user.username.includes(formData.value)).slice(0, 4))
    }

    const sendFriendRequest = async(e,id2) =>{
        e.target.classList.add('hidden')
        await BackendApi.sendFriendRequest(user.userid, id2)

    }

return(
    
        <div className='flex-inline bg-slate-200 mx-auto py-8  w-8/12 rounded-lg mb-2'> 
            <span className='flex-col mx-auto'>
                <label  className='mt-2 mr-5' htmlFor="search">Search Users </label>
                <input className='bg-white rounded border-black border w-2/3 text-black mr-3 py-1 px-2'
                type="text" name="value" value={formData.value || ""} onChange={handleChange}/>
                <button onClick={filterUsers} className='bg-green-500 text-white text-sm w-1/5 h-8 mt-2 rounded-full'>Search</button>
            </span>
            <div className='flex-col'>

            {filteredUsers.length !== 0 ? filteredUsers.map((f)=>{
                return(
                    <div key={f.userid} className='flex bg-slate-300 w-11/12 sm:w-72 mx-auto my-2 rounded-md overflow-clip'>
                         <img alt='Profile Pic' className=' h-10 sm:h-12 sm:ml-4 my-auto ' src={f.img_url || userPic} />
                        <a href={`/profile/${f.username}`}><h1 className='sm:ml-2 my-auto text-3xl mx-1 sm:mx-4 underline '>{f.username}</h1></a>

                        <button onClick={(e)=>sendFriendRequest(e,f.userid)} className='bg-green-400 text-2xl ml-auto text-white '> + </button>
                        
                    </div>
                )
            }) : <h1>No users found</h1>}
            </div>
            </div>

)
            
}

export default SearchFriends;