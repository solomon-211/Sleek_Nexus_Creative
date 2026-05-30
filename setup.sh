#!/bin/bash
# Setup script for local development environment

set -e

echo "🚀 Sleek Nexus Creative - Development Setup"
echo "==========================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or later."
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✓ Node.js $NODE_VERSION found"

# Check npm
NPM_VERSION=$(npm -v)
echo "✓ npm $NPM_VERSION found"

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✓ .env created. Please update it with your configuration."
else
    echo "✓ .env already exists"
fi

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend
npm install
echo "✓ Frontend dependencies installed"
cd ..

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend
npm install
echo "✓ Backend dependencies installed"
cd ..

# Setup Database
echo ""
echo "📦 Setting up Database module..."
cd database
npm install
echo "✓ Database dependencies installed"
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "  1. Update .env with your configuration"
echo "  2. Start MongoDB (local or Docker)"
echo "  3. Run: npm run dev:frontend (terminal 1)"
echo "  4. Run: npm run dev:backend (terminal 2)"
echo "  5. Open http://localhost:5173"
echo ""
echo "💡 Or use Docker Compose:"
echo "  docker-compose up --build"
echo ""
