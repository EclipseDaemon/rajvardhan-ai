import { useState, useRef, useEffect } from "react";

// Custom Cursor
function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 6 + "px";
        cursorRef.current.style.top = e.clientY - 6 + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX - 18 + "px";
        ringRef.current.style.top = e.clientY - 18 + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// Typewriter
function Typewriter({ text, speed = 50 }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span>
      {displayed}
      <span className="blink text-green-400">_</span>
    </span>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen grid-bg flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-green-500 opacity-5 blur-[120px]" />
      </div>

      <div className="mb-6 flex items-center gap-2 text-green-400 text-xs tracking-[0.3em] uppercase fade-up">
        <span className="w-8 h-px bg-green-400" />
        AI Portfolio v1.0
        <span className="w-8 h-px bg-green-400" />
      </div>

      <h1
        className="glitch text-6xl md:text-8xl font-black text-white mb-4 tracking-tight fade-up"
        data-text="RAJVARDHAN"
        style={{ fontFamily: "Orbitron, sans-serif", animationDelay: "0.1s" }}
      >
        RAJVARDHAN
      </h1>

      <p
        className="text-green-400 text-lg md:text-xl mb-8 glow-green fade-up"
        style={{ animationDelay: "0.3s" }}
      >
        <Typewriter
          text="Software Engineer — Python Backend — AI Integration"
          speed={40}
        />
      </p>

      <p
        className="max-w-xl text-center text-gray-400 text-sm leading-relaxed mb-10 fade-up"
        style={{ animationDelay: "0.5s" }}
      >
        2+ years building LLM-powered systems. RAG pipelines. FastAPI. From
        async task queues to vector databases — I own systems end-to-end.
      </p>

      <div className="flex gap-4 fade-up" style={{ animationDelay: "0.7s" }}>
        <a
          href="#chat"
          className="px-6 py-3 bg-green-400 text-black font-bold text-sm tracking-wider hover:bg-green-300 transition-colors"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          TALK TO MY AI
        </a>
        <a
          href="https://github.com/EclipseDaemon"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 border border-green-400 text-green-400 font-bold text-sm tracking-wider hover:bg-green-400 hover:text-black transition-colors"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          GITHUB
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs tracking-widest">
        <span>SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-600 to-transparent" />
      </div>
    </section>
  );
}

// Skills Section
function Skills() {
  const skills = [
    {
      cat: "AI & LLM",
      items: ["RAG Pipelines", "LangChain", "Ollama", "ChromaDB", "Prompt Eng"],
    },
    {
      cat: "Backend",
      items: ["FastAPI", "Django", "Celery", "Redis", "WebSockets"],
    },
    { cat: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "ChromaDB"] },
    { cat: "DevOps", items: ["Docker", "CI/CD", "Git", "PyTest", "Alembic"] },
  ];

  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <span
          className="text-green-400 text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          02 // Skills
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-green-400 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, i) => (
          <div
            key={i}
            className="border border-gray-800 p-6 hover:border-green-400 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-5 transition-opacity" />
            <h3
              className="text-green-400 text-xs tracking-widest uppercase mb-4"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {skill.cat}
            </h3>
            <ul className="space-y-2">
              {skill.items.map((item, j) => (
                <li
                  key={j}
                  className="text-gray-400 text-sm flex items-center gap-2 group-hover:text-gray-200 transition-colors"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// Projects Section
function Projects() {
  const projects = [
    {
      name: "LocalMind",
      tag: "RAG · FastAPI · LangChain · ChromaDB",
      desc: "Fully offline, privacy-first RAG document assistant. Zero cloud dependency. LLaMA 3 via Ollama.",
      link: "https://github.com/EclipseDaemon",
    },
    {
      name: "AI Task Pipeline",
      tag: "Celery · Redis · FastAPI",
      desc: "Async LLM inference framework with retry logic. Reduced failed task rate by 60%.",
      link: "https://github.com/EclipseDaemon",
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <span
          className="text-green-400 text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          03 // Projects
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-green-400 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="border border-gray-800 p-8 hover:border-green-400 transition-all duration-300 group relative overflow-hidden block"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs text-green-400 tracking-widest uppercase">
              {p.tag}
            </span>
            <h3
              className="text-2xl font-bold text-white mt-2 mb-3 group-hover:text-green-400 transition-colors"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {p.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            <span className="inline-block mt-4 text-green-400 text-xs tracking-widest">
              VIEW PROJECT
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

// Chat Section
function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "SYSTEM ONLINE. I am Rajvardhan's AI. Ask me about his skills, experience, or projects.",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  async function sendMessage() {
    if (!question.trim() || loading) return;
    if (question.length > 500) {
      alert("Max 500 characters");
      return;
    }

    const userMsg = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "ai", content: "" }]);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg.content }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].content = "ERROR: Connection failed.";
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const suggestions = [
    "What projects has Rajvardhan built?",
    "What is his experience with RAG?",
    "Does he know Docker?",
    "What databases has he worked with?",
  ];

  return (
    <section id="chat" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <span
          className="text-green-400 text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          04 // Interface
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-green-400 to-transparent" />
      </div>

      <div className="border border-green-400 border-opacity-30 relative scanlines">
        {/* Terminal header */}
        <div className="border-b border-green-400 border-opacity-20 px-4 py-3 flex items-center justify-between bg-black bg-opacity-50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
          </div>
          <span
            className="text-green-400 text-xs tracking-widest"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            RAJ_AI.exe — ACTIVE
          </span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs">LIVE</span>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-black bg-opacity-40">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`text-xs mt-1 shrink-0 ${msg.role === "ai" ? "text-green-400" : "text-blue-400"}`}
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {msg.role === "ai" ? "RAJ_AI>" : "YOU>"}
              </div>
              <div
                className={`text-sm leading-relaxed max-w-xl ${msg.role === "ai" ? "text-gray-300" : "text-blue-300"}`}
              >
                {msg.content}
                {loading &&
                  i === messages.length - 1 &&
                  msg.role === "ai" &&
                  msg.content === "" && (
                    <span className="text-green-400 blink">█</span>
                  )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-6 py-3 border-t border-green-400 border-opacity-10 flex gap-2 flex-wrap">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setQuestion(s)}
                className="text-xs text-green-400 border border-green-400 border-opacity-30 px-3 py-1 hover:bg-green-400 hover:text-black transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-green-400 border-opacity-20 p-4 flex gap-3 bg-black bg-opacity-50">
          <span
            className="text-green-400 text-sm mt-2 shrink-0"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            &gt;_
          </span>
          <textarea
            disabled={loading}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your query..."
            rows={1}
            className="flex-1 bg-transparent text-green-300 placeholder-green-900 text-sm resize-none focus:outline-none"
            style={{ fontFamily: "Space Mono, monospace" }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !question.trim()}
            className="text-xs px-4 py-2 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {loading ? "..." : "SEND"}
          </button>
        </div>
      </div>

      <p className="text-center text-gray-700 text-xs mt-4 tracking-widest">
        {question.length}/500 — PRESS ENTER TO SEND
      </p>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12 px-6 text-center">
      <p
        className="text-gray-600 text-xs tracking-widest"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        RAJVARDHAN PAWAR 2025 — BUILT WITH RAG + FASTAPI + REACT
      </p>
      <div className="flex justify-center gap-6 mt-4">
        <a
          href="mailto:rajvardhanp15@gmail.com"
          className="text-gray-600 hover:text-green-400 text-xs transition-colors tracking-widest"
        >
          EMAIL
        </a>
        <a
          href="https://linkedin.com/in/rajavardhanpawar"
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-green-400 text-xs transition-colors tracking-widest"
        >
          LINKEDIN
        </a>
        <a
          href="https://github.com/EclipseDaemon"
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-green-400 text-xs transition-colors tracking-widest"
        >
          GITHUB
        </a>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Cursor />
      <div className="min-h-screen" style={{ background: "#020408" }}>
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-900 bg-black bg-opacity-80 backdrop-blur-sm px-6 py-4 flex justify-between items-center">
          <span
            className="text-green-400 font-bold text-sm tracking-widest"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            RAJ.AI
          </span>
          <div className="flex gap-6">
            {["Skills", "Projects", "Chat"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-500 hover:text-green-400 text-xs tracking-widest transition-colors"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <Hero />
        <Skills />
        <Projects />
        <Chat />
        <Footer />
      </div>
    </>
  );
}
