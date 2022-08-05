
function DifficultyBtn({handleDifficulty}) {



    return(
   
        <div className='flex flex-col my-16 md:flex-row md:my-44 '>
            <button onClick={event => handleDifficulty(1)}
             className='bg-bud-green my-4 md:w-1/3 mx-3 px-10 py-3 xl:h-28  xl:mx-6 xl:px-20 shadow-lg rounded hover:bg-green-600 duration-300 
             font-semibold'>Easy</button>
            <button onClick={event => handleDifficulty(2)}
             className='bg-mustard my-4 md:w-1/3 mx-3 px-5 py-3 xl:h-28  xl:mx-6 xl:px-20 shadow-lg rounded hover:bg-yellow-400 duration-300 
             font-semibold'>Medium</button>
            <button onClick={event => handleDifficulty(3)}
             className='bg-flame my-4 md:w-1/3 mx-3 px-6 py-3 xl:h-28  xl:mx-6  xl:px-20 shadow-lg rounded hover:bg-red-500 duration-300 
             font-semibold'>Hard</button>
        </div>

    )
}


export default DifficultyBtn