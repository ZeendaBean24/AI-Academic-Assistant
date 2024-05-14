import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [editableParts, setEditableParts] = useState({});
    const [copiedPrompts, setCopiedPrompts] = useState([]);
    const [alertVisible, setAlertVisible] = useState(false);

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
          // Use the whole match as a key
          parts[match] = match.replace(/[<>]/g, '');
      });
      setEditableParts(parts);
    };

    const renderPrompt = (prompt) => {
      return prompt.replace(/<([^>]+)>/g, (match, p1) => (
          `<input class="editable-part" type="text" placeholder="Enter ${p1}" />`
      ));
    };

    const handleInputChange = (key, value) => {
      setEditableParts(prev => ({ ...prev, [key]: value }));
    };

    const copyPrompt = () => {
      if (Object.values(editableParts).some(val => val.trim() === '')) {
          setAlertVisible(true);
          setTimeout(() => setAlertVisible(false), 2000);
          return;
      }
      let completedPrompt = selectedPrompt;
      Object.keys(editableParts).forEach(key => {
          completedPrompt = completedPrompt.replace(key, editableParts[key]);
      });
      navigator.clipboard.writeText(completedPrompt);
      setCopiedPrompts(prev => [completedPrompt, ...prev.slice(0, 2)]);
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
                    <h3>Recently Copied Prompts</h3>
                    {copiedPrompts.map((prompt, index) => (
                        <div key={index} className="copied-prompt">{prompt}</div>
                    ))}
              </div>
              <div className="bottom-part">
                    <h3>Customize Your Prompt</h3>
                    <div dangerouslySetInnerHTML={{ __html: selectedPrompt }} />
                    {Object.keys(editableParts).map(key => (
                        <input
                            key={key}
                            type="text"
                            value={editableParts[key]}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            placeholder={`Enter ${editableParts[key]}`}
                            className="editable-part"
                        />
                    ))}
                    <button onClick={copyPrompt}>Copy Prompt</button>
                    {alertVisible && <div className="alert">Please fill in all required fields.</div>}
                </div>
          </div>
      </div>
    );
};

export default App;
