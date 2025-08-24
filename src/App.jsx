import React, { useCallback, useEffect } from 'react'

import Navbar from './pages/Navbar'
import { Outlet } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { setcurentuser, setfolders, setloginuser } from './noteslice/noteslices'
import { query,where,getDocs, collection, doc, updateDoc } from 'firebase/firestore'
import { database } from './firebase/firebase'
function App() {
  const userdata=useSelector(state=>state.noted.currentuser)
  const folders=useSelector(state=> state.noted.Folders) ?? []
  
const dispatch=useDispatch()
const handleupdate= async()=>{
  const q=query(collection(database,"users"),where('email','==',userdata?.email))
  const datafetch=await getDocs(q)
  
  if(datafetch.empty)
  {
    console.error("User not found for update.");
    return;
  }
  const user=datafetch?.docs[0]
  await updateDoc(doc(database,"users",user?.id),{
    ...userdata
  })
}
  useEffect(()=>{
   
    if(folders.length==0)
    {
       
  dispatch(setfolders(userdata?.user_folders))
 
      setloginuser({...userdata,user_folders:folders})
    }
  },[folders])

useEffect(()=>{
 
  if(userdata.email !=="notfound@gmail.com"){
 
    handleupdate()
  }
},[userdata])
  return (
   <>
    <Navbar/>
    <Outlet/>
  </>
  )
}

export default App