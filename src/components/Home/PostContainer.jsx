import Posts from "../Posts/Posts";

const Main = () => {
    return(
        <div className="overflow-y-scroll no-scrollbar lg:w-6/12 bg-zinc-950 w-full lg:pl-0 lg:pr-0 pl-2 pr-2 lg:border-l lg:border-r lg:border-zinc-600">
            <Posts />
        </div>
    )
}

export default Main;