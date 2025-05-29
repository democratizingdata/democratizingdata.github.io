# Quick GitHub Pages Deployment Guide

## Easy 5-Minute Deployment

### Step 1: Create New Repository
1. Go to your GitHub organization
2. Click "New repository"
3. Name it: `democratizingdata-preview` (or similar)
4. Make it **Public**
5. **Don't** initialize with README
6. Click "Create repository"

### Step 2: Clone This Project to New Location
```bash
# Create a copy of your current project
cp -r . ../democratizingdata-preview-deploy
cd ../democratizingdata-preview-deploy

# Remove git history and Task Master files
rm -rf .git tasks/ scripts/ .taskmasterconfig memory-mcp/
rm _config.dev.yml deploy-preview.sh _config.deploy.yml DEPLOY-README.md

# Update configuration for GitHub Pages
```

### Step 3: Update Configuration
Edit `_config.yml` and update these lines:
```yaml
title: "Democratizing Data (Preview)"
url: "https://YOUR-ORG-NAME.github.io"  # Replace YOUR-ORG-NAME
baseurl: "/democratizingdata-preview"   # Replace with your repo name
domain: ""  # Remove custom domain
```

### Step 4: Push to GitHub
```bash
# Initialize new git repository
git init
git add .
git commit -m "Deploy: Democratizing Data redesign preview"

# Connect to your new repository (replace YOUR-ORG-NAME and REPO-NAME)
git remote add origin https://github.com/YOUR-ORG-NAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

### Step 5: Enable GitHub Pages
1. Go to your new repository on GitHub
2. Click "Settings" tab
3. Scroll to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

### Step 6: Access Your Preview Site
- URL will be: `https://YOUR-ORG-NAME.github.io/REPO-NAME`
- GitHub will show the URL in the Pages settings
- Usually takes 5-10 minutes to deploy

## What Gets Deployed
✅ Complete redesigned website  
✅ All new images and content  
✅ Accessibility improvements  
✅ Mobile-responsive design  
✅ Modern Jekyll setup  

## Notes
- This creates a completely separate repository
- Perfect for stakeholder review and validation
- No impact on your main repository
- Easy to delete when no longer needed 