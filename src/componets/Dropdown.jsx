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

export default function Dropdown({fid,notid}) {
    const dispatch=useDispatch()
  return (
    <DropdownMenu className={'border-0'} >
      <DropdownMenuTrigger asChild >
        <Button variant="outline" className={'w-5 p-0 bg-transparent border-0'} >
     <img src={menu} className="md:size-[1.4rem] lg:size-[1.4rem] sm:size-[1.4rem] size-[1.1rem]" alt="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'px-0'}>
       
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" className={' border-1 border-white border-transparent'} onSelect={(e)=>{
        
            dispatch(deletenote({id:notid,folid:fid}))
        }}>
         <img src={trash} className="size-[1.2rem]" alt=""  />
         Move to trash
        </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
  )
}