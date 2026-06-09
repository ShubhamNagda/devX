import User from "../User/User"
import DevX from "../App/DevX";

const Left = () => {
    return(
        <div className="bg-zinc-950 w-3/12 no-scrollbar lg:block overflow-y-scroll p-5 hidden items-start">
            <DevX />
            <User />
        </div>
    )
}

export default Left;