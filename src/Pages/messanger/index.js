import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header";
import ChatOnline from "./ChatOnline";
import Conversations from "./Conversation";
import Message from "./Message";
import "./style.css";
import { io } from "socket.io-client";

export default function MessengerApp() {
  const { user } = useSelector((state) => ({ ...state }));
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [friendId, setFriendId] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useRef(null);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
     
     
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

  

    
  }, []);

 
  //  console.log(currentChat);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
  

    socket.current.on("getUsers", (users) => {
    
      setOnlineUsers(users);
      //  setOnlineUsers(user.friends.filter((f) => users.some((u) => u.userIs ===f)))
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/conversations/${user?.id}`
        );
        setConversation(data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?.id]);

  //console.log(currentChat);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getMessages/${currentChat?._id}`
        );
        //console.log(data);
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/message`,
        message
      );
      //console.log(res);

      setMessages([...messages, res.data]);

      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Header />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="search for friends" className="chatMenuInput" />

            {conversation.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversations
                  key={c._id}
                  conversation={c}
                  currentUser={user}
                  setFriendId={setFriendId}
                  arrivalMessage={arrivalMessage}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, i) => (
                    <div ref={scrollRef}>
                      <Message key={i} message={m} own={m.sender === user.id} />
                    </div>
                  ))}
                </div>

                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              user={user}
              onlineUsers={onlineUsers}
              setCurrentChat={setCurrentChat}
              currentId={user.id}
            />
          </div>
        </div>
      </div>
    </>
  );
}
