import React, { useEffect, useState,useRef, use} from 'react'
import { menubartoggle,editbartoggle,setfolders,setprofilepic, setcurentuser, setloginuser, setlogined, setselectednote } from '../noteslice/noteslices.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Auth } from '../firebase/firebase.js'

import close from "../images/close.png"
import  logout from "../images/logout.png"
import  login from "../images/login.png"
import note from "../images/note.png"
import Menu from "../images/menu.png"
import user from "../images/user.png"
function Navbar() {
  const navigate=useNavigate()
  const userdata=useSelector(state=>state.noted.currentuser)
  const islogined=useSelector(state=>state.noted.logined)
  const ClOUD_NAME="dwlfcrhc8";
  const UPLOAD_PRESET="noteapp";


 const [visible, setvisible] = useState(false)
  
  const folders=useSelector(state=>state.noted.Folders)

  let note_length=folders?.reduce((count,folder)=>count+folder?.notes?.length,0)
  let menu=useSelector(state=>state.noted.menubar)
   const slider=useRef(null)
  const dispatch=useDispatch()
  const editbar=useSelector(state=>state.noted.editbar)
  const t1=gsap.timeline()
   const t2=gsap.timeline()
   const [img_user, setimg_user] = useState(userdata.profile_pic )
   
   useEffect(()=>{
      onAuthStateChanged(Auth,(user)=>{
        if(user){
          
        }
        else{
          
        }
      })
   },[])
   useEffect(()=>{
    if(img_user !=null)
    dispatch(setprofilepic(img_user))
      
   },[img_user])
   useEffect(()=>{
   gsap.set(slider.current,{
    xPercent:-200, 
    duration:0
   })
  
   },[slider])
   useEffect(()=>{
   
    if(menu==false)
     {
       gsap.to(slider.current,{
      xPercent:-200,
      duration:0.5,
    
      ease:"power2.out",
    })
 
     }
    else
      {
         t1.to(slider.current,{
    xPercent:0,
    duration:1,
    delay:0,
    ease:"power2.out",
   })}
    }
   ,[menu])
  const handleclick=()=>{0
    dispatch(menubartoggle())
    dispatch(editbartoggle(false))
    
  }
  const handleimage=(file)=>{
    if(file!=null){
      const fromData=new FormData();
      fromData.append("file",file);
      fromData.append("upload_preset",UPLOAD_PRESET)
      fetch(`https://api.cloudinary.com/v1_1/${ClOUD_NAME}/image/upload`,{
        method:"POST",
        body:fromData
      }).then(res=>res.json()).then((data)=>{
        console.log(data)
        dispatch(setprofilepic(data.secure_url))}).catch((err)=>console.log(err))
    }
     
  }
  
  return (
    <>
     <div ref={slider} className='user slide absolute flex overflow-x-hidden overflow-y-auto scrollbar-hide gap-2 
      justify-start items-center  flex-col w-[70vmin] top-[8.4%]  h-[100vh]
     bg-black bg-opacity-100 z-[30] rounded-r-xl border-4 border-white border-l-0 py-1'>
    <img src={userdata.profile_pic ??user} 
    className={`  w-[20vmax] h-[20vmax]   rounded-full border-orange-500 border-4 object-cover shadow-lg backdrop-brightness-110   `}  />
    <label htmlFor="input-file" className={`bg-orange-500 py-1 px-3 text-[3vmin] font-semibold hover:bg-orange-600 transition-all shadow-sm rounded-lg border-[0.5vmin]
       ${islogined?'':'hidden'}`}>Update image</label>
    <input type="file" name="" id="input-file" accept='image/jpeg,image/png,image/jpg '  className='hidden'  onChange={(e)=>{handleimage(e.target.files[0])
    }}/>
    <span className='text-center h-auto'>
    <h1 className='text-[3vmin] font-semibold font-serif  p-0'>{userdata?.username}</h1>
    <h1 className='font-thin text-gray-500 font-mono h-[2%] p-0 text-[2.6vmin]'>{userdata?.username}</h1>
    </span>
    <div className=' w-[100%] h-[24%] flex  justify-center flex-col gap-3 pl-5 items-center text-[3vmin]'>
      <span className='w-[100%] flex  justify-start items-center '>
        <h2 className='text-gray-400  font-semibold w-[40%] h-[80%] '>Emaill</h2>
        <h2 className='font-semibold  w-[50%]  h-[80%] text-left font-mono'>{userdata?.email}</h2>
      </span>
      <span className='w-[100%]  flex  justify-start items-center'>
        <h2 className='text-gray-400 font-semibold w-[40%] h-[80%]'>Mobile</h2>
        <h2 className='font-semibold w-[50%] h-[80%]  text-left  font-mono'>{userdata?.phonenumber}</h2>
        </span>

      <span className='w-[100%] flex  justify-start items-center'>
        <h2 className='text-gray-400 font-semibold w-[40%] h-[80%]'>Created</h2>
        <h2 className='font-semibold w-[50%] h-[80%] text-left  font-mono'>{userdata?.created}</h2></span>
      <span className='w-[100%]  flex  justify-start items-center'>
        <h2 className='text-gray-400 font-semibold w-[40%] h-[80%]'>Password</h2>
        <h2 className='font-semibold w-[50%] h-[80%] text-left  font-mono'>{userdata?.password}</h2></span>
    </div>
    <div className='h-[1%] w-[90%] rounded-full bg-orange-600 text-black '> jjj </div>
     <div className='total w-[90%] h-[22%] flex   justify-left flex-col   gap-3'>
    <span className='flex items-center  '>
      <img src={note} className='w-[6vmin] h-[6vmin]' alt="" />
    <h1 className='text-orange-600 text-[5vmin] pt-0.5 font-semibold font-mono' >Notes</h1></span>
     <span className='w-[100%] flex items-center'>
      <h2 className='text-gray-400 w-[50%] font-semibold text-[3vmin]'>Total notes</h2>
     <h2 className='font-semibold w-[50%] h-[80%] text-right font-mono text-[3vmin] '>{folders?.length || 0}</h2>
     </span>
     <span className='w-[100%] flex'><h2 className='text-gray-400 w-[50%] font-semibold text-[3vmin]'>Total folders</h2>
     <h2 className='font-semibold w-[50%] h-[80%] text-right font-mono text-[3vmin]'>{note_length || 0}
     </h2></span>
     </div>
     
     <button className='text-[4vmin] bg-black border-2 p-2 rounded-lg flex hover:border-orange-500'  onClick={async()=>{
      if(islogined)
      {
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
      }
      else
        navigate('/login')
     }}><img src={islogined?logout:login} className='w-[5vmin] h-[5vmin] mt-1' alt="" 
    
     />Log<span className='text-orange-600'>{islogined?"out":"in"}</span></button>
    </div>
    <div className='fixed z-[2] gap-[10%]  border-2 flex flex-row items-center rounded-lg bg-black w-[100vw] h-[8vh] top-[0%] left-0 right-0'>
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
          
           dispatch(menubartoggle())
           
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