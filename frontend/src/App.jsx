import { Route  , BrowserRouter, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import Footer from "./components/Footer"  
import PrivateRoute from "./components/PrivateRoute"



const App = () => {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element= {<About/>}/>
    <Route path="/projects" element={<Projects/>}/>

    <Route element={<PrivateRoute/>}>
    <Route path="/dashboard" element={<Dashboard/>}/>
    </Route>
    
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App
