import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
import { useDispatch } from "react-redux"
import { deletenote } from "@/noteslice/noteslices"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import trash from "../images/trash.png"
import menu from "../images/menu.png"
import { useNavigate } from "react-router-dom"

export default function NanDropdown({fid,notid}) {
    
    const navigate=useNavigate()
  return (
    <DropdownMenu className={'border-0  '} >
      <DropdownMenuTrigger asChild >
        <Button variant="outline" className={'w-5 p-0 bg-transparent border-0'} >
     <img src={menu} className="md:size-[1.4rem] lg:size-[1.4rem] sm:size-[1.4rem] size-[1.1rem]" alt="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'pb-1  flex flex-col justify-center items-center text-center'}>
       
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" className={'w-full  grid place-content-center text-lg'} onSelect={(e)=>{
        navigate("/")
            
        }}>
         Home
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" className={' w-full border-t-[1px] border-gray-600 grid text-lg place-content-center'} onSelect={(e)=>{
        navigate("/login")
            
        }}>
         Login
        </DropdownMenuItem>
         <DropdownMenuItem variant="destructive" className={' w-full border-t-[1px] text-lg border-gray-600 grid place-content-center'} onSelect={(e)=>{
         navigate("/signup")
            
        }}>
       Signup
        </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
  )
}