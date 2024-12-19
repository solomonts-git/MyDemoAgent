from dotenv import load_dotenv  # Import library for loading environment variables
import os
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from phi.agent import Agent, RunResponse
from phi.model.groq import Groq  # Groq model from phi
from phi.tools.duckduckgo import DuckDuckGo
from phi.tools.yfinance import YFinanceTools

# Load environment variables from .env file (optional)
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Initialize your Groq agent
groq_model = Groq(id="llama3-groq-70b-8192-tool-use-preview", api_key=os.getenv("GROQ_API_KEY"))

# Initialize Groq models for the agents
web_agent = Agent(
    name="Web Agent",
    role="Search the web for information",
    model=groq_model,
    tools=[DuckDuckGo()],
    instructions=["Always include sources"],
    show_tool_calls=True,
    markdown=True,
)

finance_agent = Agent(
    name="Finance Agent",
    role="Get financial data",
    model=groq_model,
    tools=[YFinanceTools(stock_price=True, analyst_recommendations=True, company_info=True)],
    instructions=["Use tables to display data"],
    show_tool_calls=True,
    markdown=True,
)

# Combine the agents into a team
agent_team = Agent(
    team=[web_agent, finance_agent],
    instructions=["Always include sources", "Use tables to display data"],
    show_tool_calls=True,
    markdown=True,
)

# Define API endpoints
@app.get("/query")
async def query_agent(query: str):
    """
    Endpoint to query the agent team with a specific query.
    """
    response = agent_team.run(query)
    return {"response": response}

@app.get("/web-query")
async def web_query(query: str):
    """
    Endpoint to query the web agent directly.
    """
    response = web_agent.run(query)
    return {"response": response}

@app.get("/finance-query")
async def finance_query(query: str):
    """
    Endpoint to query the finance agent directly.
    """
    response = finance_agent.run(query)
    return {"response": response}
