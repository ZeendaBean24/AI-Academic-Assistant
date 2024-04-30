import React from "react";
import ChatGPT from "./ChatGPT";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flex: 1, padding: "20px", borderRight: "2px solid #ccc" }}>
          {/* Placeholder for your AI Prompts Wiki or any other content */}
          <h2>AI Prompt Wiki</h2>
        </div>
        <div style={{ flex: 2, padding: "20px" }}>
          {/* ChatGPT API Integration */}
          <ChatGPT />
        </div>
      </div>
    </div>
  );
}

export default App;
