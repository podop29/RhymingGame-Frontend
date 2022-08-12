function GamePage({username}) {
   
    return(
        <div className='mt-24 flex-col w-4/5 md:w-1/5 mx-auto my-auto'>
            <div className='text-center w-full mx-auto   lg:w-5/6  bg-gray-300 my-5 rounded-md'>
                <h1 className='text-2xl'>Practice Round</h1>
                <div className='bg-white rounded-b-lg'>
                    <h1 className='w-3/5 mx-auto h-24'>
                        Play a practice round that wont affect your stats
                    </h1>
                    <a href='/practice-game'>
                        <button className='bg-violet-500 py-1 px-10  rounded-lg my-2 text-white hover:bg-violet-600 duration-500'>Play</button>
                    </a>
                </div>
            </div>
            <div className='text-center w-full mx-auto lg:w-5/6 my-5 bg-gray-300 m-2 rounded-md '>
                <h1 className='text-2xl'>Quick games</h1>
                <div className='bg-white  rounded-b-lg'>
                <h1 className='w-3/5 mx-auto h-24'>
                        Play a quick, 60 second game that will affect your stats
                    </h1>
                    <a href='/play'>
                        <button className='bg-violet-500 px-10 py-1 rounded-lg my-2 text-white hover:bg-violet-600 duration-500'>Play</button>
                    </a>                
                </div>
            </div>
            <div className='text-center w-full mx-auto lg:w-5/6 my-5 bg-gray-300 m-2 rounded-md'>
                <h1 className='text-2xl'>Play A friend</h1>
                <div className='bg-white rounded-b-lg'>
                <h1 className='w-3/5 mx-auto h-24'>
                        Challenge a friend to a 1v1 game
                    </h1>
                    <a href={`profile/${username}/friends`}>
                        <button className='bg-violet-500 px-10  py-1 rounded-lg my-2 text-white hover:bg-violet-600 duration-500'>Play</button>
                    </a>                
                </div>
            </div>
            
            
        </div>

    )
    

}


export default GamePage