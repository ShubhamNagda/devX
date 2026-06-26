import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import UserIcon from "../assets/UserIcon.svg"
import UserPosts from "./UserPosts"
import EditProfile from "./EditProfile"
import { UserPen } from "lucide-react"
import Followers from "./Followers"
import Following from "./Following"

const User = () =>{
    const [user, setUser] = useContext(UserContext)
    const [edit, setEdit] = useState(false)
    const [checkFollowers, setCheckFollowers] = useState(false)
    const [checkFollowings, setCheckFollowings] = useState(false)

    return(
        <div className="bg-[#131921] w-full h-screen overflow-y-scroll overflow-x-hidden other-scrollbar">
            { checkFollowers ? <Followers user={user} onBack={() => setCheckFollowers(false)}/> : checkFollowings ? <Following user={user} onBack={() => setCheckFollowings(false)}/> :
            edit 
            ? <EditProfile onBack={()=> setEdit(false)}/>
            :
            <div className="">
                <div className="relative flex w-11/12 mt-5 ml-2 gap-4 flex-nowrap bg-[#1c2633] p-2 mr-2 rounded-2xl">
                    <div className="absolute -right-2 -bottom-2 text-[#ffffff] cursor-pointer">
                        <UserPen onClick={() =>setEdit(true)}/>
                    </div>
                    <img src={user.profile?.url ? user.profile?.url : UserIcon} alt="" className="w-24 h-24 object-cover object-center rounded-2xl"/>
                    <div>
                        <h1 className="text-xl font-bold text-wrap text-[#ffffff]">{user.fullName} </h1>
                        <p className="text-[#7b8897]">@{user.username}</p>
                        <div className="flex flex-row gap-2 text-center justify-between text-[#ffffff]">
                            <div className="cursor-pointer " onClick={() => setCheckFollowers(true)}>
                                <p className="">{user.followers}</p>
                                <p>followers</p>
                            </div>
                            <div className="cursor-pointer " onClick={() => setCheckFollowings(true)}>
                                <p className="">{user.following}</p>
                                <p>following</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-3 mt-4 text-[#ffffff]">
                    <h1 className="text-xl font-bold">Posts:</h1>
                </div>
                <div className="flex justify-center w-11/12 ml-2 mt-2 text-[#ffffff]">
                    <UserPosts selectedUser={user}/>
                </div>
            </div>
            }
        </div>
    )
}

export default User