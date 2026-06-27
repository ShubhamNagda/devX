import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import UserIcon  from "../assets/UserIcon.svg";
import Nav from "./NavForMobile";

const FindUsers = () =>{
    const [selectedUser, setSelectedUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const[name, setName] = useState("")

    const fetchFriends = async (e) =>{
        e.preventDefault();

        try{
            const users = await axios.get(`${import.meta.env.VITE_API_URL_USERS}/search-users`,
                {
                    params:{
                        fullName:name
                    }
                }
            );
            setFriends(users.data.data)            
                      
        }catch(error){
            console.error("Error to search friends ",error);
        }
    }

    return(
        <div className="flex flex-col p-3 bg-[#131921] h-screen w-full overflow-y-scroll other-scrollbar overflow-x-hidden">
            <Nav />
        {selectedUser ? (
            <UserProfile searchedUser={selectedUser} onBack={()=> setSelectedUser(null)}/>
        ): (
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="mb-4 font-bold text-[#ffffff] text-[22px]">Find your friends:</h1>
                <form className="flex w-full items-center justify-center" onSubmit={fetchFriends} >
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="fullName" placeholder="Name: " className="outline-none bg-[#ffffff] w-3xs h-12 rounded-bl-2xl rounded-tl-2xl pl-2"/>
                    <button type="submit" className="bg-[#ffffff] rounded-tr-2xl rounded-br-2xl pr-2 p-3 cursor-pointer">{<Search/>}</button>
                </form>
                <div className="mt-4 flex flex-wrap gap-2 justify-center ">
                    {friends.map((searchedUser) => (
                        <div
                            key={searchedUser._id}
                            onClick={() => setSelectedUser(searchedUser)}
                            className="bg-[#232F3E] w-30 p-2 flex justify-center flex-col items-center rounded-2xl cursor-pointer active:scale-95"
                        >
                            <img
                            className="w-12 h-12 object-cover object-center rounded-full"
                            src={searchedUser.profile?.url ? searchedUser.profile?.url : UserIcon}
                            alt={searchedUser.fullName}
                            />

                            <p className="text-[#6b7280]">@{searchedUser.username}</p>

                            <h1 className="text-[15px] font-bold text-white text-center">
                            {searchedUser.fullName}
                            </h1>
                        </div>
                    ))}
                 </div>
            </div>
            )}
        </div>
        
    )
}

export default FindUsers;