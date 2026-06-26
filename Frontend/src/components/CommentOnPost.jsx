import { MessageSquare } from "lucide-react"
const CommentOnPost = ({post, setPosts}) =>{

    return(
        <div className="flex flex-col text-center">
            <MessageSquare strokeWidth={2} />
                <p>{post.commentsCount}</p>
        </div>
    )
}

export default CommentOnPost