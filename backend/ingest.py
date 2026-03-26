from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma

#load the document in the system
resume_loader = PyPDFLoader("./docs/Rajvardhan_Resume.pdf")
main_resume = resume_loader.load()

#spilt the resume into chunks
spiltter = RecursiveCharacterTextSplitter(
    chunk_size = 500,
    chunk_overlap=50
)
raw_chunks = spiltter.split_documents(main_resume)

#load embedding model here so that chunks can now be convert into vectors
embedding_model = OllamaEmbeddings(model="nomic-embed-text")

#create and stored vector in vector database
vector_db = Chroma.from_documents(
    documents=raw_chunks,
    embedding=embedding_model,
    persist_directory="./chroma_db"
)

print(f"chunks created : {len(raw_chunks)}")
print(f"vectors created from chunks: {vector_db._collection.count()}")
