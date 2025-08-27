import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth, database } from '../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setcurentuser, setloginuser,setlogined } from '../noteslice/noteslices'
import {  collection, getDocs, query,where} from "firebase/firestore"; 

import eye2 from "../images/eye2.png"
import eye1 from "../images/eye1.png"
import google from "../images/google.png"
import facebook from "../images/facebook.png"
function Login() {
  const [visible, setvisible] = useState(false)
  const [user_logindata, setuserdata] = useState('')
  const [user_password, setpassword] = useState('')
  const [loading,setloading]=useState(false)
  const [data,setdata]=useState({})
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handlelogin=async(e)=>{
   
    e.preventDefault();
    try{
      setloading(true)
   const snap= await signInWithEmailAndPassword(Auth,user_logindata,user_password)
      console.log(snap,"signed")
    const q= query(collection(database, "users"), where("email", "==",`${user_logindata}`));
    const user= await getDocs(q)
   setloading(false)
    if(user.empty)
    {
      return;
    }
    const userdata=user.docs[0]?.data()

    dispatch(setloginuser(userdata))
   dispatch(setlogined(true))
   
   alert(`Succesfully logined, Welcome back ${userdata.username}`)
   navigate("/")
     const user1=user?.docs[0]
    }catch{
      console.log("error")
    }
    finally{
      setloading(false)
    }
     setuserdata('')
   setpassword('')

    setdata('')
  }
  
  useEffect(()=>{
    setdata({email:user_logindata,password:user_password})
  },[user_password,user_logindata])
 
  return (
   <>
   {loading &&
  <div className='absolute w-[100vw] top-[8%] z-[50]  h-[100vh] bg-black bg-opacity-50 grid place-items-center'>
        <div className='w-[10vmin] h-[10vmin] rounded-full bg-transparent border-4 animate-spin border-t-gray-700'></div>
    </div>
   }
    <form onSubmit={handlelogin}>
   <div className='fixed  top-[8%]  h-[100vh] w-[100vw]  flex justify-center items-center  flex-col '>
    <h1 className='head absolute top-[1%] left-[2%] text-white text-[8vmin] pt-1 '><span className='text-white font-serif '>My</span>
            <span className='text-orange-700 text-[7vmin]'>Note</span></h1>
            <div className='login w-[32vw] h-[70%] bg-black rounded-xl border-2 border-white flex justify-start items-center flex-col   gap-[1%]'>
              <h1 className='am text-white font-semibold text-[6vmin] font-mono   mt-[2vmin] mb-1 h-[10%] text-center'><span>Log</span><span className='text-orange-500'>in</span></h1>
              <span className='w-[90%] h-[20%] flex items-center   gap-[4vmin] justify-start flex-col'>
              <input type="text" value={user_logindata} onChange={(e)=>setuserdata(e.target.value)} placeholder='Enter your gmail..' 
              className='outline-none  bg-transparent border-b-orange-500 border-b-2 w-[100%] h-[40%] text-white placeholder:text-white text-[1.2rem]'/>
             
             <div className='realtive w-[100%] h-[40%] flex justify-right items-center'>
                <input type={visible?"text":"password"} value={user_password} onChange={(e)=>setpassword(e.target.value)} placeholder='Enter password...' className='
                outline-none  bg-transparent border-b-orange-500 border-b-2 w-[100%] h-[100%] text-white placeholder:text-white text-[1.2rem]'/>
              <img src={visible?eye2:eye1} alt="" className='eye absolute w-[1.7rem] right-[37%] flex duration-200 pb-1' onClick={()=>setvisible(prev=>!prev)}/>
              </div>
              </span>
              <div className='text-[2.5vmin] w-[90%] h-[5%]  flex items-center justify-center '>
                <span className=' w-[100%] h-[100%]  flex items-center justify-center flex-row gap-2 '>
                  <span className='w-[50%] flex  items-center justify-start   h-full'>
                    <input type="checkbox" name="" id="" className='accent-orange-600 '/>Remember me</span>
                  
                <a href="" className='text-orange-500 w-[50%]  hover:underline flex justify-end  items-center text-wrap'>Forget password?</a>
                </span>
               
              </div>
               <Link to='/signup' className='text-orange-500 pb-4 w-[90%] h-[2%] text-left  text-[2.5vmin]   hover:underline'>Don't have an account?Signup?</Link>
              <button onClick={handlelogin} className='b text-[4vmin] border-4 font-mono font-semibold border-white bg-orange-500 py-1 mt-2 px-2 rounded-lg hover:text-orange-300 hover:bg-orange-500  hover:border-orange-700'>Login</button>
             
             
              <div className='w-[90%] h-[25%]  flex-col justify-center items-center  mt-1 gap-[5%] '>
                
                <span className='flex w-full h-[40%] bg-white  rounded-md justify-center items-center gap-1 mt-4'>
                <img src={google}  className='w-[5vmin] h-[5vmin] ml-3' alt="" />
                <h5 className='text-black text-[1rem] font-semibold'>Login With Google</h5>
                </span>
                <span className='flex w-full h-[40%] bg-blue-700 rounded-md justify-center items-center gap-1 mt-4'>
                <img src={facebook}  className='w-[7vmin]' alt="" />
                <h5 className='text-[1rem] font-semibold'> Login With Facebook</h5>
                </span>
              </div>
            </div>
   </div>
   </form>
   </>
  )
}

export default Login
