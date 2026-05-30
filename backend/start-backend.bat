@echo off
echo ========================================
echo   CodeBridge Bootcamp - Full Stack Setup
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed!
echo.

echo [2/4] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

echo [3/4] Setting up environment...
if not exist .env (
    copy .env.example .env
    echo .env file created! Please edit it with your configuration.
    echo.
    echo IMPORTANT: Update these values in backend\.env:
    echo   - MONGODB_URI
    echo   - JWT_SECRET
    echo   - EMAIL credentials
    echo.
    pause
)

echo [4/4] Starting the server...
echo.
echo ========================================
echo   Server starting on http://localhost:5000
echo   Press Ctrl+C to stop
echo ========================================
echo.
npm run dev
