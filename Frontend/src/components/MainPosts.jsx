import { useState } from "react"
import AllPosts from "./AllPosts"
import { Plus } from "lucide-react"
import UploadPost from "./UploadPost"
const MainPosts = () =>{
    const [createPost, setCreatePost] = useState(false)
    return(
        <div className="relative w-full h-screen bg-[#131921] p-4 ">
            <div className="m-0 p-0 overflow-y-scroll other-scrollbar h-full">
            {createPost ? <UploadPost onBack={() => setCreatePost(false)}/> : 
            <AllPosts />
            }
            </div>
            <div onClick={() => setCreatePost(true)} className="absolute right-2 bottom-2 bg-linear-to-r from-blue-700 to-purple-500 p-3 rounded-2xl cursor-pointer active:scale-95">
                <Plus className="text-[#ffffff]" strokeWidth={3}/>
            </div>
        </div>
    )
}

export default MainPosts