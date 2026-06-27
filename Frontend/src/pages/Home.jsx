import FindUsers from "../components/FindUsers";
import MainPosts from "../components/MainPosts";
import Nav from "../components/NavForMobile";
import User from "../components/User";

const Home = () =>{
    return(
        <div>
            <Nav />
            <div className="flex w-full gap-0.5 h-full bg-[#a4a1a8] justify-center">
                    <div className="w-3/12 hidden lg:flex">
                        <User />
                    </div>
                    <div className="w-full lg:w-6/12">
                        <MainPosts />
                    </div>
                    <div className="w-3/12 hidden lg:flex">
                        <FindUsers />
                    </div >
            </div>
        </div>
    )
}

export default Home;