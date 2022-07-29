import notes from "../pics/notes.png"

function NavBar() {
    return(
        <nav className="p-5 absolute top-0 left-0 w-screen bg-indigo-600 shadow md:flex md:items-center md:justify-between">
            <div>
                <span className="text-2xl text-white font-mono cursor-pointer">
                    <img src={notes} className="h-10 inline mr-2"></img>
                    Rhyme Time
                </span>
            </div>

            <ul className="md:flex md:items-center">
                <li className="mx-4">
                    <a href="/" className="text-xl text-white hover:text-teal-200 duration-500 cursor-pointer">Home</a>
                </li>
                <li className="mx-4">
                    <a className="text-xl text-white hover:text-teal-200 duration-500 cursor-pointer">Login</a>
                </li>
                <li className="mx-4">
                    <a className="text-xl text-white hover:text-teal-200 duration-500 cursor-pointer">Signup</a>
                </li>
                <li className="mx-4">
                    <a href="/practice-game" className="text-xl text-white hover:text-teal-200 duration-500 cursor-pointer">Practice Game</a>
                </li>
            </ul>

        </nav>

       

    )
    

}


export default NavBar