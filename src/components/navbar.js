import notes from "../pics/notes.png"
import hamburger from "../pics/icons8-hamburger-64.png"
import {useState} from 'react'
 

function NavBar({token, logout}) {
    const [openMenu, setOpenMenu] = useState(false)
    const [atr, setAtr] = useState("absolute opacity-0")

    const handleMenu = () =>{
        if(!openMenu){
            setAtr("")
        }else{
            setAtr("absolute opacity-0")
        }
        setOpenMenu(openMenu => !openMenu)
    }
    return(
        <nav className="p-5 absolute top-0 left-0 w-screen bg-indigo-600 shadow md:flex md:items-center md:justify-between">
            <div className="flex justify-between items-center">
                <span className="text-2xl text-white font-mono cursor-pointer">
                    <img src={notes} className="h-8 inline mr-2"></img>
                    Rhyme Time
                </span>
                <span className="text-3xl cursor-pointer md:hidden block">
                    {openMenu ? <h1 className=" inline mr-2" onClick={()=>handleMenu()}>X</h1>
                
                    : <img src={hamburger} name='menu' onClick={()=>handleMenu()} className="h-8 inline mr-2"></img> }
                </span>
                
            </div>

            <ul className={`md:flex md:items-center z-[-1] md:z-auto md:static w-full left-0
            md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 ${atr}
            top-[-400px] transition-all ease-in duration-500`}>
                <li className="mx-4 my-6 md:my-0">
                    <a href="/" className="text-xl text-white hover:text-teal duration-500 cursor-pointer">Home</a>
                </li>
                <li className="mx-4 my-6 md:my-0">
                    <a href="/practice-game" className="text-xl text-white hover:text-teal duration-500 cursor-pointer">Practice Game</a>
                </li>
                {token ?
                <li className="mx-4 my-6 md:my-0 ">
                    <a href="/" onClick={logout} className="text-xl text-white hover:text-teal duration-500 cursor-pointer">logout</a>
                </li>     
                : 
                <li className="mx-4 my-6 md:my-0 ">
                    <a href="/login" className="text-xl text-white hover:text-teal duration-500 cursor-pointer">Login</a>
                </li>
                }
                
                <button className="bg-white text-indigo-400 duration-500 px-6 mx-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white ">
                    Sign Up
                </button>
            </ul>

        </nav>

       

    )
    

}


export default NavBar