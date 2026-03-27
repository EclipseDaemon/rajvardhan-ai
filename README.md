# Rajvardhan AI — Interactive Portfolio Chatbot

> Talk to my AI. Ask anything about my skills, experience, and projects.

**Live Demo:** [rajvardhan-ai.vercel.app](https://rajvardhan-ai.vercel.app)

---

## What is this?

Instead of a static portfolio, I built an AI-powered chatbot trained on my resume. Recruiters and developers can have a real conversation with my AI to learn about my background — faster and more interactively than reading a PDF.

Built with a full RAG (Retrieval Augmented Generation) pipeline running on production infrastructure.

---

## Architecture

```
User Question
      ↓
React Frontend (Vercel)
      ↓
FastAPI Backend (Railway)
      ↓
ChromaDB — Vector similarity search
      ↓
Groq API — LLaMA 3 inference (streaming)
      ↓
Streamed response back to UI
```

### How RAG works here

1. **Ingestion** — Resume PDF is chunked, embedded via Cohere, and stored in ChromaDB
2. **Retrieval** — User question is embedded and matched against stored vectors via cosine similarity
3. **Generation** — Top-k relevant chunks are injected into LLaMA 3's context via Groq
4. **Streaming** — Response streams token by token back to the React frontend

---

## Tech Stack

### Backend
- **FastAPI** — REST API with streaming support
- **LangChain** — RAG pipeline orchestration (LCEL)
- **ChromaDB** — Local vector database
- **Groq API** — LLaMA 3.1 8B inference (fast, free tier)
- **Cohere** — Text embeddings
- **PyPDF** — Resume PDF ingestion

### Frontend
- **React + Vite** — Fast, modern frontend
- **Tailwind CSS** — Utility-first styling
- **Orbitron + Space Mono** — Sci-fi typography
- **Fetch API** — Native streaming via ReadableStream

### Infrastructure
- **Railway** — Backend deployment
- **Vercel** — Frontend deployment
- **GitHub** — Source control + CI/CD

---

## Project Structure

```
rajvardhan-ai/
├── backend/
│   ├── main.py          # FastAPI app — /health and /chat endpoints
│   ├── rag.py           # RAG chain — retriever, prompt, LLM
│   ├── ingest.py        # One-time PDF ingestion into ChromaDB
│   ├── docs/
│   │   └── resume.pdf   # Knowledge base
│   ├── chroma_db/       # Persisted vector store
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   └── App.jsx      # Full single-page React app
│   ├── public/
│   │   └── Rajvardhan_Resume.pdf
│   └── package.json
└── README.md
```

---

## Running Locally

### Backend

```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
```

Create `.env`:
```
GROQ_API_KEY=your_groq_key
COHERE_API_KEY=your_cohere_key
FRONTEND_URL=http://localhost:5173
```

Ingest resume:
```bash
python ingest.py
```

Start server:
```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
```

Create `.env`:
```
VITE_API_URL=http://localhost:8000
```

Start dev server:
```bash
npm run dev
```

---

## API Endpoints

| Method | Endpoint  | Description                    |
|--------|-----------|--------------------------------|
| GET    | /health   | Health check                   |
| POST   | /chat     | Streaming RAG chat response    |

### /chat request body
```json
{
  "question": "What projects has Rajvardhan built?"
}
```

### /chat response
Streams plain text tokens via `text/plain` media type.

---

## Key Design Decisions

**Why RAG instead of fine-tuning?**
Fine-tuning is expensive and static. RAG is cheap, dynamic, and always up-to-date with the source document.

**Why Groq?**
Free tier with blazing fast inference (~500 tokens/second on LLaMA 3). Perfect for a portfolio chatbot.

**Why ChromaDB?**
Lightweight, runs locally, zero infrastructure cost. Perfect for a single-document knowledge base.

**Why streaming?**
Better UX — responses appear word by word instead of making users wait for the full response.

---

## Contact

- **Email:** rajvardhanp15@gmail.com
- **LinkedIn:** [linkedin.com/in/rajavardhanpawar](https://linkedin.com/in/rajavardhanpawar)
- **GitHub:** [github.com/EclipseDaemon](https://github.com/EclipseDaemon)

---

*Built with RAG + FastAPI + React — [Live Demo](https://rajvardhan-ai.vercel.app)*