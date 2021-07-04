import React, {useEffect, useState} from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from "axios";
import {messageUrl, userUrl} from "../utils/http";
import {getToken} from "../utils/token";
import SendIcon from "@material-ui/icons/Send";
import './Chat.css'
import Button from "@material-ui/core/Button";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

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
  const [stompClient, setStompClient] = useState(null);
  const token = getToken();

  useEffect(() => {
    axios.get(userUrl + 'user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
        loadContacts();
      });

    const socket = new SockJS(messageUrl + 'ws');
    const over = Stomp.over(socket);
    setStompClient(over);
    over.connect(
      {},
      () => {
        over.subscribe(
          "/queue/messages",
          onMessageReceived
        );
      },
      (err) => {
        console.log(err)
      }
    );
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
  }, [activeContact]);

  const onMessageReceived = (msg) => {
    const message: Message = JSON.parse(msg.body);

    if (!user || message.senderId === user.id) {
      return;
    }

    if (activeContact && message.senderId === activeContact.id) {
      setMessages([...messages, message]);
    } else {
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
      stompClient.send("/app/chat", {
        'Authorization': `Bearer ${token}`
      }, JSON.stringify(message));

      const message2: Message = {...message, timestamp: new Date().toLocaleDateString()};
      setMessages([...messages, message2]);
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
              {contacts.map((contact: ChatUser) => (
                (contact.id !== user.id) &&
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
          <ScrollToBottom className="messages">
            <ul>
              {messages.map((msg, index) => (
                <li key={index} className={msg.senderId === user.id ? "replies" : "sent"}>
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
