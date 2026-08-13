import axios from "axios";
import UserIcon from "../assets/UserIcon.svg"
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import UserPosts from "./UserPosts";
import Followers from "./Followers";
import Followings from "./Following";

const UserProfile = ({ searchedUser, onBack }) => {
    const[selectedUser, setSelectedUser] = useState(null)
    const[checkFollowings, setCheckFollowings] = useState(null)
    const[checkFollowers, setCheckFollowers] = useState(null)

    const [user, setUser] = useContext(UserContext)
    const [followStatus, setFollowStatus] = useState(false);

    useEffect(()=>{
        const checkFollowStatus = async () =>{

            try {
                const status = await axios.get(`${import.meta.env.VITE_API_URL_FOLLOWS}/follow-status/${searchedUser._id}`,
                    {
                        withCredentials:true,
                    }
                )
                setFollowStatus(status.data.data.isFollowed)
                
            } catch (error) {
                console.error("error fetching follow status ", error);
            }
        }
        if (searchedUser?._id) {
       checkFollowStatus();
    }
    },[searchedUser?._id])

    const follow = async (userIdToFollow) => {
        setFollowStatus(true)
        try {
            const isdone = await axios.post(`${import.meta.env.VITE_API_URL_FOLLOWS}/${userIdToFollow}`,
                {},
                {
                    withCredentials:true
                }
            )
            
        } catch (error) {
            console.error("error to follow", error); 
        }
    }
    const unfollow = async (userIdToFollow) => {
            setFollowStatus(false)
        try {
            const isdone = await axios.delete(`${import.meta.env.VITE_API_URL_FOLLOWS}/${userIdToFollow}`,
                {
                    withCredentials:true
                }
            )
            
        } catch (error) {
            console.error("error to follow", error); 
        }
    }

  return (
    selectedUser !== null ? <UserProfile searchedUser={selectedUser} onBack={() => setSelectedUser(null)} /> :
    <div className=" overflow-y-scroll no-scrollbar border h-11/12 border-white/30 backdrop-blur-2xl backdrop-saturate-150 text-white w-full bg-[#d4cfcf15] rounded-xl">
      {checkFollowers ? <Followers onBack={() => setCheckFollowers(null)} user={searchedUser} /> : checkFollowings ? <Followings onBack={()=> setCheckFollowings(null)} user={searchedUser}/> :
      <div className="p-2">
        <button onClick={onBack} className="mb-4 cursor-pointer active:scale-95">
        ← Back
      </button>
      <div className="flex w-full gap-3 justify-start">
        <img
            src={searchedUser.profile?.url ? searchedUser.profile?.url : UserIcon}
            alt={searchedUser.fullName}
            className="w-25 h-25 rounded-full object-cover object-center"
        />
        <div className="flex flex-col flex-wrap pl-4">
             <div className="flex flex-col">
                <h1 className="text-[15px] font-bold">
                    {searchedUser.fullName}
                </h1>
                <p className="text-gray-400 mt-1">
                    @{searchedUser.username}
                </p>
             </div>
            <div className="flex gap-10 text-center text-[14px] text-[#d6dae2]">
                <div className="flex flex-col cursor-pointer" onClick={() => setCheckFollowers(searchedUser)}>
                    <p>{searchedUser.followers ? searchedUser.followers : 0}</p>
                    <p>followers</p>
                </div>
                <div className="flex flex-col cursor-pointer" onClick={() => setCheckFollowings(searchedUser)}>
                    <p>{searchedUser.following ? searchedUser.following : 0}</p>
                    <p>following</p>
                </div>
            </div>
        </div>
    </div>
        {user?._id == searchedUser?._id ?
         <button disabled className="cursor-not-allowed bg-blue-600 mt-4 p-2 w-25 rounded-2xl">
            follow
            </button>
          :<button onClick={followStatus ? () => unfollow(searchedUser._id) : () => follow(searchedUser._id)} className="bg-blue-600 mt-4 p-2 rounded-2xl cursor-pointer w-25 active:scale-95">
            {followStatus ? "Unfollow" : "follow"}
            </button>}

            <div className="mt-5">
                <UserPosts selectedUser={searchedUser} setSelectedUser={setSelectedUser}/>
            </div>
      </div>
      }
    </div>
  );
};

export default UserProfile;