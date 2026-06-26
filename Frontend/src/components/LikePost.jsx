
import { Heart } from "lucide-react";
import axios from "axios";
const LikePost = ({post, setPosts}) =>{
    const likePost = async (postId) => {
    try {
        await axios.post(
            `${import.meta.env.VITE_API_URL_LIKES}/${postId}`,
            {},
            { withCredentials: true }
        );

        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId
                    ? {
                          ...post,
                          isLiked: true,
                          likesCount: post.likesCount + 1,
                      }
                    : post
            )
        );
    } catch (error) {
        console.error("Error liking post:", error);
    }
};
   const unLikePost = async (postId) => {
    try {
        await axios.delete(
            `${import.meta.env.VITE_API_URL_LIKES}/${postId}`,
            { withCredentials: true }
        );

        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId
                    ? {
                          ...post,
                          isLiked: false,
                          likesCount: post.likesCount - 1,
                      }
                    : post
            )
        );
    } catch (error) {
        console.error("Error liking post:", error);
    }
};
    return(
        <div className="flex cursor-pointer flex-col text-[#ffffff]">
            <Heart strokeWidth={2} 
                fill={post.isLiked ? "red" : "none"}
                color={post.isLiked ? "red" : "currentColor"}
                onClick={post.isLiked ? () =>{unLikePost(post._id)} : () => {likePost(post._id)}}
            />
                <p className="pl-1.5">{post.likesCount}</p>
            </div>
    )
}

export default LikePost