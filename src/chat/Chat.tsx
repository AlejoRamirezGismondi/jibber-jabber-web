import React, {useEffect, useState} from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import axios from "axios";
import {messageUrl, userUrl} from "../utils/http";
import {getToken} from "../utils/token";
import SendIcon from "@material-ui/icons/Send";
import './Chat.css'
import Button from "@material-ui/core/Button";

type ChatUser = {
  id: number,
  firstName: string,
  lastName: string,
  age: string,
  email: string,
  following: boolean,
  newMessages: number
}

type Message = {
  senderId: number,
  recipientId: number,
  content: string,
  timestamp: string
}

const Chat = () => {
  const [user, setUser] = useState<ChatUser>();
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState<ChatUser[]>([]);
  const [activeContact, setActiveContact] = useState<ChatUser>();
  const [messages, setMessages] = useState<Message[]>([]);

  let stompClient = null;
  const Stomp = require("stompjs");
  let SockJS = require("sockjs-client");
  SockJS = new SockJS(messageUrl + 'ws');
  stompClient = Stomp.over(SockJS);
  const token = getToken();

  useEffect(() => {
    stompClient.connect({}, onConnected, onError);

    axios.get(userUrl + 'user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      });

    loadContacts();
  }, []);

  useEffect(() => {
    if (!activeContact) return;
    axios.get(messageUrl + 'messages/' + user.id + '/' + activeContact.id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setMessages(response.data);
      });

    loadContacts();
  }, [activeContact, token, user]);

  const onConnected = () => {
    console.log("connected");
    stompClient.subscribe(
      "/queue/messages",
      onNotificationReceived
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const onNotificationReceived = (msg) => {
    const message: Message = JSON.parse(msg.body);
    console.log('I received a message!');
    console.log(message);

    if (message.senderId === activeContact.id) {
      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
    } else {// TODO A chequear
      const sender = contacts.find(c => c.id === message.senderId);
      sender.newMessages = sender.newMessages + 1;
      setContacts(contacts.map(c => {
        if (c.id === message.senderId) {
          return sender;
        }
        return c;
      }))
    }
  };

  const sendMessage = (msg) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: user.id,
        recipientId: activeContact.id,
        content: msg,
        token: `Bearer ${token}`
      };
      const message2: Message = {
        senderId: user.id,
        recipientId: activeContact.id,
        content: msg,
        timestamp: null
      };
      stompClient.send("/app/chat", {
        'Authorization': `Bearer ${token}`
      }, JSON.stringify(message));

      const newMessages = [...messages];
      newMessages.push(message2);
      setMessages(newMessages);
    }
  };

  const loadContacts = () => {

    axios.get(userUrl + 'user/all', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setContacts(response.data.map(c => {
          c.newMessages = 0;
          return c;
        }));
      });

    let updatedContacts = [...contacts];
    updatedContacts.forEach(c => {
      axios.get(messageUrl + 'messages/' + user.id + '/' + c.id + '/count', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          c.newMessages = res.data;
        })
    });
    setContacts(updatedContacts);
  };

  if (!user) return (<div>
    <p>Loading...</p>
  </div>);

  return (
    <div>
      <div id="frame">
        <div id="sidepanel">
          <Button href={"/"} size="small">Home</Button>
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
                  key={contact.id}
                  onClick={() => setActiveContact(contact)}
                  className={
                    activeContact && contact.id === activeContact.id
                      ? "contact active"
                      : "contact"
                  }
                >
                  <div className="wrap">
                    <div className="meta">
                      <p className="name">{contact.firstName + ' ' + contact.lastName}</p>
                      {contact.newMessages &&
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
            <p>{activeContact && activeContact.firstName + ' ' + activeContact.lastName}</p>
          </div>
          <ScrollToBottom classNameName="messages">
            <ul>
              {messages.map((msg) => (
                <li key={msg.content} className={msg.senderId === user.id ? "sent" : "replies"}>
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
              <Button onClick={() => {
                sendMessage(text);
                setText("");
              }}>
                <SendIcon/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
