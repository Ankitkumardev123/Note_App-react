import remarkGfm from 'remark-gfm';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Note from '../componets/Note'
import Folder from '../componets/Folder'
import ReactMarkdown from "react-markdown"
import Dropdown from "../componets/Dropdown"
import { menubartoggle, editbartoggle, addfolder, updatenote, setselectednote, setselectfolder, addNote } from '../noteslice/noteslices'
import CodeMirror from "@uiw/react-codemirror"
import { oneDark } from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@uiw/react-codemirror'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
  const select = useRef(null)
  const textarea = useRef(null)
  const navigate = useNavigate()
  let folders = useSelector(state => state.noted.Folders)
  const [dowload_on, setdownload] = useState(false)
  const [create, setcreate] = useState(false)
  const [msg, setmsg] = useState('')

  const editbar2 = useRef(null)
  const ani = useRef(null)
  const ani1 = useRef(null)
  const container = useRef(null)

  const [index_note, setindex_note] = useState(null)

  const slide = useSelector(state => state.noted.editbar)
  const selected_note = useSelector(state => state.noted.selectednote)
  const selected_folderid = useSelector(state => state.noted.selectedfolderid)
  const islogined = useSelector(state => state.noted.logined)
  let selectedfolder = folders?.find(f => f.id == selected_folderid)
  const [notes, setnotes] = useState()
  let welcome = 0
  const [note_title, setnote_title] = useState('')
  const dispatch = useDispatch()
  const [notecontent, setnotecontent] = useState(selected_note?.notecontent ?? '')
  const [notename, setnotename] = useState(selected_note?.notename || '')
  const [resize, setresize] = useState(false)
  const [preview, setpreview] = useState(false)
  const [note_detail, setnote_detail] = useState(false)
  const [note_bar, setnotebar] = useState(false)
  const [createnote, setcreatenote] = useState(false)
  const [createmsg, setcreatemsg] = useState('')
  const [toggle_editPanel, settoggleEditPanel] = useState(selected_note == null)
  const note_content = selected_note?.note_content || ''
  const [length, setlength] = useState(selected_note?.notecontent.length || 0)
  const [ismobile, setIsmobile] = useState(window.outerWidth < 768)
  const [infopanel, setinfopanel] = useState(false)
  const [Search_msg, setsearch_msg] = useState('')
  const [Search_notemsg, setsearch_notemsg] = useState('')

  const handleresize = () => {
    setIsmobile(window.outerWidth < 768)
  }

  useEffect(() => {
    window.addEventListener("resize", handleresize)
    return () => { window.removeEventListener("resize", handleresize) }
  }, [])

  useEffect(() => {
    if (slide == false)
      setcreate(false)
  }, [slide])

  useGSAP(() => {
    if (slide == true)
      gsap.to(editbar2.current, {
        duration: 1,
        x: 0,
        ease: 'power4.out'
      })
    else
      gsap.to(editbar2.current, {
        duration: 1,
        x: '-100%',
        ease: 'power4.in'
      })
  }, [slide])

  useEffect(() => {
    setnote_title(selected_note?.notetitle || '')
    setlength(selected_note?.['notecontent'].length || 0)
    setnotename(selected_note?.note_name || '')
    setnotecontent(selected_note?.notecontent || '')
    settoggleEditPanel(selected_note == null)
  }, [selected_note])

  const handlechange = (e) => {
    const new_title = e.target.value
    setnote_title(new_title)
    dispatch(updatenote({
      id: selected_note?.id,
      folid: selectedfolder?.id,
      prop: { notetitle: new_title }
    }))
  }

  const handlenote = (e) => {
    setlength(e.target.value)
    setnotecontent(e.target.value)
    dispatch(updatenote({
      id: selected_note?.id,
      folid: selectedfolder?.id,
      prop: { notecontent: e.target.value }
    }))
  }

  const handlesearch = (e) => {
    setsearch_msg(e.target.value)
  }

  const handlesearch1 = (e) => {
    setcreatenote(false)
    setsearch_notemsg(e.target.value)
  }

  return (
    <>
      {/* Sidebar */}
      
      <div
        ref={editbar2}
        className="edit fixed top-0 left-0 w-[78vw] sm:w-[45vw] md:w-[35vw] lg:w-[25vw] h-screen z-50
          bg-neutral-950 border-r border-gray-700 flex flex-col translate-x-[-100%]"
      >
       
        <div className="w-full h-14 sm:h-16 shrink-0 flex items-center justify-start border-b border-gray-600 pl-3">
          <img
            loading="lazy"
            src={close}
            className="size-7 sm:size-8 cursor-pointer"
            alt=""
            onClick={() => dispatch(editbartoggle(!slide))}
          />
        </div>

        {/* All Folders */}
        <div className="w-full h-11 sm:h-12 shrink-0 flex items-center justify-start border-b border-gray-600 hover:bg-slate-950">
          <div className="w-12 sm:w-14 h-full shrink-0 bg-slate-950 border-r border-gray-600" />
          <span className="flex-1 h-full flex items-center gap-2 px-2">
            <img loading="lazy" src={inbox} className="size-5 sm:size-6 shrink-0" alt="" />
            <h1 className="text-white font-poppins font-semibold text-xs sm:text-sm md:text-base truncate">
              All Folders
            </h1>
          </span>
          <div
            className="w-12 sm:w-14 h-full shrink-0 bg-slate-950 grid place-items-center border-l border-gray-600 cursor-pointer"
            onClick={() => setcreate(prev => !prev)}
          >
            <img loading="lazy" src={!create ? remove : close} className="size-5 sm:size-6" alt="" />
          </div>
        </div>

        {/* Search folders */}
        <div className="w-full h-11 sm:h-12 shrink-0 bg-gradient-to-r bg-[length:200%_200%] animate-gradient from-purple-700 via-pink-600 to-cyan-600">
          <div className="w-full h-full flex items-center bg-black/60 backdrop-blur-lg">
            <div className="w-12 sm:w-14 h-full shrink-0 bg-slate-950 border-r border-gray-600 grid place-items-center">
              <img loading="lazy" src={searchicon} className="size-5 sm:size-6" alt="" />
            </div>
            <input
              type="text"
              className="flex-1 h-full text-sm text-white font-poppins font-thin bg-transparent outline-none pl-3 placeholder:text-gray-400"
              placeholder="Search folders...."
              onChange={handlesearch}
            />
          </div>
        </div>

        <div className={`w-full h-11 sm:h-12 shrink-0 border-t border-gray-600 bg-gradient-to-r bg-[length:200%_200%] animate-gradient from-purple-700 via-pink-600 to-cyan-600 ${create ? "" : "hidden"}`}>
          <div className="w-full h-full flex items-center bg-black/60 backdrop-blur-lg">
            <div className="w-12 sm:w-14 h-full shrink-0 grid place-items-center">
              <img loading="lazy" src={folder} className="size-5 sm:size-6" alt="" />
            </div>
            <input
              type="text"
              value={msg}
              className="flex-1 h-full text-cyan-400 text-sm outline-none bg-transparent placeholder:text-cyan-600"
              placeholder="Give a name.."
              onChange={e => setmsg(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  if (msg !== '') {
                    dispatch(addfolder({ name: msg }))
                    setcreate(false)
                    setmsg('')
                  }
                }
              }}
            />
            <div
              className="w-12 sm:w-14 h-full shrink-0 border-l border-gray-500 bg-slate-950 grid place-items-center cursor-pointer"
              onClick={() => {
                if (msg !== '') {
                  dispatch(addfolder({ name: msg }))
                  setcreate(false)
                  setmsg('')
                } else {
                  alert("Folder name is empty...")
                }
              }}
            >
              <img loading="lazy" src={save} className="size-6 sm:size-7" alt="" />
            </div>
          </div>
        </div>

        {/* Folders list */}
        <div className="flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden scrollbar-hide flex flex-col ">
          {folders?.map((fold, index) =>
            <Folder key={fold.id} fold={fold} ind={index} fol_ser={`fol${index}`} set1={setcreate} searchmsg={Search_msg} />
          )}
        </div>
      </div>

      {/* Main editing area */}
      <div className="w-screen h-[100vh] flex flex-col overflow-hidden">

      
        <div className="h-[9vh] w-full shrink-0" />

       
        <div className={`flex-1 min-h-0 w-full flex overflow-hidden `}>

         
          <div
            className={`
              shrink-0 bg-neutral-950 border-y-2 border-r-2 border-gray-500
              flex flex-col overflow-hidden
              md:w-[40%] lg:w-[30%]
              ${resize ? "hidden" : ""}
              ${ismobile ? (toggle_editPanel ? "w-full" : "hidden") : ""}
            `}
          >
            
            <div className="w-full h-12 sm:h-14 shrink-0 bg-gradient-to-r bg-[length:200%_200%] from-purple-700 via-pink-600 to-cyan-500 animate-gradient border-b-2 border-gray-500">
              <div className="w-full h-full bg-black/40 backdrop-blur-lg flex items-center justify-center">
                <div className="flex-1 justify-center min-w-0 flex items-center gap-2 pl-3 text-sm sm:text-base lg:text-lg font-semibold font-outfit text-white">
                  <img loading="lazy" src={folder} className="size-6 sm:size-7 shrink-0" alt="" />
                  <span className="truncate">{selectedfolder?.folname}</span>
                </div>
                <div
                  className="w-12 sm:w-14 h-full shrink-0 bg-slate-950 flex items-center justify-center border-l border-gray-600 cursor-pointer"
                  onClick={() => setcreatenote(!createnote)}
                >
                  <img loading="lazy" src={!createnote ? remove : close} alt="" className="size-6 sm:size-7" />
                </div>
              </div>
            </div>

            {/* Search notes */}
            <div className="w-full h-11 sm:h-13 shrink-0 bg-gradient-to-r bg-[length:200%_200%] border-b border-gray-600 animate-gradient from-purple-700 via-pink-600 to-cyan-600">
              <div className="w-full h-full flex items-center bg-black/60 backdrop-blur-lg">
                <div className="w-12 sm:w-14 h-full shrink-0 bg-slate-950 border-r border-gray-600 grid place-items-center">
                  <img loading="lazy" src={searchicon} className="size-5 sm:size-6" alt="" />
                </div>
                <input
                  type="text"
                  className="flex-1 h-full text-sm text-white font-poppins font-thin bg-transparent outline-none pl-3 placeholder:text-gray-400"
                  placeholder="Search notes...."
                  onChange={handlesearch1}
                />
              </div>
            </div>

            
            <div className="relative flex-1 min-h-0 w-full flex flex-col overflow-y-auto overflow-x-hidden scrollbar-hide">

             
              {selectedfolder?.notes?.length === 0 && (
                <div className="absolute inset-0 grid place-items-center bg-black text-sm sm:text-base font-poppins font-semibold text-gray-400 pointer-events-none">
                  Create a note..
                </div>
              )}

              <div className={`w-full h-12 sm:h-14 shrink-0 border-2 z-10 border-purple-700 flex items-center bg-cyan-700 ${createnote ? "" : "hidden"}`}>
                <span className="w-full h-full flex justify-start items-center bg-black/40">
                  <div className="w-5 sm:w-8 h-full shrink-0 " />
                  <img loading="lazy" src={note} className="size-5 sm:size-6 shrink-0" alt="" />
                  <input
                    type="text"
                    value={createmsg}
                    className="w-full h-full bg-transparent outline-none font-poppins font-semibold text-purple-300 text-sm sm:text-base px-2"
                    onChange={(e) => setcreatemsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (createmsg !== '') {
                          dispatch(addNote({ id: selected_folderid, name: createmsg }))
                          setcreatemsg('')
                          setcreatenote(false)
                        } else {
                          window.alert("Note name is empty!")
                        }
                      }
                    }}
                    placeholder="Give a name...."
                  />
                </span>
                <span
                  className="w-[20%]  h-full shrink-0 flex items-center justify-center border-l border-purple-700 bg-black/30 cursor-pointer"
                  onClick={() => {
                    if (createmsg !== '') {
                      dispatch(addNote({ id: selected_folderid, name: createmsg }))
                      setcreatemsg('')
                      setcreatenote(false)
                    } else {
                      window.alert("Note name is empty!")
                    }
                  }}
                >
                  <img loading="lazy" src={save} alt="" className="size-6 sm:size-7 rounded-lg" />
                </span>
              </div>

              {selectedfolder?.notes?.map((not, index) =>
                <Note note_seriel={`note${index}`} key={not.id} not={not} items={{ folders }} searchmsg_note={Search_notemsg} />
              )}
            </div>
          </div>

          {/* Editor panel */}
          <div className={`flex-1 w-full border-y-2 h-full border-gray-500 bg-neutral-900 flex flex-col overflow-hidden ${ismobile ? (toggle_editPanel ? "hidden" : "") : ""}`}>

            <div className={`w-full h-12 sm:h-14 shrink-0 bg-slate-950 border-b-2 border-gray-500  ${toggle_editPanel ? "pointer-events-none" : ""}`}>
              <div className={`w-full h-full flex items-center ${selected_note?'':'hidden'}`}>
             
              <div
                className={`w-11 sm:w-14 h-full shrink-0 grid place-items-center border-r border-gray-700 cursor-pointer ${ismobile ? "" : "hidden"}`}
                onClick={() => dispatch(setselectednote(null))}
              >
                <img loading="lazy" src={back} alt="" className="size-5 sm:size-6" />
              </div>

              <div
                className={`w-11 sm:w-14 h-full shrink-0 grid place-items-center border-r cursor-pointer border-gray-700  
                  ${!ismobile ? "" : "hidden"}`}
                onClick={() => setresize(!resize)}
              >
                <img loading="lazy" src={!resize ? maximize : minimize} alt="" className="size-5 sm:size-6 cursor-pointer" />
              </div>

         
              <div className="flex-1 min-w-0 h-full flex items-center">
                <input
                  type="text"
                  value={note_title || ''}
                  onChange={handlechange}
                  className="w-full h-full px-3 bg-transparent outline-none font-poppins font-semibold text-gray-300 text-sm sm:text-base placeholder:text-gray-600 truncate"
                  placeholder="Write a note title..."
                />
              </div>

            
              <div className="h-full shrink-0 flex items-center gap-3 sm:gap-4 px-3 sm:px-4 border-l border-gray-700">
                <img loading="lazy"
                  src={preview ? eye2 : eye1}
                  alt=""
                  className="size-5 sm:size-6 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                  onClick={() => setpreview(!preview)}
                />
                <img loading="lazy"
                  src={info}
                  alt=""
                  className="size-5 sm:size-6 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                  onClick={() => setinfopanel(prev => !prev)}
                />
                <Dropdown fid={selected_folderid} notid={selected_note?.id} setpreview={setpreview} />
                </div>
              </div>
            </div>

          
            <div className={`flex-1 min-h-0 grid place-items-center ${toggle_editPanel ? "" : "hidden"}`}>
              <img loading="lazy" src={notelogo} alt="" className="size-24 sm:size-36 grayscale opacity-50" />
            </div>

            
            <div className={`flex-1 min-h-0 relative overflow-hidden ${toggle_editPanel ? "hidden" : ""}`}>

              
              <div className={`absolute inset-0 z-20 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 ${infopanel && selected_note ? "" : "hidden"}`}>
                <div className="w-full max-w-sm sm:max-w-md bg-slate-950 border border-gray-600 rounded-lg flex flex-col overflow-hidden">

                 
                  <div className="w-full h-12 shrink-0 border-b border-gray-600 flex items-center justify-between px-4">
                    <h1 className="text-gray-300 font-sans font-light text-sm sm:text-base">Document</h1>
                    <img loading="lazy"
                      src={close}
                      alt=""
                      className="size-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                      onClick={() => setinfopanel(prev => !prev)}
                    />
                  </div>

                  

                  {[
                    { label: "Created On",  value: selected_note?.time },
                    { label: "Modified On", value: selected_note?.lasttime },
                    { label: "Folder",      value: selectedfolder?.folname },
                    { label: "Note",        value: `${selected_note?.note_name ?? ''}`.slice(0, 20) },
                    { label: "Characters",  value: notecontent.length },
                  ].map(({ label, value }) => (
                    <div key={label} className="w-full h-10 flex items-center border-b border-gray-800 last:border-b-0">
                      <span className="w-28 sm:w-32 shrink-0 pl-4 text-xs sm:text-sm text-white font-sans font-light">{label}</span>
                      <span className="flex-1 pr-4 text-xs sm:text-sm text-gray-400 font-sans font-light text-right truncate">{value}</span>
                    </div>
                  ))}

                </div>
              </div>

              {/* Textarea / Preview */}
              {!preview ? (
                <textarea
                  value={notecontent}
                  placeholder="Write note content here......"
                  onChange={(e) => handlenote(e)}
                  className="w-full h-full px-4 pt-4 pb-4 bg-transparent text-gray-200
                   text-sm sm:text-base outline-none resize-none overflow-y-auto overflow-x-hidden scrollbar-hide placeholder:text-gray-600 leading-relaxed"
                />
              ) : (
              
                <div className="w-full h-full px-4 py-2 text-left gap-2 text-white overflow-y-auto overflow-x-hidden scrollbar-hide
                  prose prose-invert max-w-none
                  prose-p:my-1 prose-p:leading-relaxed prose-p:whitespace-normal
                  prose-headings:text-white prose-headings:my-2
                  prose-strong:text-white
                  prose-em:text-white
                  prose-code:text-white prose-code:bg-gray-700 prose-code:px-1 prose-code:rounded
                  prose-pre:bg-gray-800 prose-pre:my-2
                  prose-ul:my-1 prose-ul:text-white prose-ul:list-disc prose-ul:pl-5
                  prose-ol:my-1 prose-ol:text-white prose-ol:list-decimal prose-ol:pl-5
                  prose-li:my-0.5 prose-li:text-white prose-li:whitespace-pre-wrap prose-li:break-words
                  prose-blockquote:text-gray-300 prose-blockquote:border-gray-500 prose-blockquote:my-2
                  prose-a:text-blue-400
                  prose-hr:my-3 prose-hr:border-gray-600">
                  <ReactMarkdown remarkPlugins={[remarkBreaks]}>{notecontent}</ReactMarkdown>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </>
  )
}