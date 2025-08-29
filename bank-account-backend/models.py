from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base  # make sure this points to your SQLAlchemy Base

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    account_number = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    balance = Column(Float, default=0.0)

    # relationship to transactions
    transactions = relationship("Transaction", back_populates="account")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("accounts.id"))
    type = Column(String)  # deposit / withdrawal
    amount = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

    account = relationship("Account", back_populates="transactions")
