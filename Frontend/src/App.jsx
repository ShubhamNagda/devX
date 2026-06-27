import FindUsers from "./components/FindUsers";
import User from "./components/User";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import SignUp from "./pages/SignUp";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const App = ()=> {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Protected Cmp={Home}/>} />
        <Route path="/user" element={<Protected Cmp={User}/>} />
        <Route path="/search" element={<Protected Cmp={FindUsers}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App