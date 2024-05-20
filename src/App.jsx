import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [editableParts, setEditableParts] = useState({});
    const [copiedPrompts, setCopiedPrompts] = useState([]);
    const [alertVisible, setAlertVisible] = useState(false);

    const [categories, setCategories] = useState({
        Studying: false,
        Productivity: false,
        Coding: false,
        Science: false,
        Language: false,
        Math: false,
        Creativity: false,
        Writing: false,
        Research: false,
        Translation: false,
        Summarization: false,
        Formatting: false,
        Entertainment: false,
        Finance: false,
        Networking: false,
        Application: false,
        Roleplay: false,
        Philosophy: false,
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
        { id: 20, category: 'Language', text: 'What is the name of <reverse dictionary description>?' },
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
        { id: 44, category: 'Coding', text: 'Write a script in <language> that performs the following steps: <list steps>.' },
        { id: 45, category: 'Studying', text: 'Create a set of flashcards for the key concepts in <subject>.' },
        { id: 46, category: 'Studying', text: 'Generate a list of questions to test my understanding of <topic>.' },
        { id: 47, category: 'Studying', text: 'Design a study schedule for <subject> using spaced repetition.' },
        { id: 48, category: 'Studying', text: 'Outline the main arguments for an essay on <topic>.' },
        { id: 49, category: 'Studying', text: 'Provide a thesis statement and three supporting points for an essay on <subject>.' },
        { id: 50, category: 'Studying', text: 'Summarize the key findings of a research paper on <topic>.' },
        { id: 51, category: 'Studying', text: 'List credible sources for information on <subject>.' },
        { id: 52, category: 'Math', text: 'Explain the steps to solve the following equation: <equation>.' },
        { id: 53, category: 'Math', text: 'Describe how to approach a problem involving <math concept>.' },
        { id: 54, category: 'Math', text: 'Provide a simple explanation of <math concept> with examples.' },
        { id: 55, category: 'Science', text: 'Outline a simple experiment to test the effects of <variable> on <subject>.' },
        { id: 56, category: 'Science', text: 'List the materials and steps needed for an experiment on <topic>.' },
        { id: 57, category: 'Science', text: 'Explain the concept of <science concept> in layman\'s terms.' },
        { id: 58, category: 'Language', text: 'Generate a list of 10 advanced vocabulary words in <language> with their meanings.' },
        { id: 59, category: 'Language', text: 'Create sentences using the following words: <words>.' },
        { id: 60, category: 'Language', text: 'Explain the rules of using <grammar concept> with examples.' },
        { id: 61, category: 'Studying', text: 'Help me prioritize my tasks for the day based on importance and deadlines.' },
        { id: 62, category: 'Studying', text: 'Create a to-do list for my study session on <subject>.' },
        { id: 63, category: 'Studying', text: 'Provide tips to avoid procrastination while studying for <subject>.' },
        { id: 64, category: 'Studying', text: 'Suggest techniques to stay focused during a 2-hour study session.' },
        { id: 65, category: 'Studying', text: 'Create a mind map to organize the key points of <topic>.' },
        { id: 66, category: 'Studying', text: 'Draw a mind map connecting the main ideas of <subject> to related concepts.' },
        { id: 67, category: 'Studying', text: 'Summarize the chapter on <topic> in bullet points.' },
        { id: 68, category: 'Studying', text: 'Take Cornell notes on the lesson about <subject>.' },
        { id: 69, category: 'Studying', text: 'Develop a mnemonic to remember the steps of <process>.' },
        { id: 70, category: 'Studying', text: 'Create an acronym to memorize the key terms in <topic>.' },
        { id: 71, category: 'Studying', text: 'Analyze the main argument of the article on <topic> and summarize your critique.' },
        { id: 72, category: 'Studying', text: 'Compare and contrast the viewpoints in two sources about <subject>.' },
        { id: 73, category: 'Studying', text: 'Generate a citation for a book/article on <topic> in <citation format> format.' },
        { id: 74, category: 'Studying', text: 'Provide an example of how to cite a website in <citation format> format for a paper on <subject>.' },
        { id: 75, category: 'Math', text: 'Interpret the graph showing <data> and explain its significance.' },
        { id: 76, category: 'Math', text: 'Describe the relationship between the variables in the graph of <equation>.' },
        { id: 77, category: 'Math', text: 'Explain the Pythagorean theorem and provide an example.' },
        { id: 78, category: 'Math', text: 'List the steps to derive the quadratic formula.' },
        { id: 79, category: 'Science', text: 'Formulate a hypothesis for an experiment on <topic>.' },
        { id: 80, category: 'Science', text: 'What would be a testable prediction for the effect of <variable> on <subject>?' },
        { id: 81, category: 'Science', text: 'Analyze the data from the experiment on <topic> and summarize the findings.' },
        { id: 82, category: 'Science', text: 'Create a graph to represent the data collected from the <experiment>.' },
        { id: 83, category: 'Translation', text: 'Translate the following sentences from English to <language>: <sentences>.' },
        { id: 84, category: 'Language', text: 'Convert these phrases into <language>: <phrases>.' },
        { id: 85, category: 'Language', text: 'Write a dialogue in <language> about <topic>.' },
        { id: 86, category: 'Language', text: 'Formulate questions and answers for a conversation about <subject> in <language>.' },
        { id: 87, category: 'Studying', text: 'Design a weekly study schedule for <subject> including breaks and revision time.' },
        { id: 88, category: 'Studying', text: 'Plan a study timetable for the upcoming exams in <subjects>.' },
        { id: 89, category: 'Studying', text: 'Set three study goals for this week and outline steps to achieve them.' },
        { id: 90, category: 'Studying', text: 'Write down your academic goals for this month and how you plan to accomplish them.' },
        { id: 91, category: 'Studying', text: 'Summarize the main idea of the passage about <topic>.' },
        { id: 92, category: 'Studying', text: 'Write a brief summary of the chapter on <subject>.' },
        { id: 93, category: 'Studying', text: 'Create five comprehension questions based on the article about <topic>.' },
        { id: 94, category: 'Studying', text: 'What questions would you ask to better understand the text on <subject>?' },
        { id: 95, category: 'Studying', text: 'Evaluate the strength of the argument presented in the text about <topic>.' },
        { id: 96, category: 'Studying', text: 'Identify any logical fallacies in the discussion on <subject>.' },
        { id: 97, category: 'Studying', text: 'Analyze the potential outcomes of the scenario involving <situation>.' },
        { id: 98, category: 'Studying', text: 'Discuss the pros and cons of the proposed solution to <problem>.' },
        { id: 99, category: 'Writing', text: 'Write a short story set in <setting> involving <characters>.' },
        { id: 100, category: 'Writing', text: 'Develop a plot outline for a story about <topic>.' },
        { id: 101, category: 'Creativity', text: 'Brainstorm five innovative solutions to <problem>.' },
        { id: 102, category: 'Studying', text: 'Generate a list of potential project ideas for <subject>.' },
        { id: 103, category: 'Coding', text: 'Find and fix the bug in the following code that is supposed to <task>: <code snippet>.' },
        { id: 104, category: 'Coding', text: 'Explain why the following code results in an error and provide a corrected version: <code snippet>.' },
        { id: 105, category: 'Coding', text: 'Describe how to use print statements to debug <function> in <programming language>.' },
        { id: 106, category: 'Coding', text: 'Explain the steps to use a debugger tool in an IDE (like Visual Studio Code) for <programming language>.' },
        { id: 107, category: 'Coding', text: 'List common runtime errors in <programming language> and how to resolve them.' },
        { id: 108, category: 'Coding', text: 'Explain how to handle and debug a <bug> in <programming language>.' },
        { id: 109, category: 'Coding', text: 'Explain what the following code does step-by-step: <code snippet>.' },
        { id: 110, category: 'Coding', text: 'Describe the purpose of each function in the given code: <code snippet>.' },
        { id: 111, category: 'Coding', text: 'Add comments to the following code to explain its functionality: <code snippet>.' },
        { id: 112, category: 'Coding', text: 'Rewrite the code with better comments for clarity: <code snippet>.' },
        { id: 113, category: 'Coding', text: 'Discuss how to improve the readability and maintainability of the following code: <code snippet>.' },
        { id: 114, category: 'Coding', text: 'Explain the importance of following coding standards and conventions in <programming language>.' },
        { id: 115, category: 'Coding', text: 'Refactor the following code to make it more efficient: <code snippet>.' },
        { id: 116, category: 'Coding', text: 'Identify any code smells in the given code and suggest improvements: <code snippet>.' },
        { id: 117, category: 'Coding', text: 'Optimize the following code to reduce its execution time: <code snippet>.' },
        { id: 118, category: 'Coding', text: 'Explain how to profile a program in <programming language> to identify performance bottlenecks.' },
        { id: 119, category: 'Coding', text: 'Add error handling to the following code to manage potential exceptions: <code snippet>.' },
        { id: 120, category: 'Coding', text: 'Explain how to implement proper error handling in a web application using <framework>.' },
        { id: 121, category: 'Coding', text: 'Design an algorithm to solve the following problem: <problem description>.' },
        { id: 122, category: 'Coding', text: 'Explain how to optimize the algorithm for better performance: <algorithm>' },
        { id: 123, category: 'Coding', text: 'Write code to implement a solution for the following problem: <problem description>.' },
        { id: 124, category: 'Coding', text: 'Review the given code and provide feedback on potential improvements: <code snippet>.' }
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
