from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, field_validator
from rag import rag_chain
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
     allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_methods=["GET","POST"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question :str

    @field_validator('question')
    @classmethod
    def validate_question(cls,v):
        if not v.strip():
            raise ValueError('Question Cannot be empty')
        if len(v) > 500:
            raise ValueError('Question too long - Max 500 characters')
        return v

async def stream_response(question:str):
    for chunk in rag_chain.stream(question):
        yield chunk

@app.get("/health")
def health_endpoint():
    return {"status": "ok", "message": "LocalMind is running"}

@app.post("/chat")
async def chat_endpoint(request:ChatRequest):
    return StreamingResponse(
        stream_response(request.question),
        media_type="text/plain"
    )