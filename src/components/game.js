import {useState, useEffect} from 'react'
import BackendApi from "../backend_api";
import RhymingApi from '../rhymingApi';

import DifficultyBtn from './difficultyBtn';

function Game({time, difficultyParam}) {

    //state for timer
    const [timer, setTimer] = useState(time);
    //state for checking if game is active or over
    const [gameOver, setGameOver] = useState(false);
    //State for timerId for clearing interval
    const [timeId, setTimeId] = useState(0)


    //Tracks chosen difficulty
    const [difficulty, setDifficulty] = useState(null)
    //List of random words based off difficulty
    const [randomWords, setRandomWords] = useState([])
    //List of words that rhyme with randomwords[wordIdx]
    const [rhymeWords, setRhymeWords] = useState([])
    //Holds correct words
    const [correctWords, setCorrectWords] = useState([{}])
    //Idx of what random word player is on
    const [wordIdx, setWordIdx] = useState(0);
    //Keeps track of players score
    const [gameScore, setGameScore] = useState(0);
    //Score pop up
    const [isScoreVisible, setIsScoreVisible] = useState("invisible")


    const [formData, setFormData] = useState("")

    //useEffect if difficultyParam is not null, call handle difficulty
    useEffect(()=>{
        const func = async() =>{
            if(difficultyParam !== null){
                await handleDifficulty(difficultyParam)
             }
        }
        func();
    },[])
    

    //UseEffect hook gets new rhyme words
    useEffect( ()=>{
        async function update(){
            setRhymeWords(await RhymingApi.getRhymesForWord(randomWords[wordIdx]))
        }
        if(randomWords[wordIdx]){
            update()
        }  
    },[difficulty, wordIdx, randomWords])

    //useEffect hook for updating score
    useEffect(()=>{
                    //Updates Score
                    if(correctWords.length >= 1){
                    let word = correctWords[correctWords.length - 1]
                    if(word.score){
                        setGameScore(Math.floor((word.score / 10) + gameScore) + 10)
                        handlePopUp()
                    }
                }
    },[correctWords])




    //Will check if player input is included in rhymeWords
    const checkIfWordIncluded = (e,input) =>{
        e.preventDefault()
        //Gets list of just words not objects
        const wordsArr = rhymeWords.map((w)=>{
            return w.word 
        })
        //finds index of input in word arr, if idx is -1, word not found
        let idx = wordsArr.indexOf(input)
        if(idx !== -1){
            //Checks for dups then sets correctWord state
            const wordsList = correctWords.map((w)=>{
                return w.word 
            })
            if(!wordsList.includes(input)){
                setCorrectWords(arr => [...arr, rhymeWords[idx]])
            }
        }
        //Resets input field
         setFormData("")
    }


    //Function for starting the timer at the start of the game
    const handleTimer = () =>{
         setTimeId (setInterval(()=>{
            setTimer(timer => timer - 1)
        },1000))
    }
    //Function for ending the game when the timer goes to 0
    const endGame = () =>{
        setGameOver(true);
    }
    //UseEffect stops timer at 0 and ends game
    useEffect(()=>{
        if(timer <= 0){
            clearInterval(timeId)
            endGame()
        }
    },[timer])


    //Updates state responsible for showing a random word, and creates a list of words that rhyme with it
    const updateWordIdx =async (e) =>{
        e.preventDefault()
        setWordIdx(wordIdx + 1)
        setCorrectWords([])
    }

    //Handles setting difficulty and setting random words according to difficulty
    const handleDifficulty =async (diff) =>{
        setDifficulty(diff)
        setRandomWords(await RhymingApi.getListOfRandomWords(40,diff))  
        setRhymeWords(await RhymingApi.getRhymesForWord(randomWords[wordIdx]))
        handleTimer(time)
    }
  

    //handles score+ popup
    const handlePopUp = () =>{
        setIsScoreVisible('visible');
        setTimeout(()=>{
            setIsScoreVisible('invisible')
        },1500)
    }

    return(
    <div className='container flex flex-row w-full h-4/6 mx-auto mt-32 md:w-7/12 justify-center bg-slate-100
     shadow-lg rounded-3xl
    '>
        {!gameOver ? 
       <>
        {difficulty ?
         <div className='grid grid-rows-4 gap-0 place-items-center'>
            <span>
                <h1 className='font-semibold text-4xl font-mono text-gray-500 top-40 -ml-20  absolute' >Time:{timer}</h1>
                <h1 className='font-semibold text-4xl font-mono text-gray-500 top-48 -ml-20 absolute' >Score:{gameScore}
                 <span
                  className={`text-green-500 ${isScoreVisible}`}>
                    {correctWords.length >= 1 ? ` + ${Math.floor(correctWords[correctWords.length - 1].score / 10)}`  : `+ 0` }
                 </span>
                </h1>
            </span>


            <h2 className='text-center font-mono text-zinc-400 text-6xl '>{randomWords[wordIdx]}</h2>

            <form className='w-3/4 mx-12 md:mx-0 md:w-full md:max-w-sm'>
                <div className='flex items-center border-b border-zinc-700 py-2'>
                    <input value={formData} onChange={(e)=> setFormData(e.target.value)} className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none' type="text" placeholder="Rhymes with" aria-label="Full name"></input>
                    <button onClick={(e)=>checkIfWordIncluded(e,formData)} className='flex-shrink-0 bg-white hover:bg-green-500 border-gray-400 hover:border-zinc-700 text-sm text-gray-800 py-1 px-2 shadow rounded border-2 duration-300 mr-1'>
                        Submit
                    </button>
                    <button onClick={updateWordIdx} className='flex-shrink-0 bg-white hover:bg-red-500 border-gray-400 hover:border-zinc-700 text-sm text-gray-800 py-1 px-2 shadow rounded border-2 duration-300'>
                        Next
                    </button>
                    
                </div>
            </form>
            <div className='flex w-10/12  h-full break-word border rounded-3xl mb-6 bg-gray-100 p-3'>
            <ul>
                {correctWords.map((w)=>{
                    return <li className='font-mono inline-block text-2xl mx-2 font-semibold text-green-500'>{w.word}</li>
                })}
            </ul>
            </div>
        </div>
        

         : <DifficultyBtn handleDifficulty={handleDifficulty}/>}
</>
         
       : <div className='grid grid-rows-4 place-items-center'>
            <h1 className='font-semibold text-4xl font-mono text-gray-500 mt-10'>Game Over</h1>
            <h2 className='font-semibold text-4xl font-mono text-gray-500 mt-10'>Your Final Score : {gameScore}</h2>
         </div>
       } 


    </div>
    )
}


export default Game