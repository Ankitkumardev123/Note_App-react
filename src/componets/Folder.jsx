import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addNote,deletefolder, updatefolder,setselectfolder,setselectednote} from '../noteslice/noteslices'

import close from "../images/close.png"
import folder from "../images/folder.png"
import pencils from "../images/pencils.png"
import post from "../images/post.png"
import save from "../images/save.png"
function Folder({fold,set1,searchmsg}) {
    const [visible, setvisible] = useState(false)
    const [edit, setedit] = useState(false)
    const [rename, setrename] = useState(true)
    const [create, setcreate] = useState(false)
    const [note_title,setnote_title]=useState('')
    const [msg, setmsg] = useState(fold.folname)
    const selected_folder=useSelector(state=>state.noted.selectedfolderid)
    const folders=useSelector(state=>state.noted.Folders)
    const selected_folders=folders.find(fol=>fol.id==selected_folder)
    const selected_note=useSelector(state=>state.noted.selectednote)
    const dispatch=useDispatch()
  useEffect(()=>{
    set1(false)
  },[create,rename,create,note_title])
   const handlesearch=(s1,s2)=>{
    for(let i=0;i<s2.length;i++)
    {
        if(s1[i]!=s2[i])
            setvisible(true)
       
       
    }
}
useEffect(()=>{
    if(fold.id==1)
        dispatch(setselectfolder(fold.id))
},[])
  useEffect(()=>{
    setvisible(false)
    if(searchmsg!='')
   handlesearch(fold.folname,searchmsg)
    else
        setvisible(false)
  },[searchmsg])
  useEffect(()=>{
    if(selected_folder==fold?.id){
       
        setedit(true)
    }
    else{
       
        setrename(true)
        setedit(false)
    }
  },[selected_folder])

  return (
    <>
    <div className={`fols w-[100%] h-[5.5%]   flex justify-center  items-center  pl-1 ${visible?'hidden':''}`}
    >
        <span className=' w-[100%] h-[100%] flex justify-center items-center'>
        <img src={folder} className={`w-[5.5min] h-[5.5vmin]  ${fold.id==1?"grayscale":''} `} alt="" onClick={()=>{
             dispatch(setselectednote(null))
            if(selected_folder==fold.id)
            dispatch(setselectfolder(null))
            else
            dispatch(setselectfolder(fold.id))
        }}/>
       <input type="text" disabled={rename} value={msg} className='outline-none w-[100%] h-[100%] bg-transparent text-[3vmin] text-left  ' onChange={
        (e)=>{
            setmsg(e.target.value)
            
        }
       } onClick={()=>{
        if(create==false){
            dispatch(setselectfolder(fold.id))
        if(selected_note){
       const note_send=selected_folders?.notes.map(no=>no.id==selected_note?selected_note:null)
       dispatch(setselectednote(note_send))}
       else{
        dispatch(setselectednote(null))
       }
        }
    }}/>
        </span>
        <span className={`flex w-[60%] h-[100%]  items-center justify-center flex-row
         ${edit?"":"hidden"}`}>
            <img src={close} alt="" className={`w-[5vmin] p-0.5 rounded-lg duration-200 ${create?"-rotate-90":'rotate-45'}`} onClick={()=>{
                
                setcreate(prev=>!prev)
                setnote_title('')
                if(create==false){
              dispatch(setselectfolder(fold.id)
            )
            }
                }}/>
            <img src={rename?pencils:save} alt=""
                onClick={()=>{setrename(prev=>!prev) 
                   
                     dispatch(setselectfolder(fold.id))
                    if(rename==false){
                        const prop={
                            folname:msg
                        }
                        dispatch(updatefolder({folid:fold.id,prop}))
                    }
                }} className={fold.id==1?"hidden":'w-[5vmin] p-0.5 rounded-lg duration-200'}/>
            <img src={close}  alt="" className={fold.id==1?"hidden":'w-[5vmin] p-0.5 rounded-lg'}
            onClick={()=>{dispatch(deletefolder({id:fold.id}))
              dispatch(setselectfolder(null))
              dispatch(setselectednote(null))
            }}/>
        </span>
    </div>
    <div className={`w-[100%] h-[7%]  flex justify-center  items-center ${create?"":"hidden"}`}>
         <img src={post} className='w-[5vmin] h-[5vmin] ' alt="" />
        <input readOnly={false} type="text" value={note_title} 
 onChange={(e)=>{
    setnote_title(e.target.value)}
        } onKeyDown={(e)=>{
           
           
            if(e.key==="Enter"){
               
               
            dispatch(addNote({id:fold.id,name:note_title}))
              
            setnote_title('')
            setcreate(false)
            
             
            

        }
            
        }}
       className='outline-none  bg-transparent border-b-2 text-[3vmin] w-[70%] text-orange-500' placeholder='Give a title...'/>
<button className='text-[3vmin] p-0.5 px-1 bg-orange-600 ml-1 border-2 rounded-lg' onClick={
          ()=>{
            if(note_title!=''){
            dispatch(addNote({id:fold.id,name:note_title}))
              
            setnote_title('')
            setcreate(false)
            
             
            }
            else{
              alert("Note name is empty...")
            }
          }
        } >Add</button>
    </div>
    
    </>
  )
}

export default Folder;