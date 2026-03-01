import React, { useEffect, useState,useRef, use} from 'react'
import { menubartoggle,editbartoggle,setfolders,setprofilepic, setcurentuser, setloginuser, setlogined, setselectednote, setfetching } from '../noteslice/noteslices.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import {  signOut } from 'firebase/auth'
import { Auth } from '../firebase/firebase.js'

import close from "../images/close.png"
import  logout from "../images/logout.png"
import  login from "../images/login.png"
import note from "../images/note.png"
import Menu from "../images/menu.png"
import user from "../images/user.png"
import { useGSAP } from '@gsap/react'
function Navbar() {
  const navigate=useNavigate()
  const userdata=useSelector(state=>state.noted.currentuser)
  const islogined=useSelector(state=>state.noted.logined)
  const ClOUD_NAME="dwlfcrhc8";
  const UPLOAD_PRESET="noteapp";
  const [reset, setreset] = useState(false)

 const [visible, setvisible] = useState(false)
  
  const folders=useSelector(state=>state.noted.Folders)
  const folder_len=folders?.length
  let note_length=folders?.reduce((count,folder)=>count+folder?.notes?.length,0)
  let menu=useSelector(state=>state.noted.menubar)
 
  let items=useRef()
   const slider=useRef(null)
  const dispatch=useDispatch()
  const editbar=useSelector(state=>state.noted.editbar)
  let count=0
   const [img_user, setimg_user] = useState(userdata.profile_pic )
   
  const [open, setopen] = useState(false)
   useEffect(()=>{
    if(img_user !=null)
    dispatch(setprofilepic(img_user))
      
   },[img_user])
   
  
  
 
 let  slider_move=(menu)=>{ 
   
   
    if(menu)
     {
       gsap.to(slider.current,{
      x:'-200%',
      duration:1,
    
      ease:'expo.in',
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
useEffect(()=>{
if(editbar){
 
   slider_move(true)
}

},[editbar])
  const handleclick=()=>{
    
    dispatch(menubartoggle())
    dispatch(editbartoggle(false))
    slider_move(menu)
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
  
  return (
    <>
     <div ref={slider} className='user slide absolute flex overflow-x-hidden
      overflow-y-auto  scrollbar-hide gap-1 
      justify-start items-center  flex-col w-[70vmin] top-[8.4%]  h-[115vh]
     bg-black bg-opacity-100 z-[30] rounded-r-xl border-4 border-white border-l-0 
     py-1 translate-x-[-200%]'>
      <div className={`absolute w-32 h-32 sm:w-40  sm:h-40 md:w-48 md:h-48 lg:w-40 lg:h-40 z-[11] 
       ${reset?'':"hidden"} opacity-40 bg-gray-400 rounded-full grid place-items-center  `}>
        <div className={`w-14 h-14 border-8 rounded-full opacity-1 z-[12]  border-white
         border-t-gray-900  animate-spin grid place-items-center`}>
          
        </div>
      </div>
    <img src={userdata.profile_pic ??user} 
    className={`use  w-32 h-32 sm:w-40 z-[10] sm:h-40 md:w-48 md:h-48 lg:w-40 lg:h-40   
    rounded-full border-orange-500 border-4 object-cover shadow-lg backdrop-brightness-110   `}  />
    <label htmlFor="input-file"
     className={` bg-orange-500   text-[3vmin]  px-3 py-1 font-semibold hover:bg-orange-600 transition-all shadow-sm rounded-lg
       border-2
       ${islogined?'':'hidden'}`}>Update image</label>
    <input type="file" name="" id="input-file" accept='image/jpeg,image/png,image/jpg '  className='hidden'  onChange={(e)=>{handleimage(e.target.files[0])
    }}/>
    <span ref={items} className='use text-center h-auto '>
    <h1 className='user1 text-[3vmin] font-semibold font-serif  p-0'>{userdata?.username}</h1>
    <h1 className='user1 font-thin text-gray-500 font-mono h-[2%] p-0 text-[2.6vmin]'>{userdata?.username}</h1>
    </span>
    <div className='user1 w-[90%] h-[22%] flex  justify-center flex-col gap-3  items-center text-[3vmin] '>
      <span  className='use w-[100%] flex  justify-start items-center '>
        <h2 className='text-gray-400  font-semibold w-[50%] h-[80%] '>Emaill</h2>
        <h2 className='font-semibold  w-[100%]  h-[80%] text-left font-mono '>{userdata?.email}</h2>
      </span>
      <span className='use w-[100%]  flex  justify-start items-center'>
        <h2 className='text-gray-400 font-semibold w-[50%] h-[80%]'>Mobile</h2>
        <h2 className='font-semibold g w-[100%] h-[80%]  text-left  font-mono'>{userdata?.phonenumber}</h2>
        </span>

      <span className='use  w-[100%] flex  justify-start items-center'>
        <h2 className='text-gray-400 font-semibold w-[50%] h-[80%]'>Created</h2>
        <h2 className='font-semibold w-[100%] h-[80%] text-left  font-mono'>{userdata?.created}</h2></span>
      <span className='use w-[100%]  flex  justify-start items-center'>
        <h2 className='text-gray-400 font-semibold w-[50%] h-[80%]'>Password</h2>
        <h2 className='font-semibold w-[100%] h-[80%] text-left  font-mono'>{userdata?.password}</h2></span>
       
    </div>
    <div className='h-[1%] w-[90%] rounded-full bg-orange-600 text-black '>  </div>
     <div className='total w-[90%] h-[20%] flex   justify-left flex-col   gap-3'>
    <span className='use flex items-center w-[100%] justify-start  '>
      <img src={note} className='w-[6vmin] h-[6vmin]' alt="" />
    <h1 className='text-orange-600 text-[5vmin] pt-0.5 font-semibold font-mono' >Notes</h1></span>
     <span className='use w-[100%] flex items-center'>
      <h2 className='text-gray-400 w-[50%] font-semibold text-[3vmin]'>Total notes</h2>
     <h2 className='font-semibold w-[50%] h-[80%] text-right font-mono text-[3vmin] '> {note_length || 0}</h2>
     </span>
     <span className='use w-[100%] flex'><h2 className='text-gray-400 w-[50%] font-semibold text-[3vmin]'>Total folders</h2>
     <h2 className='font-semibold w-[50%] h-[80%] text-right font-mono text-[3vmin]'>{folder_len || 0}
     </h2></span>
     </div>
     
     <button className='use text-[4vmin] bg-black border-4 p-2 rounded-lg flex hover:border-orange-500'  onClick={async()=>{
      
      if(islogined)
      {
      try{
       await signOut(Auth)
      
        navigate('/')
        dispatch(setloginuser({
            username:"User_name",
            password:'********',
            email:"notfound@gmail.com",
            phonenumber:'Notfound',
            created:'404,404,404',
            profile_pic:null
   }))
   dispatch(setfolders(null))
   dispatch(menubartoggle(false))
   dispatch(setselectednote(null))
    dispatch( setlogined(false))
   dispatch(setfetching(false))
     alert("You have succesfully logged out.")
  }catch{
    setTimeout(() => {
      alert("Some issue arised!\nCheck you network connection.")
     }, 100);
  }
      }
      else{
        navigate('/login')
        dispatch(menubartoggle(false))
      }
     }}><img src={islogined?logout:login} className=' w-[5vmin] h-[5vmin] mt-1' alt="" 
    
     />Log<span className='text-orange-600'>{islogined?"out":"in"}</span></button>
    </div>
    <div className='fixed   z-[2] gap-[10%]  border-2 flex flex-row items-center rounded-lg bg-black w-[100vw] h-[8vh] top-[0%] left-0 right-0'>
        <span className='flex items-center justify-left pl-2'>
          <img src={menu?close:Menu} className='img w-[6vmin] h-[6vmin] z-50 p-0.5' alt="" onClick={()=>{
           handleclick()
          }
          }/>
        <h2 className=' text-center font-mono p-0.5  '>
          
            <span className='text-white font-serif text-[3.5vmin]'>My</span>
            <span className='text-orange-500 text-[3vmin]'>Note</span>
        </h2> 
        </span>
        <div className='nav w-[70%] h-[100%]  flex items-center justify-center gap-[10%]' >
        <NavLink
        to='/'
         className={({isActive})=>`navl relative inline-block text-[4.3vmin]  text-orange-500 px-1 
         font-mono font-thin   after:absolute after:left-0 after:bottom-0 
        after:h-[3px] after:w-0 after:bg-white hover:after:w-full ${isActive?'after:w-full':''}  after:z-[-1] after:transition-all after:duration-300
        `}>Home
        </NavLink>
         <h3 className='navl relative inline-block text-[4vmin]  text-orange-500 px-1 font-mono font-thin   after:absolute after:left-0 after:bottom-0 
        after:h-[3px] after:w-0 after:bg-white hover:after:w-full focus-visible:after:w-full after:z-[-1] after:transition-all after:duration-300
        ' onClick={()=>{
          
           handleclick()
           
        }}>Profile</h3>
         <NavLink
        to='/login'
        className={({isActive})=>` navl relative inline-block text-[4vmin]   text-orange-500 px-1 font-mono font-thin    after:absolute after:left-0 after:bottom-0 
        after:h-[3px] after:w-0 after:bg-white hover:after:w-full ${isActive?'after:w-full':''}  after:z-[-1] after:transition-all after:duration-300
       ${islogined?"hidden":''}`}>Login
        </NavLink>
          <NavLink
        to='/signup'
         className={({isActive})=>`navl relative inline-block text-[4vmin]   text-orange-500 px-1 font-mono font-thin    after:absolute after:left-0 after:bottom-0 
        after:h-[3px] after:w-0 after:bg-white hover:after:w-full ${isActive?'after:w-full':''}  after:z-[-1] after:transition-all after:duration-300
        ${islogined?"hidden":''}
        `}>Signup
        </NavLink>
        <NavLink
        to='/contact'
         className={({isActive})=>`navl relative inline-block text-[4vmin]   text-orange-500 px-1 font-mono font-thin  
          after:absolute after:left-0 after:bottom-0 
        after:h-[3px] after:w-0 after:bg-white hover:after:w-full ${isActive?'after:w-full':''} ${islogined?"":"hidden"} after:z-[-1] after:transition-all after:duration-300
        `}>Contact Us
        </NavLink>
        
        </div>
        
        
    </div>
    </>
  ) 
}

export default Navbar ;