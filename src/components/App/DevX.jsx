import logo from "../../assets/logo.svg"
const DevX = () =>{
    return(
        <div className="w-full">
            <div className="flex text-zinc-300 items-center gap-3 font-bold text-2xl">
                <img src = {logo} alt="" className="w-1/6"/>
                <p>devX</p>
            </div>
        </div>
    )
}

export default DevX;