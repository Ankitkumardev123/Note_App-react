import React, { use, useEffect, useRef,useState,} from 'react'
import gsap from 'gsap'
import scrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(scrollTrigger)
import { useSelector,useDispatch } from 'react-redux'



import github from '../images/app_icons/github.png'
import facebook from "../images/facebook.png"
import linkedin from '../images/linkedin.png'
import message from '../images/pngs/message.png'
import hand from '../images/pngs/hand.png'

import heart from '../images/pngs/heart.png'
import heart1 from '../images/pngs/heart1.png'
import { useNavigate } from 'react-router-dom'
import comp2  from '../images/pngs/comp2.png'
import lap2  from '../images/pngs/lap2.png'
import tablet  from '../images/pngs/tablet.png'
import phone  from '../images/pngs/phone.png'
import close from "../images/close.png"
import pencils from "../images/pencils.png"
import folder from "../images/folder.png"
import searchicon from "../images/searchicon.png"
import note from "../images/note.png"
import mini from "../images/mini.png"
import great from "../images/great.png"

import notess from "../images/notess.png"
import * as docx from 'docx'
import { Format } from '@cloudinary/url-gen/qualifiers'
import { saveAs } from 'file-saver'
import { auto } from '@cloudinary/url-gen/qualifiers/quality'
import { useGSAP } from '@gsap/react'
import { useEffectEvent } from 'react'
function Home() {
  
  const select=useRef(null)
      
        const navigate=useNavigate()
          let folders=useSelector(state=>state.noted.Folders)
      
  useEffect(()=>{
    window.addEventListener('resize',()=>{
scrollTrigger.refresh()
    })
      
   
  })
  useGSAP(()=>{
    gsap.to('.box_bb',{
     transform:'translateX(-270%)',
      duration:50,
      ease:'none',
      repeat:-1,
     
      
    })
  },[])
  //device section animation
 scrollTrigger.matchMedia({
    "(min-width: 1025px)":function(){
   const t2=gsap.timeline({
   scrollTrigger:{
    trigger:'.main_d',
  
    start:'top center',
    end:'bottom bottom',
    
   }
   }) 
   t2.from('.dev_1',{
     y:-100,
      opacity:0,
      duration:1,
      delay:0.5,
      ease:'back.out',
      stagger:0.3
    
   }),
   t2.from('.dev_2 ',{
    y:-100,
    opacity:0,
    delay:0.1,
    duration:0.5,
   
    ease:'linear'
   })
  },
   
  })

  //contact section animation
    scrollTrigger.matchMedia({
      "(min-width: 1025px)":function(){
   const t4=gsap.timeline({
   scrollTrigger:{
    trigger:'.contact_sec',
    
    start:'top 90%',
    end:'top 20%',
    scrub:true
   }
   });
   t4.from('.con_a',{
     x:-200,
      opacity:0,
      duration:2,
      delay:0.5,
      ease:'linear',
      stagger:1
    
   },0)
   t4.from('.con_b ',{
    x:200,
    opacity:0,
    delay:0.5,
    duration:2,
   stagger:1,
    ease:'linear'
   },0)
   
    t4.to('.con_bu ',{
   
    opacity:1,
    delay:0.1,
    duration:0.2,
    clearProps:'transform',
    ease:'linear'
   })
   },
   "(max-width: 1024px)":function(){
    gsap.to('.con_bu ',{
   
    opacity:1,
    
   })
   }
 })
  //feature section animation
 scrollTrigger.matchMedia({
      "(min-width: 1025px)":function(){
        gsap.to('.f_ele_2',{
      
      opacity:0,
      
    
    
   });
   const t3=gsap.timeline({
   scrollTrigger:{
    trigger:'.feature_back',
 
   start:'top 80%',
    end:'top 80%',
 
   }
   });
    t3.to('.f_ele_11',{
      
      opacity:1,
      duration:0.5,
      delay:0.2,
      ease:'back.out',
    
    
   })
     t3.from('.f_ele_1',{
     y:50,
      opacity:0,
      duration:0.6,
      delay:0.2,
      ease:'back.out',
      stagger:0.3
    
   })

   const t5=gsap.timeline({
   scrollTrigger:{
    trigger:'.f_ele_2',
 
   start:'top 80%',
    end:'top 80%',
 
   }
   });
  t5.to('.f_ele_2',{
    
      opacity:1,
      duration:0.5,
      delay:0.2,
      ease:'back.out',
      stagger:0.3
    
   })
  
    t5.to('#contact ',{
     opacity:1,
    delay:0.1,
    duration:0.2,
    clearProps:'transform',
    ease:'linear'
  
   })
   
  
 },

   "(max-width: 1024px)":function(){
    gsap.to('.f_ele_2',{
    
      opacity:1,
      duration:0,
     
    
   })
   gsap.to('#contact ',{
     opacity:1,
   
   
   })
   }
})
  // fontsection_animation
  useGSAP(()=>{
   const t1=gsap.timeline();
    gsap.to('.ele_5 h2',{
     y:'-50%',
      opacity:0,
      duration:0,
    })
     gsap.to('.heart',{
    size:0,
      opacity:0,
      duration:0,
    })
    
    // gsap.to('.ele_5 h2',{
    //   y:'0%',
    //   opacity:1,
    //   duration:0.5,
    //   stagger:0.2,
    //   ease:'circ.inOut'
    // })
   
     t1.from('.ele_1',{
      y:-100,
      opacity:0,
      duration:1,
      delay:0.5,
      ease:'back.out'
    })
    t1.from('.ele_2',{
       y:-50,
      opacity:0,
      duration:1,
      delay:0.1,
      ease:'back.in'
    })
    t1.from('.ele_3',{
      y:100,
      opacity:0,
      duration:1,
      delay:0.2,
      ease:'bounce.out'
    })
    t1.from('.ele_4',{
      y:100,
      opacity:0,
      duration:1,
      delay:0.2,
      ease:'linear'
    },0)
    t1.to('.heart',{
    size:'0.5vmin',
      opacity:1,
      duration:0.2,
      delay:0.1,
      ease:'bounce.inOut'
    })
    t1.to('.ele_5_1',{
      height:'25.2vmin',
      width:'35vmin',
      opacity:1,
      delay:0.2,
      stagger:0.5,
      duration:0.5,
      ease:'linear'
    })
    t1.to('.ele_5_2',{
      height:'21vmin',
      width:'33vmin',
      opacity:1,
      delay:0.1,
      stagger:0.5,
      duration:0.5,
      ease:'linear'
    })
    t1.to('.ele_5 h2',{
     y:'0%',
      opacity:1,
      duration:0.2,
      delay:0.1,
      ease:'power2',
      stagger:0.2,
    })
     
    
   t1.play()
  })

 

 
  
  return (
    <>
   
    {/* homepage */}
    <div id='home' className={`  bg-black  h-[100%]  w-[100vw] flex flex-col justify-start overflow-x-hidden overflow-y-auto  `}>
       <div className='w-[100%] h-[9.7vh] shrink-0  '>
      {/* dummy-navbar */}
    </div>
     {/* Hero section */}
      <div className='w-[100%] h-[100%]  '>
              <div className='f_back w-[100%] h-[90vh]  '>
<div className='main_f w-[100%] h-[100%]  bg-black/60  backdrop-blur-sm flex '>
    <div className='f1 gap-[1rem] relative w-[100%] h-[100%]  flex flex-col justify-center  items-center '>
      
      <div className='ele_1 text_h  flex  tracking-wider text-[10vmin] font-pacifico '>
        <h1 className=' transition-all duration-300 hover:text-gray-400'>Welcome to </h1>
       <h2 className='  '>
        <span className='h1   text-gray-400 font-light
            font-pacifico  text-[8vmin] ' >
              My
              </span>
            <span className='h2
             text-transparent font-pacifico

              bg-gradient-to-r from-purple-400
               via-pink-500
               to-cyan-400 
              bg-clip-text text-[7.5vmin]'>
                Note
                </span>
        </h2> 
        </div>
        <div className='ele_2 p w-[65%] text-center font-poppins   grid place-items-center'>
          <p className=' transition-all text-[3vmin] duration-300 hover:text-white text-gray-400 leading-relaxed'>Lorem ipsum dolor, sit amet consectetur adipisicing.
          Totam eligendi vel quia corrupti odio alias?
          Modi ducimus quos assumenda labore, in vel?

          </p>
        </div>
        
        <span className='relative ele_3 '>
          <div className='heart absolute shrink-0 rotate-[-30deg] -left-4 -top-4  z-[2] -roatate-6 size-[6.5vmin] 
          bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient
        border-2 border-cyan-400 rounded-full grid place-items-center
         transition-all
        duration-300 hover:scale-110
        shadow-[0_0_25px_rgba(168,85,247,0.6)]'>
          <img loading="lazy"   src={heart} alt="" className='size-[4vmin]'/>
        </div>
        <button 
        className=' text-[4vmin] z-[1]
        px-5 py-3 font-poppins font-semibold overflow-hidden
        bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient
        border-2  border-cyan-400 rounded-lg
        transition-all
        duration-300 hover:scale-105
        shadow-[0_0_25px_rgba(168,85,247,0.6)]
        '
        onClick={()=>navigate('/login')}>
          Start Writing
        </button>
        </span>
    </div>
    <div className='f2 relative ele_4  [transform-style:preserve-3d] w-[100%]   h-[100%] flex items-center flex-col justify-center'>
      <span className='relative '>
      <div className='ele_5 absolute z-[1]  px-2 left-[36%] top-[15%] rotate-[-6deg] rounded-xl flex justify-center items-center
      w-[32%] h-[63%] bg-black text-black '>
        <h2 className='rotate-[90deg] '>
       <span className='text-white 
            font-pacifico  text-[13vmin] ' >
              My 
              </span>
            <span className='text-transparent font-pacifico
              bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 
              bg-clip-text text-[13vmin]'>
                Note
                </span>
        </h2> 
      </div>
      <img loading="lazy"   src={hand} alt="" className=' z-[0]  size-[40rem] 
      drop-shadow-[10px_10px_25px_rgba(236,72,85,0.7)] 
      ' />
      </span>
      <div  alt=""  className='ele_5 ele_5_1 font-poppins opacity-0 top-7 -left-10  text-sm absolute rotate-[-6deg] w-[0] flex flex-col gap-1
       text-white rounded-md border-4 border-green-400  h-[0] 
       bg-black/60 backdrop-blur-lg transition-all duration-300 hover:scale-105 '>
        <div className='w-full h-5 gap-1 px-2 bg-green-500   flex items-center text-center text-[5vmin] text-black'>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
       
        </div>
       
        <h2 className='flex px-1 gap-1 '><img loading="lazy"   src={note} className='size-5' alt="" />Create Notes</h2>
        <h2 className='flex px-1 gap-1 '><img loading="lazy"   src={pencils} className='size-5' alt="" />Edit Notes</h2>
       <h2 className='flex px-1 gap-1 '><span className='text-green-500'> ✔</span> Dowload Notes</h2>
        <h2 className='flex px-1 gap-1 '><img loading="lazy"   src={folder} className='size-5 ' alt="" />Organize Notes</h2>
      </div>
      <div  alt=""  className='ele_5 ele_5_1 font-poppins opacity-0 top-[60%] -left-10 rotate-[5deg] text-sm absolute w-[0] flex flex-col gap-1
       text-white rounded-md border-4 border-purple-400  h-[0] 
       bg-black/60 backdrop-blur-lg duration-300 hover:scale-105'>
         <div className='w-full h-5 gap-1 px-2 bg-purple-500   flex items-center text-center text-[5vmin] text-black'>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
       
        </div>
       
        <h2 className='flex px-1  '>🔐 Secure Login</h2>
        <h2 className='flex px-1  '>⚡ fast Access</h2>
       <h2 className='flex px-1'>🔥 Powered By Firebase</h2>
        <h2 className='flex px-1 '>✨ Reatime-Sync</h2>
      </div>
       <div  alt=""  className='ele_5 ele_5_2 font-poppins opacity-0 z-[5] top-[72%] right-6 rotate-[-8deg]  text-sm absolute
        w-[0vmin] flex flex-col gap-1
        text-white rounded-md border-4 border-pink-500  h-[0vmin] 
       bg-black duration-300 hover:scale-105'>
        <div className='w-full h-5 gap-1 px-2 bg-pink-400  flex items-center text-center text-[5vmin] text-black'>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
       
        </div>
       
        <h2 className='flex px-1  '>🔐 Write Anywhere </h2>
        <h2 className='flex px-1  '>⚡ Access Anytime</h2>
       <h2 className='flex px-1'>🔥 Stay Organized</h2>
       
      </div>
       <div  alt=""  className='ele_5 ele_5_2 font-poppins opacity-0 z-[5] top-[5%] right-5 rotate-[5deg] 
        text-[2.5vmin] absolute  flex flex-col gap-1
        text-white rounded-md border-4 border-cyan-400  h-[0] 
       bg-black duration-300 hover:scale-105'>
        <div className='w-full h-5 gap-1 px-2 bg-cyan-500  flex items-center text-center text-[5vmin] text-black'>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
       
        </div>
       
        <h2 className='flex pl-0.2  '>🔐Works On All Devices</h2>
        <h2 className='flex pl-0.2  '>⚡Sec_Authentication</h2>
       <h2 className='flex pl-0.2'>🔥Smooth Experience</h2>
       
      </div>
      
    </div>
</div>
              </div>
      </div>
      {/* banner_line */}
      <div id='device' className='w-[100vw] z-[1] h-[10vh] border-2 border-gray-500 bg-transparent  bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient  overflow-hidden flex  '>
      <div className='box_bb w-[100%] h-[100%] bg-transparent text-[2.5vmin] bt  overflow-visible flex flex-nowrap gap-0 '>
      <div className='box_b w-[30vmin]   h-[100%] bg-black/60 backdrop-blur-lg
        border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0  font-popins'>
      <img loading="lazy"   src={note} className='size-4' alt="" />
      Create Notes</div>
      <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-transparent flex items-center justify-center  shrink-0 gap-1 font-popins'>
<img loading="lazy"   src={pencils} className='size-3' alt="" />Edit Notes
      </div>
       <div className='box_b w-[31vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 font-popins'>
<span className='text-green-500'>✔</span>DowloadNotes
       </div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-1 font-popins'>
        <img loading="lazy"   src={folder} className='size-4 ' alt="" />OrganizeNotes
        </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 font-popins'>
        🔐 Secure Login
       </div>
     <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
     🔥 Firebase used
     </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
       ✨ Reatime-Sync
       </div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
        ⚡ fast Access</div>
        
        <div className=' box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
        <img loading="lazy"   src={note} className='size-4' alt="" />
        Write Anywhere
        </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
    🔥 Stay Organized
       </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
       ⚡ Access Anytime</div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
        🌟 Clean UI/UX</div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
       ♨ Secure Login
       </div>
        <div className='box_b w-[30vmin]   h-[100%] bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0  font-popins'>
      <img loading="lazy"   src={note} className='size-4' alt="" />
      Create Notes</div>
      <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-transparent flex items-center justify-center  shrink-0 gap-1 font-popins'>
<img loading="lazy"   src={pencils} className='size-3' alt="" />Edit Notes
      </div>
       <div className='box_b w-[31vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 font-popins'>
<span className='text-green-500'>✔</span>DowloadNotes
       </div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-1 font-popins'>
        <img loading="lazy"   src={folder} className='size-4 ' alt="" />OrganizeNotes
        </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 font-popins'>
        🔐 Secure Login
       </div>
     <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
     🔥 Firebase used
     </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
       ✨ Reatime-Sync
       </div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
        ⚡ fast Access</div>
        
        <div className=' box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
        <img loading="lazy"   src={note} className='size-4' alt="" />
        Write Anywhere
        </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
    🔥 Stay Organized
       </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
       ⚡ Access Anytime</div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
        🌟 Clean UI/UX</div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
       ♨ Secure Login
       </div>
       <div className='box_b w-[30vmin]   h-[100%] bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0  font-popins'>
      <img loading="lazy"   src={note} className='size-4' alt="" />
      Create Notes</div>
      <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-transparent flex items-center justify-center shrink-0 gap-1 font-popins'>
<img loading="lazy"   src={pencils} className='size-4' alt="" />Edit Notes
      </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 font-popins'>
<span className='text-green-500'>✔</span>DowloadNotes
       </div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-1 font-popins'>
        <img loading="lazy"   src={folder} className='size-4 ' alt="" />OrganizeNotes
        </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 font-popins'>
        🔐 Secure Login
       </div>
     <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
     🔥 Firebase used
     </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
       ✨ Reatime-Sync
       </div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
        ⚡ fast Access</div>
        
        <div className=' box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
        <img loading="lazy"   src={note} className='size-4' alt="" />
        Write Anywhere
        </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
    🔥 Stay Organized
       </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
       ⚡ Access Anytime</div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
        🌟 Clean UI/UX</div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-0.5 font-popins'>
       ♨ Secure Login
       </div>
      </div>
      </div>
      {/* device_section */}
      <div   className='main_d w-[100vw] h-[90vh] gap-2 bg-transparent animate-gradient bg-gradient-to-t backdrop-blur-3xl   from-black
       via-black to-purple-700/70  bg-[length:200%_200%] flex flex-col items-baseline '
      >
        <span className='dev_1 relative w-[100vw] h-[20%] flex flex-col gap-3 mt-2 font-pacifico  items-center'>
<h1  className='text-[9vmin] font-outfit tracking-wide transition-all duration-200 hover:text-transparent
bg-clip-text
 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient
'>Works On All Devices</h1>
  <div className='w-[40%] dev_1 h-[0.4rem] shrink-0 bg-transparent rounded-full border-2 
   border-transparent  bg-gradient-to-r from-cyan-500 via-pink-600 to-cyan-500
        bg-[length:200%_200%]
        animate-gradient
        shadow-[0_0_10px_rgba(168,85,247,0.8)]'>
         
        </div>
         <h2 className='dev_1 w-full h-[2vmin] text-gray-500 font-outfit text-center text-[3vmin]'>Access your notes anytime, anywhere --- computer, laptop, tablet, or mobile.</h2>
         
        </span>
        <div className='dev_2 devices_p relative flex justify-center items-center h-[100%]  w-full gap-2 '>
        <img loading="lazy"   src={comp2} alt="" className=" comp size-[57vmin] mt-7    hover:scale-105 transition-all duration-300 
       drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]
        hover:drop-shadow-[0_0_40px_#9333ea]
        " />
        <img loading="lazy"   src={lap2} alt="" className="lap  w-[60vmin]    hover:scale-105 transition-all duration-300 
        drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]
        hover:drop-shadow-[0_0_40px_#9333ea]" />
        <img loading="lazy"   src={tablet} alt="" className="tablet  size-[50vmin] sm:mr-4    rotate-[32deg] top-[25%] hover:scale-105 transition-all duration-300 
       drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]
        hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]"/>
        <img loading="lazy"   src={phone} alt="" className="phone  w-[20vmin] shrink-0
      drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]
         hover:scale-105 transition-all duration-300 hover:drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]"/>
      </div>
      </div>
       {/* Features section */}
    <div id='features' className='relative feature_back w-[100vw] h-[110vh]   '>
      
         
      <div className='w-full h-[100%] pt-4 pb-2 bg-black/70 backdrop-blur-md gap-[2vmin] flex  flex-col justify-center items-center'>
      <span className='w-full grid place-items-center gap-2'>
      <div className='f_ele_11 opacity-0 w-30 h-5 py-4 transition-all duration-300  px-4 rounded-xl text-[2.5vmin] font-bold 
      border-2 border-black flex text-purple-500 items-center justify-center bg-black hover:border-purple-500'> 
        <h1 className=' text-black'>🔥</h1> <span className='text-gray-500 text-[2vmin] font-light
            font-pacifico  ' >
               My
              </span>
            <span className='text-transparent font-light font-pacifico
              bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 
              bg-clip-text text-[2vmin] '>
                Note
                </span>
                <p className='text-purple-700'>'s Key Features</p> 
                
         </div>
         <h1 className='f_ele_1 text-[8vmin] font-poppins w-full hover:text-transparent
bg-clip-text
 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient  text-center font-bold tracking-widest text-white'>What Makes Us 
           Diffrent</h1>
         <div className='w-[20%] h-1 f_ele_1 bg-transparent rounded-full border-t-2  border-transparent  bg-gradient-to-r from-cyan-500 via-pink-600 to-cyan-500
        bg-[length:200%_200%]
        animate-gradient
        shadow-[0_0_10px_rgba(168,85,247,0.8)]'>
         
        </div>
      </span>
      <div className='f_ele_2 opacity-0 f_grid w-[100%] h-[150%] font-poppins gap-1 grid place-items-center grid-rows-2 grid-cols-3  '>
      {/*feature boxes*/}
      <div className='f_ele_2 opacity-0 transition-all duration-300 hover:scale-110  f_b w-[70%] h-[90%] bg-white backdrop-blur-lg 
      rounded-lg flex flex-col '>
        <div className='w-[100%] h-[35%]    rounded-t-lg shrink-0
         flex align-center items-end '>
          
          <div className='h-full w-[20%] text-lg bg-slate-300 backdrop-blur-lg rounded-tl-lg 
          rounded-br-3xl grid place-items-center items-center'>⚡</div>
           <h1 className='text-[3.5vmin] w-[80%] h-full text-center pt-5 text-black font-bold  '>Real-TIme Sync</h1>
          </div>
           <div className='w-full h-[100%]  grid place-items-center px-4 py-1'>
             
              <p className='text-[2.5vmin] text-black text-left'>Your notes update instantly across all devices.Whether your're on your phone,tablet or 
                laptop stays in perfect sync.</p>
             </div>
      </div>
      <div className='f_ele_2 opacity-0  transition-all duration-300 hover:scale-110  f_b w-[70%] h-[90%] bg-white backdrop-blur-lg 
      rounded-lg flex flex-col '>
        <div className='w-[100%] h-[35%]    rounded-t-lg shrink-0
         flex align-center items-end '>
          
          <div className='h-full w-[20%] text-lg bg-slate-300 backdrop-blur-lg rounded-tl-lg 
          rounded-br-3xl grid place-items-center items-center'>⚡</div>
           <h1 className='text-[3.5vmin] w-[80%] h-full text-center pt-5 text-black font-bold  '>Real-TIme Sync</h1>
          </div>
           <div className='w-full h-[100%]  grid place-items-center px-4 py-1'>
             
              <p className='text-[2.5vmin] text-black text-left'>Your notes update instantly across all devices.Whether your're on your phone,tablet or 
                laptop stays in perfect sync.</p>
             </div>
      </div>
      <div className='f_ele_2 opacity-0 transition-all duration-300 hover:scale-110  f_b w-[70%] h-[90%] bg-white backdrop-blur-lg 
      rounded-lg flex flex-col '>
        <div className='w-[100%] h-[35%]    rounded-t-lg shrink-0
         flex align-center items-end '>
          
          <div className='h-full w-[20%] text-lg bg-slate-300 backdrop-blur-lg rounded-tl-lg 
          rounded-br-3xl grid place-items-center items-center'>⚡</div>
           <h1 className='text-[3.5vmin] w-[80%] h-full text-center pt-5 text-black font-bold  '>Real-TIme Sync</h1>
          </div>
           <div className='w-full h-[100%]  grid place-items-center px-4 py-1'>
             
              <p className='text-[2.5vmin] text-black text-left'>Your notes update instantly across all devices.Whether your're on your phone,tablet or 
                laptop stays in perfect sync.</p>
             </div>
      </div>
     
      <div className='f_ele_2  opacity-0 transition-all duration-300 hover:scale-110  f_b w-[70%] h-[90%] bg-white backdrop-blur-lg 
      rounded-lg flex flex-col '>
        <div className='w-[100%] h-[35%]    rounded-t-lg shrink-0
         flex align-center items-end '>
          
          <div className='h-full w-[20%] text-lg bg-slate-300 backdrop-blur-lg rounded-tl-lg 
          rounded-br-3xl grid place-items-center items-center'>⚡</div>
           <h1 className='text-[3.5vmin] w-[80%] h-full text-center pt-5 text-black font-bold  '>Real-TIme Sync</h1>
          </div>
           <div className='w-full h-[100%]  grid place-items-center px-4 py-1'>
             
              <p className='text-[2.5vmin] text-black text-left'>Your notes update instantly across all devices.Whether your're on your phone,tablet or 
                laptop stays in perfect sync.</p>
             </div>
      </div>
      <div className='f_ele_2 opacity-0 transition-all duration-300 hover:scale-110 f5  f_b w-[70%] h-[90%] bg-white backdrop-blur-lg 
      rounded-lg flex flex-col '>
        <div className='w-[100%] h-[35%]    rounded-t-lg shrink-0
         flex align-center items-end '>
          
          <div className='h-full w-[20%] text-lg bg-slate-300 backdrop-blur-lg rounded-tl-lg 
          rounded-br-3xl grid place-items-center items-center'>⚡</div>
           <h1 className='text-[3.5vmin] w-[80%] h-full text-center pt-5 text-black font-bold  '>Real-TIme Sync</h1>
          </div>
           <div className='w-full h-[100%]  grid place-items-center px-4 py-1'>
             
              <p className='text-[2.5vmin] text-black text-left'>Your notes update instantly across all devices.Whether your're on your phone,tablet or 
                laptop stays in perfect sync.</p>
             </div>
      </div>
      <div className='f_ele_2 opacity-0 transition-all duration-300 hover:scale-110 f6  f_b w-[70%] h-[90%] bg-white backdrop-blur-lg 
      rounded-lg flex flex-col '>
        <div className='w-[100%] h-[35%]    rounded-t-lg shrink-0
         flex align-center items-end '>
          
          <div className='h-full w-[20%] text-lg bg-slate-300 backdrop-blur-lg rounded-tl-lg 
          rounded-br-3xl grid place-items-center items-center'>⚡</div>
           <h1 className='text-[3.5vmin] w-[80%] h-full text-center pt-5 text-black font-bold  '>Real-TIme Sync</h1>
          </div>
           <div className='w-full h-[100%]  grid place-items-center px-4 py-1'>
             
              <p className='text-[2.5vmin] text-black text-left'>Your notes update instantly across all devices.Whether your're on your phone,tablet or 
                laptop stays in perfect sync.</p>
             </div>
      </div>
   
      </div>
     <button id='contact'
        className='text-[2.5vmin] shrink-0  grid place-content-center  opacity-0
        relative px-5 py-3 font-poppins font-semibold overflow-hidden
        bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient
        border-2  border-cyan-400 rounded-lg
        transition-all
        duration-300 hover:scale-105
        shadow-[0_0_25px_rgba(168,85,247,0.6)]
        '
        onClick={()=>navigate('/login')}>Get started</button>
      </div>
    </div>
    {/*Contact us section*/}
    <div  className='contact_sec con_1 overflow-x-hidden w-[100vw] h-[93vh] border-t-2 border-white
    bg-gradient-to-b animate-gradient
     flex
     from-purple-700/50  via-black
      to-purple-700/40  bg-[length:300%_150%]
    '>
      <div className="contact_b  w-[50%] pt-4 h-full flex  flex-col justify-start gap-4  pl-5    ">
      <h1 className='con_a text-[9.5vmin] font-poppins font-semibold
       text-white w-full  text-left '>
       Have a Question? <br></br>
      <span className='con_a text-[9vmin] 
       text-transparent bg-gradient-to-l
        from-purple-500
               via-pink-500
               to-cyan-500 
              bg-clip-text bg-[length:50%_100%]'>Let's Talk</span>
       </h1>
<p className='con_a text-[3.5vmin] text-left text-gray-400 font-sans w-[75%]'>
  Have a question or suggesstion about MyNote? Send me a message and I'll get back to you soon.📩
</p>

<a className=' text-[4vmin] underline text-gray-400 underline-offset-8 
transition-all duration-400 decoration-1 hover:text-white hover:decoration-cyan-500  hover:drop-shadow-[1rem_0_1rem_rgba(168,85,247,0.6)]' href="mailto:ankitmuna123@gmail.com">ankitmuna123@gmail.com</a>
      <div className='con_a w-full  flex gap-2'>
      <a target="_blank" href="https://www.facebook.com/share/182BgqnYnp/" className=' border-2 p-2
       hover:text-blue-700 bg-transparent font-semibold font-poppins border-gray-500 flex text-[2.5vmin]
       justify-center items-center tracking-wide
      animate-gradient hover:scale-110
      transition-all duration-500 rounded-sm hover:border-cyan-400
      hover:
       hover:bg-gradient-to-r from-purple-700 via-pink-500 to-cyan-500
        bg-[length:200%_200%]
    hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
       '>
      <img loading="lazy"   src={facebook} className='size-[5vmin]'></img  >
      Facebook</a>
       <a target="_blank" href="https://github.com/Ankitkumardev123" className='hover:text-black tracking-widest border-gray-500 border-2 p-2 gap-2
        bg-transparent font-semibold font-poppins  flex text-[2.5vmin]
       justify-center items-center
      animate-gradient hover:scale-110
      transition-all duration-500 rounded-sm hover:border-cyan-400
  
       hover:bg-gradient-to-r from-purple-700 via-pink-500 to-cyan-500
        bg-[length:200%_200%]
    hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
       '>
      <img loading="lazy"    src={github} className='size-[4vmin] bg-white rounded-[100%]'></img  >
      Github</a>
       <a target="_blank" href="https://www.linkedin.com/in/ankit-kumar-dash-93b0a0321?utm_source=share_via&utm_content=profile&utm_medium=member_android" className='border-2 p-2 border-gray-500 hover:text-blue-800 gap-2
        bg-transparent font-semibold font-poppins flex text-[2.5vmin]
       justify-center items-center 
      animate-gradient hover:scale-110
      transition-all duration-500 rounded-sm hover:border-cyan-400
      hover:
       hover:bg-gradient-to-r from-purple-700 via-pink-500 to-cyan-500
        bg-[length:200%_200%]
    hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
       '>
      <img loading="lazy"    src={linkedin} className='size-[5vmin]  bg-white rounded-[100%]'></img >
      Linkedin</a>
      </div>
       </div>
       
        <div className="con_2 contact_b w-[60%]  pt-4 background-blur-lg bg-white/10 h-full px-4 gap-7  flex flex-col justify-start  items-center   ">
          <span className='w-full flex-col gap-2 h-[15%]'>
            <label htmlFor="#inpu_name" className='con_b pl-2 text-gray-500' >Name</label>
          <input type="text" className='w-[100%] con_b rounded-md text-[3.2vmin] outline-none pl-4 hover:border-purple-700
           focus:border-purple-700 h-[90%] p-2
           bg-transparent border-2 border-gray-500' name="" id="inpu_name" placeholder="Write your name here.." />
            </span>
             <span className='w-full flex-col h-[15%]'>
            <label htmlFor="#inpu_name" className='pl-2 con_b text-gray-500' >Email</label>
           
          <input type='email' className='w-[100%] con_b text-[3.2vmin] rounded-md outline-none pl-4 hover:border-purple-700
           focus:border-purple-700 h-[90%] p-2
           bg-transparent border-2 border-gray-500' name="" id="inpu_name" placeholder="Write your email address here..." />
            </span>
             <span className='w-full h-[32%] flex-col gap-2'>
            <label htmlFor="#inpu_name" className='pl-2 con_b text-gray-500' >Message</label>
           
          <textarea className='w-[100%] con_b text-[3vmin] rounded-md outline-none hover:border-purple-700 focus:border-purple-700 h-[90%] p-2 pl-4
           bg-transparent border-2 border-gray-500 scrollbar-hide' name="" id="inpu_name" placeholder="Write your message here..." />

            </span>
       
         
    <button 
        className='text-[3vmin] mt-1  opacity-0
         px-3 py-4 font-poppins font-semibold 
        bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient con_bu
        border-2  border-cyan-400 rounded-lg
        transition-all
        duration-300 hover:scale-110 
        hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]
        '
        >Send message 📩</button>
     
        </div>
       
    </div>
    {/*footer section*/}
    <footer className='footer w-[100vw] h-[80vh] border-t-2 flex-col bg-gradient-to-b animate-gradient
     flex
     from-purple-700/50  via-black
      to-black  bg-[length:300%_150%] '>
      <div className='foot_cont w-full h-[90%] flex'>
      <div className='foot_b foot_1 w-[80%] h-full pt-4 flex flex-col gap-2  justify-center items-center'>
        <h1 className='font-bold font-poppins text-[8vmin]'>Haven't started yet?</h1>
        <p className=' text-[4vmin] font-sans font-light  text-left text-gray-500 '>"Join MyNote and keep your notes organized."</p>
        <span className='w-full flex gap-4 justify-center'>
         <button 
        className='text-[3vmin] 
        px-6 py-2 font-poppins font-semibold 
        bg-black  border-gray-500
        hover:bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient
        border-2  hover:border-cyan-400 rounded-md
        transition-all
        duration-400 hover:scale-110
        hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
        '
        onClick={()=>navigate('/login')}>
          Login
        </button>
         <button 
        className='text-[3vmin] 
        px-6 py-2 font-poppins font-semibold 
        bg-black  border-gray-500
        hover:bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient
        border-2  hover:border-cyan-400 rounded-md
        transition-all
        duration-400 hover:scale-110
        hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
        '
        onClick={()=>navigate('/signup')}>
          Signup
        </button>
        </span>
      </div>
      <div className='foot_b foot_2 w-[100%] pt-4 h-full gap-4 flex justify-center items-center'>
        <span className='w-[40%] h-[70%] flex flex-col text-center gap-2'>
          <h2 className='text-[4.5vmin] underline underline-offset-8 decoration-cyan-500 font-semibold'>Site Map</h2>
          <a href="#home" className='text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Home</a>
          <a href="#device" className='text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Device</a>
          <a href="#features" className='text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Features</a>
          <a href="#contact" className='text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Contact</a>
        </span>
        <span className='w-[40%]  h-[70%] flex flex-col text-center gap-2'>
          <h2 className='text-[4.5vmin] underline underline-offset-8 decoration-cyan-500 font-semibold'>Social Links</h2>
          <a target='_blank' rel="noopener noreferrer" href="https://www.facebook.com/share/182BgqnYnp/" className='text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Facebook</a>
          <a target='_blank' rel="noopener noreferrer" href="https://github.com/Ankitkumardev123" className='text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Github</a>
    <a target='_blank' rel="noopener noreferrer" href="https://www.linkedin.com/in/ankit-kumar-dash-93b0a0321?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
    className=' text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Linkedin</a>
          <a target='_blank' rel="noopener noreferrer"
          href="https://www.instagram.com/ankit_dash001?igsh=eWp0Y3p1dXhwZGdq" className='text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Instagram</a>
        </span>
      </div>
      </div>
       <div className='w-[100%] h-[2%]  bg-transparent  border-2 
   border-transparent  bg-gradient-to-r from-cyan-500 via-pink-600 to-cyan-500
        bg-[length:200%_200%]
        animate-gradient
        shadow-[0_0_10px_rgba(168,85,247,0.8)]'>
         
        </div>
      <div className='copyright w-full h-[12%] py-2 tracking-wide  text-center grid place-item-center text-gray-500 text-2xl' >
        @ 2026 MyNote -- Built by Ankit Kumar Dash</div>
    </footer>
    </div>
    
   
   
    </>
  )
}

export default Home