import Left from "../components/Home/Left";
import PostContainer from "../components/Home/PostContainer";
import Right from "../components/Home/Right";

const Home = () =>{
    return (
        <div className="flex w-full h-screen justify-between no-scrollbar">
            <Left />
            <PostContainer />
            <Right />
        </div>
    )
}

export default Home;