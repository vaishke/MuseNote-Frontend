import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import './ChatPanel.css';

const ChatPanel = ({ senderUsername, receiverUsername, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const stompClientRef = useRef(null);

  // 1. Fetch chat history
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get(`http://localhost:8085/api/chat/history/${senderUsername}/${receiverUsername}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      setMessages(response.data);
    })
    .catch((err) => {
      console.error("Failed to fetch chat history", err);
    });
  }, [senderUsername, receiverUsername]);

  // 2. Setup WebSocket
  useEffect(() => {
    const socket = new SockJS('http://localhost:8085/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log('Connected to WebSocket');

        client.subscribe(`/user/${senderUsername}/private`, (message) => {
          const msg = JSON.parse(message.body);
          setMessages(prev => [...prev, msg]);
        });
      }
    });

    stompClientRef.current = client;
    client.activate();

    return () => {
      if (client && client.active) {
        client.deactivate();
      }
    };
  }, [senderUsername]);

  const sendMessage = () => {
    if (stompClientRef.current?.connected && input.trim()) {
      const message = {
        senderUsername,
        receiverUsername,
        content: input
      };

      stompClientRef.current.publish({
        destination: '/app/private-message',
        body: JSON.stringify(message)
      });

      setMessages(prev => [...prev, message]);
      setInput('');
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span>Chat with {receiverUsername}</span>
        <button onClick={onClose}>X</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.senderUsername === senderUsername ? 'sent' : 'received'}>
            <strong>{msg.senderUsername}</strong>: {msg.content}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPanel;
