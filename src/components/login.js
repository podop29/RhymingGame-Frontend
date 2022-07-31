import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"



function Login({login}) {
    const navigate  = useNavigate()

  const INITIAL_STATE = {
    username:"",
    password:"",
  }

  const [formData, setFormData] = useState(INITIAL_STATE)

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData(formData =>({
        ...formData,
        [name]:value
    }))
}

const handleSubmit = async(e) =>{
  e.preventDefault()
  try{
    login(formData)
    setFormData(INITIAL_STATE)
    navigate(`/`)
  }catch(e){
    console.log(e)

  }
  
}


  return (
    <div className='w-5/6 md:w-3/6 mt-28 mx-auto bg-white text-center '>

        <h1 className='text-5xl mb-10'>Login</h1>

        <form className='grid grid-rows-2'>
            <span className='mb-4 mx-auto'>
                <label  className='mt-2 mr-5' htmlFor="username">Username</label>
                <input className='bg-slate-200 rounded border-black border w-2/3 text-gray-700 mr-3 py-1 px-2'
                 type="text" name="username" value={formData.username} onChange={handleChange}/>
            </span>
            <span className='mx-auto'>
                <label  className='mt-2 mr-5' htmlFor="password">Password </label>
                <input className='bg-slate-200 rounded border-black border w-2/3 text-gray-700 mr-3 py-1 px-2'
                type="text" name="password" value={formData.password} onChange={handleChange}/>
            </span>
            <button className='mx-auto mb-5 bg-violet-600 w-1/6 mt-2 py-1 rounded text-white text-center
             hover:bg-violet-700 duration-300' onClick={handleSubmit}>Sign in</button>
         </form>

    </div>
    
  );
}

export default Login;
