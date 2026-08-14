import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import UserIcon  from "../assets/UserIcon.svg";

const FindUsers = ({onBack}) =>{
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
            if((users.data.data).length === 0){
                setFriends(null)
            }else{
                setFriends(users.data.data)          
            }
        }catch(error){
            console.error("Error to search friends ",error);
        }
    }

    return(
    <div className="relative w-full overflow-y-scroll no-scrollbar  h-11/12 lg:flex rounded-xl bg-[#d4cfcf00] backdrop-blur-2xl backdrop-saturate-150 border border-white/30">
        <button onClick={onBack} className=" absolute top-2 left-2 text-white cursor-pointer active:scale-95">
        ← Back
        </button>
        {selectedUser ? (
            <div className="w-full h-full [&>div]:h-full!">
                <UserProfile
                    searchedUser={selectedUser}
                    onBack={() => setSelectedUser(null)}
               />
            </div>
            ) : (
            <div className="w-full flex flex-col items-center">
                <h1 className="mb-4 mt-6 font-bold text-[#ffffff] text-[22px]">Find your friends:</h1>
                <form className="flex w-full justify-center " onSubmit={fetchFriends} >
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="fullName" placeholder="Name: " className="outline-none backdrop-blur-2xl backdrop-saturate-150 border border-white/30 w-3xs pl-2 h-12 rounded-bl-2xl rounded-tl-2xl text-white placeholder:text-[#c0b5b5]"/>
                    <button type="submit" className="backdrop-blur-2xl backdrop-saturate-150 border border-white/30 rounded-tr-2xl rounded-br-2xl pr-2 p-2 cursor-pointer text-white">{<Search/>}</button>
                </form>
                <div className="mt-4 flex justify-center sm:justify-start flex-wrap gap-2 m-2">
                   {friends == null ? <div className="text-white"> User Not found </div> : friends.map((searchedUser) => (
                        <div
                            key={searchedUser._id}
                            onClick={() => setSelectedUser(searchedUser)}
                            className="bg-[#d4cfcf15] backdrop-blur-2xl backdrop-saturate-150 border border-white/30 w-30 p-2 flex justify-center flex-col items-center rounded-2xl cursor-pointer active:scale-95"
                        >
                            <img
                            className="w-12 h-12 object-cover object-center rounded-full"
                            src={searchedUser.profile?.url ? searchedUser.profile?.url : UserIcon}
                            alt={searchedUser.fullName}
                            />

                            <p className="text-[#9da4b0]">@{searchedUser.username}</p>

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