

import { useEffect, useState } from "react"
import {format} from "timeago.js"
import axios from "axios";
import { useSelector } from "react-redux";


export default function Message({message,own}) {

  const [userData, setUserData] = useState("");
 const {user} =useSelector ((state)=> ({ ...state }))
 const  {friend} = useSelector  ((state)=> ({ ...state }))
 

 

  

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={own? user.picture :friend.picture} alt="" className="messageImg"/>
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">
      
      { format(message?.createdAt)}
        
        
  </div>
    </div>
  )
}