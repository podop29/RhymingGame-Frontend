import liLogo from "../pics/LiLogo.png"
import email from "../pics/email.png"
import github from "../pics/github.png"

function Home({token}) {
    return(
    <div className="mb-4">
        <div className="mt-24 pt-10 pb-10 flex w-10/12 lg:w-7/12 lg:h-2/4 xl:h-auto mx-auto justify-center bg-white grid-cols-2 grid-rows-1
        rounded-lg shadow-lg ">
            <div className="mx-2 w-2/3 border-r-2 xl:pr-16 xl:w-3/5  my-auto">
                <h1 className="text-center mb-2 text-gray-500 text-xl md:text-3xl xl:text-4xl font-semibold ">Learn how to Rhyme, in no Time!</h1>
                <h2 className="text-center text-slate-500 text-lg xl:text-xl hidden md:flex">Create an account to play for free and
                challenge your friends to see who's the better lyricist </h2>
            </div>

            {token ?
            <div className="text-center mt-0  w-5/12 xl:px-auto xl:pt-auto ">
                <h1 className="text-center md:mt-5 text-slate-500 text-xl md:text-3xl xl:text-4xl pb-4 font-semibold">Play a game!</h1>
                <a href="/game">
                    <button className="bg-indigo-500 md:mt-2 hover:bg-indigo-400 text-white xl:text-2xl rounded-md p-1 sm:py-2 px-4">Play</button>
                </a>
        </div>
            
            :
            <div className="mr-2 text-center my-auto  xl:w-2/5">
                <h1 className="text-center md:mt-5 text-gray-500 text-xl md:text-4xl xl:text-5xl sm:pb-4 font-semibold">Don't have an account?</h1>
                <p className="xl:text-2xl absolute sm:static invisible sm:visible text-slate-500 xl:mb-4">Register for free below</p>
                <a href="/register">
                <button className="bg-indigo-400  hover:bg-indigo-500 duration-500 text-white xl:text-2xl rounded-md p-1 sm:py-1 mt-2">Sign Up</button>
                </a>
            </div>
            }
        </div>
        <div className="w-11/12 lg:w-8/12 xl:w-8/12 mx-auto text-center mt-6 md:grid md:grid-cols-2 bg-indigo-400 rounded-lg shadow-lg p-2 ">
            <div>
                <h1 className="text-3xl mb-2 text-gray-200 font-semibold">What is RhymeTime?</h1>
                <p className="text-lg text-white mx-8 font-medium">RhymeTime is a student project created by Stevan Grubac.
                    It is a Free website for anyone who wants to improve their rhyming abilities,
                    or just compete against a friends to see whose the better lyricist.
                     Whether you are trying to improve your freestyle rapping skills
                    or want to write a poem, RhymeTime will make that experience fun.
                    
                </p>
            </div>
            <div>
                <h1 className="text-3xl mb-2 text-gray-200 font-semibold">How it works?</h1>
                <div className="text-lg text-white mx-8 font-medium">
                    RhymeTime is a fullstack project using 
                    <a className="underline" href="https://www.datamuse.com/api/"> Datamuse API </a> 
                    for all rhyming data. The Front-End is built using React.js and Tailwind. The Back-End uses 
                    Express and Node.js with postgresql for the database. If you have any other questions or would
                    like to get in touch please contact me using the links below.
                    <div className="bg-indigo-300 rounded-2xl shadow-2xl p-1 w-5/6 mx-auto flex mt-2">
                        <a className="my-auto mx-auto" href="https://www.linkedin.com/in/stevan-grubac-779306228/">                
                            <img alt="used for the linked in link" className='h-10' src={liLogo}/>
                        </a>
                        <a className="my-auto mx-auto" href="mailto:stevangrubac123@gmail.com">
                            <img  alt="used for email in link" className="h-20" src={email}/>
                        </a>
                        <a className="my-auto mx-auto" href="https://github.com/podop29">
                            <img alt="used for the GitHub link" className='h-12' src={github}/>
                        </a>
                       


                    </div>

                    </div>


            </div>
        </div>
        </div>

    )
    

}


export default Home