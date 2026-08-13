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
<div className="flex justify-center items-center bg-[url('./assets/background.svg')] h-screen w-full ">
    <div className="flex flex-col justify-center bg-[#d4cfcf15] backdrop-blur-2xl backdrop-saturate-150 border border-white/30 h-4/6 lg:h-10/12 lg:p-10 pl-5 pr-5 pt-10  rounded-4xl w-11/12 lg:w-2/6 shadow-2xl shadow-gray-800 ">
        <form className="flex flex-col w-full h-12/12 gap-5 text-[#242222]" onSubmit={fetchUser}>
            <h1 className="text-[#ffffff] font-bold text-2xl">Login:</h1>
            <div className="w-12/12 flex justify-center text-[#ffffff]">
                <CircleUser size={55} strokeWidth={1.5} className=""/>
            </div>
            <input
                type="email"
                name="email"
                id=""
                className="bg-[rgba(249,252,252,0.73)] h-12 rounded-4xl p-5 outline-none hover:bg-[rgba(231,227,227,0.75)]]"
                placeholder="email:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                name="password"
                id=""
                className="bg-[rgba(249,252,252,0.73)] h-12 rounded-4xl p-5 outline-none hover:bg-[rgba(231,227,227,0.75)]"
                placeholder="password:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {err ? <h1 className="text-red-300">Invalid credentials</h1> : <div></div>}
            <div className=" cursor-pointer group relative overflow-hidden w-full flex items-center justify-center gap-5 p-3 pr-5 rounded-2xl font-bold text-[#c5bdbd] bg-[#00000000] backdrop-blur-2xl backdrop-saturate-150 border border-white/15 ring-1 ring-inset ring-white/10 shadow-2xl shadow-black/30 transition-all duration-300 ease-out hover:text-white hover:bg-white/ hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.02] before:absolute before:top-[-100%] before:left-[-100%] before:h-[300%] before:w-16 before:rotate-25 before:bg-linear-to-b before:from-transparent before:via-white/50 before:to-transparent before:blur-md before:opacity-0 before:transition-all before:duration-700 before:ease-out hover:before:left-[130%] hover:before:opacity-100">
                <input
                    type="submit"
                    value="Login"
                    className="
                        cursor-pointer
                        relative z-10
                        transition-transform duration-300
                        group-hover:scale-110"
                    />
            </div>
            <div className="flex gap-3 w-full justify-center">
                <p className="text-[#ffffff] pl-2">new user? </p>
                <Link to='/signup' className="text-[#00a2ff] font-bold text-shadow-2xl text-shadow-gray-950 "> Sign Up &gt; </Link>
            </div>
        </form>
    </div>
</div>
    )
}

export default Login;