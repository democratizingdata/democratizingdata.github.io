#!/bin/bash

# GitHub Pages Preview Deployment Script
# Usage: ./deploy-preview.sh [org-name] [repo-name]

set -e  # Exit on any error

# Configuration
ORG_NAME=${1:-"YourOrgName"}        # Replace with your GitHub organization name
REPO_NAME=${2:-"democratizingdata-preview"}  # Replace with desired repository name
BRANCH="main"

echo "🚀 Deploying Democratizing Data Preview to GitHub Pages"
echo "Organization: $ORG_NAME"
echo "Repository: $REPO_NAME"
echo "Branch: $BRANCH"
echo ""

# Create temporary directory for deployment
TEMP_DIR=$(mktemp -d)
echo "📁 Created temporary directory: $TEMP_DIR"

# Copy site files to temporary directory
echo "📋 Copying site files..."
rsync -av --exclude='.git/' --exclude='node_modules/' --exclude='_site/' --exclude='.sass-cache/' . "$TEMP_DIR/"

# Navigate to temporary directory
cd "$TEMP_DIR"

# Update deployment configuration
echo "⚙️ Updating configuration for GitHub Pages..."
sed -i.bak "s/YourOrgName/$ORG_NAME/g" _config.deploy.yml
sed -i.bak "s/democratizingdata-preview/$REPO_NAME/g" _config.deploy.yml

# Initialize git repository
echo "🔧 Initializing Git repository..."
git init
git add .
git commit -m "Initial commit: Democratizing Data redesign preview

- Modern Jekyll website with Credential Engine-inspired design
- Accessibility improvements (WCAG 2.1 AA compliance)
- Updated images and content
- Mobile-responsive design
- Enhanced navigation and user experience"

# Add remote and push
echo "📤 Pushing to GitHub..."
git branch -M $BRANCH
git remote add origin "https://github.com/$ORG_NAME/$REPO_NAME.git"

echo ""
echo "🎯 Ready to push! Run these commands:"
echo "   cd $TEMP_DIR"
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
echo "🌐 Preview URL will be: https://$ORG_NAME.github.io/$REPO_NAME"
echo ""
echo "⚠️  Remember to clean up: rm -rf $TEMP_DIR" 