import {useState} from 'react';
import {useNavigate} from "react-router-dom"
import BackendApi from '../backend_api';


function Register({login}) {
    const navigate  = useNavigate()
    const INITIAL_STATE = {
        username:"",
        password:"",
        email:""
      }

  const [formData, setFormData] = useState(INITIAL_STATE)

  //state for catching and displaying errors
  const [error, setError] = useState([]);


//Function for handling registering new users
const register = (userData) =>{
    const user = {username: userData.username,
                  password: userData.password };
                  
    BackendApi.register(userData).then((res)=>{
    login(user)
    navigate(`/`)
  }).catch (async (e) => {

    await setStateAsync(e)
  })
}

const setStateAsync = async(state) =>{
    return new Promise((resolve)=>{
        setError(state, resolve)
    })
}

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData(formData =>({
        ...formData,
        [name]:value
    }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        register(formData)
        if(error !== []){
            console.log(error)
        }else{
            navigate(`/`)
        } 
      }


      

  return (
    <div className='w-5/6 md:w-2/6 mt-28 mx-auto bg-white text-center shadow-lg rounded-lg'>

<h1 className='text-5xl mb-10'>Register</h1>

<form className='grid grid-rows justify-center'>
    <span className='mb-4 mx-auto'>
        <label  className='mt-2 mr-5' htmlFor="username">Username</label>
        <input className='bg-slate-200 rounded border-black border w-2/3 text-gray-700 mr-3 py-1 px-2'
         type="text" name="username" value={formData.username} onChange={handleChange}/>
    </span>
    <span className='mb-4 mx-auto'>
        <label  className='mt-2 mr-5' htmlFor="password">Password </label>
        <input className='bg-slate-200 rounded border-black border w-2/3 text-gray-700 mr-3 py-1 px-2'
        type="text" name="password" value={formData.password} onChange={handleChange}/>
    </span>
    <span className='mb-4 mx-auto '>
        <label  className='mt-2 mr-5 block' htmlFor="email">Email</label>
        <input className='bg-slate-200 rounded border-black border w-11/12 text-gray-700 mr-3 py-1 px-2'
        type="text" name="email" value={formData.email} onChange={handleChange}/>
    </span>

    {error ? <p className='text-red-600'>{error}</p> : null}
    
    <button className='w-1/3 md:w-2/6 mx-auto mb-5 bg-violet-600  mt-2 py-1 rounded text-white text-center
     hover:bg-violet-700 duration-300' onClick={handleSubmit}>Sign Up</button>
 </form>
 

</div>

  );
}

export default Register;
