import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [editableParts, setEditableParts] = useState({});
    const [copiedPrompts, setCopiedPrompts] = useState([]);
    const [alertVisible, setAlertVisible] = useState(false);

    const [categories, setCategories] = useState({
        Studying: false,
        Math: false,
        Philosophy: false,
        Coding: false,
        Summarization: false,
        Formatting: false,
        Definitions: false,
        Research: false,
        Entertainment: false,
        Translation: false,
        Finance: false,
        Networking: false,
        Writing: false,
        Application: false,
        Roleplay: false,
        Productivity: false
      });
      
      
  
    const toggleCategory = (category) => {
        setCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const prompts = [
        { id: 1, category: 'Studying', text: 'Topic: <topic>. Create a mind map on the topic above. List out the central idea, main branches, and sub-branches.' },
        { id: 2, category: 'Studying', text: 'Topic: <topic>. Create a study timetable for a <type of student> student revising for the above topic. The timetable should cover <length>. The timetable should break the above topic down into its individual learning topics. The timetable should include food breaks, exercise breaks, <add more> and sleep. Each day should be displayed in timeblocks.' },
        { id: 3, category: 'Studying', text: 'Topic: <topic>. Write a multiple choice question with 1 correct answer and 4 incorrect distractor answers. Answers should be labelled A to E. Each answer should have an explanation.' },
        { id: 4, category: 'Studying', text: 'Topic: <topic>. I want you to act as an essay writer writing an essay on the topic above. You will need to research the topic above, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging.' },
        { id: 5, category: 'Studying', text: 'Topic: <topic>. I want you to act as a fill in the blank worksheets generator for students learning the above topic. Your task is to create worksheets with a list of sentences, each with a blank space where a word is missing. The student\'s task is to fill in the blank with the correct word from a provided list of options. The sentences should be grammatically correct and appropriate for students at an <level> level. Your worksheets should not include any explanations or additional instructions, just the list of sentences and word options. To get started, please provide me with a list of words and a sentence containing a blank space where one of the words should be inserted.' },
        { id: 6, category: 'Math', text: 'I want you to act as a math teacher. I will provide some mathematical equations or concepts, and it will be your job to explain them in easy-to-understand terms. This could include providing step-by-step instructions for solving a problem, demonstrating various techniques with visuals or suggesting online resources for further study. My first request is "I need help understanding how <math topic> works."' },
        { id: 7, category: 'Writing', text: 'I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output inside one unique code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first command is <command>.' },
        { id: 8, category: 'Philosophy', text: 'I want you to act as a Socrat. You must use the Socratic method to continue questioning my beliefs. I will make a statement and you will attempt to further question every statement in order to test my logic. You will respond with one line at a time. My first claim is <claim>.' },
        { id: 9, category: 'Studying', text: 'Topic: <topic>. What are <number> key points I should know when studying the topic above?' },
        { id: 10, category: 'Studying', text: 'Topic: <topic>. Create a two-column spreadsheet with questions and corresponding answers on the topic above. Question | Answer' },
        { id: 11, category: 'Studying', text: 'Topic: <topic>. You will ask me a question on the topic above. You will wait and then I will give an answer. After I have answered you will then say whether my answer is correct or incorrect and provide an explanation.' },
        { id: 12, category: 'Coding', text: 'I want you to teach me how to code. I\'ll post a line of code and you should explain what it means in simple terms. <code>.' },
        { id: 13, category: 'Summarization', text: '[YT Video Transcript]. Summarize the above text into the most important points. Display the points as bullet points with short descriptions.' },
        { id: 14, category: 'Studying', text: 'Topic: <topic>. Summarize and explain the above topic for a second-grade student.' },
        { id: 15, category: 'Studying', text: 'Please use the Cornell Notes system to create notes for <topic>.' },
        { id: 16, category: 'Coding', text: 'What does the following <type of command> do: <command>?' },
        { id: 17, category: 'Coding', text: 'In <package> what command would <action>?' },
        { id: 18, category: 'Formatting', text: 'Format this <type of text> nicely: <text>' },
        { id: 19, category: 'Formatting', text: 'Format this <type of text> into <format> format: <text>' },
        { id: 20, category: 'Definitions', text: 'What is the name of <reverse dictionary description>?' },
        { id: 21, category: 'Research', text: 'If I wanted to find <specific target item>, what kind would I need to search for? Are there different classes or categories? If so, compare the top models.' },
        { id: 22, category: 'Research', text: 'Are there any brands that make <item> that are considered top of the line by experts? And not just random blogs who do rankings?' },
        { id: 23, category: 'Entertainment', text: 'What\'s the episode of <TV Show> where <specific description>.' },
        { id: 24, category: 'Translation', text: 'Translate the word "<word>", as in the context of <context>, into the following languages: <1 or more languages>.' },
        { id: 25, category: 'Finance', text: 'Help me work out the break-even for a website billing plan. It would be for an <type of website>. <Enter billing plan>. After what would it be worth to have the <plan> plan.' },
        { id: 26, category: 'Networking', text: 'Which of the following IP ranges would the IP address "<IP address>" fall into: <IP address ranges>.' },
        { id: 27, category: 'Writing', text: 'I\'m going to share <number> blogposts written by <author>. Analyze the blogposts and give me a set of instructions I can use to write in exactly the same tone, writing style, humour, reading level and delivery. Here are the blog posts: <blog posts>.' },
        { id: 28, category: 'Application', text: 'I\'ll share an article below on <topic>. How does the information in this article apply to a <your role + goal>? Here\'s the article: <article>.' },
        { id: 29, category: 'Roleplay', text: 'Assume the role of <role> with over <number> years of experience for the rest of this conversation. I\'d like to engage in a Q&A session where you\'ll provide insights, analyses, and answers based on the report. If you understand please say yes.' },
        { id: 30, category: 'Productivity', text: 'Assume the role of an experienced prompt engineer with over 20 years of experience. I am a <role> working on <responsibility> with the goal of <objective>. Give me <number> ChatGPT prompts that will help me become more productive in my job.' },
        { id: 31, category: 'Coding', text: 'Can you guide me step by step to learn <topic>? Make this interactive and prompt me as we learn. My level in this topic is <level>.' },
        { id: 32, category: 'Coding', text: 'I know <XYZ>. Help me learn <topic> by incorporating concepts that I already know. Take me step by step through this and make the learning interactive by prompting me.' },
        { id: 33, category: 'Coding', text: 'I just finished learning <concept>. What are some possible next learning paths if I want to become <dream job>?' },
        { id: 34, category: 'Coding', text: 'I just finished learning <concept> and I want to practice my skills. Can you give me a <skill level> level project brief and some hints to get me started?' },
        { id: 35, category: 'Coding', text: 'I just finished learning <concept>. Can you build me a comprehensive quiz that tests my knowledge of this and walk me through the quiz step by step?' },
        { id: 36, category: 'Coding', text: 'I\'m building <project>. It will have the following features: <Features>. What tools or technologies would be well-suited for this type of project? I am most comfortable with the <favourite language> programming language.' },
        { id: 37, category: 'Coding', text: 'Can you help me build a data model? Here are the entities that I have so far: <Entities>. I am building an app that <description>. Show me what this data model should look like and how I can improve it.' },
        { id: 38, category: 'Coding', text: 'Build me a <language> utility function that <description>. It should accept the following parameters as input: <list inputs>.' },
        { id: 39, category: 'Coding', text: 'I\'m building <describe project> with <list technologies>. Can you give me some "best practices" that I should follow?' },
        { id: 40, category: 'Coding', text: 'I\'m building <project>. This app will <description>. I\'m currently using the following approach: <first approach>. What are the tradeoffs to this approach vs. other options like <list alternative approaches>?' },
        { id: 41, category: 'Coding', text: 'Using <list technologies>, build me a <feature you need built>.' },
        { id: 42, category: 'Coding', text: 'Can you transform this <coding language> code to <coding language>?' },
        { id: 43, category: 'Coding', text: 'Write me a bash script that <description>.' },
        { id: 44, category: 'Coding', text: 'Write a script in <language> that performs the following steps: <list steps>.' }
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
