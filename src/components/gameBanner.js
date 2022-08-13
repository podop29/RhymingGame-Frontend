import {useEffect, useState} from 'react'

const GameBanner = ({currUsername,id,username1,username2,accepted,acceptGameRequest,round,declineGameRequest}) =>{

    const [currTurn, setCurrTurn] = useState(false);
    const [currTurnName, setCurrTurnName] = useState("");


    //Decides whos turn it is
    useEffect(()=>{
        if(currUsername === username1){
            if(round % 2 === 1){
                setCurrTurn(false)
            }
            else{
                setCurrTurn(true)
            }
        }
        else{
            if(round % 2 === 1){
                setCurrTurn(true)
            }
            else{
                setCurrTurn(false)
            }
        }
    },[])

    useEffect(()=>{
        turn()
    },[currTurn])

   const turn = () =>{
    if(currUsername === username1){
        setCurrTurnName(username2)
    }else{
        setCurrTurnName(username1)
    }
   }

   
return(

    <>
        {!accepted ?
        <div className='sm:grid grid-rows-none grid-cols-3 w-full p-3 bg-white shadow-lg rounded my-2 '>
            <h1 className='text-1xl text-center sm:text-left'>{username1} Vs {username2}</h1>
            <h1 className='text-1xl text-center'>Pending</h1>
            
            {currUsername === username1 ?  
            <button onClick={()=>declineGameRequest(id)}
            className='bg-red-500 text-white w-full mx-auto sm:w-5/12  rounded'>Forfeit</button>       
            :
            <div className="mr-2 w-full">
                <button onClick={()=>acceptGameRequest(id)}
                className='bg-green-500 text-white w-full my-1 sm:w-5/12 mr-1  rounded'>Accept</button>
                <button onClick={()=>declineGameRequest(id)}
                className='bg-red-500 text-white w-full my-1 sm:w-5/12 mr-1 rounded'>Decline</button>
            </div>
            }
        </div>
        :
        
        <div className='sm:grid grid-rows-none grid-cols-3 w-full p-3 bg-white shadow-lg rounded my-2 '>
            <h1 className='text-1xl text-center sm:text-left'>{username1} Vs {username2}</h1>
            {currTurn ? 
            <h1>{currUsername}s Turn</h1>
            :
            <h1>{currTurnName}s Turn</h1>
            }
            {currUsername === currTurnName || currTurn?
            <div className='inline'> 
            <a href={`/multiplayer/${id}`}>
                <button className='bg-green-500 text-white mx-auto w-2/3  rounded-l'>Play</button>
            </a>
            <button onClick={()=>declineGameRequest(id)} className='bg-red-500 text-white mx-auto w-1/12  rounded-r'>x</button>
            </div>

            :
            null
            }

            
        </div>
        }
    </>
)

}

export default GameBanner;