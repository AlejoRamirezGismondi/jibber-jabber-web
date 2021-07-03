import React, {useEffect, useState} from "react";
import {Button, message} from "antd";
import {
  getUsers,
  countNewMessages,
  findChatMessages,
  findChatMessage,
} from "./ApiUtil/ApiUtil";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import axios from "axios";
import {messageUrl, userUrl} from "../utils/http";
import {getToken} from "../utils/token";
import {User} from "../models/User";
import SendIcon from "@material-ui/icons/Send";
import './Chat.css'

const Chat = (props) => {
  const [user, setUser] = useState<User>({
    firstName: 'pepe',
    id: 0,
    following: false,
    email: 'email',
    lastName: 'lastname',
    age: '30'
  });
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);
  const [activeContact, setActiveContact] = useState({id: '1', name: 'activeContact juan'});
  const [messages, setMessages] = useState<any[]>([]);
  let stompClient = null;

  useEffect(() => {
    let token = getToken();

    // const Stomp = require("stompjs");
    // let SockJS = require("sockjs-client");
    // SockJS = new SockJS(messageUrl + 'ws');
    // stompClient = Stomp.over(SockJS);
    // stompClient.connect({}, onConnected, onError);

    // loadContacts();

    axios.get(userUrl + 'user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      });

    axios.get(userUrl + 'user/all', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setContacts(response.data);
      });
  }, []);

  // useEffect(() => {
  //   if (!activeContact) return;
  //   findChatMessages(activeContact.id, currentUser.id).then((msgs) =>
  //     setMessages(msgs.data)
  //   );
  //   loadContacts();
  // }, [activeContact]);

  const onConnected = () => {
    // console.log("connected");
    // stompClient.subscribe(
    //   "/user/" + user.id + "/queue/messages",
    //   onMessageReceived
    // );
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (msg) => {
    // const notification = JSON.parse(msg.body);
    // const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
    //   .chatActiveContact;
    //
    // if (active.id === notification.senderId) {
    //   findChatMessage(notification.id).then((message) => {
    //     const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
    //       .chatMessages;
    //     newMessages.push(message);
    //     setMessages(newMessages);
    //   });
    // } else {
    //   message.info("Received a new message from " + notification.senderName);
    // }
    // loadContacts();
  };

  const sendMessage = (msg) => {
    // if (msg.trim() !== "") {
    //   const message = {
    //     senderId: user.id,
    //     recipientId: activeContact.id,
    //     senderName: user.firstName,
    //     recipientName: activeContact.name,
    //     content: msg,
    //     timestamp: new Date(),
    //   };
    //   stompClient.send("/app/chat", {}, JSON.stringify(message));
    //
    //   const newMessages = [...messages];
    //   newMessages.push(message);
    //   setMessages(newMessages);
    // }
  };

  const loadContacts = () => {
    // const promise = getUsers().then((users) =>
    //   users.map((contact) =>
    //     countNewMessages(contact.id, user.id).then((count) => {
    //       contact.newMessages = count;
    //       return contact;
    //     })
    //   )
    // );
    //
    // promise.then((promises) =>
    //   Promise.all(promises).then((users) => {
    //     setContacts(users);
    //     if (activeContact === undefined && users.length > 0) {
    //       setActiveContact(users[0]);
    //     }
    //   })
    // );
  };

  return (
    <div id="frame">
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap">
            <p>{user.firstName} {user.lastName}</p>
            <div id="status-options">
              <ul>
                <li id="status-online" className="active">
                  <span className="status-circle"></span> <p>Online</p>
                </li>
                <li id="status-offline">
                  <span className="status-circle"></span> <p>Offline</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="contacts">
          <ul>
            {contacts.map((contact) => (
              <li
                onClick={() => setActiveContact(contact)}
                className={
                  activeContact && contact.id === activeContact.id
                    ? "contact active"
                    : "contact"
                }
              >
                <div className="wrap">
                  <span className="contact-status online"></span>
                  <img id={contact.id} src={contact.profilePicture} alt=""/>
                  <div className="meta">
                    <p className="name">{contact.name}</p>
                    {contact.newMessages !== undefined &&
                    contact.newMessages > 0 && (
                      <p className="preview">
                        {contact.newMessages} new messages
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="content">
        <div className="contact-profile">
          {/*<img src={activeContact && activeContact.profilePicture} alt="" />*/}
          <p>{activeContact && activeContact.name}</p>
        </div>
        <ScrollToBottom classNameName="messages">
          <ul>
            {messages.map((msg) => (
              <li className={msg.senderId === user.id ? "sent" : "replies"}>
                {/*{msg.senderId !== user.id && (*/}
                {/*  // <img src={activeContact.profilePicture} alt="" />*/}
                {/*)}*/}
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
        </ScrollToBottom>
        <div className="message-input">
          <div className="wrap">
            <input
              name="user_input"
              placeholder="Write your message..."
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendMessage(text);
                  setText("");
                }
              }}
            />

            <Button
              icon={<SendIcon/>}
              onClick={() => {
                sendMessage(text);
                setText("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
