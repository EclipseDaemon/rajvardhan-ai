from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_chroma import Chroma

#load llm
llm = ChatOllama(model="mistral")

#create prompt for the llm
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are Rajvardhan's AI portfolio assistant. You help recruiters, hiring managers and developers learn about Rajvardhan's skills, experience and projects.

RULES:
- Answer ONLY using the context provided. Never use outside knowledge.
- If the answer is not in the context, say: "I don't have that information in Rajvardhan's profile."
- Keep answers concise — 2 to 4 sentences maximum unless the user explicitly asks for more detail.
- Lead with the direct answer first, then add supporting details if needed.
- When mentioning projects, name them and their core tech stack only. Don't dump all details unless asked.
- Never fabricate skills, experience or achievements not present in the context.
- If a question asks about a skill not explicitly mentioned but related to existing skills, you may infer — but always start with: "Based on his experience with X, he likely..." and never present inference as fact.

CONTEXT:
{context}"""),
    ("human", "{question}")
])

#load vector_db and embbeding model
embedding_model = OllamaEmbeddings(model="nomic-embed-text")

vector_db = Chroma(
    embedding_function=embedding_model,
    persist_directory="./chroma_db"
)

retriever = vector_db.as_retriever(search_kwargs={"k":5})

def format_chunk(chunks):
    return "\n\n".join([chunk.page_content for chunk in chunks])

rag_chain = (
    {
        "context": retriever | format_chunk,
        "question": RunnablePassthrough()
    }
    | prompt
    | llm
    | StrOutputParser()
)