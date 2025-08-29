@echo off
echo Starting FastAPI backend...
start cmd /k "cd /d E:\python projects\python-small-projects\bank account management system\bank-account-backend && uvicorn main:app --reload"

timeout /t 5 >nul

echo Starting React frontend...
start cmd /k "cd /d E:\python projects\python-small-projects\bank account management system\bank-account-frontend && npm run dev"

timeout /t 3 >nul

echo Launching in Chrome...
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" http://localhost:5173
