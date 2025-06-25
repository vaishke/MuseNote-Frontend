import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { FiSend, FiX, FiSmile, FiPaperclip } from 'react-icons/fi';
import { BsCheck, BsCheckAll } from 'react-icons/bs';
import './ChatPanel.css';

const ChatPanel = ({ senderUsername, receiverUsername, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Format time for messages
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // 1. Fetch chat history
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get(`http://localhost:8085/api/chat/history/${senderUsername}/${receiverUsername}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      setMessages(response.data.map(msg => ({
        ...msg,
        timestamp: msg.timestamp || new Date().toISOString(),
        delivered: true,
        read: false
      })));
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
        setIsOnline(true);

        client.subscribe(`/user/${senderUsername}/private`, (message) => {
          const msg = JSON.parse(message.body);
          setMessages(prev => [...prev, {
            ...msg,
            timestamp: new Date().toISOString(),
            delivered: true,
            read: false
          }]);
        });

        // Subscribe to typing indicators
        client.subscribe(`/user/${senderUsername}/typing`, (message) => {
          const typingData = JSON.parse(message.body);
          if (typingData.username === receiverUsername) {
            setIsTyping(typingData.isTyping);
          }
        });
      },
      onDisconnect: () => {
        setIsOnline(false);
      }
    });

    stompClientRef.current = client;
    client.activate();

    return () => {
      if (client && client.active) {
        client.deactivate();
      }
    };
  }, [senderUsername, receiverUsername]);

  const sendMessage = () => {
    if (stompClientRef.current?.connected && input.trim()) {
      const message = {
        senderUsername,
        receiverUsername,
        content: input.trim(),
        timestamp: new Date().toISOString()
      };

      stompClientRef.current.publish({
        destination: '/app/private-message',
        body: JSON.stringify(message)
      });

      setMessages(prev => [...prev, {
        ...message,
        delivered: false,
        read: false
      }]);
      setInput('');
      
      // Simulate delivery after a short delay
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.timestamp === message.timestamp ? { ...msg, delivered: true } : msg
        ));
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    
    // Send typing indicator
    if (stompClientRef.current?.connected) {
      stompClientRef.current.publish({
        destination: '/app/typing',
        body: JSON.stringify({
          username: senderUsername,
          receiverUsername,
          isTyping: e.target.value.length > 0
        })
      });
    }
  };

  return (
    <div className="chat-panel">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="user-avatar">
            <span>{receiverUsername.charAt(0).toUpperCase()}</span>
          </div>
          <div className="user-details">
            <h4>{receiverUsername}</h4>
            <span className={`status ${isOnline ? 'online' : 'offline'}`}>
              {isTyping ? 'typing...' : isOnline ? 'online' : 'offline'}
            </span>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>
          <FiX size={20} />
        </button>
      </div>

      {/* Messages Container */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="no-messages">
            <div className="no-messages-icon">💬</div>
            <p>Start your conversation with {receiverUsername}</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isSent = msg.senderUsername === senderUsername;
            const showDate = i === 0 || 
              new Date(messages[i-1].timestamp).toDateString() !== new Date(msg.timestamp).toDateString();
            
            return (
              <React.Fragment key={i}>
                {showDate && (
                  <div className="date-separator">
                    <span>{new Date(msg.timestamp).toLocaleDateString()}</span>
                  </div>
                )}
                <div className={`message ${isSent ? 'sent' : 'received'}`}>
                  <div className="message-content">
                    <p>{msg.content}</p>
                    <div className="message-meta">
                      <span className="message-time">
                        {formatTime(msg.timestamp)}
                      </span>
                      {isSent && (
                        <span className="message-status">
                          {msg.read ? <BsCheckAll className="read" /> : 
                           msg.delivered ? <BsCheckAll className="delivered" /> : 
                           <BsCheck className="sent" />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-container">
        <div className="chat-input">
          {/* <button className="input-btn emoji-btn">
            <FiSmile size={20} />
          </button> */}
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${receiverUsername}...`}
              rows="1"
              className="message-input"
            />
          </div>
          {/* <button className="input-btn attach-btn">
            <FiPaperclip size={20} />
          </button> */}
          <button 
            className={`send-btn ${input.trim() ? 'active' : ''}`}
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;