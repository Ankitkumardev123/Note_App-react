import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth, database } from '../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setloginuser, setlogined, setfetching, setfolders, menubartoggle } from '../noteslice/noteslices'
import { collection, getDocs, query, where } from "firebase/firestore"; 
import eye2 from "../images/eye2.png"
import eye1 from "../images/eye1.png"
import google from "../images/google.png"
import facebook from "../images/facebook.png"

function Login() {
  const [visible, setvisible] = useState(false)
  const [user_logindata, setuserdata] = useState('')
  const [user_password, setpassword] = useState('')
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Responsive check
  const [ismobile, setismobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handleresize = () => setismobile(window.innerWidth < 768)
    window.addEventListener("resize", handleresize)
    return () => window.removeEventListener("resize", handleresize)
  }, [])

  const handlelogin = async (e) => {
    e.preventDefault()
    dispatch(setfetching(true))
    try {
      setloading(true)
      await signInWithEmailAndPassword(Auth, user_logindata, user_password)
      
      const q = query(collection(database, "users"), where("email", "==", user_logindata))
      const userSnap = await getDocs(q)
      
      if (userSnap.empty) return
      
      const userdata = userSnap.docs[0]?.data()
      dispatch(setloginuser(userdata))
      
      dispatch(setfolders(userdata?.user_folder))
      dispatch(setlogined(true))
      dispatch(menubartoggle(false))
      setTimeout(() => {
        alert(`Successfully logged in, Welcome back ${userdata.username}`)
      }, 100)
      
      navigate("/NoteEditArea")
    } catch (error) {
      setTimeout(() => {
        alert("Some issue arose!\nCheck your network connection.")
      }, 100)
    } finally {
      setloading(false)
      dispatch(setfetching(false))
      setuserdata('')
      setpassword('')
      dispatch(menubartoggle(false))
    }
  }

  // Animated boxes (optimized)
  const boxes = Array.from({ length: 150 }, (_, i) => (
    <div 
      key={i} 
      className='h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 hover:shadow-[0_0_12px_#a855f7] hover:from-purple-500 hover:to-blue-500 hover:via-pink-500 hover:bg-gradient-to-tr duration-300 transition-all hover:scale-105 border border-slate-700/50 bg-slate-900/50 hover:bg-[length:100%_100%]'
      style={{ animationDelay: `${Math.random() * 2}s` }}
    />
  ))

  return (
    <>
      {/* Loading Spinner */}
      {loading && (
        <div className='fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm grid place-items-center p-4'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-transparent border-4 animate-spin border-t-purple-500 shadow-xl'></div>
        </div>
      )}
      
      {/* Full Viewport Layout */}
      <div className='h-screen w-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-950/30 to-transparent'>
        
        {/* ✅ EXACT 9vh Navbar Space */}
        <div className='h-[9vh] w-full bg-gradient-to-r z-0  '></div>
        
        {/* Content Area - Perfect 91vh */}
        <div className='flex-1 w-full min-h-0 flex flex-col lg:flex-row overflow-hidden'>
          
          {/* Form Section */}
          <div className='w-full lg:w-1/2 flex flex-col justify-center px-4 py-4 lg:py-6 lg:px-8 xl:px-12 bg-gradient-to-b from-purple-800/20 via-black/95 to-black/90 bg-[length:400%_200%] backdrop-blur-xl'>
            
            {/* Title */}
            <div className='text-center mb-4 lg:mb-6 px-2'>
              <h1 className='text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.6rem] xl:text-[2.9rem] font-bold tracking-tight leading-tight mb-2 lg:mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent'>
                Login to Your Account
              </h1>
              <p className='text-xs sm:text-sm md:text-base lg:text-lg font-mono text-slate-400 px-1 leading-tight'>
                write down ideas anytime, anywhere..
              </p>
            </div>

            {/* Social Login */}
            <div className='w-full flex flex-col sm:flex-row gap-2.5 mb-5 px-2'>
              <button className='flex-1 h-12 py-3 border border-slate-600/60 backdrop-blur-sm
               rounded-xl font-semibold text-xs sm:text-sm tracking-wide hover:scale-105 transition-all duration-300
                hover:border-purple-500/80 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-gradient-to-r from-purple-600/70
                 via-pink-400/70 to-cyan-400/70 flex items-center justify-center gap-2'>
                <img src={facebook} className='w-5 h-5' alt="Facebook" loading="lazy"/>
                <span className=''>Login with Facebook</span>
             
              </button>
              <button className='flex-1 h-12 border
               border-slate-600/60 backdrop-blur-sm py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wid
               e hover:scale-105 transition-all duration-300 hover:border-purple-500/80
                hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-gradient-to-r from-purple-600/70 via-pink-400/70 to-cyan-400/70 flex items-center justify-center gap-2'>
                <img src={google} className='w-5 h-5' alt="Google" loading="lazy"/>
                <span className=''>Login with Google</span>
                
              </button>
            </div>

            <div className='w-full flex items-center justify-center mb-4 px-4'>
              <span className='text-xs sm:text-sm text-slate-500 px-4 py-1.5 bg-slate-900/70 backdrop-blur-sm rounded-full border border-slate-700/50 tracking-wider font-mono'>___OR___</span>
            </div>

            {/* Form */}
            <form onSubmit={handlelogin} className='w-full max-w-[22rem] mx-auto flex flex-col gap-3 px-1'>
              <input 
                type="email" 
                value={user_logindata} 
                onChange={(e) => setuserdata(e.target.value)}
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
                <img 
                  src={visible ? eye2 : eye1} 
                  alt="toggle visibility" 
                  className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer hover:scale-110 transition-all hover:brightness-125' 
                  onClick={() => setvisible(v => !v)}
                />
              </div>

              <div className='w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-1'>
                <label className='flex items-center gap-2.5 cursor-pointer'>
                  <input type="checkbox" className='w-4 h-4 accent-purple-500 border-2 border-slate-600 rounded bg-slate-900/70 backdrop-blur-sm shadow-sm hover:scale-110 transition-all' />
                  <span className='text-xs font-mono text-slate-400'>Remember me</span>
                </label>
                <a href="#" className='text-xs font-mono text-purple-400 hover:text-purple-300 hover:underline underline-offset-1 transition-all whitespace-nowrap'>Forgot Password?</a>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className='w-full h-14 font-bold text-base rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-[length:200%_200%] animate-gradient-x border border-cyan-400/70 shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.9)] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed group relative'
              >
                <div className='w-full h-full grid place-items-center backdrop-blur-xl bg-black/60 border border-white/20 rounded-xl group-hover:bg-black/80 transition-all duration-300'>
                  {loading ? 'Signing In...' : 'Login to Account'}
                </div>
              </button>

              <div className='w-full text-center pt-2 pb-3'>
                <span className='text-xs font-mono text-slate-500'>Not a member? </span>
                <button 
                  type="button"
                  onClick={() => navigate('/signup')}
                  className='text-xs font-bold text-purple-400 hover:text-purple-300 underline decoration-2 underline-offset-1 hover:underline-offset-2 transition-all ml-1'
                >
                  Signup Now
                </button>
              </div>
            </form>
          </div>

          {/* Animated Background */}
          <div className='login_p2 lg:block lg:w-1/2 h-full  relative overflow-hidden '>
           
          </div>
        </div>
      </div>
    </>
  )
}

export default Login