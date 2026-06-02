from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv

# load environment variables
load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI()

origins = [
    "https://localhost:5173"
] #the website which can access

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt : str

@app.get('/')
def home():
    return{'message':'Welcome to the  project'}

@app.post('/generate')
def Generate_Text(request: PromptRequest):
    response = model.generate_content(request.prompt)
    return {
        'response':response.text
    }
