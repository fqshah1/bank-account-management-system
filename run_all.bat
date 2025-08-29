@echo off
cd bank-account-frontend
echo Building frontend...
npm run build

cd ..
echo Copying build files...
python copy_dist.py

cd bank-account-backend
echo Starting FastAPI server...
uvicorn main:app --reload
