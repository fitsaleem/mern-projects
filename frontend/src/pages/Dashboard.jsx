import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import { useSelector } from "react-redux";
import AdminDash from "../components/AdminDash";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";

const Dashboard = () => {
  const location = useLocation();
  const [tab, settab] = useState("");

  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const tabFromUrl = urlPrams.get("tab");
    if (tabFromUrl) {
      settab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === "post" && <DashPosts />}
      {tab === "profile" && <DashProfile />}
      {
        currentUser.isAdmin && (
          tab === "posts" && <DashPosts/>
        )
      }

{
        currentUser.isAdmin && (
          tab === "dash" && <AdminDash/>
        )
      }

{
        currentUser.isAdmin && (
          tab === "users" && <DashUsers/>
        )
      }

{
        currentUser.isAdmin && (
          tab === "comments" && <DashComments/>
        )
      }
    </div>
  );
};

export default Dashboard;
