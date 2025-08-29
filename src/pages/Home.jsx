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
function Home() {
  const navigate=useNavigate()
    let folders=useSelector(state=>state.noted.Folders)
   
  const [create, setcreate] = useState(false)
  const [msg, setmsg] = useState('')
  const [search, setsearch] = useState(false)
  const [Search_msg, setsearch_msg] = useState('')
  const [search_note, setsearch_note] = useState(false)
  const [Search_notemsg, setsearch_notemsg] = useState('')
  
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
  const [slider,setslider]=useState(slide)
  const [note_title,setnote_title]=useState('')
  const dispatch=useDispatch()
  const [length, setlength] = useState(selected_note?.notecontent.length || 0)
 useEffect(()=>{
  if(folders?.length)
    dispatch(setuserfolder(folders))
   
  },[create])

 
 useEffect(()=>{
    setslider(slide)
   
  },[slide])

 
  
  useEffect(()=>{
   
    setnote_title(selected_note?.notetitle || '')
    setlength(selected_note?.['notecontent'].length || 0)
  },[selected_note])

 useEffect(()=>{
  if(slide==false)
  setcreate(false)
 },[slide])

     useEffect(()=>{
      
      if(slider==false){
        gsap.to(editbar2.current,{
          xPercent:-100.1,
          duration:0,
          ease:"back-out"
        });
      }
        else{
          gsap.to(editbar2.current,{
          xPercent:0,
          duration:0.5,
          ease:"power1.out"
        });
        
        }
      }
   ,[slider])
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
    
  return (
    <>
    <div ref={editbar2} className={`edit fixed w-[50vw]  h-[90vh] b-0 z-[5] bg-black top-[9.5%] bottom-0 border-[1vmin] border-orange-500 rounded-b-sm border-l-0 flex 
    flex-row${islogined?"":'hidden'}`}>
    <div className='w-[50%] h-[100%] flex justify-center flex-col items-center bg-black border-r-2  border-orange-500 '>
    <span className=' w-[100%] h-[10%] flex items-center  justify-left pl-1  '>
    <img src={folder} className='w-[7vmin] h-[7vmin]  mb-1' alt="" />
    <h1 className='flex text-center text-[5vmin] text-orange-500  w-[50%] font-semibold font-mono justify-left items-center ' >Folders</h1>

    <span className='ml-1 flex b w-[50%] justify-center items-center gap-2 h-[100%]'>
      
      <img src={close} className={`w-[26%]  rotate-45 duration-200 ${create?"rotate-90":"rotate-45"}`} alt="" onClick={()=>{
        setsearch(false)
        setcreate(prev=>!prev)
      if(create==true)
        
        setmsg('')
      }} />
      <img src={`${!search?searchicon:close}`} className={`w-[26%]  duration-200 `} alt="" onClick={()=>{
        setcreate(false)
        setsearch(prev=>!prev)
      if(search==true)
        setsearch_msg('')
      }} />
    </span>
    </span>
    <span className={`flex w-[100%] h-[7%]  justify-center  items-center duration-400 mb-2 pl-2 ${create?"":"hidden"}  `}>
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
     <span className={`flex w-[100%] justify-start ml-2 items-center duration-400 ${search?"":"hidden"}  pl-2`}>
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
  
    <div className='folders h-[100%] w-[100%] pl-[0.5vmin]  flex-col gap-[1.5%] overflow-y-auto overflow-x-hidden scrollbar-hide flex justify-start items-center' ref={ani1}>
    
     {
      
      folders?.map((folder,index)=>
        <Folder key={folder.id} fold={folder} ind={index}  set1={setcreate} searchmsg={Search_msg}  />
      )
     }
     
    </div>

    </div>
     <div className={`w-[50%] duration-400 h-[100%] flex flex-col items-center bg-black ${folders?"":'hidden'}`}>
     <span className='w-[100%] h-[5%] flex items-center pt-2  justify-start  pl-0.5 mb-2 mt-0.5'>
      <img src={note} className='w-[6vmin] h-[6vmin] ' alt="" />
     <h1 className='flex text-center text-[5vmin] text-orange-500   font-semibold font-mono justify-left items-center ' >Notes</h1>
      <img src={`${!search_note?searchicon:close}`} className={`w-[10%]   duration-400 ml-10 ${selectedfolder?? 'hidden'}`} alt="" onClick={()=>{setsearch_note(prev=>!prev)
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
    <span className='ml-3 w-[100%] flex text-center h-[5%] justify-start gap-[1%]' ref={ani}>
      <img src={mini} className={`w-[4vmin] h-[4vmin] mb-1 ${selectedfolder??"hidden"}`}alt=""/>
      <h2 className={`text-white text-[2.5vmin] h-[100%] $ ${selectedfolder??"hidden"}`}>{
      selectedfolder?.folname }</h2>
      <h2 className={`text-orange font-semibold  text-[2.5vmin] text-center w-[100%] h-[90%]   ${selectedfolder??"hidden"}`}>Total Notes-{selectedfolder?.notes?.length}</h2>
    </span>

      <div className={`h-full  w-[100%] pt-0  flex flex-col gap-[1%]  overflow-x-hidden text-center justify-start items-center 
         ${selectedfolder??""}`} ref={ani}>
        <h1 className={`text-[5vmin] text-orange-500 font-semibold  w-[100%] text-center  duration-200 ${selectedfolder?.folname?"hidden":''}`}>Choose a folder...</h1>
         <h1 className={`text-[5vmin] text-orange-500 font-semibold   duration-200 ${selectedfolder?.notes?.length==0?'':'hidden'}`}>Create a Note...</h1>
      <div className={`notes  h-[100%] pt-1   w-[100%]   flex flex-col  items-start gap-[1.5%] overflow-y-auto scrollbar-hide overflow-x-hidden
         text-center`}>
     {
      selectedfolder?.notes?.map((not,index1)=>
        <Note key={not.id} not={not} items={{folders}}  index1={index1} set={setindex_note} searchmsg_note={Search_notemsg} onClick={()=>dispatch(setselectednote(not))}/>
      )
     }
     </div>
    </div>
    <button ref={editbar2} className='fixed top-[5%] left-[100%] w-[7vmin] y-[7vmin] bg-black outline-none rouned-none rounded-r-[20%]
      border-[1vmin] border-orange-500 border-l-0' onClick={()=>{  
     dispatch(editbartoggle())
      setslider(slide)
      dispatch(menubartoggle(false))
    }}>
      <img src={great} alt="" className={`duration-200 ${slide?"rotate-0":"rotate-180"}`} />
      
      </button>
     </div>
    </div>
    <div className={`absolute  top-[7%] z-[1]   h-[110vh] gap-1 w-[100vw] flex   justify-start items-center  flex-col ${islogined?"hidden":''}`}>
      <div className='t w-[100%] h-[50%] flex flex-col items-center justify-start gap-2  py-1'>
       <h1 className='text-white text-[10vmin] pt-1 w-[100%] text-center'>Welcome to <span className='text-white font-serif '>My</span>
            <span className='text-orange-500 text-[9vmin]'>Note</span></h1>
        <p className='text-white text-[5vmin] w-[50%] text-center'>Your personal space to save ,edit and organize your thoughts securely and safely...</p>
        <button
       className='text-[5vmin] border-[0.3rem]      border-white p-2 text-white bg-orange-500 rounded-xl hover:bg-orange-700'
       onClick={()=>{
        
        navigate("/login")}}
       >Get Started
        </button>
        </div>
        <div className='infobar  z-[-1]  w-[100%] h-[50%]   flex items-start justify-flex flex-row  pt-5' >
            <div className='a w-[100%] gap-[1rem] text-center  h-[20%] flex items-center justify-start flex-col '>
               <span className='w-[100%] h-[10%]  text-[5vmin] text-white  flex items-center justify-center flex-row'>
                <span className='flex justify-center items-center h-[20%]'><img src={note} alt="" className='w-[7vmin]'/>New Notes</span></span>
                <p className='p text-white text-[4vmin]  w-[70%] text-center'>Write down anything instantly,with diffrent styling...</p>
            </div>
            <div className='a w-[100%] text-center gap-[1rem]  h-[20%] flex items-center justify-start flex-col'>
               <span className='a w-[100%] h-[10%]  text-[5vmin] text-white  flex items-center justify-center flex-row'>
                <img src={folder} alt="" className='w-[7vmin]'/><span>Sort Easily</span></span>
                <p className='p text-white text-[4vmin]  w-[90%] text-center'>Sort your Notes with tags and folders,search instantly and keep everything neat and accessible...</p>
            </div>
             <div className='a a1 w-[100%] text-center gap-[1rem] h-[20%] flex items-center justify-start flex-col'>
               <span className='w-[100%] h-[10%]  text-[5vmin] text-white  flex items-center justify-center flex-row'>
                <img src={notess} alt="" className='w-[7vmin]'/>
                <span>Edit Notes</span></span>
                <p className='p text-white text-[4vmin]  w-[80%] text-center'>Keep your notes fresh by editing them whenever inspiration strikes...</p>
            </div>
        </div>
    </div>
     <div className={`fixed  top-[8%]  h-[100vh] z-5 left-0 w-[100vw] flex justify-center items-center  flex-col $
      ${islogined?"":'hidden'}`}> 
      <span className={`flex h-[20%] w-[100%] justify-center items-center ${selected_note?"hidden":""}`}>
        <img src={note} alt=""  width={'50vmin'} height={'50vmin'} />
      <h1 className='text-[8vmin] font-semibold duration-200'>No note selected. Start by picking or creating one!</h1>
      </span>
        
      
      <div className={`h-[20%] w-[100%] flex flex-col justify-center  pl-[4%] ${selected_note?'':"hidden"} ${selectedfolder?.notes.length==0?'hidden':""} `}>

        <input type="text" value={note_title} className='outline-none border-0 text-[6vmin] bg-transparent h-[50%] text-gray-400' 
        onChange={handlechange}placeholder='Give a title..'/>
        {/* <div className='absolute top-[2%] right-[1%] h-[5%] w-[50%] flex justify-center items-center gap-2'>
        <select name="" id="" className="dow_op w-[50%] h-[100%]  bg-orange-500 rounded-lg text-[3vmin] md:text-[2vmin] font-semibold text-white border-2 border-white">
          <option value="TXT">{selected_note?.note_name}.txt</option>
          <option value="DOCX">{selected_note?.note_name}.docx</option>
          <option value="None" selected>Select a Format</option>
        </select>
          <button className='text-[3vmin] h-[110%] border-2 rounded-lg bg-orange-500 border-white px-2 '>Dowload</button>
          </div> */}
        <span className='flex w-[100%] h-[100%] justify-start items-center flex-row  pl-1 '>
          <h5 className='text-[2vmin]'>Created - {selected_note?.time}</h5>
          <span className='flex w-[50%] h-[20%]  items-center justify-center text-[2vmin]'>
            <img src={mini} alt="" className='w-[3vmin]' />
          <h5>{selectedfolder?.folname} \ </h5>
          <img src={post} alt=""  className='w-[3vmin]'  />
          <h5>{selected_note?.note_name}</h5>
          </span>
          <h5 className='text-[2vmin] w-[20%] text-center'>Total characters:{length}</h5>
        </span>

      </div>
      <CodeMirror className={`shadow-lg text-[3vmin] w-[100vw] h-[85%] bg-slate-300 dark:bg-gray-950   ${!selected_note?'hidden':""} ` }
      extensions={[markdown(),EditorView.lineWrapping,
        EditorView.theme({
         '&':{
          paddingleft:'0px',
          overflow:'hide',
         },
          ".cm-content":{
            padding:"10px",
           
            width:"90%",
            height:"100%",
          }
        })
      ]}   theme={oneDark} maxHeight='100vh' width='100vw' height='100vh' value={selected_note?.notecontent || ''} onChange={(value)=>{
        
        handlenote(value)}} basicSetup={{
      lineNumbers:false,
      highlightActiveLine:false,
      foldGutter:false
     }} overflow="auto"/>
      

    
     </div>
    </>
  )
}

export default Home
