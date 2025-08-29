@echo off
cd /d "E:\python projects\python-small-projects\bank account management system\bank-account-frontend"
npm run build

cd /d "E:\python projects\python-small-projects\bank account management system"
python copy_dist.py

cd /d "E:\python projects\python-small-projects\bank account management system\bank-account-backend"
start cmd /k "uvicorn main:app --reload"
