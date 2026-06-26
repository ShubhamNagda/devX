import axios from "axios"
import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { SquarePen } from "lucide-react"
import UserIcon from "../assets/UserIcon.svg"
import LikePost from "./LikePost"
import CommentOnPost from "./CommentOnPost"
import PostContent from "./postContent"
import ImagesOfPost from "./ImagesOfPost"

const AllPosts = () =>{
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    const [user,_] = useContext(UserContext);

    useEffect(()=>{
        const fetchPosts = async () =>{
            try {
                setLoading(true)
                const response = await axios.get("http://localhost:3000/api/v1/posts/getallposts",
                    {
                        withCredentials:true
                    }
                );
    
                setPosts(response.data.data)
            } catch (error) {
                console.error("error while fetching feed: ", error);                
            } finally{
                setLoading(false)
            }

        }
        fetchPosts()
    },[])

    if(loading){
        return(
            <h1>Loading....</h1>
        )
    }
    return(
        <div className="flex flex-wrap items-center flex-col gap-5 w-full">
            {posts.map((post)=>{
                return(
                    <div key={post._id} className="w-11/12 flex flex-col h-full text-[#ffffff] bg-[#1c2633] rounded-2xl relative">
                        <div className="pb-15">
                            <div className="flex flex-nowrap">
                                <img src={post.owner?.profile?.url || UserIcon} alt="" className="w-16 h-16 object-center object-cover p-2 rounded-4xl min-h-12/12"/>
                                <div className="flex flex-col gap-0 w-12/12">
                                    <h1 className="m-0 mt-1.5 font-bold">{post.owner.fullName}</h1>
                                    <p className="m-0 text-gray-500 font-normal">
                                        {new Date(post.createdAt).toLocaleString("en-IN", {
                                            day: "numeric",
                                            month: 'short',
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="w-11/12 ml-6 mr-6 mt-1 text-wrap ">
                                <PostContent post={post} setPosts={setPosts} />
                            </div>
                                {post.images?.length > 0 && (
                                    <ImagesOfPost images={post.images}/>
                                )}
                        </div>

                        <div className="flex gap-5 absolute bottom-2 left-6">
                            <LikePost post={post} setPosts={setPosts} />
                            <CommentOnPost post={post} setPosts={setPosts} /> 
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AllPosts