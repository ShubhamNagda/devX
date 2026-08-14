import NavBar from "../components/NavBar";
import { useContext, useState } from "react";
import FindUsers from "../components/FindUsers";
import UploadPost from "../components/UploadPost";
import UserProfile from "../components/UserProfile";
import NavigationContext from "../context/NavigationContext";
import UserContext from "../context/UserContext";
import AllPosts from "../components/AllPosts";
import EditProfile from "../components/EditProfile";


const Home = () =>{
    const[user,_] = useContext(UserContext)
    const[navigation, setNavigation] = useContext(NavigationContext);
    return(
        <div>
            <div className="flex flex-col lg:flex-row w-full gap-0 h-screen bg-[url('./assets/background.svg')] items-center lg:items-stretch lg:justify-around overflow-y-scroll lg:overflow-hidden ">
                    <div className="lg:w-3/12 h-full w-11/12 lg:flex lg:items-center pt-0.5 pb-0.5">
                        <NavBar navigation={navigation} setNavigation={setNavigation}/>
                    </div>
                    <div className="w-11/12 lg:w-4/6 -mt-2.5 mb-2.5  flex items-center pt-0.5 pb-0.5 overflow-hidden">
                        {navigation === "Home" ? <AllPosts /> :
                            navigation === "Search" ? <FindUsers onBack={() => setNavigation("Home")} /> : 
                                navigation === "EditInfo" ? <EditProfile onBack={() => setNavigation("Home")} /> :
                                    navigation === "MitraAI" ? " " :
                                        navigation === "Profile" ? <UserProfile searchedUser={user} onBack={() => setNavigation("Home")} />:
                                            navigation === "PostBtn" ? <UploadPost onBack={() => setNavigation("Home")} /> : <AllPosts />
                        }
                    </div>
            </div>
        </div>
    )
}

export default Home;