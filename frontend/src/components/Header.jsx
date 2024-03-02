

import { Button, Navbar, TextInput , Dropdown ,Avatar } from 'flowbite-react';
import { Link , useNavigate, useLocation} from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import {   HiLogout, HiViewGrid , HiUser, HiClipboardList } from 'react-icons/hi';
import { useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { changeTheme } from '../redux/themeContext/themeSlice';
import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect ,useState } from 'react';








function Header() {

  const path = useLocation().pathname;
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [tab, settab] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // get url tab parameter

  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const tabFromUrl = urlPrams.get("tab");
    if (tabFromUrl) {
      settab(tabFromUrl);
    }
  }, [location.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const urlPrams = new URLSearchParams(location.search);
    urlPrams.set("searchTerm", searchTerm);
    const searchQuery = urlPrams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }


  return (
    <Navbar className=' border-b-2'>
      <Link to={"/"} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Saleem
        </span>
          Blog
      </Link>

      <form onSubmit={handleSearchSubmit}>
      <TextInput className='hidden lg:inline' placeholder='Search' rightIcon={CiSearch} onChange={handleSearchChange}/>
      </form>

      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
           <CiSearch/>
        </Button>

      
        
        <div  className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(changeTheme())}>
  {
    theme === "light" ? <FaMoon/> : <MdOutlineWbSunny />

  }
</Button>
        {
          currentUser ? (
            <Dropdown arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }>
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">{currentUser.email}</span>
            </Dropdown.Header>
            
            {
              currentUser.isAdmin &&(
                <Link to="dashboard?tab=dash">
            <Dropdown.Item icon={HiViewGrid} active={tab==="dash"} as="div">Dashboard</Dropdown.Item>
            </Link>
              )
            }

            {
              currentUser.isAdmin &&(
                <Link to="dashboard?tab=posts">
            <Dropdown.Item icon={HiClipboardList} active={tab==="posts"} as="div">Posts</Dropdown.Item>
            </Link>
              )
            }
           
      
            <Link to={'dashboard?tab=profile'}>
            <Dropdown.Item icon={HiUser} as='div' active={tab === "profile"}>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
          ) : (
            <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
          )
        }
       
          <Navbar.Toggle />
        </div>
        
        <Navbar.Collapse>
        <Navbar.Link active={path==="/"}  as={"div"}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path==="/about"} as={"div"}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path==="/projects"} as={"div"}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
                


    </Navbar>
  );
}

export default Header;