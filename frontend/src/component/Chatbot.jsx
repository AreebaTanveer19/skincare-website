import React, { useState, useRef, useEffect } from 'react';
import chatbotAPI from '../api/chatbotApi';
import './Chatbot.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your skincare assistant. I can help you find the right products, answer questions about ingredients, and provide personalized recommendations. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatbotAPI.sendMessage(messageToSend);
      
      if (response.success) {
        const botMessage = {
          id: Date.now() + 1,
          text: response.data.message,
          sender: 'bot',
          timestamp: new Date(),
          product: response.data.product || null
        };

        setMessages(prev => [...prev, botMessage]);
        
        // If there's a product in the response, set it for display
        if (response.data.product) {
          setCurrentProduct(response.data.product);
        } else {
          setCurrentProduct(null);
        }
      } else {
        // Handle error
        const errorMessage = {
          id: Date.now() + 1,
          text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          sender: 'bot',
          timestamp: new Date(),
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, something went wrong. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to render HTML content safely
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div className="chatbot-container">
      {/* Chat Widget */}
      <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
        {/* Chat Header */}
        <div className="chat-header" onClick={() => setIsOpen(!isOpen)}>
          <div className="chat-header-content">
            <div className="chat-avatar">
              <span>✨</span>
            </div>
            <div className="chat-info">
              <h3>Skincare Assistant</h3>
              <p>{isOpen ? 'Click to minimize' : 'Ask me anything about skincare!'}</p>
            </div>
          </div>
          <button className="chat-toggle">
            {isOpen ? '−' : '+'}
          </button>
        </div>

        {/* Chat Body */}
        {isOpen && (
          <div className="chat-body">
            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-content">
                    <div 
                      className="message-text"
                      dangerouslySetInnerHTML={renderHTML(message.text)}
                    />
                    {/* Merged product info inside the message bubble */}
                    {message.product && (
                      <div className="merged-product-info">
                        <img
                          className="merged-product-image"
                          src={`/images/${message.product.image_key}`}
                          alt={message.product.name}
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                        
                        <div className="merged-product-details">
                          <div className="merged-product-title">
                            <b>{message.product.name}</b> <span className="merged-product-price">${message.product.price}</span>
                          </div>
                          <div className="merged-product-desc">{message.product.desc}</div>
                          <button
                            className="product-button"
                            onClick={() => window.open(message.product.product_link || '#', '_blank')}
                          >
                            View Product
                          </button>
                        </div>
                      </div>
                    )}
                    <span className="message-time">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="message bot">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="chat-input-container">
              <div className="chat-input-wrapper">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about skincare, products, or routines..."
                  className="chat-input"
                  rows="1"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="send-button"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 