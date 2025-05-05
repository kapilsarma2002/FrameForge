import os
from fastapi import FastAPI
from mistralai import Mistral

app = FastAPI()

api_key = ''
model = "mistral-large-latest"

client = Mistral(api_key = api_key)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/ai")
def get_response_from_ai():
    chat_response = client.chat.complete(
    model = model,
    messages = [
        {
            "role": "user",
            "content": "Who is the greatest cricketer of all time?",
        },
    ])
    
    print(chat_response.choices[0].message.content)

    return chat_response.choices[0].message.content
