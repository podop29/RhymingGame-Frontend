import {useState} from 'react'
 

function GamePage({username}) {
   
    return(
        <div className='mt-24 flex-col w-4/5 md:w-1/5 mx-auto  '>
            <div className='text-center w-full mx-auto   lg:w-5/6  bg-gray-300 my-5 rounded-md'>
                <h1 className='text-2xl'>Practice Round</h1>
                <div className='bg-white rounded-b-lg'>
                    <h1 className='w-3/5 mx-auto h-24'>
                        Play a practice round that wont effect your stats
                    </h1>
                    <a href='/practice-game'>
                        <button className='bg-violet-500 px-5 rounded-lg my-2 text-white hover:bg-violet-600 duration-500'>Play</button>
                    </a>
                </div>
            </div>
            <div className='text-center w-full mx-auto lg:w-5/6 my-5 bg-gray-300 m-2 rounded-md '>
                <h1 className='text-2xl'>Quick games</h1>
                <div className='bg-white  rounded-b-lg'>
                <h1 className='w-3/5 mx-auto h-24'>
                        Play a quick, 30 second game that will effect you stats
                    </h1>
                    <a href='/play'>
                        <button className='bg-violet-500 px-5 rounded-lg my-2 text-white hover:bg-violet-600 duration-500'>Play</button>
                    </a>                
                </div>
            </div>
            <div className='text-center w-full mx-auto lg:w-5/6 my-5 bg-gray-300 m-2 rounded-md'>
                <h1 className='text-2xl'>Play A friend</h1>
                <div className='bg-white rounded-b-lg'>
                <h1 className='w-3/5 mx-auto h-24'>
                        Challenge a friend to a 1v1 game
                    </h1>
                    <a>
                        <button className='bg-violet-500 px-5 rounded-lg my-2 text-white hover:bg-violet-600 duration-500'>Play</button>
                    </a>                
                </div>
            </div>
            
            
        </div>

    )
    

}


export default GamePage