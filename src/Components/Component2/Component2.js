
import React, { useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";


const Component1 = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState(7); // Set default time to 7 seconds
  const [inputValue,setInputValue] = useState('testing')

  const toastTimersRef = useRef([]);

  const handleButtonClick = () => {
    const newMessage = `${inputValue} ${messages.length + 1}`;
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const currentIndex = messages.length;
    toastTimersRef.current[currentIndex] = setTimeout(() => {
      setMessages((prevMessages) => prevMessages.filter((_, i) => i !== currentIndex));
    }, formData * 1000); 
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const handleFormSubmit = () => {
    console.log('Form submitted with data:', formData);
    setShowSettings(false);
  };

  const handleToastClose = (index) => {
    clearTimeout(toastTimersRef.current[index]);
    // Remove the closed message
    setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
  };
  // console.log(inputValue);

  return (
    <div>
      <h2>Component 1</h2>
            <input
        type="text"
         placeholder="Enter toast message"
         value={inputValue}
         onChange={(e) => setInputValue(e.target.value)} />      
          
      <button onClick={handleButtonClick}>Show Toast</button>
      <button style={{marginLeft:'10px'}} onClick={handleSettingsClick}>
        <IoSettingsOutline />
      </button>

      {showSettings && (
        <div className="settings-popup">
          <form onSubmit={handleFormSubmit}>
            <label>
              Toast Time (seconds):
              <input
                type="number"
                value={formData}
                onChange={(e) => setFormData(parseInt(e.target.value, 10))}
              />
            </label>
            <button type="button" onClick={handleSettingsClose}>
              Close
            </button>
            <button type="submit">Confirm</button>
          </form>
        </div>
      )}

      {messages.length > 0 && (
        <div className="toast">
          {messages.map((message, index) => (
            <div key={index}>
              <span>{message}</span>
              <button
                className="close-button"
                onClick={() => handleToastClose(index)}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Component1;

