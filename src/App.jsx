import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [editableParts, setEditableParts] = useState({});
    const [copiedPrompts, setCopiedPrompts] = useState([]);
    const [alertVisible, setAlertVisible] = useState(false);

    const [categories, setCategories] = useState({
      Tests: false,
      Roleplaying: false
    });
  
    const toggleCategory = (category) => {
        setCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const prompts = [
      { id: 1, category: 'Tests', text: 'How to <create> a simple quiz with <number> questions' },
      { id: 2, category: 'Tests', text: 'Design a multiple-choice <test> with <topic>' },
      { id: 3, category: 'Roleplaying', text: 'Develop a roleplaying scenario using <scenario>' },
      { id: 4, category: 'Roleplaying', text: 'Tips for effective character development in <game>' }
    ];

    const handlePromptClick = (prompt) => {
      setSelectedPrompt(prompt.text);
      const matches = prompt.text.match(/<[^>]+>/g) || [];
      let parts = {};
      matches.forEach((match, index) => {
          // Initialize input value as empty and use the text within < > as placeholder
          parts[match] = '';
      });
      setEditableParts(parts);
    };

    const renderPromptWithInputs = () => {
      const parts = selectedPrompt.split(/(<[^>]+>)/g);
      return parts.map((part, index) => {
          if (part.match(/<[^>]+>/)) {
              const placeholderText = part.replace(/[<>]/g, '');
              return (
                  <input
                      key={index}
                      type="text"
                      value={editableParts[part]}
                      onChange={(e) => handleInputChange(part, e.target.value)}
                      placeholder={`${placeholderText}`}
                      className="editable-part"
                  />
              );
          }
          return part;
      });
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
      setCopiedPrompts(prev => [completedPrompt, ...prev.slice(0, 19)]);
    };

    return (
      <div className="container">
        <div className="left-side">
          <h2 className='title'>AI Prompt Wiki</h2>
          {Object.keys(categories).map((category) => (
              <div key={category}>
                  <button className="category-dropdown" onClick={() => toggleCategory(category)}>
                      {categories[category] ? `Hide ${category}` : `Show ${category}`}
                  </button>
                  {categories[category] && (
                      <div>
                          <h3 className='prompt-category-text'>{category} Prompts</h3>
                          {prompts.filter(p => p.category === category).map((prompt) => (
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
          ))}
        </div>
          <div className="right-side">
            <div className="top-part">
                <h2 className='title'>Recently Copied Prompts</h2>
                <ol>
                    {copiedPrompts.map((prompt, index) => (
                        <li key={index} className={`copied-prompt ${index === 0 ? 'most-recent' : ''}`}>
                            {prompt}
                        </li>
                    ))}
                </ol>
            </div>
            <div className="bottom-part">
                <h2 className='title'>Customize Your Prompt</h2>
                <div>{renderPromptWithInputs()}</div>
                <button className="copy-button" onClick={copyPrompt}>Copy Prompt</button>
                {alertVisible && <div className="alert">Please fill in all required fields.</div>}
            </div>
          </div>
      </div>
    );
};

export default App;
