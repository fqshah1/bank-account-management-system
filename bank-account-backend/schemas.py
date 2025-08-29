from pydantic import BaseModel
from datetime import datetime
from typing import List

class AccountCreate(BaseModel):
    name: str
    initial_deposit: float


class AccountResponse(BaseModel):
    account_number: str
    name: str
    balance: float

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True


class TransactionCreate(BaseModel):
    account_id: int
    type: str
    amount: float


class TransactionResponse(BaseModel):
    id: int
    account_id: int
    type: str
    amount: float
    timestamp: datetime

    class Config:
        orm_mode = True
