
function Home() {
    return(
    
        <div className="mt-28 pt-10 pb-10 flex w-4/5 lg:w-3/5 lg:h-2/4 xl:h-auto mx-auto justify-center bg-white grid-cols-2 grid-rows-1
        rounded-lg shadow-lg">
            <div className="mx-2 w-2/3 border-r-2 xl:pr-16 xl:w-2/5  my-auto">
                <h1 className="text-center mb-2 text-slate-500 text-xl md:text-3xl xl:text-4xl ">Learn how to Rhyme, in no Time!</h1>
                <h2 className="text-center text-slate-500 text-lg xl:text-xl hidden md:flex">Create an account to play for free and
                challenge your friends to see who's the better lyricist </h2>
            </div>

            <div className="mr-2 text-center my-auto  xl:w-2/5">
                <h1 className="text-center md:mt-5 text-slate-500 text-xl md:text-4xl xl:text-5xl pb-4">Don't have an account?</h1>
                <p className="xl:text-2xl text-slate-500 xl:mb-8">Register for free below</p>
                <button className="bg-violet-500 mt-2 hover:bg-violet-600 text-white xl:text-4xl rounded-md p-1 md:p-2">Sign Up</button>
  
            </div>
        </div>

    )
    

}


export default Home