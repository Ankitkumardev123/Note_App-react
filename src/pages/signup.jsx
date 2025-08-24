import React from 'react'
import { useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setcurentuser, setlogined } from '../noteslice/noteslices'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Auth } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { google,eye1,eye2,facebook } from '../icon'

function Signup() { 
  const[visible,setvisible]=useState(false)
   const [user_name,setusename] = useState('')
   const [user_gmail, setgmail] = useState('')
    const [user_password, setpassword] = useState('')
    const [user_phonenumber, setphonenumber] = useState('')
    const [loading, setloading] = useState(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const [data,setdata]=useState({})
    
      const handlelogin= async(e)=>{
       
        e.preventDefault();
        
        if(user_phonenumber==''||user_gmail==''||user_name==''||user_phonenumber=='')
        {
          alert('One input is empty.')

        }
       
        else if(user_name.length<7)
        {
          alert("Length of username mustbe atleast 7.")
        }
           else if(`${user_phonenumber}`.length!=10)
        {
          
          alert("Entered phonenumber length must be 10!")
        }
        else if(user_password.length<7){
          alert("length of password mustbe atleast 7!")
        }
        else{
        
       try{
        setloading(true)
     createUserWithEmailAndPassword(Auth,user_gmail,user_password)
        setloading(false)
        alert(`Succesfully signedup, welcome to MyNote ${user_name}`)
        dispatch(setcurentuser(data))
        dispatch(setlogined(true))
        navigate('/')
       }
       catch(error){
        console.error("Error:",error)
       }
        setdata('')
         
         setpassword('')
         setgmail('')
         setusename('')
       setpassword('')
       setphonenumber('')
        }
        
      }
      useEffect(()=>{
        
        setdata({username:user_name,password:user_password,email:user_gmail,phonenumber:user_phonenumber})
      },[user_password,user_name,user_gmail,user_phonenumber])
  return (
    <>
    {loading &&
  <div className='absolute w-[100vw] top-[8%] z-[50]  h-[100vh] bg-black bg-opacity-50 grid place-items-center'>
        <div className='w-[100px] h-[100px] rounded-full bg-transparent border-4 animate-spin border-t-gray-700'></div>
    </div>
   }
    <form onSubmit={handlelogin}>
   <div className='fixed  top-[8%]  h-[100vh] w-[100vw]  flex justify-center items-center  flex-col gap-2'>
    <h1 className='absolute top-[1%] left-[2%] text-white text-[8vmin] pt-1 '><span className='text-white font-serif '>My</span>
            <span className='text-orange-700 text-[6vmin]'>Note</span></h1>
            <div className='login absolute w-[35%] h-[80%]  bg-black rounded-xl border-2 mt-5 border-white flex justify-start items-center flex-col gap-[2%]'>
              <h1 className='text-white font-semibold text-[5vmin] font-mono  mt-2 h-[7%] text-center '><span>Sign</span><span className='text-orange-500'>up</span></h1>
              <span className='w-[90%] flex items-center h-[40%]   gap-[10%] justify-start flex-col'>
              <input value={user_name} onChange={e=>setusename(e.target.value)} type="text" placeholder='Enter a username...' className=' 
                outline-none p-0.5 bg-transparent border-b-orange-500 border-b-2 w-[100%] h-[30%] text-[3vmin]  text-white placeholder:text-white'/>
              <input type="email" value={user_gmail} onChange={e=>setgmail(e.target.value)} placeholder='Enter your gmail..' className='h-[30%] text-[3vmin] 
              outline-none p-0.5 bg-transparent border-b-orange-500 border-b-2 w-[100%] text-white placeholder:text-white'/>
              <input type="text" value={user_phonenumber} onChange={e=>{
               try{
               
                setphonenumber(Number(e.target.value))
               }
              catch(error){
                alert('Invalid phonenumber format ,Re-enter phonenumber')
              }

              }} placeholder='Enter your phone number..' className='outline-none p-0.5 h-[30%] text-[3vmin] bg-transparent border-b-orange-500 border-b-2 w-[100%] text-white placeholder:text-white'/>
             
              <div className=' w-[100%] h-[30%]  flex justify-right items-center'>
                <input type={visible?"text":"password"} value={user_password} onChange={e=>setpassword(e.target.value)} placeholder='Enter a password...' className='h-[100%] text-[3vmin] 
                outline-none p-0.5 bg-transparent border-b-orange-500 border-b-2 w-[100%] text-white placeholder:text-white'/>
              <img src={visible?eye2:eye1} alt="" className='eye1 absolute w-[5vmin]  z-[5]  right-[9%] duration-200' onClick={()=>setvisible(prev=>!prev)}/>
              </div>
              </span>
              <div className='text-[2vmin] w-[90%] h-[10%]   flex items-start justify-center flex-col gap-1'>
                  <span className='flex justify-start items-center'><input type="checkbox" name="" id="" className='accent-orange-600  h-[60%]'/>Remember me</span>
                  
                <a href="" className='text-orange-500 w-[100%] h-[50%] text-sm text-left hover:underline'>Already have an account?Login?</a>
                
              </div>
              <button className='text-[3vmin] border-4  text-center font-mono font-semibold border-white bg-orange-500 py-1 px-2 rounded-lg
               hover:text-black hover:bg-orange-500  hover:border-orange-700 m-0'>Signup</button>
              
              <div className='w-[90%] h-[20%]  flex-col justify-center items-center  mb-2  '>
                
                <span className='flex w-full h-[40%] bg-white  rounded-md justify-center items-center gap-1'>
                <img src={google}  className='w-[4.5vmin] h-[4.5vmin]  ' alt="" />

                <h5 className='text-black text-[1rem] font-semibold'>Signup With Google</h5>
                </span>
                <span className='flex w-full h-[40%] bg-blue-700 rounded-md justify-center items-center gap-1 mt-4'>
                <img src={facebook}  className='w-[7vmin] h-[7vmin]' alt="" />
                <h5 className='text-[1rem] font-semibold'> Signup With Facebook</h5>
                </span>
              </div>
            </div>
   </div>
   </form>
   </>
  )
}

export default Signup;