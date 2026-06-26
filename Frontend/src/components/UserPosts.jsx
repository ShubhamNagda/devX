import axios from "axios"
import { useEffect, useState } from "react"
import UserIcon from "../assets/UserIcon.svg"
import PostContent from "./postContent"
import ImagesOfPost from "./ImagesOfPost"
import LikePost from "./LikePost"
import CommentOnPost from "./CommentOnPost"

const UserPosts = ({selectedUser}) =>{
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const fetchPosts = async() =>{
            try {
                const fetchedPosts = await axios.get('http://localhost:3000/api/v1/posts/getuserposts',
                    {
                        params: {
                            userId: selectedUser._id,
                        },
                        withCredentials:true
                    });
                setPosts(fetchedPosts.data.data); 
                               
            } catch (error) {
                console.error("error while fetching user posts: ", error);
                
            }
        }

        if(selectedUser._id){
            fetchPosts()
        }
    },[selectedUser._id])

    return(
        <div className="flex flex-col w-full gap-5">
        {posts.map((post)=>{
            return(
                <div key={post._id} className="relative pb-12 w-11/12 flex flex-col gap-5 h-full bg-[#1c2633] rounded-2xl ">
                    <div className="">
                        <div className="flex flex-nowrap">
                            <img src={post.owner?.profile?.url ? post.owner?.profile?.url : UserIcon} alt="" className="w-16 h-16 object-center object-cover p-2 rounded-full min-h-12/12"/>
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
                        <div className="w-full p-3">
                            <PostContent post={post} setPosts={setPosts} />
                            <ImagesOfPost images={post.images} />
                        </div>
                        <div className="flex gap-5 absolute bottom-2 left-3">
                            <LikePost post={post} setPosts={setPosts} />
                            <CommentOnPost post={post} setPosts={setPosts}/>
                        </div>
                    </div>
                </div>
            )
        })}
        </div>
    )
}

export default UserPosts;