import React, { useState } from "react";
import axios from "axios";
import "./AgentMenu.css"; // Include this file for styling

const AgentMenu = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState("query");

  const handleQuery = async () => {
    setLoading(true);
    setResponse(""); // Clear previous response
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/${activeMenu}`, {
        params: { query },
      });
      setResponse(data.response);
    } catch (error) {
      console.error("Error querying agent:", error);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agent-menu-container">
      <h1>PhiData Agent Menu</h1>
      <div className="menu">
        {["query", "web-query", "finance-query"].map((menu) => (
          <button
            key={menu}
            className={activeMenu === menu ? "active" : ""}
            onClick={() => setActiveMenu(menu)}
          >
            {menu.replace("-", " ").toUpperCase()}
          </button>
        ))}
      </div>
      <textarea
        rows="4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query here..."
      ></textarea>
      <button className="submit-button" onClick={handleQuery} disabled={loading}>
        {loading ? "Loading..." : "Submit Query"}
      </button>
      <div className="response">
        <h2>Response:</h2>
        {loading ? (
          <div className="loading-indicator">Fetching data...</div>
        ) : response ? (
          <pre>{response?.content || response}</pre>
        ) : (
          <div className="placeholder">No response yet. Submit a query!</div>
        )}
      </div>
    </div>
  );
};

export default AgentMenu;
