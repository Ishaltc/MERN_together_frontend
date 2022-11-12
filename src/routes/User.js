import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../AdminPages/home";
import AdminLogin from "../AdminPages/login";
import CreatePostPopup from "../components/createPostPopup";
import { postsReducer } from "../functions/reducers";
import Friends from "../Pages/friends";
import Home from "../Pages/home";
import Activate from "../Pages/home/activate";
import Login from "../Pages/login";
import MessengerApp from "../Pages/messanger";
import Profile from "../Pages/profile";
import Reset from "../Pages/reset";
import LoggedInRoutes from "../protectedRoutes/LoggedInRoutes";
import NotLoggedInRoutes from "../protectedRoutes/NotLoggedInRoutes";

export default function UserRouter(){
  const [visible, setVisible] = useState(false);
  const [newPost, setNewPost] = useState(1);
  const { user } = useSelector((state) => ({ ...state }));

  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    //after passing function setting default value
    loading: false,
    posts: [],
    error: "",
  });

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response?.data?.message,
      });
    }
  };
  //console.log(posts);
  return (
    <>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          setNewPost={setNewPost}
          posts={posts}
          dispatch={dispatch}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/"
            element={
              <Home
                setVisible={setVisible}
                posts={posts}
                loading={loading}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route
            path="/profile"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/friends"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
           <Route
            path="/friends/:type"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route path="/profile/:username" element={<Profile />} exact />
          <Route path="/activate/:token" element={<Activate />} exact />
          <Route path="/messenger" element={<MessengerApp />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} exact />
        {/* admin's */}
        {/* <Route path="/admin-home" element={<AdminHome />} exact />
        <Route path="/admin-login" element={<AdminLogin />} exact /> */}
      </Routes>
    </>
  );
}

