import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export default function Conversations({ conversation, currentUser,setFriendId,arrivalMessage }) {
 
  const [friend, setFriend] = useState("");
const dispatch = useDispatch()

  useEffect(() => {

    const friendId = conversation.members.find((m) => m !== currentUser.id);
   setFriendId(friendId);
        const getUser = async () => {
            try{
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/conversations/${friendId}`
          );
          //console.log(data);
        }catch(err){
           console.log(err);
        }
    }

    const getUserData = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getPartnerData/${friendId}`
          );
          setFriend(data);
          dispatch({ type: "FriendData", payload: data });
        } catch (error) {
          console.log(error);
        }
      };

    getUserData();
    getUser()
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={friend?.picture} alt="" />
      <span className="conversationName">{friend?.username}</span>
    </div>
  );
}