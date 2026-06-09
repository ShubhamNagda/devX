import axios from "axios";
import { useState, useEffect } from "react";
import { Heart, MessagesSquare} from "lucide-react"

const Posts = () =>{
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
            axios.get('http://192.168.31.148:3000/api/v1/posts')
            .then((response) =>{
            setPosts(response.data)
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    return(
        <div>
            {posts.map((item, idx)=>{
                return(
                     <div className="posts lg:w-11/12 w-full pl-5 pr-5 pb-2 pt-2 mb-5 mt-5 bg-zinc-900 rounded-2xl lg:ml-7" key={idx}>
                        <div className="flex flex-wrap lg:flex-nowrap w-full gap-5 items-center justify-between">
                            <div className="flex gap-5 font-bold items-center flex-nowrap">
                                <img src={item.authorProfilePic} alt="profile" className="w-2/12 origin-center object-cover rounded-4xl " />
                                <p className="text-zinc-200 min-w-4/12 max-w-4/12 overflow-hidden text-nowrap">{item.author}</p>
                                <button className="bg-zinc-700 w-5/12 min-h-10 rounded-4xl cursor-pointer lg:p-0 pl-4 pr-4 text-white active:scale-95 uppercase">{item.followed ? "following" : "Follow"}</button>
                            </div>
                            <p className="text-zinc-400">{item.createdAt}</p>
                        </div>
                        <div className="bg-zinc-800 rounded-2xl p-2 mt-4 text-zinc-200">
                            <p>{item.tweet}</p>
                        </div>

                        <div className="mt-4 flex flex-nowrap gap-8">
                            <button className="cursor-pointer"><Heart className={item.liked ? "fill-red-600 text-red-600" : "text-white"}/></button>
                            <button className="text-white cursor-pointer"><MessagesSquare /></button>
                        </div>
                     </div>
                )
            }) }
        </div>
    )
}

export default Posts;