from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import uuid

# --- Database setup ---
DATABASE_URL = "sqlite:///./bank.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

class AccountModel(Base):
    __tablename__ = "accounts"
    account_number = Column(String, primary_key=True, index=True)
    name = Column(String)
    balance = Column(Float)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- App setup ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],     # 👈 explicitly allow frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Root endpoint ---
@app.get("/")
async def root():
    return {"message": "Welcome to the Bank Account Management API!"}

# --- Pydantic models ---
class AccountCreate(BaseModel):
    name: str
    balance: float

class AccountResponse(BaseModel):
    account_number: str
    name: str
    balance: float

    class Config:
        orm_mode = True

class Transaction(BaseModel):
    account_number: str
    amount: float

# --- API Routes ---

@app.post("/accounts", response_model=AccountResponse)
def create_account(account: AccountCreate, db: Session = Depends(get_db)):
    account_number = str(uuid.uuid4())[:8]
    new_acc = AccountModel(
        account_number=account_number,
        name=account.name,
        balance=account.balance
    )
    db.add(new_acc)
    db.commit()
    db.refresh(new_acc)
    return new_acc

@app.post("/deposit")
def deposit(transaction: Transaction, db: Session = Depends(get_db)):
    acc = db.query(AccountModel).filter_by(account_number=transaction.account_number).first()
    if not acc:
        raise HTTPException(status_code=404, detail="Account not found")
    acc.balance += transaction.amount
    db.commit()
    return {"message": "Deposit successful", "balance": acc.balance}

@app.post("/withdraw")
def withdraw(transaction: Transaction, db: Session = Depends(get_db)):
    acc = db.query(AccountModel).filter_by(account_number=transaction.account_number).first()
    if not acc:
        raise HTTPException(status_code=404, detail="Account not found")
    if acc.balance < transaction.amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    acc.balance -= transaction.amount
    db.commit()
    return {"message": "Withdraw successful", "balance": acc.balance}

@app.get("/check-balance")
def check_balance(account_number: str, db: Session = Depends(get_db)):
    acc = db.query(AccountModel).filter_by(account_number=account_number).first()
    if not acc:
        raise HTTPException(status_code=404, detail="Account not found")
    return {"balance": acc.balance}

@app.get("/account-summary")
def account_summary(account_number: str, db: Session = Depends(get_db)):
    acc = db.query(AccountModel).filter_by(account_number=account_number).first()
    if not acc:
        raise HTTPException(status_code=404, detail="Account not found")
    return {
        "name": acc.name,
        "account_number": acc.account_number,
        "balance": acc.balance
    }

# --- NEW: User Summary ---
@app.get("/user-summary")
def user_summary(name: str, db: Session = Depends(get_db)):
    accounts = db.query(AccountModel).filter_by(name=name).all()
    if not accounts:
        raise HTTPException(status_code=404, detail="No accounts found for this user")

    total_balance = sum(acc.balance for acc in accounts)
    account_list = [
        {"account_number": acc.account_number, "balance": acc.balance}
        for acc in accounts
    ]

    return {
        "user": name,
        "accounts": account_list,
        "total_balance": total_balance
    }
