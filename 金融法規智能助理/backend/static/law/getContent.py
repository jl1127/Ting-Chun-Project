from langchain.document_loaders import PyPDFLoader, OnlinePDFLoader
from langchain.text_splitter import CharacterTextSplitter

def load_and_split_documents(filepath="金融機構資通系統與服務供應鏈風險管理規範.pdf"):
    loader = PyPDFLoader(filepath)
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=1000)
    return text_splitter.split_documents(documents)