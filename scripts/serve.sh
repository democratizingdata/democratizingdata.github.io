#!/bin/bash

# Kill any existing Jekyll processes
echo "Checking for existing Jekyll processes..."
JEKYLL_PIDS=$(ps aux | grep '[j]ekyll serve' | awk '{print $2}')
if [ ! -z "$JEKYLL_PIDS" ]; then
    echo "Killing existing Jekyll processes: $JEKYLL_PIDS"
    echo $JEKYLL_PIDS | xargs kill
    sleep 2
fi

# Find an available port starting from 4000
PORT=4000
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; do
    echo "Port $PORT is in use, trying next port..."
    PORT=$((PORT + 1))
done

echo "Starting Jekyll on port $PORT..."
bundle exec jekyll serve --livereload --config _config.yml,_config.dev.yml --port $PORT 