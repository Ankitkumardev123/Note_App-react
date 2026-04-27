import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectRoutes({children}) {
 const user=useSelector(state=>state.noted.logined)
    const navigate=useNavigate();
 useEffect(()=>{
    if(user) navigate("/NoteEditArea")
 })
 return children
}
