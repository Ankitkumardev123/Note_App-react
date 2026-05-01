import React,{useState,useEffect} from 'react'
import {deletenote,updatenote,setselectednote,setselectfolder} from '../noteslice/noteslices'
import { useDispatch,useSelector } from 'react-redux'

import close from "../images/close.png"
import note from "../images/note.png"

import pencils from "../images/pencils.png"

import save from "../images/save.png"
function Note({not,items,searchmsg_note,setnotename,noten,note_seriel}) {
   
  const [visible, setvisible] = useState(false)
    const [edit, setedit] = useState(false)
    const [rename, setrename] = useState(true)
    const [msg, setmsg] = useState(not.note_name)
    const {folders}=items 
    const selected_note=useSelector(state=>state.noted.selectednote)
    const selectedfolderid=useSelector(state=>state.noted.selectedfolderid)
    const dispatch=useDispatch()
    ///All event handling functions
    const handlename=(e)=>{
      const value=e.target.value
      setmsg(value)

    }
   
    const handlesearch=(s1,s2)=>{
        for(let i=0;i<s2.length;i++)
        {
            if(s1[i]!=s2[i])
                setvisible(true)
           
           
        }
    }
    
    ///All useeffects
    
      useEffect(()=>{
        setvisible(false)
        if(searchmsg_note!='')
       handlesearch(not.note_name,searchmsg_note)
        else
            setvisible(false)
      },[searchmsg_note])
      useEffect(()=>{
        if(not?.id==selected_note?.id)
          setedit(true)
        else
        {
          setrename(true)
          setedit(false)
         
        }
       
      },[selected_note])
     
  return (
    
    <div id={note_seriel} className={` w-[100%] h-14 text-center border-b-2 border-gray-500   shrink-0  flex justify-start  items-center 
       hover:bg-slate-800 
      ${selected_note?.id==not?.id?'bg-slate-800':'bg-slate-950'}
      ${visible?'hidden':''}`}
      onClick={()=>{
        let len=window.outerWidth
        if(not.id!=selected_note?.id && len>=768)
            dispatch(setselectednote(not))
      }}
      >
        <span className='flex w-[100%] h-[100%] bg-black/40 justify-center items-center'>
          <div className='w-[9%] h-full '></div>
          <div className='w-full h-full flex justify-center items-center' onClick={()=>{ if(not.id!=selected_note?.id && window.outerWidth>=768)
            dispatch(setselectednote(not))}}>
        <img src={note} className='size-[1.7rem]  ' alt="" onClick={()=>{
        if(not.id!=selected_note?.id || !selected_note )
            dispatch(setselectednote(not))
    
       
           
       }
       }/>
       <input type="text" readOnly={rename} defaultValue={not.note_name} className='outline-none font-poppins font-semibold text-gray-400 
        w-[100%] h-[100%]  bg-black/0 text-md' onChange={(e)=>{handlename(e)
       }} onClick={()=>{
         if(not.id!=selected_note?.id && window.outerWidth>=768)
            dispatch(setselectednote(not))
      }} />
       </div>
        </span>
        <span className={`flex w-16  md:p-0 lg:p-0 h-[100%]  items-center justify-center gap-2
        `}>
            <img src={rename?pencils:save} alt=""
                onClick={()=>{
                
                  setrename(prev=>!prev)
                  if(rename==false){
                    const prop={
                      note_name:msg
                    }
                    // noten(msg)
                    dispatch(updatenote({id:not.id,folid:selectedfolderid,prop}))
                    
                    
                  }
                  
                }} className='size-[1.7rem]  rounded-lg duration-200'/>
            {/* <img src={close}  alt="" className='size-[1.5rem]  rounded-lg 'onClick={()=>{dispatch(deletenote({id:not.id,folid:selectedfolderid} ))
            
             dispatch(setselectednote(null))
          }}/> */}
        </span>
    </div> 
  )
}

export default Note