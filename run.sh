#!/bin/bash

# Navigate to the 'web' folder
cd web

# Check if 'node_modules' folder exists
if [ ! -d "node_modules" ]; then
  echo "Installing web dependencies..."
  npm install
fi
# Run 'npm run client' in the background
npm run dev &

# Move back to the parent directory
cd ..


# Navigate to the 'api' folder
cd api

# Check if 'node_modules' folder exists
if [ ! -d "node_modules" ]; then
  echo "Installing api dependencies..."
  npm install
fi

# Run 'npm run server' in the background
npm run start

