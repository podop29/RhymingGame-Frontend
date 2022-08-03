import userPic from '../pics/user.png'




const FriendsBanner = ({username, img_url, level, removeFriend, reqId}) =>{


    
return(

                <div className='bg-gray-200 w-10/12 sm:w-8/12 mx-auto rounded-md inline-flex p-3 mb-4 '>
                    <img className=' h-10 sm:h-12 sm:ml-4 my-auto ' src={img_url || userPic} />
                    
                    <div className='w-1/2 sm:w-72 mx-auto my-auto'>
                        <a href={`/profile/${username}`}><h1 className='ml-8 my-auto text-3xl mx-4 underline'>{username}</h1></a>
                        <h1 className='mt-2 mx-auto'>Level: {level}</h1>
                    </div>
                    
                    <button onClick={(e)=>removeFriend(e, reqId)}
                    className='text-white my-auto text-sm mt-11 sm:mt-auto   sm:h-10 px-2 sm:w-20 bg-red-500 rounded-full'>Remove</button>
                </div>
)

}

export default FriendsBanner;