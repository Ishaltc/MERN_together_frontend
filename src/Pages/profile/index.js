import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../../components/createPost";
import CreatePostPopup from "../../components/createPostPopup";
import Header from "../../components/header";
import Post from "../../components/post";
import { profileReducer } from "../../functions/reducers";
import Cover from "./Cover";
import Friends from "./Friends";
import GridPost from "./GridPost";
import PeopleYouMayKnow from "./PeopleYouMayKnow";
import Photos from "./Photos";
import ProfileMenu from "./ProfileMenu";
import ProfilePictureInfos from "./ProfilePictureInfos";
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./style.css";

export default function Profile({getAllPosts }) {
  const [visible,setVisible] = useState(false)
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [newProfile,setNewProfile] =useState(false);
  const [photos, setPhotos] = useState({});

  let userName = username === undefined ? user.username : username;

  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    //after passing function setting default value
    loading: false,
    profile: {},
    error: "",
  });
  //everything username change it sent the request then get info again
  useEffect(() => {
    getProfile();
  }, [userName,newProfile]);

  let visitor = userName === user.username ? false : true;
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.okay === false) {
        
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }

        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
      console.log(error);
    }
  };


  return (
    <div className="profile">

           {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
           posts={profile?.posts}
          dispatch={dispatch}
          profile
        />
      )}
      <Header page="profile"  getAllPosts={getAllPosts}/>
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} visitor={visitor} photos={photos.resources} getProfile={getProfile}/>
          <ProfilePictureInfos
            profile={profile}
            visitor={visitor}
            photos={photos.resources}
            setNewProfile={setNewProfile}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left">
                {/* <Photos
                  username={userName}
                  token={user.token}
                  photos={photos}
                /> */}
                <Friends friends={profile.friends} />
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                <GridPost />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Post post={post} key={post._id} user={user} profile />
                    ))
                  ) : (
                    <div className="no_post">No Posts Available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
