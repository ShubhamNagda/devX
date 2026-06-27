import { Home, Search } from "lucide-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import userIcon from "../assets/userIcon.svg"
import UserContext from "../context/UserContext"

const Nav = () =>{
    const [user,_] = useContext(UserContext)
    return(
        <div className="lg:hidden flex w-full justify-center bg-[#131921]">
            <div className="flex justify-end w-11/12 p-3 items-center gap-10 text-[#ffffff] bg-linear-to-r from-blue-700 to-purple-500 rounded-xl mt-4">
                <Link to='/'><Home/></Link>
                <Link to='/search'><Search/></Link>
                <Link to='/user'>
                    <img 
                        src={user.profile?.url ? user.profile?.url : userIcon} 
                        alt={user?.username} 
                        className="w-8 h-8 object-center object-cover rounded-full"
                    />
                </Link>
            </div>
        </div>
    )
}

export default Nav