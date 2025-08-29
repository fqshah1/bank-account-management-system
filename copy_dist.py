import shutil
import os

frontend_dist = "bank-account-frontend/dist"
backend_dist = "bank-account-backend/dist"

# Delete old backend/dist if it exists
if os.path.exists(backend_dist):
    print(f"Deleting old {backend_dist}...")
    shutil.rmtree(backend_dist)

# Copy frontend/dist to backend
print(f"Copying {frontend_dist} to {backend_dist}...")
shutil.copytree(frontend_dist, backend_dist)

print("✅ Frontend build copied to backend successfully.")
