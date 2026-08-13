import { MessageSquare, SquarePen } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import UserIcon from "../assets/UserIcon.svg"
import axios from "axios"
import NavigationContext from "../context/NavigationContext"
const CommentOfPost = ({post, setSelectedUser}) =>{
    const [comments, setComments] = useState([])
    const [user, _] = useContext(UserContext)
    const[editedContent, setEditedContent] = useState("")
    const[editingCommentId, setEditingCommentId] = useState(null)

    const fetchComments = async() =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL_COMMENTS}/get-all-comments/${post._id}`,
                {withCredentials:true}
            )
            setComments(response.data.data);
            
        } catch (error) {
            console.error("error while fetching comments: ", error);
        }
    }
    useEffect(()=>{
        fetchComments()
    },[])

    const updateComment =async (commentId) =>{
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL_COMMENTS}/update-comment/${commentId}`,
                {
                    content: editedContent
                },
                {withCredentials:true}
            )
            setComments((prev) =>
                prev.map((comment) =>
                    comment._id === commentId
                    ? response.data.data
                    : comment
                )
            );
        setEditingCommentId(null)
        } catch (error) {
            console.error("error while updating comment");
        }
    }
    const deleteComment = async (commentId) =>{
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL_COMMENTS}/delete-comment/${commentId}`,
                {
                    withCredentials:true
                }
            )
        setComments((prev) =>
            prev.filter((comment) => comment._id !== commentId)
        );
        } catch (error) {
            console.error("error while deleting comment: ", error);
            
        }
    }
    return(
            <div className="flex flex-col w-full gap-2 mb-16 justify-center items-center mt-0 transition-all duration-700 ease-in-out">
            {comments.map((comment)=>{
                return(
                    <div key={comment._id} className="relative w-full border-2 border-white/30 shadow-2xl shadow-blue-950/20 ring-1 ring-white/10 p-3 rounded-xl">
                        <div className="flex gap-4 cursor-pointer " onClick={()=> setSelectedUser(comment.owner)}>
                            <img 
                                src={ comment.owner.profile?.url ? comment.owner.profile?.url : UserIcon} 
                                alt=""
                                className="w-10 h-10 rounded-full object-center object-cover"

                            />
                            <div>
                                <h1 className="text-[15px]">{comment.owner.fullName}</h1>
                                <p className="text-[#9a9696] text-sm">
                                    {new Date(comment.createdAt).toLocaleString("en-IN", {
                                        day: "numeric",
                                        month: 'short',
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="w-full transition-all duration-300 ease-in-out">
                            {editingCommentId === comment._id ?
                                <div className="flex flex-col w-full transition-all duration-300 ease-in-out">
                                    <textarea 
                                        autoFocus
                                        className="w-full rounded-xl resize-none outline-none caret-red-600 "
                                        name="content" 
                                        id=""
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                    >
                                    </textarea>
                                    <div className="flex gap-5">
                                        <input 
                                            onClick={()=> updateComment(comment._id)}
                                            type="submit" 
                                            value="update" 
                                            className="bg-blue-600 p-2 rounded-xl cursor-pointer active:scale-95"
                                        />

                                        <button
                                            onClick={()=> deleteComment(comment._id)}
                                            className="bg-red-600 p-2 rounded-xl cursor-pointer active:scale-95"
                                        >Delete

                                        </button>
                                    </div>

                                </div>
                                : <h1 className="mt-2">{comment.content}</h1>
                            }
                        </div>
                        {
                            comment.owner._id === user._id 
                                ? <div 
                                    className="absolute top-2 right-2 cursor-pointer" 
                                    onClick={() => {setEditedContent(comment.content); editingCommentId !== null ? setEditingCommentId(null) : setEditingCommentId(comment._id)}}
                                >
                                    <SquarePen  />
                                </div>
                            : null
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default CommentOfPost