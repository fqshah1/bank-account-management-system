@echo off
:: Change to backend folder and start FastAPI
cd /d "%~dp0bank-account-backend"
start cmd /k "uvicorn main:app --reload --host 127.0.0.1 --port 8010"

:: Change to frontend folder and start Vite
cd /d "%~dp0bank-account-frontend"
start cmd /k "npm run dev"

exit