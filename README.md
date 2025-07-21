# AIEngineerInsights.com

## Project info

**URL**: https://lovable.dev/projects/29c700af-5c0e-4ffd-85f8-c210aaf724af

## Content Editing Guide

This guide shows you exactly where to edit different parts of your website content.

### 📝 Main Page Content

**Hero Section** (`src/components/HeroSection.tsx`)
- **Main headline**: Lines 26-32 - Edit "AI Engineer Insights" text
- **Tagline**: Line 22 - Change "Your Companion on the AI Engineering Journey"
- **Description**: Lines 35-38 - Update the main value proposition text
- **CTA buttons**: Lines 42-48 - Modify button text and actions
- **Value props**: Lines 52-76 - Edit the three feature cards (Role Clarity, Practical Roadmaps, Real Projects)

**About Section** (`src/components/AboutSection.tsx`)
- **About content**: Lines 14-28 - Edit the main about paragraphs
- **Mission cards**: Lines 32-56 - Update the three mission cards (Personal Touch, Community Focused, Practical Insights)
- **Call-to-action**: Lines 58-68 - Modify the "Let's Connect" section

### ✍️ Blog Content

**Latest Insights** (`src/components/LatestInsights.tsx`)
- **Blog posts**: Lines 5-34 - Add/edit blog post data including:
  - `title`: Blog post title
  - `excerpt`: Brief description
  - `readTime`: Estimated reading time
  - `date`: Publication date
  - `category`: Post category
  - `icon`: Lucide icon name
  - `gradient`: CSS gradient class

### 🚀 Projects

**Featured Projects** (`src/components/FeaturedProjects.tsx`)
- **Project data**: Lines 7-35 - Add/edit projects including:
  - `title`: Project name
  - `description`: Project description
  - `url`: GitHub or project URL
  - `stars`: GitHub stars count
  - `forks`: GitHub forks count
  - `topics`: Array of topic tags
  - `highlight`: Key highlight text

### 📞 Contact Details

**Footer** (`src/components/Footer.tsx`)
- **Social links**: Lines 35-39 - Update social media icon links
- **Brand description**: Lines 30-33 - Edit the footer description
- **Quick links**: Lines 4-9 - Modify navigation links
- **Resources**: Lines 11-16 - Update external resource links
- **Contact info**: Lines 103-106 - Edit contact-related links

### 📚 Resources

**Footer Resources** (`src/components/Footer.tsx`)
- **External resources**: Lines 11-16 - Add/edit external learning resources
- **Newsletter**: Lines 79-94 - Modify newsletter signup section

**Roadmap Section** (`src/components/RoadmapSection.tsx`)
- **Career roadmap content**: Edit roadmap steps and career guidance

### 🎨 Site Branding

**Site Title & Meta** (`index.html`)
- **Page title**: Line 6 - Edit browser tab title
- **Meta description**: Line 7 - Update SEO description
- **Open Graph data**: Lines 10-17 - Social media sharing info

**Navigation** (`src/components/Navigation.tsx`)
- **Brand name**: Update the site name in navigation
- **Menu items**: Edit navigation menu links

## How to Edit This Code

**Use Lovable (Recommended)**

Simply visit the [Lovable Project](https://lovable.dev/projects/29c700af-5c0e-4ffd-85f8-c210aaf724af) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/29c700af-5c0e-4ffd-85f8-c210aaf724af) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
