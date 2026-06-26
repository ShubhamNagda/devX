import axios from "axios"
import { LogOut } from "lucide-react"
const Logout = () =>{
    const logout = async () =>{
        try {
        await axios.post(`${import.meta.env.VITE_API_URL_USERS}/logout`, {}, {withCredentials:true})
             window.location.reload();
        } catch (error) {
            console.error("error while log out: ", error);
            
        }
    }

    return(
        <div className="absolute top-1 right-2 text-red-600 flex flex-col p-0 m-0 gap-0 cursor-pointer ">
            <LogOut onClick={logout}/>
            <p>logOut</p>
        </div>
    )
}

export default Logout;