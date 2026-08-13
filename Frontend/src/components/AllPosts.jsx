import axios from "axios"
import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { SquarePen, SendHorizontal, MessageSquare } from "lucide-react"
import UserIcon from "../assets/UserIcon.svg"
import LikePost from "./LikePost"
import CommentOfPost from "./CommentOfPost"
import PostContent from "./postContent"
import ImagesOfPost from "./ImagesOfPost"
import NavigationContext from "../context/NavigationContext"
import UserProfile from "./UserProfile"

const AllPosts = () =>{
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [activeCommentPostId, setActiveCommentPostId] = useState(null);
    const [comments, setComments] = useState({});
    const[selectedUser, setSelectedUser] = useState(null);

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
            <div className="text-[#ffffff] flex justify-center items-center h-full bg-[#d4cfcf15] border border-white/30 backdrop-blur-2xl backdrop-saturate-150">
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

        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId
                    ? {
                        ...post,
                        commentsCount: post.commentsCount + 1,
                    }
                    : post
            )
        );
    };
    return(
        selectedUser !== null ? <UserProfile searchedUser={selectedUser} onBack={() => setSelectedUser(null)} /> :
        <div className="flex items-center overflow-y-scroll no-scrollbar flex-col gap-10 lg:w-full h-11/12">
            {posts.map((post)=>{
                return(
                    <div key={post._id} className="w-full text-[#ffffff] flex justify-center items-center flex-col">
                        <div className="w-full lg:flex lg:flex-col p-2 rounded-xl bg-[#d4cfcf15] backdrop-blur-2xl backdrop-saturate-150 border border-white/30 shadow-2xl shadow-blue-950/20 ring-1 ring-white/10">
                            <div className="w-full pb-15">
                                <div className="flex flex-nowrap cursor-pointer" onClick={() => setSelectedUser(post.owner)}>
                                    <img src={post.owner?.profile?.url || UserIcon} alt="" className="w-13 h-13 object-center object-cover mt-2 mr-2 rounded-full"/>
                                    <div className="flex flex-col gap-0 w-12/12">
                                        <h1 className="m-0 mt-1.5 font-bold">{post.owner.fullName}</h1>
                                        <p className="m-0 text-[#b6b3b3d1] font-extralight text-sm ">
                                            {new Date(post.createdAt).toLocaleString("en-IN", {
                                                day: "numeric",
                                                month: 'short',
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-11/12 mt-1 ml-1 text-wrap ">
                                    <PostContent post={post} setPosts={setPosts} />
                                </div>
                                    {post.images?.length > 0 && (
                                        <div className="w-full flex justify-center items-center">
                                            <ImagesOfPost images={post.images}/>
                                        </div>
                                    )}
                            </div>

                            <div className="flex gap-5 absolute bottom-2 left-2">
                                <LikePost post={post} setPosts={setPosts} />
                                <div className="text-center cursor-pointer" onClick={() => setActiveCommentPostId(activeCommentPostId === post._id ? null : post._id)}>
                                    <MessageSquare strokeWidth={2} />
                                    <p>{post.commentsCount}</p>
                                </div>
                            </div>
                            <div className={`overflow-hidden transition-all duration-1000 ease-in-out ${ activeCommentPostId === post._id ? "max-h-1000px opacity-100" : "max-h-0 opacity-0" }`}>
                                {activeCommentPostId === post._id && (<CommentOfPost post={post} setSelectedUser={setSelectedUser} />)}
                            </div>
                        </div>
                        <div className="w-full mt-1 relative">
                            <textarea 
                                name="comment" 
                                id="" 
                                placeholder="Comment here..." 
                                className="h-16 w-full rounded-xl outline-none resize-none bg-[#d4cfcf15] backdrop-blur-2xl backdrop-saturate-150 border border-white/30 overflow-y-scroll no-scrollbar text-[#ffffff] p-4"
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
                                className="absolute right-2 bottom-3 text-[#ffffff] cursor-pointer">
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