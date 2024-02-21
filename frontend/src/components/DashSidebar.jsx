import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiUser  } from 'react-icons/hi';
import { MdOutlineLocalPostOffice } from 'react-icons/md';
import { useState , useEffect  } from 'react';
import { useLocation } from 'react-router-dom';
// import { useSelector } from "react-redux";


const DashSidebar = () => {

    const location = useLocation();
    // const { currentUser } = useSelector((state) => state.user);
    const [tab, settab] = useState("");

    useEffect(() => {   
        const urlPrams = new URLSearchParams(location.search);
        const tabFromUrl = urlPrams.get("tab");
        if (tabFromUrl) {
            settab(tabFromUrl);
        }
        }, [location.search]);

  return (
    <Sidebar aria-label="Default sidebar example" className='w-full md:w-56'>
      <Sidebar.Items className='md:pt-10'>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie} active={tab ==='dash' || !tab}>
            Dashboard
          </Sidebar.Item>
          
          <Sidebar.Item href="#" icon={HiUser} active={tab ==='profile'}>
            Profile
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={MdOutlineLocalPostOffice } active={tab ==='posts'}>
          Posts
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar