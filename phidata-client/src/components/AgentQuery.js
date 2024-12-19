import React, { useState } from 'react'
import { queryAgent } from '../services/api';

const AgentQuery = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

   const handleQuery = async () => {
        setLoading(true);

        try {
            const {data} = await queryAgent(query);
            //debug
            //console.log("data",data)
            setResponse(data.response.content);
        } catch (error) {
            console.error("error querying agent:",error);
            setResponse("Something went wrong. Please try again.");
        } finally{
            setLoading(false);
        }
   };


  return (
    <div className="agent-query-container">
        <h1 className="heading">My Web Agent</h1>
        <textarea
            className="query-textarea"
            rows="4"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Enter your query here"
        >
        </textarea>
        <br />
        <button
            className="submit-button"
            onClick={handleQuery}
            disabled={loading}
        >
            {loading? "Loading ...": "Submit Query"}
        </button>
        <div className="response-container">
            <h2>Response:</h2>
            {response}
        </div>
      
    </div>
  )
}

export default AgentQuery
