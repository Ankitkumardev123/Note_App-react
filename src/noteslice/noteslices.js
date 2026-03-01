import { createSlice,current,nanoid} from "@reduxjs/toolkit";

import { useEffect } from "react";
import { database } from "../firebase/firebase";
import { doc, setDoc,collection,addDoc,  getDocs, query,where} from "firebase/firestore"; 
import { useDispatch } from "react-redux";

const month=['january','february','march','april','may','june','july','august','september','october','november','december']
const initialState={
    logined:false,
   menubar:false,
   editbar:false,
   currentuser:{
            username:"User_name",
            password:'********',
            email:"notfound@gmail.com",
            phonenumber:'Notfound',
            created:'404,404,404',
            profile_pic:null
   },
   Folders:[
    
   ],
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
            if(state.menubar) state.editbar=false
        },
        editbartoggle:(state,action)=>{
            state.editbar=action.payload ?? !state.editbar
            if(state.editbar) state.menubar=false
        },
        addfolder:(state,action)=>{
            
            let fol={
                folname:action.payload.name,
                id:nanoid(),
                notes:[]
            }
            state.Folders.push(fol)
            state.currentuser={...state.currentuser,user_folders:state.Folders}
        },
        addNote:(state,actions)=>{
            const {id,name}=actions.payload
          const date1= new Date
           
            let notee={
                
                note_name:name,
                id:nanoid(),
               notetitle:'',
                notecontent:'',
                time:`${month[date1.getMonth()]} , ${date1.getDate()}, ${date1.getFullYear()} | ${date1.getHours()}:${`${date1.getMinutes()}`.length==1?'0'+date1.getMinutes():date1.getMinutes()}`,

            }
           
            state.Folders=state.Folders.map(folder=>folder.id==id?{...folder,notes:[...folder.notes,notee]}:folder)
          state.currentuser={...state.currentuser,user_folders:state.Folders}
        },
        deletenote:(state,action)=>{
           
            const {id,folid}=action.payload
           state.Folders=state.Folders.map(folder=>folder.id==folid?{...folder,notes:folder.notes=folder.notes.filter(n=>n.id!=id)}:folder)
           state.currentuser={...state.currentuser,user_folders:state.Folders}
        },
         deletefolder:(state,actions)=>{
            const {id}=actions.payload
           
            state.Folders=state.Folders.filter(folder=>folder.id!=id)
            state.currentuser={...state.currentuser,user_folders:state.Folders}
        },
        updatenote:(state,action)=>{
             const {id,folid,prop}=action.payload
             
             state.Folders=state.Folders.map(folder=>folder.id==folid?{...folder,notes:folder.notes.map(n=>n.id==id?{...n,...prop}:n)}:folder);
             state.currentuser={...state.currentuser,user_folders:state.Folders}
        },
        updatefolder:(state,action)=>{
             const {folid,prop}=action.payload
            
             state.Folders=state.Folders.map(folder=>folder.id==folid?{...folder,...prop}:folder);
             state.currentuser={...state.currentuser,user_folders:state.Folders}
        },
        setselectednote:(state,action)=>{
            state.selectednote=action.payload
            state.currentuser={...state.currentuser,user_folders:state.Folders}
        },
         setselectfolder:(state,action)=>{
          
            state.selectedfolderid=action.payload
            state.currentuser={...state.currentuser,user_folders:state.Folders}
        }
        ,



         setcurentuser:(state,action)=>{
             const date=new Date
          const users={
           ... action.payload,
            profile_pic:null,
    created:`${month[date.getMonth()]},${date.getDate()},${date.getFullYear()}`,
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
"\–- Team MyNote\n\n",
                time:`${month[date.getMonth()]} , ${date.getDate()}, ${date.getFullYear()} | ${date.getHours()}:${`${date.getMinutes()}`.length==1?'0'+date.getMinutes():date.getMinutes()}`,
            }
        ]}]
          }
       
        handledata(users)
        state.currentuser={...users}
       
        },
        setuserfolder:(state,action)=>{
            state.currentuser.user_folders=action.payload
            state.currentuser={...state.currentuser,user_folders:state.Folders}
        },
        setloginuser:(state,action)=>{
            
            state.currentuser={...action.payload}
        },
        setfetching:(state,action)=>{
            state.fetching=action.payload ?? !state.fetching
        }
       
}})

export const {setlogined,menubartoggle,editbartoggle,deletefolder,deletenote,addfolder,addNote,updatenote,updatefolder,setselectednote,setselectfolder,
    setfolders,setprofilepic,setcurentuser,setuserfolder,setloginuser , setfetching} =notesslices.actions;
export default notesslices.reducer;