import os
from groq import Groq

os.environ["GROQ_API_KEY"] = "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"
# Ensure GROQ_API_KEY is set in the environment
if not os.getenv("GROQ_API_KEY"):
    raise ValueError("GROQ_API_KEY environment variable is not set.")

# Create Groq client with API key
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            # "content": "Explain the importance of fast language models",
            "content": "Tell me about Ethiopia",
        }
    ],
    model="llama3-8b-8192",
)

# Print the first completion's message content
print(chat_completion.choices[0].message.content)