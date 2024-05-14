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

    const renderPrompt = (prompt) => {
      return prompt.replace(/<([^>]+)>/g, (match, p1) => (
          `<input class="editable-part" type="text" placeholder="Enter ${p1}" />`
      ));
    };

    return (
      <div className="container">
          <div className="left-side">
              <h2 className='left-title'>AI Prompt Wiki</h2>
              <button onClick={toggleDropdown}>
                  {isOpen ? 'Hide Categories' : 'Show Categories'}
              </button>
              {isOpen && (
                  <div>
                      <h3>Creating Quizzes</h3>
                      {prompts.map((prompt) => (
                          <div
                              key={prompt.id}
                              className="prompt-item"
                              onClick={() => handlePromptClick(prompt)}
                          >
                              {prompt.text}
                          </div>
                      ))}
                  </div>
              )}
          </div>
          <div className="right-side">
              <div className="top-part">
                  {/* Other content */}
              </div>
              <div className="bottom-part">
                  <h3>Customize Your Prompt</h3>
                  <p dangerouslySetInnerHTML={{ __html: renderPrompt(selectedPrompt) }} />
              </div>
          </div>
      </div>
    );
};

export default App;
