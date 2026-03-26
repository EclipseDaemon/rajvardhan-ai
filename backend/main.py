from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health_endpoint():
    return {"health":"App is running properly"}