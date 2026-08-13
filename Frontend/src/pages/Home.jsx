import NavBar from "../components/NavBar";
import FIndUsers from "../components/FindUsers"
import { useContext, useState } from "react";
import FindUsers from "../components/FindUsers";
import UploadPost from "../components/UploadPost";
import UserProfile from "../components/UserProfile";
import NavigationContext from "../context/NavigationContext";
import UserContext from "../context/UserContext";
import AllPosts from "../components/AllPosts";


const Home = () =>{
    const[user,_] = useContext(UserContext)
    const[navigation, setNavigation] = useContext(NavigationContext);
    return(
        <div>
            <div className="flex w-full gap-0 h-screen bg-[url('./assets/background.svg')] justify-around">
                    <div className="w-3/12 hidden lg:flex lg:items-center pt-0.5 pb-0.5">
                        <NavBar navigation={navigation} setNavigation={setNavigation}/>
                    </div>
                    <div className="w-11/12 lg:w-4/6 flex items-center pt-0.5 pb-0.5 ">
                        {navigation === "Home" ? <AllPosts /> :
                            navigation === "Search" ? <FindUsers onBack={() => setNavigation("Home")} /> : 
                                navigation === "Follow" ? " " :
                                    navigation === "MitraAI" ? " " :
                                        navigation === "Profile" ? <UserProfile searchedUser={user} onBack={() => setNavigation("Home")} />:
                                            navigation === "PostBtn" ? <UploadPost onBack={() => setNavigation("Home")} /> : <PostContainer />
                        }
                    </div>
            </div>
        </div>
    )
}

export default Home;