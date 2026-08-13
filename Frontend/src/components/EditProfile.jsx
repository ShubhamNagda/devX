import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import UserIcon from "../assets/UserIcon.svg"
import { Camera } from "lucide-react";
import axios from "axios";
import Logout from "./Logout";
import ChangePassword from "./ChangePassword";

const EditProfile = ({onBack}) =>{
    const [user, setUser] = useContext(UserContext);
    const [username, setUsername] = useState(user.username)
    const [fullName, setFullName] = useState(user.fullName)
    const [email, setEmail] = useState(user.email)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    };

    const uploadProfile = async () =>{
        try{
            const formData = new FormData();
            formData.append("profilepic", image);
            const res = await axios.patch(`${import.meta.env.VITE_API_URL_USERS}/profilepic`,
                 formData,
                 {
                    withCredentials:true,
                 }
            )
                        
        }catch(error){
            console.error("error while uploading profile", error);
        }
    }

    const changeDetails = async () =>{
        try {
           await axios.patch(`${import.meta.env.VITE_API_URL_USERS}/update-user-info`,{username, email, fullName}, {withCredentials:true})
            window.location.reload();
        } catch (error) {
            console.error("error while updating user details: ", error);
        }
    }

    return(
        <div className="p-2 h-11/12 overflow-y-scroll no-scrollbar rounded-2xl border border-white/30 backdrop-blur-2xl backdrop-saturate-150 relative flex w-full flex-col bg-[#d4cfcf15]">
            <div className="w-full flex justify-end">
                <Logout />
            </div>
            <h1 onClick={onBack} className="text-[#ffffff] cursor-pointer active:scale-95 "> ← Back </h1>
            <div className="flex w-full justify-center">
                <div className="relative flex flex-col">
                    <img src={preview ? preview : user.profile?.url ? user.profile.url : UserIcon} alt={user.fullName} className="w-30 h-30 object-center object-cover rounded-full"/>
                    <div className="absolute bottom-23 right-12 text-[#ffffff] cursor-pointer"> 
                        <label className="cursor-pointer">
                            <Camera strokeWidth={3} className="w-6 h-6 text-black hover:scale-95 font-bold "/>

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                    <input type="button" onClick={uploadProfile} value="Change" className="bg-blue-400 text-[#ffffff] rounded-xl p-1 mt-4 cursor-pointer active:scale-95"/>
                 </div>
            </div>
            <h1 className="text-white">Update information: </h1>
            <div className="flex flex-col justify-center w-full gap-2 text-[#ffffff] mt-5 rounded-xl border border-white/30 bg-[#d4cfcf15] p-2 items-center pt-4 pb-4">
                <input type="text" name="username" value={username} className="p-2 outline-none border border-white/30 rounded-xl w-11/12 " onChange={(e)=> setUsername(e.target.value)} placeholder="username"/>  
                <input type="text" name="fullName" value={fullName} className="p-2 outline-none border border-white/30 rounded-xl w-11/12 " onChange={(e)=> setFullName(e.target.value)} placeholder="fullName"/>
                <input type="email" name="email" value={email}  className="p-2 outline-none border border-white/30 rounded-xl w-11/12" onChange={(e)=> setEmail(e.target.value)} placeholder="email"/>
                <input type="submit" value="Submit" onClick={changeDetails} className="bg-blue-500 p-2 w-11/12 rounded-xl cursor-pointer active:scale-95"/>
            </div>
            <div>
                <ChangePassword />
            </div>
        </div>
    )
}

export default EditProfile;