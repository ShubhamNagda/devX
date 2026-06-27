import axios from "axios";
import { useEffect, useState } from "react"
import UserIcon from "../assets/UserIcon.svg"
import UserProfile from "./UserProfile";

const Followers = ({onBack, user}) =>{
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userSelected, setUserSelected] = useState(null)
    
    useEffect(()=>{
        const getFollowers = async () =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL_FOLLOWS}/followers`,
                {
                    params: {
                        userId: user._id,
                    }, 
                    withCredentials:true
                }
            );
            
            
            setFollowers(response.data.data.followers)
            console.log(response.data.data.followers);
            
            setLoading(false)
        } catch (error) {
            console.error("error while fetching followers: ", error);
        }
        }
        getFollowers()
    },[])
    if(loading){
        return(
            <div className="w-full h-screen flex justify-center items-center text-[#ffffff]"><h1>Loading...</h1></div>
        )
    }
    return(
        <div className="p-0 m-0">
            {
             userSelected ? <UserProfile searchedUser={userSelected} onBack={() => setUserSelected(null)} />: 
             <div className="p-4">
            <h1 onClick={onBack} className="text-[#ffffff] cursor-pointer active:scale-95"> ← Back</h1>
             <div className="mt-4 flex flex-col gap-2 w-full">
                <div>
                    <h1 className="text-[#ffffff] font-bold">followers:</h1>
                </div>
                {followers.map((follower)=>{
                    return(
                        <div key={follower._id} className="flex w-full justify-arround gap-5 items-center bg-[#1c2633] rounded-xl p-3 cursor-pointer" onClick={()=> setUserSelected(follower.follower)}>
                            <img src={follower.follower?.profile?.url ? follower.follower?.profile?.url : UserIcon} alt="" className="w-10 h-10 rounded-full object-cover object-center"/>
                            <h1 className="text-[#ffffff]">{follower.follower.fullName}</h1>
                        </div>
                    )
                })}
             </div>
             </div>
            }
        </div>
    )
}

export default Followers