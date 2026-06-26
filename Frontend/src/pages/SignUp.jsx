import axios from "axios";
import {CircleUser} from "lucide-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () =>{
    const [username, setUsername] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [err, setErr] = useState(false)

    const navigate = useNavigate();
    const cerateNewUser = async (e) =>{
        e.preventDefault();
        if(!password || !username || !email || !fullName){
            setErr(true)
            return
        }
        try {
            const createdUser = await axios.post(`${import.meta.env.VITE_API_URL_USERS}/register`,
            {
                username,
                fullName,
                password,
                email
            })

            setErr(false)
            navigate('/login',{replace:true})
        } catch (error) {
            console.error("error while signup", error);
            
        }
    }
    return(
        <div className="flex justify-center items-center bg-[#131921] h-screen w-full">
            <div className="flex flex-col justify-center bg-[#232F3E] h-9/12 lg:h-10/12 lg:p-10 pl-5 pr-5 pt-10  rounded-4xl w-11/12 lg:w-2/6">
                <form onSubmit={cerateNewUser} className="flex flex-col w-full h-12/12 gap-5">
                    <h1 className="text-[#ffffff] font-bold text-2xl">Sign Up:</h1>
                    <div className="w-12/12 flex justify-center text-[#ffffff]">
                        <CircleUser size={55} strokeWidth={1.5} className=""/>
                    </div>
                    <input type="text" name="fullName" value={fullName} id="" onChange={(e)=> setFullName(e.target.value)} className="bg-[#EAEDED] h-12 rounded-4xl p-5 outline-none hover:bg-[#cac9c9]" placeholder="full name:"/>
                    <input type="text" name="username" value={username} id="" onChange={(e)=> setUsername(e.target.value)} id="" className="bg-[#EAEDED] h-12 rounded-4xl p-5 outline-none hover:bg-[#cac9c9]" placeholder="username: (unique & space not allowed)"/>
                    <input type="email" name="email" value={email} id="" onChange={(e)=> setEmail(e.target.value)} id="" className="bg-[#EAEDED] h-12 rounded-4xl p-5 outline-none hover:bg-[#cac9c9]" placeholder="email:"/>
                    <input type="password" name="password" value={password} id="" onChange={(e)=> setPassword(e.target.value)} id="" className="bg-[#EAEDED] h-12 rounded-4xl p-5 outline-none hover:bg-[#cac9c9]" placeholder="password:"/>
                    {err ? <h1 className="text-red-600">all fields are required! </h1>: <div></div>}
                    <input type="submit" value="Submit" className="bg-blue-400 text-[#ffffff] font-bold h-12 pb-2 pt-2 rounded-4xl p-5 outline-none cursor-pointer active:scale-95 "/>
                    <div className="flex gap-3 w-full justify-center">
                        <p className="text-[#ffffff] pl-2">Already have account? </p> 
                        <Link to="/login" className="text-[#00a2ff]">login &gt; </Link>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;