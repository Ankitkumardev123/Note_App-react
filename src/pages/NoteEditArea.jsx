import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Note from '../componets/Note'
import Folder from '../componets/Folder'
import ReactMarkdown from "react-markdown"
import Dropdown from "../componets/Dropdown"
import { menubartoggle,editbartoggle,addfolder,updatenote,setselectednote, setselectfolder,setuserfolder, addNote} from '../noteslice/noteslices'
import CodeMirror from "@uiw/react-codemirror"
import {oneDark} from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@uiw/react-codemirror'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import inbox from '../images/inbox.png'
import close from "../images/close.png"
import save from "../images/save.png"
import remarkBreaks from "remark-breaks"
import menu from '../images/menu.png'
import eye1 from "../images/eye1.png"
import eye2 from "../images/eye2.png"
import info from "../images/info.png"
import maximize from "../images/maximize.png"
import minimize from "../images/minimize.png"
import pencils from "../images/pencils.png"
import folder from "../images/folder.png"
import searchicon from "../images/searchicon.png"
import note from "../images/note.png"
import mini from "../images/mini.png"
import great from "../images/great.png"
import notess from "../images/notess.png"
import remove from "../images/remove.png"
import notelogo from "../images/notelogo.png"
import back from "../images/back.png"
import { nanoid } from '@reduxjs/toolkit'
export default function NoteEditArea() {
     const select=useRef(null)
      const textarea=useRef(null)
      const navigate=useNavigate()
        let folders=useSelector(state=>state.noted.Folders)
       const[dowload_on,setdownload]=useState(false)
      const [create, setcreate] = useState(false)
      const [msg, setmsg] = useState('')
     
      
      
      const editbar2=useRef(null)
      const ani=useRef(null)
      const ani1=useRef(null)
      const container=useRef(null)
      
      const [index_note,setindex_note]=useState(null)
     
      const slide=useSelector(state=>state.noted.editbar)
      const selected_note=useSelector(state=>state.noted.selectednote)
      const selected_folderid=useSelector(state=>state.noted.selectedfolderid)
      const islogined=useSelector(state=>state.noted.logined)
      let selectedfolder=folders?.find(f=>f.id==selected_folderid);
      const[notes,setnotes]=useState()
      let welcome=0;
      const [note_title,setnote_title]=useState('')
      const dispatch=useDispatch()
      const [notecontent,setnotecontent]=useState(selected_note?.notecontent ?? '')
      const [notename,setnotename]=useState(selected_note?.notename || '' )
      //design states
      const [resize, setresize] = useState(false)
      const [preview, setpreview] = useState(false)
      const [note_detail, setnote_detail] = useState(false)
      const [note_bar, setnotebar] = useState(false)
      const [createnote,setcreatenote]=useState(false)
      const [createmsg,setcreatemsg]=useState('')
      const [toggle_editPanel,settoggleEditPanel]=useState(selected_note==null)
      const note_content=selected_note?.note_content || ''
      const [length, setlength] = useState(selected_note?.notecontent.length || 0)
      const [ismobile,setIsmobile]=useState(window.outerWidth<768)
      const [infopanel, setinfopanel] = useState(false)
      //search states
      const [Search_msg, setsearch_msg] = useState('')
     
      const [Search_notemsg, setsearch_notemsg] = useState('')
      useEffect(()=>{
        const handleresize=()=>{
          setIsmobile(window.outerWidth<768)
          console.log(window.outerWidth)
         if(window.outerWidth<768){
          dispatch(setselectednote(null))
         
        }
        else{
         
         dispatch(setselectednote(selectedfolder?.notes[0]))
         
        }
       
        }
          
       

          window.addEventListener("resize",handleresize)
          return()=> {window.addEventListener("resize",handleresize)};

      },[])

      
         useEffect(()=>{
          if(slide==false)
        setcreate(false)
        
        },[slide])
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
        
          setnote_title(selected_note?.notetitle || '')
          setlength(selected_note?.['notecontent'].length || 0)
          setnotename(selected_note?.note_name || '')
          setnotecontent(selected_note?.notecontent ||'')
         settoggleEditPanel(selected_note==null)
         
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
          const handlenote=(e)=>{
           
           setlength(e.target.value)
          setnotecontent(e.target.value)
             dispatch(updatenote({
            id:selected_note?.id,
            folid:selectedfolder?.id,
            prop:{
             notecontent:e.target.value
            }
            
          }))
         
          }
          const handlesearch=(e)=>{
            setsearch_msg(e.target.value)
          }
           const handlesearch1=(e)=>{
            setcreatenote(false)
            setsearch_notemsg(e.target.value)
          }
          // const handledownload=async(name,title,content)=>{
           
          //   if(!selected_note) return
          //   if(format=='TXT'){
          //   const filedata=`Title:-${title || 'Untitled'}\n\nNote Content:-\n${content || "No content wriiten in note!!"}`
          //   const blob=new Blob([filedata],{
          //     type:"text/plain"
          //   });
          //   const url=URL.createObjectURL(blob)
          //   const a=document.createElement('a')
          //   a.href=url
          //   a.download=`${name}.txt`;
          //   document.body.appendChild(a);
          //   a.click();
          //   document.body.removeChild(a);
          //   URL.revokeObjectURL(url);
          // }
          // else if(format == "DOCX"){
          //   const content= notecontent.split("\n").map(line=>{
          //     return new docx.Paragraph({
          //       text: String(line),size:32,bold:true
          //     })
          //   })
          //   const docx_doc =new docx.Document({
          //     sections:[{
          //       properties:{},
          //       children:[
          //         new docx.Paragraph({
          //           children:[new docx.TextRun ({
          //             text:`Note Title:-`,bold:true,size:32,underline:true
          //           })]
          //           ,
                    
          //         }),
          //        new docx.Paragraph({
          //           children:[new docx.TextRun ({
          //             text:String(title || "Untitled"),bold:true,size:30,
          //           })]
          //           ,
                    
          //         }),
          //           new docx.Paragraph({
          //           children:[new docx.TextRun ({
          //             text:`Note Content:-`,size:30,underline:true,bold:true
          //           })]
                    
          //         }),
          //         ...content,
          //       ]
          //     }
          //     ]
          //   })
          //   docx.Packer.toBlob(docx_doc).then((blob)=>{
          //     saveAs(blob,`${name}.docx`);
          //   })
          // }
          // }
  return (
    <>
     {/* sidebar_area */}
        <div ref={editbar2} className={` edit  fixed w-[75vw]  sm:w-[45vw] md:w-[35vw] lg:w-[25vw] top-0  h-[100vh] b-0 z-50 
        bg-neutral-950   bottom-0 border-r-[1px]
         flex translate-x-[-100%] border-gray-700  
        flex-col  `}>
        <div className='w-full h-20 flex items-center justify-start border-b-[1px] border-gray-600 pl-3 '>
            <img loading="lazy"   src={close} className={`size-[2rem] 
            `} alt="" onClick={()=>{
            dispatch(editbartoggle(!slide));
          }} />
        </div>
        <div className=' w-[100%] h-8 lg:h-14 md:h-12  flex items-center  justify-start  gap-1 border-b-[1px] border-gray-600 hover:bg-slate-950  '>
            <div className='w-14 h-full bg-slate-950 border-gray-600 border-r-[1px]'></div>
            <span className='w-full h-full gap-2 flex justify-start items-center py-2'>
        <img loading="lazy"  src={inbox} className='size-[1.5rem] scale-90  grid place-content-center ' alt="" />
        <h1 className='flex text-center  font-poppins text-xs sm:text-sm md:text-md lg:text-lg text-white
          font-semibold  justify-left items-center ' >All Folders</h1>
            </span>
            <div className='w-16 h-full bg-slate-950 grid place-items-center border-gray-600 border-l-[1px]' onClick={()=>setcreate(prev=>!prev)}>
            <img loading="lazy"  src={!create?remove:close} className='size-[1.5rem] ' alt="" />
            </div>
        
        </div>
         <div className={` w-[100%] h-14   bg-black sm:h-10  lg:h-14 md:h-10   
              bg-gradient-to-r bg-[length:200%_200%]  animate-gradient from-purple-700 via-pink-600 to-cyan-600
              `}>
                <div className='w-full h-full flex   bg-black/60 backdrop-blur-lg justify-start items-center'>
                <div className='w-14 h-full bg-slate-950 border-r-[1px] border-gray-600 grid place-items-center'>
                 <img loading="lazy"   src={searchicon} className={`size-[1.5rem] mr-1`}/>

                </div>
                <input type="text"  className='w-full h-full text-md text-white font-poppins font-thin bg-transparent border-0 outline-none text-left pl-2'
                 placeholder='Search folders....'
                 onChange={handlesearch} 
                 />
                <div className='w-5 h-full border-r-[1px] border-transparent '></div>
                </div>
              </div>
        <div className={` w-[100%] h-14   bg-black sm:h-10  lg:h-14 md:h-10 border-t-[1px] border-gray-600   
              bg-gradient-to-r bg-[length:200%_200%] animate-gradient from-purple-700 via-pink-600 to-cyan-600
              ${create?"":"hidden"} `}>
              <div className='w-full h-full flex  bg-black/60 backdrop-blur-lg justify-start items-center'>
              <div className='h-full w-[20%]   grid place-items-center'>
                <img src={folder} className={`size-[1.5rem]  `} alt=""/>
              </div>
               <input type="text" value={msg} className={`w-[100%] text-cyan-500 outline-none  bg-transparent ${create?"":"hidden"} text-[3vmin] `} placeholder='Give a name..'
               onChange={e=>setmsg(e.target.value)} onKeyDown={e=>{
          if(e.key==="Enter"){
            
            dispatch(addfolder({name:msg}))
            setcreate(false)
            
    
             setmsg('')
          }
         
         }} />
         <div className='h-full w-[25%] border-l-[1px] border-gray-500 bg-slate-950 grid place-items-center'>
        <img src={save} className='size-[1.7rem]  ' onClick={
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
        } />
        </div>
        </div>
              </div>
       
         
      
         
      
        <div className=' h-[100%] pb-2 border-y-2 border-gray-700 w-[100%]  
         flex-col gap-1 overflow-y-auto overflow-x-hidden scrollbar-hide flex
         justify-start items-center' >
        
         {
          
          folders?.map((folder,index)=>
           
            <Folder key={folder.id} fold={folder} ind={index} fol_ser={`fol${index}`}   set1={setcreate} searchmsg={Search_msg}  />
            
        
          )
         }
         
        </div>
         
        </div>
        {/* editing area */}
        <div className='w-[100vw] h-[100%]  flex flex-col overflow-hidden'>
        <div className='   h-[9vh] w-[100vw]  '></div>
         
     <div className={` z-[1] h-[100vh]   w-[100vw] flex   justify-start items-center 
      ${islogined?"":'hidden'}`}> 
      <div className={`md:w-[60%] lg:w-[40%] bg-neutral-950 border-y-2 border-r-2 border-gray-500
       h-full flex flex-col justify-start items-center ${resize?'hidden':''} ${ismobile?toggle_editPanel?'w-full':'hidden':''}`}>
       <div className='w-full h-14 
        bg-gradient-to-r bg-[length:200%_200%] from-purple-700 via-pink-600 to-cyan-500 animate-gradient  
        border-b-2 border-gray-500'>
        <div className='w-[100%] bg-black/40 backdrop-blur-lg h-full  flex 
        justify-center items-center gap-2'>
        
        <div className='w-full flex justify-center items-center gap-2 text-lg font-semibold font-outfit'> 
        <img loading="lazy"  src={folder} className='size-[1.7rem]  grid place-content-center ' alt="" />
        {selectedfolder?.folname}
        </div>
         <div className='w-[20%] h-full bg-slate-950    flex items-center justify-center'>
          <img src={!create?remove:close} alt="" className='size-[1.7em]' onClick={()=>
            setcreatenote(!createnote)
          } />
          </div>
         
        </div>
      

      
       </div>
       <div className={` w-[100%] h-16   bg-black   p-0
              bg-gradient-to-r bg-[length:200%_200%] border-b-[1px] border-gray-6
              00  animate-gradient from-purple-700 via-pink-600 to-cyan-600
              `}>
                <div className='w-full h-full p-0 flex   bg-black/60 backdrop-blur-lg justify-start items-center'>
                <div className='w-14 h-full bg-slate-950 border-r-[1px] border-gray-600 grid place-items-center'>
                 <img loading="lazy"   src={searchicon} className={`size-[1.5rem] mr-1`}/>

                </div>
                <input type="text"  className='w-full h-full text-md text-white font-poppins font-thin bg-transparent border-0 outline-none text-left pl-2'
                 placeholder='Search notes....'
                 onChange={handlesearch1} 
                 />
                <div className='w-5 h-full border-r-[1px] border-transparent '></div>
                </div>
              </div>

        <div className='relative w-full h-full flex  flex-col overflow-x-hidden overflow-y-auto scrollbar-hide'>
          <div  className={`absolute w-full h-full z-[0] grid place-items-center bg-black r text-lg font-poppins font-semibold ${!selectedfolder?.notes.length==0?'hidden':''}`}>
          Create a note..
          </div>
          {/*Dummy note component*/ }
           <div className={` w-[100%] h-14 text-center border-2 z-[10] border-purple-700   flex justify-start  items-center 
               bg-cyan-700 ${createnote?'':'hidden'}`}> <span className='flex w-[100%] h-[100%] bg-black/40 justify-center items-center'>
                         <div className='w-[9%] h-full '></div>
                         <div className='w-full h-full flex justify-center items-center'>
                       <img src={note} className='size-[1.7rem]  ' alt="" />
                      <input type="text"  value={createmsg} className='outline-none  font-poppins font-semibold
                       text-purple-700
                       w-[100%] h-[100%]  bg-black/0 text-md'
                       onChange={(e)=>setcreatemsg(e.target.value)} 
                       onKeyDown={(e)=>{
                        
                        if(e.key==='Enter'){
                          if(createmsg!=''){
                             dispatch(addNote({id:selected_folderid,name:createmsg}))
                            setcreatemsg('')
                          setcreatenote(!createnote)
                          }
                           
                          else{
                           
                           window.alert("Note name is empty!")
                          }
                        }
                       }}
                       placeholder='Give a name....' />
                      </div>
                       </span>
                       <span className={`flex w-16  h-[100%]  items-center justify-center gap-2
                       `} onClick={()=>{
                        if(createmsg!=''){
                            dispatch(addNote({id:selected_folderid,name:createmsg}))
                            setcreatemsg('')
                          setcreatenote(!createnote)
                        }
                          else{
                           
                           window.alert("Note name is empty!")
                          }
                       }}>
                           <img src={save} alt="" className='size-[1.8rem]   rounded-lg duration-200'/>
                           
                       </span></div>
          {
           
             selectedfolder?.notes?.map((not,index)=>
           
            <Note note_seriel={`note${index}`} key={not.id} not={not} items={{folders}}   
            searchmsg_note={Search_notemsg}  />
            
        
          )
          }
        </div>
      </div>
      <div className={`w-[100%] border-y-2 border-gray-500  bg-neutral-900 h-[100vh]  flex flex-col justify-start items-center ${ismobile?toggle_editPanel?'hidden':'':''} `}>
      <div className={`w-full h-14 shrink-0 bg-slate-950 border-b-2 border-gray-500 flex items-center inner justify-start 
        ${!toggle_editPanel?'':'[&>*]:hidden'} `}>
        <div className={`w-14 h-full grid place-items-center ${ismobile?'':'hidden'} `}
        
        >
          <img src={back} alt="" className=' scale-75 md:size-[1.4rem] lg:size-[2rem] sm:size-[1.4rem] size-[1.5rem]' onClick={()=>dispatch(setselectednote(null))} />
        </div>
        <div className={`w-14 h-full grid place-items-center ${!ismobile?'':'hidden'} `}
        onClick={()=>setresize(!resize)}
        >
          <img src={!resize?maximize:minimize} alt="" className='size-[2rem] scale-75' />
        </div>
        <div className='w-full h-full  flex justify-start items-center'>
          
          <input type="text"  value={note_title || ''}
          onChange={handlechange}
           className='outline-none px-2 bg-slate-900 font-poppins font-semibold text-gray-400 
                 w-full h-[100%]  bg-black/0 text-md'
          placeholder='Write a note title...'
                 />
                
        </div>
        <div className='w-[40%] h-full lg:w-[20%]  md:w-[50%]  flex lg:justify-center justify-center md:pl-3  items-center md:gap-4 lg:gap-4 sm:gap-4 gap-2 '>
          <img src={preview?eye2:eye1} alt="" className='md:size-[1.4rem] lg:size-[1.4rem] sm:size-[1.4rem] size-[1.1rem] ' onClick={()=>{
            setpreview(!preview)
          }}/>
          <img src={info} alt="" className='md:size-[1.4rem] lg:size-[1.4rem] sm:size-[1.4rem] size-[1.1rem]' onClick={()=>setinfopanel(prev=>!prev)} />
          <Dropdown fid={selected_folderid} notid={selected_note?.id} setpreview={setpreview}/>
        </div>

      </div>
       <div className={`relative grid place-items-center w-full h-[80%] ${toggle_editPanel?'':'hidden'}`}>
        <img src={notelogo} alt="" className='size-36 grayscale opacity-65' />
       </div>
      <div className={`relative w-full h-[80%] ${toggle_editPanel?'hidden':''} `}>
          {/*Info panel */}
        <div className={`absolute w-full h-[100vh] bg-black/40 backdrop-blur-sm grid place-items-center ${infopanel?selected_note?'':'hidden':'hidden'} `}>
        <div className='shrink-0 w-[90vw] md:w-[50vw] sm:w-[60vw]  h-[13rem] border-[1px] flex flex-col justify-start items-center border-gray-600 rounded-md right-10 bg-slate-950' >
          <div className='w-full h-12 border-b-[1px] border-gray-600 flex'>
          <h1 className='w-full h-full lg:text-lg md:text-md flex items-center pl-4 text-gray-400  font-sans font-thin '>
          Document
          </h1>
          <span className='w-[20%] h-full grid place-items-center o '>
            <img src={close} alt="" className='size-7' onClick={()=>setinfopanel(prev=>!prev)} />
      
          </span>
          </div>
          
           <div className='w-full h-8  flex'>
          <h1 className='w-22 shrink-0 h-full lg:text-lg md:text-md flex items-center pl-4 text-white  font-sans font-thin '>
         Created On
          </h1>
           <h1 className='w-[100%] h-full pr-2 lg:text-md md:text-md  text-sm flex items-center justify-end  text-gray-400  font-sans font-thin '>
         {selected_note?.time}
          </h1>
          
          
          </div>
           <div className='w-full h-8    flex'>
          <h1 className='w-22 shrink-0 h-full lg:text-lg md:text-md flex items-center pl-4 text-white  font-sans font-thin '>
         Modified On
          </h1>
           <h1 className='w-[100%] h-full pr-2 lg:text-md md:text-md  text-sm flex items-center justify-end  text-gray-400  font-sans font-thin '>
         {selected_note?.lasttime}
          </h1>
          
          
          </div>
           <div className='w-full h-8  flex'>
           <h1 className='w-22 shrink-0 h-full lg:text-lg md:text-md flex items-center pl-4 text-white  font-sans font-thin '>
         Folder
          </h1>
            <h1 className='w-[100%] h-full pr-2 lg:text-md md:text-md  text-sm flex items-center justify-end  text-gray-400  font-sans font-thin '>
         {selectedfolder?.folname}
          </h1>
          
          
          </div>
           <div className='w-full h-8 flex'>
          <h1 className='w-22 shrink-0 h-full lg:text-lg md:text-md flex items-center pl-4 text-white  font-sans font-thin '>
         Note
          </h1>
         <h1 className='w-[100%] h-full pr-2 lg:text-md md:text-md  text-sm flex items-center justify-end  text-gray-400  font-sans font-thin '>
         {`${selected_note?.note_name}`.slice(0,20)}
          </h1>
          
          
          </div>
           <div className='w-full h-8  flex'>
          <h1 className='w-22 shrink-0 h-full lg:text-lg md:text-md flex items-center pl-4 text-white  font-sans font-thin '>
        Characters:
          </h1>
            <h1 className='w-[100%] h-full pr-2 lg:text-md md:text-md  text-sm flex items-center justify-end  text-gray-400  font-sans font-thin '>
         {notecontent.length}
          </h1>
          
          
          </div>
        </div>
        {/*dummy div fro alignment */}
        <div className=' w-[20rem] h-[12rem] ' ></div>
         </div>
        {
          !preview?(
        <textarea value={notecontent} placeholder='Write note content here......' 
        onChange={(e)=>{
         handlenote(e)
         
        }}
        className='px-4  pt-4  bg-transparent w-full h-full outline-none overflow-x-hidden overflow-auto scrollbar-hide' ></textarea>):
        (
          <div className='px-4  pt-4 prose  whitespace-pre-line  gap-2
           bg-transparent w-full h-full outline-none overflow-x-hidden overflow-auto scrollbar-hide'>
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>{notecontent}</ReactMarkdown>
          </div>
        )
        
        }
      </div>
      <div className='w-full h-20'></div>
     
      </div>
      
        </div>
        {/* DOWLOAD SECTION*/}
  {/* <div className={`absolute  font-md z-[30] bg-neutral-950 bg-opacity-70 grid place-items-center   w-[100vw] h-[100vh] ${dowload_on?"":'hidden'}`}>
    <div className='relative w-[15rem] rounded-lg h-64 bg-black border-4 flex  flex-col items-center justify-center gap-2'>
      
       <img loading="lazy"  src={close} alt="" className='absolute w-7  top-3 right-3 ' onClick={()=>{setdownload(false)
        select.current.value="TXT"
       }} />
        
       <label htmlFor="select" className='  text-white font-bold text-lg w-[90%] text-center'>Select a format</label>
      <select onChange={(e)=>setformat(e.target.value)} ref={select}  name="" id="s" className='w-[80%] h-[20%] text-md font-semibold rounded-md border-[0.1rem] border-gray-500 bg-gray-900'>
        
      
      </select>
      <button className='w-[80%] font-semibold bg-orange-600 py-2 text-white rounded-md brightness-150 text-md' onClick={()=>{
        handledownload(notename,note_title,notecontent)
      }}>Download</button>
      <h1 className='text-white text-md font-semibold'>Selcted format : {format}</h1>
      <h1 className='text-white text-md font-semibold'>File : {notename}.{format?.toLocaleLowerCase()}</h1>
      
    </div>
        
  
  </div> */}
      
    
     </div>
    </>
  )
}
