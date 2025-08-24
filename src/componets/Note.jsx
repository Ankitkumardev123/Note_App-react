import React,{useState,useEffect} from 'react'
import {deletenote,updatenote,setselectednote,setselectfolder} from '../noteslice/noteslices'
import { useDispatch,useSelector } from 'react-redux'
import {close,pencils,save,post } from '../icon'

function Note({not,items,searchmsg_note}) {
  const [visible, setvisible] = useState(false)
    const [edit, setedit] = useState(false)
    const [rename, setrename] = useState(true)
    const [msg, setmsg] = useState(not.note_name)
    const {folders}=items 
    const selected_note=useSelector(state=>state.noted.selectednote)
    const selectedfolderid=useSelector(state=>state.noted.selectedfolderid)
    const dispatch=useDispatch()
    const handlesearch=(s1,s2)=>{
        for(let i=0;i<s2.length;i++)
        {
            if(s1[i]!=s2[i])
                setvisible(true)
           
           
        }
    }
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
      useEffect(()=>{
        if(not.id==2)
          dispatch(setselectednote(not))
        
      },[])
  return (
    <div className={`nots w-[100%] h-[5.5%] text-center flex-shrink-0  flex justify-center  items-center  pl-1 ${visible?'hidden':''}`}>
        <span className='flex w-[100%] h-[100%] justify-center items-center'>
        <img src={post} className='w-[5.5vmin] h-[5.5vmin]  ' alt="" onClick={()=>{
          
    
        if(not.id==selected_note?.id)
              dispatch(setselectednote(null))
            else
            dispatch(setselectednote(not))
       }
       }/>
       <input type="text" disabled={rename} value={msg} className='outline-none w-[100%] h-[100%]  bg-transparent text-[3vmin]' onChange={(e)=>{setmsg(e.target.value)
        dispatch(setselectednote(not))
       }} />
        </span>
        <span className={`flex w-[45%] h-[100%]  items-center justify-right flex-row
         ${edit?"":"hidden"}`}>
            <img src={rename?pencils:save} alt=""
                onClick={()=>{setrename(prev=>!prev)
                  if(rename==false){
                    const prop={
                      note_name:msg
                    }
                   
                  }
                  
                }} className='w-[4.5vmin]  rounded-lg duration-200'/>
            <img src={close}  alt="" className='w-[4.5vmin]  rounded-lg 'onClick={()=>{dispatch(deletenote({id:not.id,folid:selectedfolderid} ))
            
             dispatch(setselectednote(null))
          }}/>
        </span>
    </div> 
  )
}

export default Note