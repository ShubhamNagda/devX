import axios from "axios"
import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { SquarePen, SendHorizontal, MessageSquare } from "lucide-react"
import UserIcon from "../assets/UserIcon.svg"
import LikePost from "./LikePost"
import CommentOfPost from "./CommentOfPost"
import PostContent from "./postContent"
import ImagesOfPost from "./ImagesOfPost"

const AllPosts = () =>{
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [activeCommentPostId, setActiveCommentPostId] = useState(null);
    const [comments, setComments] = useState({});

    const [user,_] = useContext(UserContext);

    useEffect(()=>{
        const fetchPosts = async () =>{
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_API_URL_POSTS}/getallposts`,
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
            <div className="text-[#ffffff] flex justify-center items-center w-full h-screen bg-[#131921]">
                <h1>Loading....</h1>
            </div>
        )
    }
    const sendComment = async (postId) => {
        const content = comments[postId];

        if (!content?.trim()) return;

        await axios.post(
            `${import.meta.env.VITE_API_URL_COMMENTS}/create-comment/${postId}`,
            {
                content,
            },
            {
                withCredentials: true,
            }
        );

        setComments((prev) => ({
            ...prev,
            [postId]: "",
        }));
    };
    return(
        <div className="flex flex-wrap items-center flex-col gap-10 w-full">
            {posts.map((post)=>{
                return(
                    <div key={post._id} className="w-full flex justify-center items-center flex-col">
                        <div className="w-11/12 flex flex-col h-full text-[#ffffff] bg-[#1c2633] rounded-t-2xl relative">
                            <div className="pb-15">
                                <div className="flex flex-nowrap">
                                    <img src={post.owner?.profile?.url || UserIcon} alt="" className="w-16 h-16 object-center object-cover p-2 rounded-full"/>
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
                                <div className="text-center cursor-pointer" onClick={() => setActiveCommentPostId(activeCommentPostId === post._id ? null : post._id)}>
                                    <MessageSquare strokeWidth={2} />
                                    <p>{post.commentsCount}</p>
                                </div>
                            </div>
                            <div>
                                {activeCommentPostId === post._id && (<CommentOfPost post={post} />)}
                            </div>
                        </div>
                        <div className="w-11/12 mt-1 relative">
                            <textarea 
                                name="comment" 
                                id="" 
                                placeholder="Comment here..." 
                                className="h-16 w-full rounded-b-2xl outline-none resize-none bg-[#1c2E3F] text-[#ffffff] p-4"
                                value={comments[post._id] || ""}
                                onChange={(e) =>
                                    setComments((prev) => ({
                                    ...prev,
                                    [post._id]: e.target.value,
                                    }))
                                }
                                >
                                </textarea>
                            <div
                                onClick={() => sendComment(post._id)}
                                className="absolute right-2 -bottom-6 text-[#ffffff] cursor-pointer">
                                    <SendHorizontal />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AllPosts