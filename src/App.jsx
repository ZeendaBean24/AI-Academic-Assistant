import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [editableParts, setEditableParts] = useState({});

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const prompts = [
      { id: 1, text: 'How to <create> a simple quiz with <number> questions' },
      { id: 2, text: 'Tips for effective quiz questions using <topic>' }
    ];

    const handlePromptClick = (prompt) => {
      setSelectedPrompt(prompt.text);
      const matches = prompt.text.match(/<[^>]+>/g) || [];
      let parts = {};
      matches.forEach((match, index) => {
          parts[`placeholder${index + 1}`] = match.replace(/[<>]/g, '');
      });
      setEditableParts(parts);
    };

    const handleInputChange = (key, value) => {
      setEditableParts(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div className="container">
      <div className="left-side">
          <h2>AI Prompt Wiki</h2>
          {prompts.map((prompt) => (
              <div key={prompt.id} onClick={() => handlePromptClick(prompt)}>
                  {prompt.text}
              </div>
          ))}
      </div>
      <div className="right-side">
          <div className="top-part">
              {/* Other content */}
          </div>
          <div className="bottom-part">
              <h3>Customize Your Prompt</h3>
              {Object.keys(editableParts).map(key => (
                  <input
                      key={key}
                      type="text"
                      value={editableParts[key]}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      placeholder={`Enter ${editableParts[key]}`}
                  />
              ))}
          </div>
      </div>
  </div>
    );
};

export default App;
