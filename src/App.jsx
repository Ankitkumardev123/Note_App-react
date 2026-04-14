import React, { useCallback, useEffect, useRef, useState } from 'react'

import Navbar from './pages/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { setcurentuser, setfolders, setlogined, setloginuser, setselectfolder } from './noteslice/noteslices'
import { query,where,getDocs, collection, doc, updateDoc } from 'firebase/firestore'
import { Auth, database } from './firebase/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { Link, useNavigate } from 'react-router-dom'

function App() {
  const userdata=useSelector(state=>state.noted.currentuser)
  

  const [loader, setloader] = useState(false)
 
  const fetch_on =useSelector(state=>state.noted.fetching)
   const fetchref=useRef(fetch_on)
   const islogined=useSelector(state=>state.noted.logined)
  const selected_folder=useSelector(state=>state.noted.selectedfolderid)
      const folders=useSelector(state=>state.noted.Folders)
      const selected_folders=folders?.find(fol=>fol.id==selected_folder) || null
      const selected_note=useSelector(state=>state.noted.selectednote)
      const selected_folderid=useSelector(state=>state.noted.selectedfolderid)
    const currentuser=useSelector(state=>state.noted.currentuser)
  // function protectedRoute({user,children}){
  //   if(!user)
  //     return <Navigate to="/login"/>
  // }
   useEffect(()=>{
     fetchref.current=fetch_on
   },[fetch_on])
const dispatch=useDispatch()
const navigate=useNavigate()

useEffect(()=>{
  if(!islogined){
    navigate('/')
  }
  else{
    navigate("/NoteEditArea")
  }
const handlerelogin=
  onAuthStateChanged(Auth,async (user)=>{

    if(user && fetchref.current){
      
      setloader(true)
      try{
        
        const email=user?.providerData[0]?.email
       
        const q= query(collection(database, "users"), where("email","==",`${email}`));
            const dat= await getDocs(q)
           
            const userdata=dat.docs[0].data()
            
        dispatch(setloginuser(userdata))
           dispatch(setlogined(true))
           navigate("/NoteEditArea")
           setloader(false)
           setTimeout(() => {
             alert("Login successful!")
           }, 1000);
        return;
    }catch(error){
      alert("User check yout network connection!!")
      setloader(false)
     
    }
    
  }
    else{
      setloader(false)
     
           
    }
  });
  return()=>{handlerelogin()};
},[]);

  


const handleupdate= async()=>{
    try{
  const q=query(collection(database,"users"),where('email','==',userdata?.email))
  const datafetch=await getDocs(q)

  if(datafetch.empty)
  {
    alert("User not found for update.");
    return;
  }
  const user=datafetch?.docs[0]
  await updateDoc(doc(database,"users",user?.id),{
    ...userdata
  })
 
  }catch(error){
    alert("Oops! can't auto save chnages...\nCheck Your Network connection!!")
  }
}
  useEffect(()=>{
   
    if(userdata?.user_folders)
    {
      
  dispatch(setfolders(userdata?.user_folders||[]))
 
      setloginuser({...userdata,user_folders:folders})
    }
  },[folders])

useEffect(()=>{
 
  if(userdata?.email !=="notfound@gmail.com"){
 
    handleupdate()
    
  }
},[userdata])
  return (
   <>
   <div  className={`fixed bg-black w-[100%] h-full bg-gradient-to-t
     z-50 scrollbar-hide grid place-items-center overflow-hidden   opacity-65 ${loader?' ':'hidden'}`}>
    <div className='w-20 h-20 border-8 rounded-full border-t-black animate-spin '></div>
   </div>
    <Navbar/>
    <Outlet/>
  </>
  )
}

export default App