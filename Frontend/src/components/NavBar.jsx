import { House, Search, UserRoundCog, Astroid, User, Upload } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import logo from "../assets/logo.svg"

const NavBar = ({navigation, setNavigation}) =>{
    const[user, _] = useContext(UserContext);
    return(
        <div className="w-12/12 h-fit lg:h-11/12 flex lg:flex-col items-center justify-around rounded-xl bg-[#d4cfcf15] backdrop-blur-2xl backdrop-saturate-150 border border-white/30 shadow-2xl shadow-blue-950/20 ring-1 ring-white/10">
            <div className="lg:w-9/12 flex flex-row lg:flex-col items-center justify-around">
                <ul className="w-full flex lg:items-start items-center justify-evenly flex-row lg:flex-col text-sm md:text-xl lg:text-2xl gap-2 lg:gap-5 text-[#ffffff]">
                    <li className="w-11 hidden lg:flex"><img src={logo} alt="" / ></li>
                    <li onClick={() => setNavigation("Home")} className={`flex font-bold gap-2 lg:gap-4 cursor-pointer hover:text-[#d429e7e7] hover:scale-95 ${ navigation === "Home" ? "text-[#ffffff]" : "text-[#c5bdbddc]"}`}><House strokeWidth={2.25} /> Home</li>
                    <li onClick={() => setNavigation("Search")} className={`flex font-bold gap-2 lg:gap-4 cursor-pointer hover:text-[#d429e7e7] hover:scale-95 ${ navigation === "Search" ? "text-[#ffffff]" : "text-[#c5bdbddc]"}`}><Search strokeWidth={2.25} /> Search</li>
                    <li onClick={() => setNavigation("MitraAI")} className={`flex font-bold gap-2 lg:gap-4 cursor-pointer hover:text-[#d429e7e7] hover:scale-95 ${ navigation === "MitraAI" ? "text-[#ffffff]" : "text-[#c5bdbddc]"}`}> <Astroid strokeWidth={2.25} /> Mitra AI</li>
                    <li onClick={() => setNavigation("EditInfo")} className={`flex font-bold gap-2 lg:gap-4 cursor-pointer hover:text-[#d429e7e7] hover:scale-95 ${ navigation === "EditInfo" ? "text-[#ffffff]" : "text-[#c5bdbddc]"}`}><UserRoundCog strokeWidth={2.25} /> Edit Info</li>
                </ul>
            </div>
            <div className="lg:w-9/12 flex flex-col items-center ">
                <ul className="w-full flex justify-center items-center lg:items-start flex-row lg:flex-col text-sm md:text-xl lg:text-2xl gap-5 text-[#ffffff]">
                    <li onClick={() => setNavigation("Profile")} className={`flex font-bold gap-4 cursor-pointer hover:text-[#d429e7e7] hover:scale-95 ${ navigation === "Profile" ? "text-[#ffffff]" : "text-[#c5bdbddc]"}`}><User strokeWidth={2.25} /> Profile </li>
                    <li onClick={() => setNavigation("PostBtn")} className="group relative overflow-hidden w-5/12 lg:w-full flex items-center justify-center gap-5 p-3 pr-5 rounded-2xl font-bold text-[#c5bdbd] bg-[#00000000] backdrop-blur-2xl backdrop-saturate-150 border border-white/15 ring-1 ring-inset ring-white/10 shadow-2xl shadow-black/30 cursor-pointer transition-all duration-300 ease-out hover:text-white hover:bg-white/ hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.02] before:absolute before:top-[-100%] before:left-[-100%] before:h-[300%] before:w-16 before:rotate-25 before:bg-linear-to-b before:from-transparent before:via-white/50 before:to-transparent before:blur-md before:opacity-0 before:transition-all before:duration-700 before:ease-out hover:before:left-[130%] hover:before:opacity-100">
                      <Upload
                        strokeWidth={2.25}
                        className="
                          relative z-10
                          transition-transform duration-300
                          group-hover:scale-110
                        "
                      />

                      <span className="relative z-10">
                        Post
                      </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar;