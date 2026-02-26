import React, { use, useEffect, useRef,useState,} from 'react'
import gsap from 'gsap'
import { useSelector,useDispatch } from 'react-redux'
import Note from '../componets/Note'
import Folder from '../componets/Folder'
import { menubartoggle,editbartoggle,addfolder,updatenote,setselectednote, setselectfolder,setuserfolder} from '../noteslice/noteslices'
import CodeMirror from "@uiw/react-codemirror"
import {oneDark} from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@uiw/react-codemirror'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import close from "../images/close.png"
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
   console.log(folders)
  },[slide])



  useGSAP(()=>{
    let t1=gsap.timeline()
    
    t1.to('.slider',{
      x:0,
      duration:2,
      delay:0.8,
      ease:"elastic.out",
      
    })

    t1.to('.slider',{
       x:0,
       y:3,
      duration:2,
      delay:0.1,
      ease:"bounce.out",
      fontSize:"10vmin"
    })
    t1.to(".slider1",{
      fontSize:"8vmin"
     
    })
    t1.from('.blink',{
      delay:0.5,
      yPercent:100,
      opacity:0,
      ease:"circ",
      duration:2,
     
    })
    t1.play();
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
    <div ref={editbar2} className={`edit  fixed w-[50vw]  h-[90vh] b-0 z-50 bg-black top-[9.5%] bottom-0 border-4
     border-orange-500 rounded-b-sm border-l-0 flex translate-x-[-100%]
    flex-row ${islogined?'':'hidden'} `}>
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
    <div className={`h absolute top-[7%] z-[1]   h-[110vh] gap-1 w-[100vw] flex   justify-start items-center  flex-col ${islogined?"hidden":''}`}>
      <div className=' w-[100%] h-[50%] flex flex-col items-center justify-start gap-2  py-1'>
       <h1 className='slider text-white text-[15vmin] pt-1 w-[100%] text-center mt-2 font-semibold translate-x-[-100%]
       translate-y-[90%]'>Welcome to 
        <span className=' text-white font-serif '> My</span>
            <span className='slider1 text-orange-500 text-[15vmin]  font-mono'>Note</span></h1>
        <p className='blink  info1 text-white text-[5vmin] w-[50%] text-center font-serif  '>
          Your personal space to save ,edit and organize your thoughts securely and safely...</p>
        <button
       className='blink  text-[5vmin] border-[1.2vmin]      border-white p-2 text-white bg-orange-500 rounded-xl hover:bg-orange-700'
       onClick={()=>{
        
        navigate("/login")}}
       >Get Started
        </button>
        </div>
        <div className='infobar blink  z-[-1]  w-[100%] h-[50%]  gap-4 flex items-start justify-center   pt-5' >
            <div className='blink a w-[100%] gap-[1rem] text-center  h-[20%] flex items-center justify-start flex-col '>
               <span className='w-[100%] h-[10%]  text-[6.5vmin] text-white  flex items-center justify-center flex-row'>
                <span className='flex justify-center items-center h-[20%] font-bold'><img src={note} alt="" className='w-[7vmin]'/>New Notes</span></span>
                <p className='  p text-white text-[3.5vmin]  w-[90%] text-center font-mono'>
                  Write down anything instantly,with diffrent styling.By organizing notes efficiently...</p>
            </div>
            <div className='blink a w-[100%] text-center gap-[1rem]  h-[20%] flex items-center justify-start flex-col'>
               <span className='a w-[100%] h-[10%] gap-1 text-[6.5vmin] text-white font-bold  flex items-center justify-center flex-row'>
                <img src={folder} alt="" className='w-[7.2vmin] '/><span className=''>Sort Easily</span></span>
                <p className='blink p text-white text-[3.5vmin]  w-[90%] text-center font-mono'>Sort your Notes with tags and folders,search instantly and keep everything neat and accessible...</p>
            </div>
             <div className='blink a  w-[100%] text-center gap-[1rem] h-[20%] flex items-center justify-start flex-col'>
               <span className='w-[100%] h-[10%]  text-[6.5vmin] text-white font-bold flex items-center justify-center flex-row'>
                <img src={notess} alt="" className='w-[7vmin]'/>
                <span>Edit Notes</span></span>
                <p className='p text-white text-[3.5vmin]  w-[85%] text-center font-mono'>Keep your notes fresh by editing them whenever inspiration strikes...</p>
            </div>
        </div>
    </div>
     <div className={`absolute  top-[7%] z-[1] h-[100%]   w-[100vw] flex  flex-col justify-start items-center 
      ${islogined?"":'hidden'}`}> 
      <span className={` h-[20%] w-[100%] px-2 flex justify-center items-center ${selected_note?"hidden":""}`}>
        <img src={note} alt=""  width={'50vmin'} height={'50vmin'} />
      <h1 className='text-[5vmin] font-semibold duration-200'>No note selected. Start by picking or creating one!</h1>
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
      <div className={`h-[20%] w-[100%] z-[20] flex flex-col justify-start  items-center pl-[6%] ${selected_note?'':"hidden"}
       ${selectedfolder?.notes.length==0?'hidden':""} `}>
         <span className='flex w-full h-[20%] mt-2 pl-1.5  items-center   font-bold text-[3.5vmin]'>
            <img src={mini} alt="" className='w-[3.7vmin]' />
          <h5 className='mx-1 '>{selectedfolder?.folname}</h5>
          <h5 className='text-orange-600 mx-1'>\</h5>
          <img src={post} alt=""  className='w-[3.7vmin]'  />
          <h5 className=''> {selected_note?.note_name}</h5>
          </span>
        <span className='h-[40%] w-[100%]  flex justify-start items-baseline pl-1'>
        <input type="text" value={note_title} className='outline-none border-0 text-[6.2vmin] mt-1 
         bg-transparent h-[100%] text-left  text-orange-500 w-[70%] ' 
        onChange={handlechange}placeholder='Give a title..'/>
        <button onClick={()=>{setdownload(true)
          setformat('TXT')
        }} className='text-[4vmin] border-orange-500 px-2 py-1 mb-1 border-2 rounded-lg text-orange-500 font-semibold '>
          Dowload
        </button>
    </span>
        <span className='flex w-[100%] h-[100%] justify-start items-center gap-5 flex-row  px-2 text-[3vmin] '>
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