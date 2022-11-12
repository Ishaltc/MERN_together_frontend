import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
  unfriend,
} from "../../functions/user";
import useClickOutside from "../../helpers/ClickOutside";

export default function Friendship({ friendshipp, profileId }) {
  const [friendship, setFriendship] = useState(friendshipp);

  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);

  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const menu = useRef(null);
  const menu1 = useRef(null);
  useClickOutside(menu, () => setFriendsMenu, false);
  useClickOutside(menu1, () => setRespondMenu, false);

  //addFriend function
  const addFriendHandler = async () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    await addFriend(profileId, user.token);
  };

  //cancelRequest
  const cancelRequestHandler = async () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    await cancelRequest(profileId, user.token);
  };
  //following fun
  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await follow(profileId, user.token);
  };

  //un_following  fun
  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await unfollow(profileId, user.token);
  };
  //accepting friend request
  const acceptRequestHandler = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      following: true,
      requestSent: false,
      requestReceived: false,
    });
    await acceptRequest(profileId, user.token);
  };

  //unFriend
  const unfriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await unfriend(profileId, user.token);
  };
//deleting request'

const deleteRequestHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await deleteRequest(profileId, user.token);
  };



  //console.log(friendship);
  return (
    <div className="friendship">
      {friendship?.friends ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
            <img src="../../../icons/friends.png" alt="" />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={menu}>
              {/* <div className="open_cover_menu_item hover1">
                <img src="../../../icons/favoritesOutline.png" alt="" />
                Favorites
              </div>
              <div className="open_cover_menu_item hover1">
                <img stc="../../../icons/editFriends.png" alt="" />
                Edit friend list
              </div> */}
              {friendship?.following ? (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => unfollowHandler()}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Unfollow
                </div>
              ) : (
                <div className="open_cover_menu_item hover1">
                  <img
                    src="../../../icons/unfollowOutlined.png"
                    alt=""
                    onClick={() => followHandler()}
                  />
                  Follow
                </div>
              )}
              <div className="open_cover_menu_item hover1" onClick={()=>unfriendHandler ()}>
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="orange_btn" onClick={() => addFriendHandler()}>
            <img src="../../../icons/addFiend.png" alt="" className="invert" />
            <span>Add Friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className="orange_btn" onClick={() => cancelRequestHandler()}>
          <img
            src="../../../icons/cancelRequest.png"
            alt=""
            className="invert"
          />
          <span>Cancel request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friends_menu_wrap">
            <button
              className="gray_btn"
              onClick={() => setRespondMenu((prev) => !prev)}
            >
              <img src="../../../icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className="open_cover_menu" ref={menu1}>
                <div className="open_cover_menu_item hover1" onClick={()=>acceptRequestHandler()}>Confirm</div>
                <div className="open_cover_menu_item hover2 hover1" onClick={()=>deleteRequestHandler ()}>Delete</div>
              </div>
            )}
          </div>
        )
      )}

      {friendship?.following ? (
        <button className="gray_btn" onClick={() => unfollowHandler()}>
          <img src="../../../icons/follow.png" alt="" />
          <span>Following</span>
        </button>
      ) : (
        <button className="orange_btn" onClick={() => followHandler()}>
          <img src="../../../icons/follow.png" alt="" className="invert" />
          <span>Follow</span>
        </button>
      )}
      <button className={friendship?.friends ? "orange_btn" : "gray_btn"}>
        <img
          src="../../../icons/message.png"
          alt=""
          className={friendship?.friends && "invert"}
        />
        <span>Message</span>
      </button>
    </div>
  );
}
