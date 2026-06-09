import { CopyPlus, SendHorizontal } from "lucide-react";
const User = () =>{
    return(
        <div className=" bg-zinc-900 rounded-2xl p-2 mt-4">
            <div className="mt-2 flex items-center gap-5 rounded-2xl">
                <img src="https://avatars.githubusercontent.com/u/119925058?v=4" alt="" className="rounded-2xl w-2/12 " />
                <h3 className="text-zinc-300 text-xl font-bold">Shubham Nagda</h3>
            </div>
            <div className="mt-4">
                <textarea className="bg-zinc-800 w-full h-40 rounded-2xl p-2 text-zinc-200 outline-none resize-none" name="userPost" id="" placeholder="Write something.."></textarea>
            </div>
            <div className="ml-2 mt-2 mr-2 flex justify-between ">
                <button className="text-zinc-200 cursor-pointer "><CopyPlus /></button>
                <button className="text-zinc-200 cursor-pointer"><SendHorizontal /></button>
            </div>
        </div>
    )
}

export default User;