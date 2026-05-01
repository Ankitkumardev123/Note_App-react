import React, { useEffect, useState,useRef, use} from 'react'
import { menubartoggle,editbartoggle,setfolders,setprofilepic, setcurentuser, setloginuser, setlogined, setselectednote, setfetching } from '../noteslice/noteslices.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import {  signOut } from 'firebase/auth'
import { Auth } from '../firebase/firebase.js'
import NanDropdown from '@/componets/NanDropdown.jsx'
import close from "../images/close.png"
import  logout from "../images/logout.png"
import  login from "../images/login.png"
import note from "../images/note.png"
import Menu from "../images/menu.png"
import user from "../images/user.png"
import notelogo from "../images/notelogo.png"

import { useGSAP } from '@gsap/react'
import userm from '../images/userm.png'
function Navbar() {
  const navigate=useNavigate()
  const userdata=useSelector(state=>state.noted.currentuser)
  const islogined=useSelector(state=>state.noted.logined)
  const ClOUD_NAME="dwlfcrhc8";
  const UPLOAD_PRESET="noteapp";
  const [reset, setreset] = useState(false)
  let animation=0
 const [visible, setvisible] = useState(false)
  
  const folders=useSelector(state=>state.noted.Folders)
  const folder_len=folders?.length
  let note_length=folders?.reduce((count,folder)=>count+folder?.notes?.length,0)
  let menu=useSelector(state=>state.noted.menubar)
  let container=useRef(null)
  let items=useRef()
   const slider=useRef(null)
  const dispatch=useDispatch()
  const editbar=useSelector(state=>state.noted.editbar)
  let count=0
   const [img_user, setimg_user] = useState(userdata?.profile_pic )
   
  const [open, setopen] = useState(false)
   useEffect(()=>{
    if(img_user !=null)
    dispatch(setprofilepic(img_user))
      
   },[img_user])
   useGSAP(()=>{

    
      gsap.from(`${islogined?'.slider1':'.slider'}`,{
      transform:'translateY(-50%)',
      opacity:0,
        duration:0.5,
        ease:'back.in',
        
        stagger:0.3,
      } 

      )
    },{})
  
  
 
 let  slider_move=(menu)=>{ 
   
   
    if(menu)
     {
      
         gsap.to(slider.current,{
    x:"400%",
    duration:1,
    
    ease:'power5.out',
   })
      
     }
    else
      {
         gsap.to(slider.current,{
        
      x:'0%',
      duration:1,
    
      ease:'power5.in',
    })
 
   
  }
   
  }

  
  const handleimage=(file)=>{
    if(file!=null){
      setreset(true)
      const fromData=new FormData();
      fromData.append("file",file);
      fromData.append("upload_preset",UPLOAD_PRESET)
      fetch(`https://api.cloudinary.com/v1_1/${ClOUD_NAME}/image/upload`,{
        method:"POST",
        body:fromData
      }).then(res=>res.json()).then((data)=>{
        
        dispatch(setprofilepic(data.secure_url))
        setTimeout(() => {
          alert("Profile image succesfully changed!")
        },1000);
        
        setreset(false)
      }).catch((err)=>{
        setreset(false)
        setTimeout(() => {
           alert("Img can't be changed!")
        },100);})
    }
     
  }
 
 const handleclick=()=>{
    dispatch(menubartoggle())
    slider_move(menu)
  }
 
 
  
  return (
    <>
     <div ref={slider} className={`user slide fixed flex overflow-x-hidden
      overflow-y-auto  scrollbar-hide z-[100]
       flex-col w-[70vmin] top-[8.4%] right-0   h-[90vh]
     bg-black bg-opacity-100  rounded-l-xl bg-gradient-to-t bg-[length:200%_200%]  animate-gradient from-purple-800 via-pink-600 to-cyan-500
     py-1 pl-1 translate-x-[400%] ${menu?'':'hidden'}`}>
      <div ref={slider} className='flex overflow-x-hidden
      overflow-y-auto  scrollbar-hide  
      justify-start items-center  flex-col w-full  h-full
     bg-black bg-opacity-100  rounded-l-xl py-2 gap-2
    '>

      <div className={`absolute w-32 h-32 sm:w-40  sm:h-40 md:w-48 md:h-48 lg:w-40 lg:h-40 z-[11] 
       ${reset?'':"hidden"} opacity-40 bg-gray-400 rounded-full grid place-items-center  `}>
        <div className={`w-14 h-14 border-8 rounded-full opacity-1 z-[12]  border-white
         border-t-gray-900  animate-spin grid place-items-center`}>
          
        </div>
      </div>
    <img src={userdata?.profile_pic ?? userm} 
    className={`use size-32  z-[10] mt-2
    rounded-full border-[1px]  object-cover shadow-lg backdrop-brightness-110   `}  />
    
    <label htmlFor="input-file"
     className={` bg-slate-900  text-lg  px-3 py-1 font-semibold hover:bg-slate-800 transition-all shadow-sm rounded-lg
       border-2
       ${islogined?'':'hidden'}`}>Update image</label>
    <input type="file" name="" id="input-file" accept='image/jpeg,image/png,image/jpg '  className='hidden'  onChange={(e)=>{handleimage(e.target.files[0])
    }}/>
   
    <div className='user1 w-[90%] h-[22%] flex  justify-center flex-col gap-3  items-center text-[3vmin] '>
      <span  className='use w-[100%] flex  justify-start items-center '>
        <h2 className='text-white  font-semibold w-[50%] h-[80%] '>Username</h2>
        <h2 className='font-semibold text-gray-500  w-[100%]  h-[80%] text-left font-mono '>{userdata?.username}</h2>
      </span>
    
      <span  className='use w-[100%] flex  justify-start items-center '>
        <h2 className='text-white  font-semibold w-[50%] h-[80%] '>Emaill</h2>
        <h2 className='font-semibold text-gray-500  w-[100%]  h-[80%] text-left font-mono '>{userdata?.email}</h2>
      </span>
    

      <span className='use  w-[100%] flex  justify-start items-center'>
        <h2 className='text-white font-semibold w-[50%] h-[80%] '>Created</h2>
        <h2 className='font-semibold w-[100%] h-[80%] text-left  font-mono text-gray-500'>{userdata?.created}</h2></span>
    
       
    </div>
    <div className='h-[1%] w-[90%] rounded-full bg-gradient-to-r animate-gradient bg-[length:200%_200%]'>  </div>
     <div className='total w-[90%] h-18 flex    justify-center flex-col   gap-2 items-start'>
    
     <span className='use w-[100%] flex items-center'>
      <h2 className='text-white w-[50%] font-semibold text-[3vmin]'>Total notes</h2>
     <h2 className='font-semibold w-[50%] h-[80%] text-right font-mono text-[3vmin] text-gray-500 '> {note_length || 0}</h2>
     </span>
     <span className='use w-[100%] flex'><h2 className='text-white w-[50%] font-semibold text-[3vmin]'>Total folders</h2>
     <h2 className='font-semibold w-[50%] h-[80%] text-right font-mono text-[3vmin] text-gray-500'>{folder_len || 0}
     </h2></span>
     </div>
     
     <button className='text-[3vmin] 
        px-6 py-2 font-poppins font-semibold 
        bg-black  border-gray-500
        hover:bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient flex justify-center items-center gap-2
        border-2  hover:border-cyan-400 rounded-md
        transition-all
        duration-400 hover:scale-110
        hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
        '  onClick={async()=>{
      
      if(islogined)
      {
      try{
       await signOut(Auth)
      
        navigate('/')
        dispatch(setloginuser({
            username:"User_name",
            password:'********',
            email:"notfound@gmail.com",
           
            created:'404,404,404',
            profile_pic:null
   }))
   dispatch(setfolders(null))
   dispatch(menubartoggle(false))
   dispatch(setselectednote(null))
    dispatch( setlogined(false))
   dispatch(setfetching(false))
   dispatch(menubartoggle(false))
     alert("You have succesfully logged out.")
  }catch (error){
   
      alert(error)
      console.log(error)
 
  }
      }
      else{
        navigate('/login')
        dispatch(menubartoggle(false))
      }
     }}>
     
      <img src={logout} className='size-[1.5rem] ' alt="" 
    
     />Logout</button>
     </div>
    </div>
     <div ref={container} className='fixed  top-0 left-0 right-0 z-[2] w-[100%] h-[9vh] animate-gradient  bg-transparent bg-blend-hard-light 
    bg-gradient-to-br from-purple-700  via-pink-600 to-cyan-500 bg-[length:200%_200%] '>
      
    </div>
    <div  className={`fixed  z-[3] bg-black 
     border-0 flex flex-row items-center py-1
       w-[100vw] h-[8.2vh] top-[0%] left-0 right-0 ${islogined?'hidden':''}`}>
        <div className='flex items-center justify-left pl-4 w-[40%] gap-1 '>
          
        <h2  className='slider text-center font-mono p-0.5 gap-1 flex justify-center items-center tracking-wider'>
           <img src={notelogo} className='size-[1.2rem]' alt="" />
            <span className='text-white font-light
            font-pacifico  lg:text-lg md:text-lg sm:text-lg ' >My</span>
            <span className='text-transparent font-pacifico
              bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 
              bg-clip-text lg:text-lg md:text-lg sm:text-lg'>Note</span>
        </h2> 
        </div>
        <div className='nav expand_nav relative   w-[100%] h-[100%] 
         flex items-center justify-center  gap-[5rem] md:gap-[4rem] ' > 
         
        <NavLink 
        to='/'
         className={({isActive})=>`slider navl relative  inline-block text-md lg:text-lg md:text-lg sm:text-lg text-gray-400 font-poppins  
            after:absolute after:left-0 after:bottom-0 
        after:h-[3px] after:w-0  after:bg-white hover:after:w-full bg-transparent
        hover:bg-gradient-to-r
        hover:from-purple-600
        hover:to-pink-600
        hover:text-transparent
        hover: bg-clip-text
        after:bg-gradient-to-r
        after:bg-transparent
        after:from-cyan-500
        after:to-green-600
        after:animate-pulse $
         ${isActive?'after:w-full bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text':''}  after:z-[-1] after:transition-all after:duration-300
        `}>Home
        </NavLink>
         <h3  className={`slider navl relative inline-block  text-md lg:text-lg md:text-lg sm:text-lg text-gray-400 font-poppins    
          after:absolute after:left-0 after:bottom-0 
        after:h-[3px] after:w-0
         after:bg-white hover:after:w-full focus-visible:after:w-full after:z-[-1] after:transition-all after:duration-300
       
         bg-transparent
        hover:bg-gradient-to-r
        hover:from-purple-600
        hover:to-pink-600
        hover:text-transparent
        hover:bg-clip-text
        after:bg-gradient-to-r
        after:bg-transparent
        after:from-cyan-500
         after:to-green-600 
         after:animate-pulse
          ${islogined?'':'hidden'}`
        
         } >Profile</h3>
         <NavLink 
        to='/login'
        className={({isActive})=>`slider navl relative inline-block text-md lg:text-lg md:text-lg sm:text-lg  text-gray-400 font-poppins   
            after:absolute after:left-0 after:bottom-0 
        after:h-[3px]
        after:bg-gradient-to-r
        after:bg-transparent
        after:from-cyan-500
         after:to-green-600
         after:animate-pulse
         after:w-0 after:bg-right-top hover:after:w-full ${isActive?'after:w-full bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text':''}  after:z-[-1]
        bg-transparent
        hover:bg-gradient-to-r
        hover:from-purple-600
        hover:to-pink-600
        hover:text-transparent
        hover:bg-clip-text after:transition-all after:duration-300
    `}>Login
        </NavLink>
          <NavLink
        to='/signup'
         className={({isActive})=>` slider navl relative inline-block text-md lg:text-lg md:text-lg sm:text-lg  text-gray-400 font-poppins       after:absolute after:left-0 after:bottom-0 
        after:h-[3px] after:w-0 after:bg-white hover:after:w-full ${isActive?'after:w-full bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text':''} 
        after:bg-gradient-to-r
        after:bg-transparent
        after:from-cyan-500
         after:to-green-600
         after:animate-pulse
        bg-transparent
        hover:bg-gradient-to-r
        hover:from-purple-600
        hover:to-pink-600
        hover:text-transparent
        hover:bg-clip-text after:z-[-1] after:transition-all after:duration-300
     
        `}>Signup
        </NavLink>
        
        
        </div>
        
        <div className='w-full hidden h-full short_nav   items-center justify-end pr-4'>
    <NanDropdown />
    </div>
    </div>
    
     <div  className={`fixed  z-[3] bg-black 
     border-0 flex flex-row items-center py-1 px-4
       w-[100vw] h-[8.2vh] top-[0%] left-0 right-0 overflow-hidden ${islogined?'':'hidden'}`}>
 <div className='flex items-center justify-start  w-[50%] '>
          <img src={Menu} className='img slider1 w-[1.5rem] z-50 p-0.5' alt="" onClick={()=>{
           dispatch(editbartoggle())
          }
          }/>
        <h2  className='slider1 text-center font-mono p-0.5 flex justify-center items-center gap-1  tracking-wider'>
           
            <span className='text-white font-light
            font-pacifico  text-[3.7vmin] ' >My</span>
            <span className='text-transparent font-pacifico
              bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 
              bg-clip-text text-[3.6vmin]'>Note</span>
        </h2> 
        </div>
        <div className='flex  items-center gap-3 justify-end   w-full '>
          
        
           
         <div className=' gap-2 w-[50%] h-full flex justify-end pr-2 items-center'>
          <img src={userdata?.profile_pic ?? userm} alt="" className='slider1 size-[1.8rem] border-gray-600 border-[1px] rounded-full' />
          <h2 className='text-sm font-poppins font-semibold slider1 usernamenav'>{userdata?.username?.slice(0,10)+"..." ?? 'Notfound404'}</h2>
           <img src={menu?close:Menu} className='img slider1 size-[1.5rem] z-50 p-0.5' alt="" onClick={handleclick}
          />
         </div>
     
       
        </div>
       </div>
    </>
  ) 
}

export default Navbar ;