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
import Contact from "./pages/Contactus";
const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route  path='/' element={<Home/>} />
            <Route  path='/login' element={<Login/>} />
            <Route  path='/signup' element={<Signup/>} />
            <Route  path='/contact' element={<Contact/>} />
           
        </Route>
    ),
    {
        basename:'/Note_App-react/'
    }
)
createRoot(document.getElementById('root')).render(
   <Provider store={store}>
   <RouterProvider router={router}/>
   </Provider>

    
)
