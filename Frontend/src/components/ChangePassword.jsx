import { useContext, useState } from "react"
import UserContext from "../context/UserContext"
import axios from "axios"

const ChangePassword = () =>{
    const [user, _] = useContext(UserContext)
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")

    const change = async() =>{
        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_URL_USERS}/change-password`,{newPassword,oldPassword},{withCredentials:true})
            
        } catch (error) {
            console.error("error while changing password", error);

        }
    }

    return(
        <div className="text-[#ffffff] mt-2 w-full">
            <h1>Change Password:</h1>
            <div className="w-full flex flex-col justify-center items-center mt-4 gap-3">
                <input 
                    type="text" 
                    name="oldPassword"
                    placeholder="old password"
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="p-2 outline-none border-2 border-[#ffffff] rounded-xl w-11/12"
                />
                <input 
                    type="text" 
                    name="newPassword" 
                    placeholder="new password"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="p-2 outline-none border-2 border-[#ffffff] rounded-xl w-11/12"
                />
                <button 
                    type="submit" 
                    onClick={change}
                    className="bg-blue-500 p-2 w-11/12 rounded-xl cursor-pointer active:scale-95"
                >Change
                </button>
            </div>
        </div>
    )
}

export default ChangePassword