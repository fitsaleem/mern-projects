import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiUser } from "react-icons/hi";
import { MdOutlineLocalPostOffice, MdOutlineSupervisedUserCircle } from "react-icons/md";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { LiaCommentSolid } from "react-icons/lia";


const DashSidebar = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, settab] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const tabFromUrl = urlPrams.get("tab");
    if (tabFromUrl) {
      settab(tabFromUrl);
    }
  }, [location.search]);

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
  };

  return (
    <Sidebar aria-label="Default sidebar example" className="w-full md:w-56">
      <Sidebar.Items className="md:pt-10">
        <Sidebar.ItemGroup>
         

         {
          currentUser.isAdmin && (
            <Link  to="/dashboard?tab=dash">
            <Sidebar.Item
              href="#"
              icon={HiChartPie}
              active={tab === "dash" || !tab}
              as="div"
            >
              Dashboard
            </Sidebar.Item>
            
            </Link>
          )
         }

         <Link to="/dashboard?tab=profile">
         <Sidebar.Item
            href="#"
            icon={HiUser}
            active={tab === "profile"}
            label={currentUser.isAdmin ? "Admin" : "User"}
            as="div"
          >
            Profile
          </Sidebar.Item>
         
         </Link>
          {
            currentUser.isAdmin && (
              <Link to="/dashboard?tab=posts">

          <Sidebar.Item
            href="#"
            icon={MdOutlineLocalPostOffice}
            active={tab === "posts"}
            as="div"
          >
            Posts
          </Sidebar.Item>
          </Link>
            )
          }

{
            currentUser.isAdmin && (
              <Link to="/dashboard?tab=users">

          <Sidebar.Item
            href="#"
            icon={MdOutlineSupervisedUserCircle}
            active={tab === "users"}
            as="div"
          >
            Users
          </Sidebar.Item>
          </Link>
            )
          }

{
            currentUser.isAdmin && (
              <Link to="/dashboard?tab=comments">

          <Sidebar.Item
            href="#"
            icon={LiaCommentSolid }
            active={tab === "comments"}
            as="div"
          >
            Comments
          </Sidebar.Item>
          </Link>
            )
          }


          <Sidebar.Item href="#" icon={HiArrowSmRight} onClick={handleSignout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
