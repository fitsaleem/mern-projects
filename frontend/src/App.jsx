import { Route  , BrowserRouter, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import Footer from "./components/Footer"  
import PrivateRoute from "./components/PrivateRoute"
import CreatePost from "./pages/CreatePost"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import UpdatePost from "./pages/UpadtePost"
import PostDetail from "./pages/PostDetail"
import ScrollToTop from "./components/ScrollToTop"
import Search from "./pages/Search"



const App = () => {
  return (
   <BrowserRouter>
   <ScrollToTop/>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element= {<About/>}/>
    <Route path="/projects" element={<Projects/>}/>
    <Route path="/search" element={<Search/>}/>

    <Route element={<PrivateRoute/>}>
    <Route path="/dashboard" element={<Dashboard/>}/>  
    </Route>

    <Route element={<OnlyAdminPrivateRoute/>}>
    <Route path="/create-post" element={<CreatePost/>}/>
    <Route path="/update-post/:postId" element={<UpdatePost/>}/>
    </Route>
    
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route path="/post/:postSlug" element={<PostDetail/>}/>
    <Route path="/search" element={<Search/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App
