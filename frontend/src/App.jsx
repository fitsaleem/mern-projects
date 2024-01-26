import { Route  , BrowserRouter, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Projects from "./pages/Projects"



const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route path="/projects" element={<Projects/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
