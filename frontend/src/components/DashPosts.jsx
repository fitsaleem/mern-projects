import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
      const data = await res.json();
      setPosts(data);
    };
    getPosts();
  }, [currentUser._id]);

  console.log(posts);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"></div>
  );
};

export default DashPosts;
