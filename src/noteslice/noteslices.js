import { createSlice,current,nanoid} from "@reduxjs/toolkit";

import { useEffect } from "react";
import { database } from "../firebase/firebase";
import { doc, setDoc,collection,addDoc,  getDocs, query,where} from "firebase/firestore"; 
import { useDispatch } from "react-redux";

const initialState={
    
    logined:false,
   menubar:false,
   editbar:false,
   currentuser:{
            username:"User_name",
            password:'********',
            email:"notfound@gmail.com",
           
            created:'404,404,404',
            profile_pic:null
   },
   Folders:[],
   selectednote:null,
   selectedfolderid:null,
   fetching:true,
   
}
const handledata=async(data)=>{

   await addDoc(collection(database, "users"), {...data});
   
}


const notesslices=createSlice({
    name:"noto",
    initialState:initialState,
    reducers:{
        setlogined:(state,action)=>{
            state.logined=action.payload ?? !state.logined
        },
         setprofilepic:(state,action)=>{
          
            state.currentuser.profile_pic=action.payload
        },
        setfolders:(state,action)=>{
            state.Folders=action.payload;
            
        },
        setuserdata:(state,actions)=>{
            state.currentuser={...actions.payload}
        },
        menubartoggle:(state,action)=>{
            state.menubar=action.payload ?? !state.menubar
           
        },
        editbartoggle:(state,action)=>{
            state.editbar=action.payload ?? !state.editbar
          
        },
        addfolder:(state,action)=>{
            
            let fol={
                folname:action.payload.name,
                id:nanoid(),
                notes:[]
            }
            state.Folders.push(fol)
            state.currentuser={...state.currentuser,user_folders:state.Folders}
            state.selectedfolderid=fol?.id
            state.selectednote=null
        },
        addNote:(state,actions)=>{
            const {id,name}=actions.payload
          
           const date=new Date
              const temp=date.toLocaleString("en-US",{
        month:"short",
        day:'2-digit',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit',
        hour12:true
      })
            
          
            let notee={
                
                note_name:name,
                id:nanoid(),
               notetitle:'',
                notecontent:'',
                time:`${temp}`,
                  lasttime:`${temp}`

            }
           
            state.Folders=state.Folders.map(folder=>folder.id==id?{...folder,notes:[...folder.notes,notee]}:folder)
          state.currentuser={...state.currentuser,user_folders:state.Folders}
          state.selectednote=window.outerWidth>=768 ? notee:null
        },
        deletenote:(state,action)=>{
           
            const {id,folid}=action.payload
           state.Folders=state.Folders.map(folder=>folder.id==folid?{...folder,notes:folder.notes=folder.notes.filter(n=>n.id!=id)}:folder)
           state.currentuser={...state.currentuser,user_folders:state.Folders}
           state.selectednote=null
           const selectedfolder=state.Folders.find(fol=>fol.id==state.selectedfolderid)
           state.selectednote=window.outerWidth>=768?selectedfolder?.notes[selectedfolder.length-1>0?selectedfolder.length-1:0] || null:null
        },
         deletefolder:(state,actions)=>{
            const {id}=actions.payload
           
            state.Folders=state.Folders.filter(folder=>folder.id!=id)
            state.currentuser={...state.currentuser,user_folders:state.Folders}
            state.selectednote=state.selectedfolderid==id?null:state.selectednote
        },
        updatenote:(state,action)=>{
             const {id,folid,prop}=action.payload
             const date=new Date;

              const temp=date.toLocaleString("en-US",{
        month:"short",
        day:'2-digit',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit',
        hour12:true
      })
           
           
             
             state.Folders=state.Folders.map(folder=>folder.id==folid?{...folder,notes:folder.notes.map(n=>n.id==id?{...n,...prop,
            lasttime:`${temp}`
             }:n)}:folder);
             state.currentuser={...state.currentuser,user_folders:state.Folders}
             let selected_folder={...state.Folders.filter(folder=>folder.id==state.selectedfolderid)}
            state.selectednote=window.outerWidth>=768 ? selected_folder[0].notes.filter(n=>n.id==id)[0]:state.selectednote
             
        },
        updatefolder:(state,action)=>{
             const {folid,prop}=action.payload
            
             state.Folders=state.Folders.map(folder=>folder.id==folid?{...folder,...prop}:folder);
             state.currentuser={...state.currentuser,user_folders:state.Folders}
             
        },
        setselectednote:(state,action)=>{
            
           let note=action.payload
            state.selectednote=action.payload 
            
        },
         setselectfolder:(state,action)=>{
          
            state.selectedfolderid=action.payload
            // state.currentuser={...state.currentuser,user_folders:state.Folders}
            let selelected_folder=state.Folders?.find(f=>f.id==state.selectedfolderid)
        
            state.selectednote=window.outerWidth>=768?selelected_folder?.notes[0] ??  null:null
            
        }
        ,



         setcurentuser:(state,action)=>{
             const date=new Date
             const temp=date.toLocaleString("en-US",{
        month:"short",
        day:'2-digit',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit',
        hour12:true
      })
            
            

          const users={
           ... action.payload,
            profile_pic:null,
    created:`${temp}`,
    user_folders:[{
        folname:'default_notes',
        id:1,
        notes:[
            {
                note_name:'Welcome to MyNote..',
                id:2,
                notetitle:'Welcome note',
                notecontent:"# 👋 Welcome to MyNote!\n\n" +
"### Hey there! Great to have you here 🎉\n\n" +
"MyNote is your personal space to write, organize, and think clearly.\n\n" +
"---\n\n" +
"## 📁 Folders\n\n" +
"- Create **folders** to group related notes together\n" +
"- Click the **folder icon** in the sidebar to add one\n" +
"- You can have as many folders as you need\n\n" +
"---\n\n" +
"## 📝 Notes\n\n" +
"- Inside each folder, create **notes** with the **+ button**\n" +
"- Give your notes a **title** at the top\n" +
"- Start writing in the editor below\n\n" +
"---\n\n" +
"## ✍️ Markdown Support\n\n" +
"MyNote supports full **Markdown** formatting:\n\n" +
"| Element | Syntax |\n" +
"|---|---|\n" +
"| Bold | `**bold**` |\n" +
"| Italic | `*italic*` |\n" +
"| Heading | `# Heading` |\n" +
"| Code | `` `inline code` `` |\n" +
"| List | `- item` |\n" +
"| Divider | `---` |\n\n" +
"---\n\n" +
"## 👁️ Preview Mode\n\n" +
"- Click the **eye icon** in the toolbar to toggle **Preview**\n" +
"- Preview renders your Markdown beautifully\n" +
"- Switch back anytime to keep editing\n\n" +
"---\n\n" +
"## 🖥️ Fullscreen Mode *(Desktop)*\n\n" +
"- Click the **maximize icon** (top-left of the editor) to enter **Fullscreen**\n" +
"- Hides the note list for a distraction-free writing experience\n" +
"- Click **minimize** to return to normal view\n\n" +
"---\n\n" +
"## 💾 Auto-Save\n\n" +
"> Your notes are **saved automatically** as you type.\n" +
"> No save button needed — just write!\n\n" +
"---\n\n" +
"## 📋 Tips & Tricks\n\n" +
"- Use `---` to add a clean **horizontal divider**\n" +
"- Use `> text` for **blockquotes**\n" +
"- Use ` ``` ` for **code blocks**\n" +
"- Click the **info icon** to see note details like character count and dates\n\n" +
"---\n\n" +
"## 🚀 Try It Now\n\n" +
"- [ ] Create your first folder\n" +
"- [ ] Write a note in Markdown\n" +
"- [ ] Toggle Preview mode to see it rendered\n" +
"- [ ] Try Fullscreen mode on desktop\n\n" +
"---\n\n" +
"*Made with ❤️ just for you.*\n\n" +
"**— MyNote | Created by Ankit Kumar Dash**\n\n" +
"[⭐ Star on GitHub](https://github.com/Ankitkumardev123/Note_App-react)",
                 time:`${temp}`,
                  lasttime:`${temp}`
            }
        ]}]
    
          }
       
        handledata(users)
        state.currentuser={...users}
        state.Folders=state.currentuser.user_folders||[]
          state.selectedfolderid=users?.user_folders?.[0]?.id || []
        state.selectednote=window.outerWidth>=768?state.Folders[0]?.notes[0] || null :null

        },
       
        setloginuser:(state,action)=>{
            
            state.currentuser={...action.payload}
            state.Folders=state.currentuser.user_folders||[]
             state.selectedfolderid=state.Folders[0]?.id||[]
             state.selectednote=window.outerWidth>=768?state.Folders[0]?.notes[0] || null :null


        },
        setfetching:(state,action)=>{
            state.fetching=action.payload ?? !state.fetching
        }
       
}})

export const {setlogined,menubartoggle,editbartoggle,deletefolder,deletenote,addfolder,addNote,updatenote,updatefolder,setselectednote,setselectfolder,
    setfolders,setprofilepic,setcurentuser,setloginuser , setfetching} =notesslices.actions;
export default notesslices.reducer;