import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setcurentuser, setlogined, setloginuser } from '../noteslice/noteslices'
import { createUserWithEmailAndPassword, getAdditionalUserInfo, GoogleAuthProvider} from 'firebase/auth'
import { Auth,googleProvider,database} from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where } from "firebase/firestore"; 
import eye2 from "../images/eye2.png"
import eye1 from "../images/eye1.png"
import google from "../images/google.png"
import facebook from "../images/facebook.png"
import userm from "../images/userm.png"
import { signInWithPopup } from "firebase/auth";
function Signup() { 
  const [visible, setvisible] = useState(false)
  const [user_name, setusename] = useState('')
  const [user_gmail, setgmail] = useState('')
  const [user_password, setpassword] = useState('')
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState({})
  const [ismobile, setismobile] = useState(window.innerWidth < 768)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleresize = () => setismobile(window.innerWidth < 768)
    window.addEventListener("resize", handleresize)
    return () => window.removeEventListener("resize", handleresize)
  }, [])

  useEffect(() => {
    setdata({ username: user_name, password: user_password, email: user_gmail })
  }, [user_name, user_gmail, user_password])

  const handlelogin = async (e) => {
    e.preventDefault()
    
    if (user_gmail === '' || user_name === '') {
      alert('One input is empty.')
      return
    }
    
    if (user_name.length < 7) {
      alert("Length of username mustbe atleast 7.")
      return
    }
    
    if (user_password.length < 7) {
      alert("length of password mustbe atleast 7!")
      return
    }

    try {
      setloading(true)
      const user = await createUserWithEmailAndPassword(Auth, user_gmail, user_password)
      setloading(false)
      
      setTimeout(() => {
        alert(`Succesfully signed up, welcome to MyNote ${user_name}`)
      }, 100)
      
      dispatch(setcurentuser(data))
      dispatch(setlogined(true))
      navigate('/')
    } catch (error) {
      setloading(false)
      setTimeout(() => {
        alert("Some issue arised in signup!\nCheck you network connection.")
      }, 100)
     
    } finally {
      setloading(false)
    }
    
    setdata('')
    setpassword('')
    setgmail('')
    setusename('')
  }
  const signupwithGoogle=async(e)=>{
    e.preventDefault()
    try{
     
      await signInWithPopup(Auth,googleProvider).then(async(result) => {
   setloading(true)
    const credential = GoogleAuthProvider.credentialFromResult(result);
   
    const token = credential.accessToken;
    const isNewUser=getAdditionalUserInfo(result).isNewUser;
    
    const user = result.user;
    const Data={username:user?.displayName,email:user?.email}
    if(isNewUser){
     setTimeout(() => {
        alert(`Succesfully signed up, welcome to MyNote ${Data?.username}`)
      }, 100)
      
      dispatch(setcurentuser(Data))
      dispatch(setlogined(true))
      navigate('/')
      return;
      
    }
   
            const q = query(collection(database, "users"), where("email", "==", Data?.email))
            const userSnap = await getDocs(q)
            
            if (userSnap.empty) return
            
            const userdata = userSnap.docs[0]?.data()
            dispatch(setloginuser(userdata))
            
            
            dispatch(setlogined(true))
            navigate('/NoteEditArea')
            setTimeout(() => {
              alert(`Successfully logged in, Welcome back ${userdata.username}`)
            }, 100)
            
        
        
    
  }).catch((error) => {
    alert("Google signup was canceled.")
    setloading(false)
   
  });
      
    }
    catch(error){
      setloading(false)
       alert("Signup Unsuccessfull!\nTry again!")
    }
    finally{
      setloading(false)
    }
  }
  return (
    <>
      {loading && (
        <div className='fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm grid place-items-center p-4'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-transparent border-4 animate-spin border-t-purple-500 shadow-xl'></div>
        </div>
      )}
      
      <div className='h-screen w-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-950/30 to-transparent'>
        <div className='h-[9vh] w-full bg-gradient-to-r'></div>
        
        <div className='flex-1 w-full min-h-0 flex flex-col lg:flex-row overflow-x-hidden'>
          <div className='w-full lg:w-1/2 flex flex-col justify-center px-4 py-4 lg:py-6 lg:px-8 xl:px-12 bg-gradient-to-b from-purple-800/20 via-black/95 to-black/90 bg-[length:400%_200%] backdrop-blur-xl'>
            
            <div className='text-center   px-2 h-18 pb-3'>
              <h1 className='text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.6rem] xl:text-[2.9rem] 
              font-bold tracking-tight leading-tight mb-1 lg:mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent'>
                Create Your Account
              </h1>
              <p className='text-xs sm:text-sm md:text-base lg:text-lg font-mono text-slate-400 px-1 leading-tight'>
                start your note writing journey ..
              </p>
            </div>

            <div className='w-full flex flex-col sm:flex-row gap-2.5 mb-1 px-2'>
              <button className='flex-1 py-4 h-12 border border-slate-600/60 backdrop-blur-sm rounded-xl font-semibold text-xs sm:text-sm tracking-wide hover:scale-105 transition-all duration-300 hover:border-purple-500/80 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-gradient-to-r from-purple-600/70 via-pink-400/70 to-cyan-400/70 flex items-center justify-center gap-2'>
                <img loading="lazy" src={userm} className='size-6' alt="" />
                Continue as Guest
              </button>
              <button onClick={signupwithGoogle}
               className='flex-1 py-4 h-12 border border-slate-600/60 backdrop-blur-sm rounded-xl font-semibold text-xs sm:text-sm tracking-wide hover:scale-105 transition-all duration-300 hover:border-purple-500/80 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-gradient-to-r from-purple-600/70 via-pink-400/70 to-cyan-400/70 flex items-center justify-center gap-2'>
                <img loading="lazy" src={google} className='size-5' alt="" />
                Continue with Google
              </button>
            </div>

            <div className='w-full flex items-center justify-center mb-4 px-4'>
              <span className='text-xs sm:text-sm text-slate-500 px-4 py-1.5 bg-slate-900/70 backdrop-blur-sm rounded-full border border-slate-700/50 tracking-wider font-mono'>___OR___</span>
            </div>

            <form onSubmit={handlelogin} className='w-full max-w-[22rem] mx-auto flex flex-col gap-3 px-1'>
              <input 
                type="text" 
                value={user_name} 
                onChange={(e) => setusename(e.target.value)}
                className='w-full h-12 px-4 py-3 text-base rounded-xl bg-slate-900/70 backdrop-blur-sm border border-slate-700/70 hover:border-purple-500/60 focus:border-purple-400/80 focus:outline-none transition-all duration-300 shadow-lg placeholder:text-slate-500' 
                placeholder='Username' 
                required
              />
              
              <input 
                type="email" 
                value={user_gmail} 
                onChange={(e) => setgmail(e.target.value)}
                className='w-full h-12 px-4 py-3 text-base rounded-xl bg-slate-900/70 backdrop-blur-sm border border-slate-700/70 hover:border-purple-500/60 focus:border-purple-400/80 focus:outline-none transition-all duration-300 shadow-lg placeholder:text-slate-500' 
                placeholder='Email Address' 
                required
              />

              <div className='w-full relative'>
                <input 
                  type={visible ? "text" : 'password'} 
                  className='w-full h-12 px-4 py-3 text-base font-semibold rounded-xl bg-slate-900/70 backdrop-blur-sm border pr-12 border-slate-700/70 hover:border-purple-500/60 focus:border-purple-400/80 focus:outline-none transition-all duration-300 shadow-lg placeholder:text-slate-500' 
                  value={user_password} 
                  placeholder='Password' 
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
                <img loading="lazy" 
                  src={visible ? eye2 : eye1} 
                  alt="toggle visibility" 
                  className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer hover:scale-110 transition-all hover:brightness-125' 
                  onClick={() => setvisible(v => !v)}
                />
              </div>

              <div className='w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-1'>
                <label className='flex items-center gap-2.5 cursor-pointer'>
                  <input type="checkbox" className='w-4 h-4 accent-purple-500 border-2 border-slate-600 rounded bg-slate-900/70 backdrop-blur-sm shadow-sm hover:scale-110 transition-all' />
                  <span className='text-xs font-mono text-slate-400'>I agree to the</span>
                  <span className='text-xs font-semibold text-white'>Terms & Privacy</span>
                </label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className='w-full h-14 font-bold text-base rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-[length:200%_200%] animate-gradient-x border border-cyan-400/70 shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.9)] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed group relative'
              >
                <div className='w-full h-full grid place-items-center backdrop-blur-xl bg-black/60 border border-white/20 rounded-xl group-hover:bg-black/80 transition-all duration-300'>
                  {loading ? 'Creating Account...' : 'Create Your Account'}
                </div>
              </button>

              <div className='w-full text-center pt-2 pb-3'>
                <span className='text-xs font-mono text-slate-500'>Already have an account? </span>
                <button 
                  type="button"
                  onClick={() => navigate('/login')}
                  className='text-xs font-bold text-purple-400 hover:text-purple-300 underline decoration-2 underline-offset-1 hover:underline-offset-2 transition-all ml-1'
                >
                  Login Now
                </button>
              </div>
            </form>
          </div>

          <div className='login_p2 lg:block lg:w-1/2 h-full bg-gradient-to-br from-orange-500 to-orange-800'></div>
        </div>
      </div>
    </>
  )
}

export default Signup