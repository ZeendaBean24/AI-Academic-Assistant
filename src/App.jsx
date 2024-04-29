import React from "react";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "20px", borderRight: "2px solid #ccc" }}>
        {/* Wiki for AI Prompts */}
        <h2>AI Prompt Wiki</h2>
      </div>
      <div style={{ flex: 2, padding: "20px" }}>
        {/* ChatGPT API Integration */}
        <h2>Chat with GPT-3</h2>
      </div>
    </div>
  );
}

export default App;
