


import {  useEffect, useState } from "react";
import { getFriends } from "../../functions/user";



export default function ChatOnline({user,onlineUsers,setCurrentChat,currentId}) {
   // console.log(onlineUsers);
    const [friends,setFriends]= useState([]);
    const [onlineFriends,setOnlineFriends] = useState([]);

    useEffect(() => {
        myFriends()
       }, [currentId])
 
    const myFriends = async () =>{
       const res = await  getFriends(user.token)
       setFriends(res?.friends);
    }
//console.log(friends);
//     useEffect(()=>{
// setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))    
//     },[friends,onlineUsers])


    
//console.log(onlineFriends);

  return (
    <div className="chatOnline">
        {friends?.map((f,i)=>(
            <div className="chatOnlineFriend hover2" key={i}>
            <div className="chatOnlineImgContainer">
                <img src={f.picture} alt="" className="chatOnlineImg"/>
                <div className="chatOnlineBadge"></div>
            </div>
            <span  className="chatOnlineName">
                {f.first_name} {f.last_name}
            </span>
        </div>
        ))}
    </div>
  )
}