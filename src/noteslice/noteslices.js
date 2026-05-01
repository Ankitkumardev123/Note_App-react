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
                notecontent:"# 👋 Welcome to MyNote\n\n" +
"Hey there, and welcome! 🎉\n\n" +
"You’ve just created your first note. Here’s what you can do with MyNote:\n\n" +
"✅ Create folders to organize your notes\n" +
"✅ Write in Markdown — format using **bold**, *italic*, `inline code`, and more\n" +
"✅ Notes are saved automatically\n" +
"✅ Access your notes anytime, anywhere\n\n" +
"---\n\n" +
"## ✍️ Try it now\n\n" +
"- Type anything below\n" +
"- Create your first folder\n" +
"- Explore the editor\n\n" +
"---\n\n" +
"Made with ❤️ just for you.\n\n" +
"\–- Team MyNote\n"+
"-Created  by Ankit Kumar DAsh",
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