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
      </Routes>
    </BrowserRouter>
  )
}

export default App