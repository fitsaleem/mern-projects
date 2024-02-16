
'use client';

import { Button, Navbar, TextInput , Dropdown ,Avatar } from 'flowbite-react';
import { Link , useLocation} from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { LuSunMoon , LuSun} from "react-icons/lu";
import { HiCog,  HiLogout, HiViewGrid , HiUser } from 'react-icons/hi';
import { useSelector , useDispatch} from "react-redux";
import { changeTheme } from '../redux/themeContext/themeSlice';




function Header() {

  const path = useLocation().pathname;
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);


  return (
    <Navbar className=' border-b-2'>
      <Link to={"/"} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Saleem
        </span>
          Blog
      </Link>

      <form>
      <TextInput className='hidden lg:inline' placeholder='Search' rightIcon={CiSearch}/>
      </form>

      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
           <CiSearch/>
        </Button>

      
        
        <div  className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(changeTheme())}>
           {
              theme === "light" ? <LuSun/> : <LuSunMoon/>
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
            <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
            <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
            <Dropdown.Item icon={HiUser}>Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
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