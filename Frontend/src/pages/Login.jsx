import { CircleUser} from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

const Login = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false)

    const [user, setUser] = useContext(UserContext)

    const fetchUser = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL_USERS}/login`,{email,password},{withCredentials: true,});
            setUser(response.data.data.user);
            setErr(false)
            navigate("/", { replace: true });
            
        } catch (error) {
            console.error(error.response?.data || error.message);
            setErr(true)
        }
    }

    return(
        <div className="flex justify-center items-center bg-[#131921] h-screen w-full">
            <div className="flex flex-col justify-center bg-[#232F3E] h-4/6 lg:h-10/12 lg:p-10 pl-5 pr-5 pt-10  rounded-4xl w-11/12 lg:w-2/6">
                <form className="flex flex-col w-full h-12/12 gap-5" onSubmit={fetchUser}>
                    <h1 className="text-[#ffffff] font-bold text-2xl">Login:</h1>
                    <div className="w-12/12 flex justify-center text-[#ffffff]">
                        <CircleUser size={55} strokeWidth={1.5} className=""/>
                    </div>
                    <input type="email" name="email" id="" className="bg-[#EAEDED] h-12 rounded-4xl p-5 outline-none hover:bg-[#cac9c9]" placeholder="email:" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <input type="password" name="password" id="" className="bg-[#EAEDED] h-12 rounded-4xl p-5 outline-none hover:bg-[#cac9c9]" placeholder="password:" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {err ? <h1 className="text-red-600">Invalid credentials</h1>: <div></div>}
                    <input type="submit" value="Submit" className="bg-blue-400 text-[#ffffff] font-bold h-12 pb-2 pt-2 rounded-4xl p-5 outline-none cursor-pointer active:scale-95 "/>
                    <div className="flex gap-3 w-full justify-center">
                        <p className="text-[#ffffff] pl-2">new user? </p> 
                        <Link to='/signup' className="text-[#00a2ff]"> Sign Up &gt; </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;