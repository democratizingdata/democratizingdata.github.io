#!/bin/bash

# GitHub Pages Preview Deployment Script
# Usage: ./deploy-preview.sh [org-name] [repo-name]

set -e  # Exit on any error

# Get the original project directory (where this script is located) BEFORE changing directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Configuration
ORG_NAME=${1:-"YourOrgName"}        # Replace with your GitHub organization name
REPO_NAME=${2:-"democratizingdata-preview"}  # Replace with desired repository name
BRANCH="main"
REPO_URL="https://github.com/$ORG_NAME/$REPO_NAME.git"

echo "🚀 Updating Democratizing Data Preview on GitHub Pages"
echo "Organization: $ORG_NAME"
echo "Repository: $REPO_NAME"
echo "Branch: $BRANCH"
echo ""

# Check if local repository directory exists
LOCAL_REPO_DIR="../$REPO_NAME"

if [ -d "$LOCAL_REPO_DIR" ]; then
    echo "📁 Found existing local repository: $LOCAL_REPO_DIR"
    echo "🔄 Updating existing repository..."
    
    # Navigate to existing repository
    cd "$LOCAL_REPO_DIR"
    
    # Ensure we're on the correct branch and pull latest changes
    echo "📥 Pulling latest changes from remote..."
    git checkout $BRANCH 2>/dev/null || git checkout -b $BRANCH
    git pull origin $BRANCH 2>/dev/null || echo "⚠️  No remote changes to pull (this is normal for first update)"
    
    # Clean the repository (keep .git directory)
    echo "🧹 Cleaning repository contents..."
    find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +
    
    WORK_DIR="$LOCAL_REPO_DIR"
else
    echo "📁 Local repository not found. Cloning from GitHub..."
    
    # Try to clone the repository
    if git clone "$REPO_URL" "$LOCAL_REPO_DIR" 2>/dev/null; then
        echo "✅ Successfully cloned existing repository"
        cd "$LOCAL_REPO_DIR"
        git checkout $BRANCH 2>/dev/null || git checkout -b $BRANCH
        
        # Clean the repository (keep .git directory)
        echo "🧹 Cleaning repository contents..."
        find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +
        
        WORK_DIR="$LOCAL_REPO_DIR"
    else
        echo "⚠️  Repository doesn't exist on GitHub yet. Creating temporary directory for initial setup..."
        
        # Create temporary directory for initial deployment
        TEMP_DIR=$(mktemp -d)
        echo "📁 Created temporary directory: $TEMP_DIR"
        WORK_DIR="$TEMP_DIR"
        cd "$WORK_DIR"
        
        # Initialize git repository for new setup
        echo "🔧 Initializing Git repository..."
        git init
    fi
fi

# Copy site files to working directory
echo "📋 Copying site files..."

# Copy files differently based on whether we're in the repo directory or a temp directory
if [ -n "$LOCAL_REPO_DIR" ] && [ "$PWD" = "$(realpath "$LOCAL_REPO_DIR")" ]; then
    # We're in the existing repository directory, copy from script directory
    rsync -av --exclude='.git/' --exclude='node_modules/' --exclude='_site/' --exclude='.sass-cache/' --exclude="$REPO_NAME/" "$SCRIPT_DIR/" ./
else
    # We're in a temporary directory, copy to the work directory
    rsync -av --exclude='.git/' --exclude='node_modules/' --exclude='_site/' --exclude='.sass-cache/' --exclude="$REPO_NAME/" "$SCRIPT_DIR/" "$WORK_DIR/"
fi

# Navigate to working directory
cd "$WORK_DIR"

# Update deployment configuration
echo "⚙️ Updating configuration for GitHub Pages..."

# Update _config.deploy.yml if it exists
if [ -f "_config.deploy.yml" ]; then
    sed -i.bak "s/YourOrgName/$ORG_NAME/g" _config.deploy.yml
    sed -i.bak "s/democratizingdata-preview/$REPO_NAME/g" _config.deploy.yml
    rm -f _config.deploy.yml.bak
fi

# Update main _config.yml for GitHub Pages
if [ -f "_config.yml" ]; then
    echo "📝 Updating baseurl in _config.yml for GitHub Pages..."
    # Update the baseurl to use the repository name for GitHub Pages
    sed -i.bak "s|^baseurl:.*|baseurl: \"/$REPO_NAME\"|g" _config.yml
    # Update the URL to use GitHub Pages domain
    sed -i.bak "s|^url:.*|url: \"https://$ORG_NAME.github.io\"|g" _config.yml
    rm -f _config.yml.bak
fi

# Stage all changes
echo "📦 Staging changes..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes detected. Repository is already up to date."
    echo ""
    echo "🌐 Preview URL: https://$ORG_NAME.github.io/$REPO_NAME"
    
    # Clean up temp directory if it was created
    if [ -n "$TEMP_DIR" ] && [ -d "$TEMP_DIR" ]; then
        echo "🧹 Cleaning up temporary directory..."
        rm -rf "$TEMP_DIR"
    fi
    
    exit 0
fi

# Commit changes
echo "💾 Committing changes..."
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
git commit -m "Update preview: $TIMESTAMP

- Updated Democratizing Data content
- Refreshed design and assets
- Maintained accessibility improvements
- Updated mobile-responsive features"

# Push changes
if [ -n "$TEMP_DIR" ]; then
    # This is a new repository setup
    echo "📤 Setting up new repository..."
    git branch -M $BRANCH
    git remote add origin "$REPO_URL"
    
    echo ""
    echo "🎯 Ready to push! Run these commands:"
    echo "   cd $WORK_DIR"
    echo "   git push -u origin $BRANCH"
    echo ""
    echo "📝 Manual steps needed:"
    echo "   1. Create repository: https://github.com/organizations/$ORG_NAME/repositories/new"
    echo "   2. Repository name: $REPO_NAME"
    echo "   3. Make it public"
    echo "   4. Don't initialize with README"
    echo "   5. Enable GitHub Pages in repository settings"
    echo "   6. Set source to 'Deploy from a branch' > '$BRANCH' > '/ (root)'"
    echo ""
    echo "⚠️  Remember to clean up: rm -rf $TEMP_DIR"
else
    # This is an existing repository update
    echo "📤 Pushing updates to GitHub..."
    git push origin $BRANCH
    
    echo ""
    echo "✅ Successfully updated preview repository!"
fi

echo ""
echo "🌐 Preview URL: https://$ORG_NAME.github.io/$REPO_NAME"
echo ""
echo "💡 To update again, simply run: ./deploy-preview.sh $ORG_NAME $REPO_NAME" 