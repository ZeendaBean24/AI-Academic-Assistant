import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="container">
            <div className="left-side">
                <h2 className="left-title">AI Prompt Wiki</h2>
                <div className="left-content">
                    <button onClick={toggleDropdown}>
                        {isOpen ? 'Hide Categories' : 'Show Categories'}
                    </button>
                    {isOpen && (
                        <div>
                            <h3>Creating Quizzes</h3>
                            <ul>
                                <li>Prompt 1: How to create a simple quiz</li>
                                <li>Prompt 2: Tips for effective quiz questions</li>
                            </ul>
                            <h3>Creating Quizzes</h3>
                            <ul>
                                <li>Prompt 1: How to create a simple quiz</li>
                                <li>Prompt 2: Tips for effective quiz questions</li>
                            </ul>
                            <h3>Creating Quizzes</h3>
                            <ul>
                                <li>Prompt 1: How to create a simple quiz</li>
                                <li>Prompt 2: Tips for effective quiz questions</li>
                            </ul>
                            <h3>Creating Quizzes</h3>
                            <ul>
                                <li>Prompt 1: How to create a simple quiz</li>
                                <li>Prompt 2: Tips for effective quiz questions</li>
                            </ul>
                            <h3>Creating Quizzes</h3>
                            <ul>
                                <li>Prompt 1: How to create a simple quiz</li>
                                <li>Prompt 2: Tips for effective quiz questions</li>
                            </ul>
                            <h3>Creating Quizzes</h3>
                            <ul>
                                <li>Prompt 1: How to create a simple quiz</li>
                                <li>Prompt 2: Tips for effective quiz questions</li>
                            </ul>
                            <h3>Creating Quizzes</h3>
                            <ul>
                                <li>Prompt 1: How to create a simple quiz</li>
                                <li>Prompt 2: Tips for effective quiz questions</li>
                            </ul>
                            <h3>Creating Quizzes</h3>
                            <ul>
                                <li>Prompt 1: How to create a simple quiz</li>
                                <li>Prompt 2: Tips for effective quiz questions</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="right-side">
                {/* Other content */}
            </div>
        </div>
    );
};

export default App;
