# AI Agent Integration with React JS

This guide provides step-by-step instructions to integrate an AI agent with web interfaces using React JS.

---

## Outline

### **Before You Begin**

#### **0. Configuration**
1. **Set up project structure:**
   - Create a parent directory named `myAgent`.
   - Inside `myAgent`, create two subdirectories:
     - One for the Python server and AI agent.
     - Another for the client-side React.js application.

---

### **1. Creating a Console-Based AI Agent**

1. **Set up the Python server:**
   - Navigate to the server subdirectory within the `myAgent` directory.
   - Install the necessary dependencies by running:
     ```bash
     pip install fastapi uvicorn phidata openai groq duckduckgo-search
     ```
   - Create your FastAPI server file (e.g., `main.py`) and start the server:
     ```bash
     python -m uvicorn main:app --reload
     ```
   - Access the server at:
     ```
     http://localhost:8000
     ```

---

### **2. Installing React.js**

1. **Set up the React.js client:**
   - Navigate to the client-side directory (e.g., `phidata-client`) inside `myAgent`.
   - Run the following command to create a React application:
     ```bash
     npx create-react-app .
     ```
   - Start the React application:
     ```bash
     npm start
     ```

---

### **3. Creating a Web-Based AI Agent**

1. **Obtain API credentials:**
   - Sign up at [Phidata](https://www.phidata.app/).
   - Register and access documentation at [Groq Docs](https://docs.phidata.com/models/groq).
   - Retrieve your Groq API key and save it securely.

2. **Python script for Groq API:**
   - Write the following script in your Python server directory and run it:
     ```python
     import os
     from groq import Groq

     # Set your API key here or ensure it is set in the environment
     GROQ_API_KEY = os.getenv("GROQ_API_KEY", "your_api_key_here")

     # Raise an error if the API key is not set
     if not GROQ_API_KEY or GROQ_API_KEY == "your_api_key_here":
         raise ValueError("GROQ_API_KEY environment variable is not set. Please add your API key.")

     # Create Groq client with the API key
     client = Groq(api_key=GROQ_API_KEY)

     # Create a chat completion request
     chat_completion = client.chat.completions.create(
         messages=[
             {
                 "role": "user",
                 "content": "Tell me about Ethiopia",
             }
         ],
         model="llama3-8b-8192",  # Ensure this model name is supported
     )

     # Print the content of the first message choice
     print(chat_completion.choices[0].message.content)
     ```

---

### **4. Configuring Web AI Agent with React.js**

1. Connect the React.js frontend to the Python API backend.
2. Use Axios or Fetch API in React to send requests to the Python API.
3. Display the AI agent's responses in your React application interface.

---

### **5. Creating a Finance Agent**

Develop a specialized AI agent for finance-related queries or tasks by expanding the Python server and adding the necessary endpoints.

---

### **6. Multi-Agent Orchestration**

Showcase multi-agent communication and coordination by integrating several AI agents into a unified system that handles diverse tasks efficiently.

---

