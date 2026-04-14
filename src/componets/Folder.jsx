import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addNote,deletefolder, updatefolder,setselectfolder,setselectednote} from '../noteslice/noteslices'
import gsap from 'gsap'
import close from "../images/close.png"
import folder from "../images/folder.png"
import pencils from "../images/pencils.png"
import trash from "../images/trash.png"
import save from "../images/save.png"
import { useGSAP } from '@gsap/react'
function Folder({fold,set1,searchmsg,fol_ser}) {
    const [visible, setvisible] = useState(true)
    const [edit, setedit] = useState(false)
    const [rename, setrename] = useState(false)
    const [create, setcreate] = useState(false)
    const [note_title,setnote_title]=useState('')
    const [foldname, setfoldname] = useState(fold.folname)
    const selected_folder=useSelector(state=>state.noted.selectedfolderid)
    const folders=useSelector(state=>state.noted.Folders)
    const selected_folders=folders.find(fol=>fol.id==selected_folder)
    const selected_note=useSelector(state=>state.noted.selectednote)
    const selected_folderid=useSelector(state=>state.noted.selectedfolderid)
    const dispatch=useDispatch()
    let folder_length=folders?.length
  useEffect(()=>{
    set1(false)
  },[create,rename,create,note_title])
   const handlesearch=(s1,s2)=>{
    
    for(let i=0;i<s2.length;i++)
    {
        if(s1[i]==s2[i]){
        
            setvisible(true)
            
        }
        else{
          setvisible(false)
          break;
        }
        
       
       
    }
}
  const handlename=(e)=>{
      const value=e.target.value
      setfoldname(value)

    }

const del_ani=()=>{
  gsap.to(`#${fol_ser}`,{
    x:-100,
    opacity:0,
    ease:'circ',
    duration:0.8
  })
}
useGSAP(()=>{
  
      if(folders.length>folder_length)
  {
    gsap.from(`#fol${folders.length}`,{
    yPercent:-100,
    opacity:0,
    ease:'circ',
    duration:1
  })
  }
  folder_length=folders.length
 

},[folders.length])


  useEffect(()=>{
    
    if(searchmsg!=''){
   handlesearch(fold.folname,searchmsg)
  
    }
    else
      setvisible(true)
  },[searchmsg])
  useEffect(()=>{
    if(selected_folder!=fold?.id)
        setrename(false)
     
   
  },[selected_folder])

  return (
    <>
    <div id={`${fol_ser}`}
     className={` w-[100%] h-10   bg-black
      ${selected_folderid==fold.id?'bg-gradient-to-r text-purple-700':''}
       sm:h-10  lg:h-10 md:h-10 border-b-2 border-gray-600   
      hover:bg-gradient-to-r bg-[length:200%_200%] animate-gradient from-purple-700 via-pink-600 to-cyan-600
       ${visible?'':'hidden'}`}
    onClick={()=>{
            
            if(selected_folder!=fold.id )
            dispatch(setselectfolder(fold.id))
           
        }}
    >
      <div className='w-full h-full flex  bg-black/40 backdrop-blur-lg justify-start items-center'>
       <div className='w-[5%]  h-full '>

       </div>
       <span className='w-[100%] h-full gap-2  flex justify-start items-center'>
        <img src={folder} className={`size-[1.5rem]  `} alt=""/>
       <input type="text" readOnly={!rename} value={foldname} className='outline-none  font-poppins font-semibold text-gray-400 
              w-[100%] h-[100%]  bg-black/0 text-md' onChange={(e)=>{handlename(e)
             }}
             onKeyDown={(e)=>{
              if(e.key=="Enter"){
                setrename(!rename)
                if(rename==true && foldname!=''){
            const prop={folname:foldname}
            dispatch(updatefolder({folid:fold.id,prop}))
          }
          else if(rename==true && foldname==''){
            alert('Folder name is empty...')
            setrename(true)
          }
        }
             }} 
             onClick={()=>{
               if(fold.id!=selected_folderid )
                  dispatch(setselectfolder(fold.id))
            }} />
        </span>
        <span className={`w-[23.5%] border-l-[1px] border-gray-600 h-full bg-slate-950 grid place-items-center `} onClick={()=>{setrename(!rename)
          if(rename==true && foldname!=''){
            const prop={folname:foldname}
            dispatch(updatefolder({folid:fold.id,prop}))
          }
          else if(rename==true && foldname==''){
            alert('Folder name is empty...')
            setrename(!rename)
          }

          
        }}>
        <img src={rename?save:pencils} alt=""  className={`size-[1.8rem] `}/>
        </span>
        <span className={`w-[23.5%] border-l-[1px] border-gray-600 h-full bg-slate-950 grid place-items-center ${fold?.id==1?'hidden':''}`}>
        <img src={trash} alt=""  className={`size-[1.8rem] ${fold?.id==1?'hidden':''}`}
        onClick={()=>{
          dispatch(deletefolder({id:fold?.id}))
        }}
        />
        </span>
        </div>
    </div>
   

    </>
  )
}

export default Folder;