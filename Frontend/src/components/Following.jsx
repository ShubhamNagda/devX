import axios from "axios";
import { useEffect, useState } from "react"
import UserIcon from "../assets/UserIcon.svg"
import UserProfile from "./UserProfile";

const Followings = ({onBack, user}) =>{
    const [followings, setfollowings] = useState([]);
    const [loading, setLoading] = useState(true)
    const [userSelected, setUserSelected] = useState(null)
    useEffect(()=>{
        const getfollowings = async () =>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_FOLLOWS}/following`,  
                {
                    params: {
                    userId: user._id,
                    }
            , withCredentials:true
            });
            setfollowings(response.data.data.following)
            setLoading(false)
            }
            catch (error) {
                console.error("error while fetching following: ", error);
            }
        }
        getfollowings()

    },[])

    if(loading){
        return(
            <h1 className="w-full h-screen flex justify-center items-center text-[#ffffff]">Loading...</h1>
        )
    }
    return(
         <div className="p-0 m-0">
            {userSelected ? <UserProfile searchedUser={userSelected} onBack={()=> {setUserSelected(null)}}/> :
            <div className="p-4">
             <h1 onClick={onBack} className="text-[#ffffff] cursor-pointer active:scale-95"> ← Back</h1>
             <div>
                <h1 className="text-[#ffffff] font-bold mt-5">following:</h1>
            </div>
             <div className="mt-4 flex flex-col gap-2 w-full">
                {followings.map((following)=>{
                    return(
                        <div key={following.followed._id} className="cursor-pointer ">
                            <div className="flex w-full justify-arround gap-5 items-center bg-[#1c2633] rounded-xl p-3" onClick={() => setUserSelected(following.followed)}>
                                <img src={following.followed?.profile?.url ? following.followed?.profile?.url : UserIcon} alt="" className="w-10 h-10 rounded-full object-cover object-center"/>
                                <h1 className="text-[#ffffff]">{following.followed.fullName}</h1>
                            </div>
                        </div>
                    )
                })}
             </div>
             </div>
    }
    </div>
    )
}

export default Followings