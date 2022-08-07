import userPic from '../pics/user.png'




const FriendsBanner = ({username, img_url, removeFriend, reqId, currUsername, userParam}) =>{
    
return(

    <div className='bg-gray-200 w-10/12 sm:w-10/12 mx-auto rounded-md inline-flex p-3 mb-4 '>
        <img className=' h-10 sm:h-12 sm:ml-2 my-auto ' src={img_url || userPic} />
        
        <div className='my-auto w-7/12 overflow-hidden'>
            <a href={`/profile/${username}`}><h1 className='ml-2 my-auto text-3xl mx-2 underline text-left'>{username}</h1></a>
        </div>

        {currUsername !== userParam ? null 
        :
        <div className='flex-col'>
        <button onClick={(e)=>removeFriend(e, reqId)}
        className='text-white my-auto  sm:text-sm sm:mt-auto ml-2 h-6  w-18 sm:w-20 bg-green-500 rounded-sm'>Challenge</button>
        <button onClick={(e)=>removeFriend(e, reqId)}
        className='text-white my-auto   sm:text-sm sm:mt-auto ml-2 h-6 w-18 px-2 sm:w-20 bg-red-500 rounded-sm'>Remove</button>
        </div>
    }
    </div>
)

}

export default FriendsBanner;