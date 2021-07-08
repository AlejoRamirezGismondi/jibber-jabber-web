import React, {useCallback, useEffect, useRef, useState} from "react";
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
  userName: string,
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
  timestamp: string,
  received: boolean
}

type Chat = {
  contactId: number,
  message: Message
}

const Chat = () => {
  const [user, setUser] = useState<ChatUser>();
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState<ChatUser[]>([]);
  const [activeContact, setActiveContact] = useState<ChatUser>();
  const [messages, setMessages] = useState<Message[]>([]);
  const stompClient = useRef(null);
  const subscription = useRef(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const token = getToken();

  const loadContacts = useCallback(async () => {

    const cont = (await axios.get(userUrl + 'user/all', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })).data;

    const cont2 = cont.map(async c => {
      c.newMessages = (await axios.get(messageUrl + 'messages/' + user.id + '/' + c.id + '/count', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })).data;
      return c;
    });

    setContacts(cont2);
  }, [contacts, token, user]);

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
    stompClient.current = over;
    over.connect({}, function () {
      setIsConnected(true);
    });

    return () => {
      stompClient.current.disconnect();
      setIsConnected(false);
    }
  }, [token]);

  const onMessageReceived = useCallback((msg) => {
    const chat: Chat = JSON.parse(msg.body);

    if (activeContact && chat.contactId === activeContact.id) {
      setMessages((messages) => messages ? [...messages, chat.message] : undefined);
    } else {
      const sender = contacts.find(c => c.id === chat.contactId);
      sender.newMessages = sender.newMessages + 1;
      setContacts(contacts.map(c => {
        if (c.id === chat.contactId) {
          return sender;
        }
        return c;
      }));
    }
  }, [activeContact, contacts]);

  useEffect(() => {
    if (isConnected) {
      subscription.current = stompClient.current.subscribe("/queue/messages", onMessageReceived, {id: 'chat'});
      return () => {
        subscription.current.unsubscribe('chat');
      }
    }
  }, [isConnected, onMessageReceived]);

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

  const sendMessage = (msg) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: user.id,
        recipientId: activeContact.id,
        content: msg,
        token: `Bearer ${token}`
      };
      stompClient.current.send("/app/chat", {
        'Authorization': `Bearer ${token}`
      }, JSON.stringify(message));

      const message2: Message = {...message, timestamp: new Date().toLocaleDateString(), received: true};
      setMessages([...messages, message2]);
    }
  };

  if (!user || !contacts) return (<div>
    <p>Loading...</p>
  </div>);

  return (
    <div>
      <div id="frame">
        <div id="sidepanel">
          <Button href={"/"} size="small">Home</Button>
          <div id="profile">
            <div className="wrap">
              <p>{user.userName}</p>
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
                            <p className="name">{contact.userName}</p>
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
            <p>{activeContact && activeContact.userName}</p>
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
