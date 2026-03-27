from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_cohere import CohereEmbeddings
import os
from dotenv import load_dotenv
load_dotenv()

#load the document in the system
resume_loader = PyPDFLoader("./docs/Rajvardhan_Resume.pdf")
main_resume = resume_loader.load()

#spilt the resume into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size = 1200,
    chunk_overlap=200
)
raw_chunks = splitter.split_documents(main_resume)

#load embedding model here so that chunks can now be convert into vectors
embedding_model = CohereEmbeddings(
    model="embed-english-light-v3.0",
    cohere_api_key=os.getenv("COHERE_API_KEY")
)

#load db if it already exists
vector_db = Chroma(
    embedding_function=embedding_model,
    persist_directory="./chroma_db"
)

# delete existing chunks before re-ingesting
vector_db.delete_collection()

#create and stored vector in vector database
vector_db = Chroma.from_documents(
    documents=raw_chunks,
    embedding=embedding_model,
    persist_directory="./chroma_db"
)