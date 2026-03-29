import React, { use, useEffect, useRef,useState,} from 'react'
import gsap from 'gsap'
import scrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(scrollTrigger)
import { useSelector,useDispatch } from 'react-redux'
import Note from '../componets/Note'
import Folder from '../componets/Folder'
import { menubartoggle,editbartoggle,addfolder,updatenote,setselectednote, setselectfolder,setuserfolder} from '../noteslice/noteslices'
import CodeMirror from "@uiw/react-codemirror"
import {oneDark} from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@uiw/react-codemirror'
import { Link, Navigate, useNavigate } from 'react-router-dom'


import github from '../images/app_icons/github.png'
import facebook from "../images/facebook.png"
import linkedin from '../images/linkedin.png'
import message from '../images/pngs/message.png'
import hand from '../images/pngs/hand.png'

import heart from '../images/pngs/heart.png'
import heart1 from '../images/pngs/heart1.png'

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
import post from "../images/post.png"
import notess from "../images/notess.png"
import * as docx from 'docx'
import { Format } from '@cloudinary/url-gen/qualifiers'
import { saveAs } from 'file-saver'
import { auto } from '@cloudinary/url-gen/qualifiers/quality'
import { useGSAP } from '@gsap/react'
import { useEffectEvent } from 'react'
function Home() {
  const select=useRef(null)
  const textarea=useRef(null)
  const navigate=useNavigate()
    let folders=useSelector(state=>state.noted.Folders)
   const[dowload_on,setdownload]=useState(false)
  const [create, setcreate] = useState(false)
  const [msg, setmsg] = useState('')
  const [search, setsearch] = useState(false)
  const [Search_msg, setsearch_msg] = useState('')
  const [search_note, setsearch_note] = useState(false)
  const [Search_notemsg, setsearch_notemsg] = useState('')
  const [format,setformat]=useState(null)
  const editbar2=useRef(null)
  const ani=useRef(null)
  const ani1=useRef(null)
  const container=useRef(null)
  
  const [index_note,setindex_note]=useState(null)
 
  const slide=useSelector(state=>state.noted.editbar)
  const selected_note=useSelector(state=>state.noted.selectednote)
  const selected_folderid=useSelector(state=>state.noted.selectedfolderid)
  const islogined=useSelector(state=>state.noted.logined)
  const selectedfolder=folders?.find(f=>f.id==selected_folderid);
  const[notes,setnotes]=useState()
  let welcome=0;
  const [note_title,setnote_title]=useState('')
  const dispatch=useDispatch()
  
  const [notecontent,setnotecontent]=useState(selected_note?.notecontent)
  const [notename,setnotename]=useState(selected_note?.notename || '' )

  const [length, setlength] = useState(selected_note?.notecontent.length || 0)
 useEffect(()=>{
  if(folders?.length)
    dispatch(setuserfolder(folders))
   
  },[create])
   useEffect(()=>{
    if(slide==false)
  setcreate(false)
  
  },[slide])
  useEffect(()=>{
    
      scrollTrigger.refresh()
   
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
  useGSAP(()=>{
   const t2=gsap.timeline({
   scrollTrigger:{
    trigger:'.main_d',
    
    start:'top center',
    end:'bottom bottom',
    
   }
   });
   t2.from('.dev_1',{
     y:-100,
      opacity:0,
      duration:1,
      delay:0.5,
      ease:'back.out',
      stagger:0.3
    
   })
   t2.from('.dev_2 ',{
    y:-100,
    opacity:0,
    delay:0.1,
    duration:0.5,
   
    ease:'linear'
   })
   scrollTrigger.refresh()
  })
  //contact section animation
    useGSAP(()=>{
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
    t4.fromTo('.con_bu ',{
    x:10000,
    opacity:0,
  
   },{
    x:0,
    opacity:1,
    delay:0.1,
    duration:0.2,
    clearProps:'transform',
    ease:'linear'
   })
   scrollTrigger.refresh();
  })
  //feature section animation
  useGSAP(()=>{
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
  
    t5.fromTo('#contact ',{
    x:10000,
    opacity:0,
  
   },{
    x:0,
    opacity:1,
    delay:0.1,
    duration:0.3,
    clearProps:'transform',
    ease:'linear'
   })
   scrollTrigger.refresh();
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

 

 useGSAP(()=>{
   if(slide==true)

      gsap.to(editbar2.current,{
          duration:1,
          x:0,
          ease:'power4.out'
        })
      else
        gsap.to(editbar2.current,{
         duration:1,
          x:'-100%',
        ease:'power4.in'
        })
  },[slide])
  
  useEffect(()=>{ 
    setdownload(false)
     select.current.value="TXT"
    setnote_title(selected_note?.notetitle || '')
    setlength(selected_note?.['notecontent'].length || 0)
    setnotename(selected_note?.note_name || '')
    setnotecontent(selected_note?.notecontent ||'')
  },[selected_note])
   const handlechange=(e)=>{
    const new_title=e.target.value;
    setnote_title(new_title)
    dispatch(updatenote({
      id:selected_note?.id,
      folid:selectedfolder?.id,
      prop:{
        notetitle:new_title
      }
    }))
  }
    const handlenote=(value)=>{
      
     setlength(value.length)
    
       dispatch(updatenote({
      id:selected_note?.id,
      folid:selectedfolder?.id,
      prop:{
       notecontent:value
      }
      
    }))
   
    }
    const handledownload=async(name,title,content)=>{
     
      if(!selected_note) return
      if(format=='TXT'){
      const filedata=`Title:-${title || 'Untitled'}\n\nNote Content:-\n${content || "No content wriiten in note!!"}`
      const blob=new Blob([filedata],{
        type:"text/plain"
      });
      const url=URL.createObjectURL(blob)
      const a=document.createElement('a')
      a.href=url
      a.download=`${name}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    else if(format == "DOCX"){
      const content= notecontent.split("\n").map(line=>{
        return new docx.Paragraph({
          text: String(line),size:32,bold:true
        })
      })
      const docx_doc =new docx.Document({
        sections:[{
          properties:{},
          children:[
            new docx.Paragraph({
              children:[new docx.TextRun ({
                text:`Note Title:-`,bold:true,size:32,underline:true
              })]
              ,
              
            }),
           new docx.Paragraph({
              children:[new docx.TextRun ({
                text:String(title || "Untitled"),bold:true,size:30,
              })]
              ,
              
            }),
              new docx.Paragraph({
              children:[new docx.TextRun ({
                text:`Note Content:-`,size:30,underline:true,bold:true
              })]
              
            }),
            ...content,
          ]
        }
        ]
      })
      docx.Packer.toBlob(docx_doc).then((blob)=>{
        saveAs(blob,`${name}.docx`);
      })
    }
    }
  return (
    <>
    {/* sidebar_area */}
    <div ref={editbar2} className={`edit  fixed w-[50vw]  h-[90vh] b-0 z-50 bg-black top-[9.5%] bottom-0 border-4
     border-orange-500 rounded-b-sm border-l-0 flex translate-x-[-100%]
    flex-row ${islogined?' ':'hidden'} `}>
    <div className='w-[50%] h-[100%] flex justify-center flex-col items-center bg-black border-r-2  border-orange-500 '>
    <span className='fold w-[100%] h-[8%] flex items-center  justify-start pl-1  '>
    <img src={folder} className='w-[7vmin] h-[7vmin]  mb-1' alt="" />
    <h1 className='flex text-center text-[5vmin] text-orange-500  w-[50%] font-semibold font-mono justify-left items-center ' >Folders</h1>

    <span className=' flex b w-[50%] justify-center items-center gap-[9%] h-[100%]'>
      
      <img src={close} className={`w-[4vmin] h-[4vmin]  rotate-45 duration-200 ${create?"rotate-90":"rotate-45"}`} alt="" onClick={()=>{
        setsearch(false)
        setcreate(prev=>!prev)
      if(create==true)
        
        setmsg('')
      }} />
      <img src={`${!search?searchicon:close}`} className={`w-[4vmin] h-[4vmin]  duration-200 `} alt="" onClick={()=>{
        setcreate(false)
        setsearch(prev=>!prev)
      if(search==true)
        setsearch_msg('')
      }} />
    </span>
    </span>
    <span className={`flex w-[100%] h-[4%] pt-2 justify-center  items-center duration-400 mb-2 pl-2 ${create?"":"hidden"}  `}>
     <img src={mini} value={msg} className='w-[5vmin] h-[5vmin]' alt="" />
    <input type="text" value={msg} className={`w-[50%] text-orange-500 outline-none border-0 border-b-4 bg-transparent ${create?"":"hidden"} text-[3vmin] `} placeholder='Give a name..'onChange={e=>setmsg(e.target.value)} onKeyDown={e=>{
      if(e.key==="Enter"){
        
        dispatch(addfolder({name:msg}))
        setcreate(false)
        

         setmsg('')
      }
     
     }} />
    <button className='text-[3vmin] p-0.5 px-1 bg-orange-600 ml-1 border-2 rounded-lg' onClick={
      ()=>{
        if(msg!=''){
        dispatch(addfolder({name:msg}))
        setcreate(false)
      
         setmsg('')
        }
        else{
          alert("Folder name is empty...")
        }
      }
    } >Add</button>
     
    </span>
     <span className={`flex w-[100%] justify-start ml-2  items-center duration-400 ${search?"":"hidden"}  pl-2`}>
       <img src={searchicon} className={`w-[5vmin] h-[5vmin] mr-1`}/>
    <input type="text" value={Search_msg} className={`w-[70%] text-orange-500 outline-none border-0 border-b-4 bg-transparent text-[3vmin] `} placeholder='Enter folder name... 'onChange={e=>setsearch_msg(e.target.value)} 
     onKeyDown={e=>{
      if(e.key=="Enter")
      {
        setsearch(false)
        setsearch_msg('')
      }
     }} />
    </span>
  
    <div className='folders h-[100%] w-[100%] pl-[0.5vmin]  flex-col gap-[1.5%] overflow-y-auto overflow-x-hidden scrollbar-hide flex
     justify-start items-center' ref={ani1}>
    
     {
      
      folders?.map((folder,index)=>
        <Folder key={folder.id} fold={folder} ind={index} fol_ser={`fol${index}`}  set1={setcreate} searchmsg={Search_msg}  />
      )
     }
     
    </div>

    </div>
     <div className={`relative w-[50%] duration-400 h-[100%] flex flex-col items-center bg-black ${selectedfolder??"hidden"}}`}>
     <span className='nold w-[100%] h-[5%] flex items-center pt-2  justify-start  pl-0.5 mb-2 mt-0.5'>
      <img src={note} className='w-[6vmin] h-[6vmin] ' alt="" />
     <h1 className='flex text-center text-[5vmin] text-orange-500   font-semibold font-mono justify-left items-center ' >Notes</h1>
      <img src={`${!search_note?searchicon:close}`} className={`w-[4vmin]   duration-400 ml-10 ${selectedfolder?? 'hidden'}`} alt="" onClick={()=>{setsearch_note(prev=>!prev)
      if(search==true)
        setsearch_notemsg('')
      }} />
     </span>
     <span className={`flex w-[100%] bg-red justify-start ml-5 pb-2 items-center duration-400 ${search_note?"":"hidden"}  `}>
      <img src={searchicon} className={`w-[4vmin] h-[4vmin] `}/>
    <input type="text" value={Search_notemsg} className={`w-[60%] text-orange-500 outline-none border-0 border-b-4 bg-transparent text-[3vmin] `} placeholder='Enter note name...'onChange={e=>setsearch_notemsg(e.target.value)} 
     onKeyDown={e=>{
      if(e.key=="Enter")
      {
        setsearch_note(false)
      }
     }} />
    </span>
    <span className={`infobox ml-4 w-[100%] flex  items-center h-[4%] justify-center gap-[2%] `} ref={ani}>
      <img src={mini} className={`w-[4vmin] h-[4vmin] grid place-items-center  ${selectedfolder??"hidden"}`}alt=""/>
      <h2 className={`text-white text-[2vmin] h-[100%] w-[30%]  text-left grid place-items-center $ ${selectedfolder??"hidden"}`}>{
      selectedfolder?.folname }</h2>
      <h2 className={`text-orange font-semibold  text-[2vmin]  w-[100%] h-[100%] grid place-items-center   ${selectedfolder??"hidden"}`}>Total Notes-{selectedfolder?.notes?.length}</h2>
    </span>

      <div className={`h-[100%]  w-[100%]   flex flex-col gap-[1%]  overflow-x-hidden text-center justify-start items-center 
         ${selectedfolder??""}`} ref={ani}>
        <h1 className={`text-[5vmin] text-orange-500 font-semibold  w-[100%] text-center  duration-200 ${selectedfolder?.folname?"hidden":''}`}>Choose a folder...</h1>
         <h1 className={`text-[5vmin] text-orange-500 font-semibold   duration-200 ${selectedfolder?.notes?.length==0?'':'hidden'}`}>Create a Note...</h1>
      <div className={`notes  h-[100%]    w-[100%]   flex flex-col  items-start gap-[1.5%] overflow-y-auto scrollbar-hide overflow-x-hidden
         text-center`}>
     {
      selectedfolder?.notes?.map((not,index1)=>
        <Note key={not.id} not={not} items={{folders}} noten={setnotename} index1={index1} set={setindex_note} searchmsg_note={Search_notemsg} onClick={()=>dispatch(setselectednote(not))}/>
      )
     }
     </div>
    </div>
    <button ref={editbar2} className={`absolute top-[5%] left-[100%] w-[7vmin] z-[1] y-[7vmin] bg-black outline-none rouned-none rounded-r-[20%]
      border-4 border-orange-500 border-l-0`} onClick={()=>{  
     dispatch(editbartoggle())
     
      dispatch(menubartoggle(false))
    }}>
      <img src={great} alt="" className={` duration-200 ${slide?"rotate-0":"rotate-180"}`} />
      
      </button>
     </div>
    </div>
    {/* homepage */}
    <div id='home' className={`  bg-black  h-[100%]  w-[100vw] flex flex-col justify-start   ${islogined?"hidden":''}`}>
       <div className='w-[100%] h-[9.7vh]  '>
      {/* dummy-navbar */}
    </div>
     {/* Hero section */}
      <div className='w-[100%] h-[100%]  '>
              <div className='f_back w-[100%] h-[90vh]  '>
<div className='main_f w-[100%] h-[100%]  bg-black/60  backdrop-blur-sm flex '>
    <div className='f1 gap-2 relative w-[100%] h-[100%]  flex flex-col justify-center  items-center '>
      
      <div className='ele_1 text_h  flex  tracking-wider text-[9vmin] font-pacifico '>
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
        <div className='ele_2 p w-[62%] text-center font-poppins text-sm sm:text-md h-auto grid place-items-center'>
          <p className=' transition-all duration-300 hover:text-white text-gray-400 leading-relaxed'>Lorem ipsum dolor, sit amet consectetur adipisicing.
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
          <img src={heart} alt="" className='size-[4vmin]'/>
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
      <img src={hand} alt="" className='   size-[30rem] 
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
       
        <h2 className='flex px-1 gap-1 text-[3vmin]'><img src={post} className='size-5' alt="" />Create Notes</h2>
        <h2 className='flex px-1 gap-1 text-[3vmin]'><img src={pencils} className='size-5' alt="" />Edit Notes</h2>
       <h2 className='flex px-1 gap-1 text-[3vmin]'><span className='text-green-500'> ✔</span> Dowload Notes</h2>
        <h2 className='flex px-1 gap-1 text-[3vmin] '><img src={folder} className='size-5 ' alt="" />Organize Notes</h2>
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
        text-[2.5vmin] absolute w-[0] flex flex-col gap-1
        text-white rounded-md border-4 border-cyan-400  h-[0] 
       bg-black duration-300 hover:scale-105'>
        <div className='w-full h-5 gap-1 px-2 bg-cyan-500  flex items-center text-center text-[5vmin] text-black'>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
        <div className='size-[0.5rem] bg-white rounded-full'></div>
       
        </div>
       
        <h2 className='flex pl-1  '>🔐Works On All Devices</h2>
        <h2 className='flex pl-1  '>⚡SecureAuthentication</h2>
       <h2 className='flex pl-1'>🔥Smooth Experience</h2>
       
      </div>
      
    </div>
</div>
              </div>
      </div>
      {/* banner_line */}
      <div id='device' className='w-[100vw] h-[10vh] border-2 border-gray-500 bg-transparent  bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient  overflow-hidden flex  '>
      <div className='box_bb w-[100%] h-[100%] bg-transparent text-[2.5vmin] bt  overflow-visible flex flex-nowrap gap-0 '>
      <div className='box_b w-[30vmin]   h-[100%] bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0  font-popins'>
      <img src={post} className='size-4' alt="" />
      Create Notes</div>
      <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-transparent flex items-center justify-center  shrink-0 gap-1 font-popins'>
<img src={pencils} className='size-3' alt="" />Edit Notes
      </div>
       <div className='box_b w-[31vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 font-popins'>
<span className='text-green-500'>✔</span>DowloadNotes
       </div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-1 font-popins'>
        <img src={folder} className='size-4 ' alt="" />OrganizeNotes
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
        <img src={post} className='size-4' alt="" />
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
      <img src={post} className='size-4' alt="" />
      Create Notes</div>
      <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-transparent flex items-center justify-center  shrink-0 gap-1 font-popins'>
<img src={pencils} className='size-3' alt="" />Edit Notes
      </div>
       <div className='box_b w-[31vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 font-popins'>
<span className='text-green-500'>✔</span>DowloadNotes
       </div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-1 font-popins'>
        <img src={folder} className='size-4 ' alt="" />OrganizeNotes
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
        <img src={post} className='size-4' alt="" />
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
      <img src={post} className='size-4' alt="" />
      Create Notes</div>
      <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-transparent flex items-center justify-center shrink-0 gap-1 font-popins'>
<img src={pencils} className='size-4' alt="" />Edit Notes
      </div>
       <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 font-popins'>
<span className='text-green-500'>✔</span>DowloadNotes
       </div>
        <div className='box_b w-[30vmin]  h-full bg-black/60 backdrop-blur-lg  border-x-[0.1rem] border-gray-500 flex items-center justify-center shrink-0 gap-1 font-popins'>
        <img src={folder} className='size-4 ' alt="" />OrganizeNotes
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
        <img src={post} className='size-4' alt="" />
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
      <div ref={container}  className='main_d w-[100vw] h-[90vh] gap-2 bg-transparent animate-gradient bg-gradient-to-t backdrop-blur-3xl   from-black
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
        <img src={comp2} alt="" className=" comp size-[57vmin] mt-7    hover:scale-105 transition-all duration-300 
       drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]
        hover:drop-shadow-[0_0_40px_#9333ea]
        " />
        <img src={lap2} alt="" className="lap  w-[60vmin]    hover:scale-105 transition-all duration-300 
        drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]
        hover:drop-shadow-[0_0_40px_#9333ea]" />
        <img src={tablet} alt="" className="tablet  size-[50vmin] sm:mr-4    rotate-[32deg] top-[25%] hover:scale-105 transition-all duration-300 
       drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]
        hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]"/>
        <img src={phone} alt="" className="phone  w-[20vmin] shrink-0
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
        className='text-[2.5vmin] shrink-0  grid place-content-center  
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
      <h2 className='con_a text-[9vmin] 
       text-transparent bg-gradient-to-l
        from-purple-500
               via-pink-500
               to-cyan-500 
              bg-clip-text bg-[length:50%_100%]'>Let's Talk</h2>
       </h1>
<p className='con_a text-[3.2vmin] text-left text-gray-400 font-sans w-[75%]'>
  Have a question or suggesstion about MyNote? Send me a message and I'll get back to you soon.📩
</p>

<a className=' text-[4vmin] underline text-gray-400 underline-offset-8 
transition-all duration-400 decoration-1 hover:text-white hover:decoration-cyan-500  hover:drop-shadow-[1rem_0_1rem_rgba(168,85,247,0.6)]' href="mailto:ankitmuna123@gmail.com">ankitmuna123@gmail.com</a>
      <div className='con_a w-full mt-2 flex gap-2'>
      <a href="http://" className=' border-2 p-2
       hover:text-blue-700 bg-transparent font-semibold font-poppins border-gray-500 flex text-[2.5vmin]
       justify-center items-center tracking-wide
      animate-gradient hover:scale-110
      transition-all duration-500 rounded-sm hover:border-cyan-400
      hover:
       hover:bg-gradient-to-r from-purple-700 via-pink-500 to-cyan-500
        bg-[length:200%_200%]
    hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
       '>
      <img src={facebook} className='size-[5vmin]'></img>
      Facebook</a>
       <a href="http://" className='hover:text-black tracking-widest border-gray-500 border-2 p-2 gap-2
        bg-transparent font-semibold font-poppins  flex text-[2.5vmin]
       justify-center items-center
      animate-gradient hover:scale-110
      transition-all duration-500 rounded-sm hover:border-cyan-400
  
       hover:bg-gradient-to-r from-purple-700 via-pink-500 to-cyan-500
        bg-[length:200%_200%]
    hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
       '>
      <img src={github} className='size-[4vmin] bg-white rounded-[100%]'></img>
      Github</a>
       <a href="http://" className='border-2 p-2 border-gray-500 hover:text-blue-800 gap-2
        bg-transparent font-semibold font-poppins flex text-[2.5vmin]
       justify-center items-center 
      animate-gradient hover:scale-110
      transition-all duration-500 rounded-sm hover:border-cyan-400
      hover:
       hover:bg-gradient-to-r from-purple-700 via-pink-500 to-cyan-500
        bg-[length:200%_200%]
    hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
       '>
      <img src={linkedin} className='size-[5vmin]  bg-white rounded-[100%]'></img>
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
        className='text-[2.8vmin] 
         px-4 py-3 font-poppins font-semibold 
        bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:200%_200%]
        animate-gradient con_bu
        border-2  border-cyan-400 rounded-lg
        transition-all
        duration-300 hover:scale-110 con_b
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
          <a href="#home" className='text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Facebook</a>
          <a href="#device" className='text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Github</a>
    <a href="#features" className=' text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Linkedin</a>
          <a href="#contact" className='text-[3.5vmin] text-gray-500 hover:underline decoration-purple-500 hover:text-white'>Instagram</a>
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
    
   
    {/* editing area */}
     <div className={`absolute  top-[7%] z-[1] h-[100%]   w-[100vw] flex  flex-col justify-start items-center 
      ${islogined?"":'hidden'}`}> 
      <span className={` h-[80vh] w-[100%] px-4 flex justify-center items-center ${selected_note?"hidden":""}`}>
        <img src={note} alt=""  width={'60vmin'} height={'80vmin'} />
      <h1 className='text-[7vmin] font-semibold duration-200 text-center pr-1'>No note selected. Start by picking or creating one!</h1>
      </span>
        
  <div className={`absolute  z-[30] bg-gray-500 bg-opacity-70 grid place-items-center   w-[100vw] h-[100vh] ${dowload_on?"":'hidden'}`}>
    <div className='relative w-[15rem] rounded-lg h-64 bg-black border-4 flex  flex-col items-center justify-center gap-2'>
      
       <img src={close} alt="" className='absolute w-7  top-3 right-3 ' onClick={()=>{setdownload(false)
        select.current.value="TXT"
       }} />
        
       <label htmlFor="select" className='  text-white font-bold text-lg w-[90%] text-center'>Select a format</label>
      <select onChange={(e)=>setformat(e.target.value)} ref={select}  name="" id="s" className='w-[80%] h-[20%] text-md font-semibold rounded-md border-[0.1rem] border-gray-500 bg-gray-900'>
        
        <option value="DOCX" >DOCX</option>
      <option value="TXT" selected>TXT</option>
      </select>
      <button className='w-[80%] font-semibold bg-orange-600 py-2 text-white rounded-md brightness-150 text-md' onClick={()=>{
        handledownload(notename,note_title,notecontent)
      }}>Download</button>
      <h1 className='text-white text-md font-semibold'>Selcted format : {format}</h1>
      <h1 className='text-white text-md font-semibold'>File : {notename}.{format?.toLocaleLowerCase()}</h1>
      
    </div>
        
  </div>
      <div className={`infopanel h-[20%] w-[100%] z-[20] flex flex-col justify-center  items-center pl-[6.5%] ${selected_note?'':"hidden"}
       ${selectedfolder?.notes.length==0?'hidden':""} `}>
         <span className='flex w-full h-[20%] mt-2   items-center justify-start  font-bold text-[3.5vmin]'>
            <img src={mini} alt="" className='w-[3.7vmin]' />
          <h5 className='mx-1 '>{selectedfolder?.folname}</h5>
          <h5 className='text-orange-600 mx-1'>\</h5>
          <img src={post} alt=""  className='w-[3.7vmin]'  />
          <h5 className=''> {selected_note?.note_name}</h5>
          </span>
        <span className='h-[40%] w-[100%]  flex justify-start items-center '>
        <input type="text" value={note_title} className='outline-none border-0 text-[6.2vmin] mt-1 
         bg-transparent h-[100%] text-left  text-orange-500 w-[70%] ' 
        onChange={handlechange}placeholder='Give a title..'/>
        <button onClick={()=>{setdownload(true)
          setformat('TXT')
        }} className='text-[4vmin] text-center border-orange-500 px-2 py-2  border-2 rounded-lg text-orange-500 font-semibold '>
          Dowload
        </button>
    </span>
        <span className='flex w-[100%] h-[10%] mt-1 justify-start items-center gap-5 flex-row   text-[3vmin] '>
          <h5 className=' w-50 font-bold'>Created - {selected_note?.time}</h5>
         
          <h5 className=' w-50 text-center font-bold'>Total characters:{length}</h5>
        </span>

      </div>
      
      <div className={`w-[100%] h-[80%]  border-t-4 border-t-orange-600 border-b-4 border-b-orange-600 ${selected_note?'':"hidden"}`}>
       <textarea ref={textarea} placeholder='Write note content hear.....' value={notecontent || ''} onChange={(e)=>{
        
        setnotecontent(e.target.value)
        handlenote(e.target.value)
      
      
      }
        
        } className={`shadow-lg text-[3vmin] w-[100vw] h-[100%]  bg-gray-900 overflow-y-auto p-5  outline-none  
         ${!selected_note?'hidden':""} scrollbar-hide bottom-0` }>
     
      </textarea>
        </div>
    
     </div>
    </>
  )
}

export default Home