import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { SquarePen } from "lucide-react";
import axios from "axios";
const PostContent = ({post, setPosts}) =>{
    
        const [editingPostId, setEditingPostId] = useState(null);
        const [editedContent, setEditedContent] = useState("");
        const [user,_] = useContext(UserContext)

        const savePost = async (postId) => {
    try {
        await axios.patch(
            `http://localhost:3000/api/v1/posts/updatepost/${postId}`,
            {
                content: editedContent,
            },
            {
                withCredentials: true,
            }
        );

        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId
                    ? {
                          ...post,
                          content: editedContent,
                      }
                    : post
            )
        );

        setEditingPostId(null);
        setEditedContent("");
    } catch (error) {
        console.error("Error updating post:", error);
    }
};

    const deletePost = async (postId) => {
    try {
        await axios.delete(
            `http://localhost:3000/api/v1/posts/deletepost/${postId}`,
            {
                withCredentials: true,
            }
        );

        setPosts((prevPosts) =>
            prevPosts.filter((post) => post._id !== postId)
        );

        setEditingPostId(null);
        setEditedContent("");
    } catch (error) {
        console.error("Error deleting post:", error);
    }
};

    return(
        <div className="">
            {user?._id === post.owner?._id && (
                <div className="absolute right-2 top-2 cursor-pointer">
                    <SquarePen
                        strokeWidth={1.5}
                        onClick={() => {
                            setEditingPostId(post._id);
                            setEditedContent(post.content);
                        }}
                        />
                </div>
            )}
            {editingPostId === post._id ? (
                <div className="flex flex-col gap-2">
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full h-30 p-2 rounded outline-none resize-none text-[#ffffff] no-scrollbar bg-[#2c3c52]"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={() => savePost(post._id)}
                            className="px-3 py-1 bg-blue-600 rounded cursor-pointer active:scale-95"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => {
                                setEditingPostId(null);
                                setEditedContent("");
                            }}
                            className="px-3 py-1 bg-gray-600 rounded cursor-pointer active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => deletePost(post._id)}
                            className="px-3 py-1 bg-red-600 rounded cursor-pointer active:scale-95"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                ) : (
                    <p>{post.content}</p>
                )}
        </div>)
}

export default PostContent;