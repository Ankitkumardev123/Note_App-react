import { StrictMode } from "react";
import App from "./App";
import { createRoot} from "react-dom/client";
import './App.css'
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Home from "./pages/Home";
import ProtectRoutes from "./ProtectRoutes";
import NoteEditArea from './pages/NoteEditArea'
import { useSelector } from 'react-redux'

const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route  path='/' element={
            <ProtectRoutes >
                <Home/>
            </ProtectRoutes>} />
            <Route  path='/login' element={
            <ProtectRoutes >
                <Login/>
            </ProtectRoutes>} />
            <Route  path='/signup' element={
            <ProtectRoutes >
                <Signup/>
            </ProtectRoutes>} />
            <Route  path='/NoteEditArea' element={
            <ProtectRoutes >
                <NoteEditArea/>
            </ProtectRoutes>} />
            
           
        </Route>
    ),
    {
        basename:'/'
    }
)
createRoot(document.getElementById('root')).render(
   <Provider store={store}>
   <RouterProvider router={router}/>
   </Provider>

    
)
