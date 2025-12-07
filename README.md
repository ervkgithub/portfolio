# Portfolio Documentation

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS. This portfolio showcases projects, skills, experience, and includes interactive features like a chatbot and contact form with email integration.

## Portfolio [Demo URL](https://portfolio-vijay-ai.vercel.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Pages & Components](#pages--components)
- [Email Setup](#email-setup)
- [Chatbot Setup](#chatbot-setup)
- [Customization](#customization)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This portfolio website is designed for a Frontend Developer with 9+ years of experience. It features:

- **Professional Design**: Modern, clean UI with dark/light mode support
- **Interactive Chatbot**: Free, keyword-based chatbot answering common questions
- **Contact Forms**: Email integration for contact form and hire me modal
- **Project Showcase**: Dynamic project filtering and detailed project pages
- **Responsive**: Fully responsive design for all devices
- **SEO Optimized**: Meta tags and proper page structure

---

## ✨ Features

### Core Features

✅ **Home Page**
- Hero banner with introduction
- Featured projects grid
- Call-to-action buttons

✅ **About Page**
- Professional bio and background
- Experience counter (9+ years)
- Skills showcase (28+ technologies)
- Projects counter (30+ projects)
- Client testimonials

✅ **Projects Page**
- Filterable project grid
- Project categories
- Individual project detail pages
- Related projects suggestions

✅ **Contact Page**
- Contact form with email integration
- Contact details
- Social media links

✅ **Interactive Chatbot**
- Free, no API costs
- Answers common questions about experience, skills, CTC, etc.
- Quick question buttons
- Smooth animations

✅ **Email Integration**
- Contact form submissions
- Hire Me modal submissions
- Gmail integration using Nodemailer
- HTML email templates

✅ **Dark/Light Mode**
- Theme switcher
- Persistent theme preference
- Smooth transitions

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 13** - React framework with SSR
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

### Backend & Services
- **Nodemailer** - Email sending service
- **Next.js API Routes** - Serverless API endpoints

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Babel** - JavaScript compiler

### Dependencies
```json
{
  "next": "^13.0.5",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^5.5.3",
  "react-icons": "^4.3.1",
  "react-countup": "^6.1.1",
  "nodemailer": "^7.0.11",
  "@emailjs/browser": "^4.4.1",
  "@tailwindcss/forms": "^0.4.0",
  "uuid": "^8.3.2"
}
```

---

## 🚀 Installation

### Prerequisites

- Node.js 16+ and npm/yarn
- Git

### Setup Steps

1. **Clone or navigate to the project**
   ```bash
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the `portfolio` folder:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
portfolio/
├── components/
│   ├── about/              # About page components
│   │   ├── AboutClients.jsx
│   │   ├── AboutCounter.jsx
│   │   └── AboutMeBio.jsx
│   ├── chatbot/            # Chatbot component
│   │   └── Chatbot.jsx
│   ├── contact/            # Contact page components
│   │   ├── ContactDetails.jsx
│   │   └── ContactForm.jsx
│   ├── layout/             # Layout components
│   │   └── DefaultLayout.jsx
│   ├── projects/           # Projects page components
│   │   ├── ProjectsFilter.jsx
│   │   ├── ProjectsGrid.jsx
│   │   └── ProjectSingle.jsx
│   ├── reusable/           # Reusable components
│   │   ├── Button.jsx
│   │   └── FormInput.jsx
│   └── shared/             # Shared components
│       ├── AppBanner.jsx
│       ├── AppFooter.jsx
│       └── AppHeader.jsx
├── data/                   # Data files
│   ├── aboutMeData.js
│   ├── chatbotData.js
│   ├── clientsData.js
│   └── projectsData.js
├── hooks/                   # Custom React hooks
│   ├── useScrollToTop.jsx
│   └── useThemeSwitcher.jsx
├── pages/                   # Next.js pages
│   ├── api/                # API routes
│   │   └── send-email.js
│   ├── about.jsx
│   ├── contact.jsx
│   ├── index.jsx
│   └── projects/
│       ├── [id].jsx
│       └── index.jsx
├── public/                  # Static assets
│   ├── images/
│   ├── fonts/
│   └── files/
├── styles/                  # Global styles
│   └── globals.css
├── utils/                   # Utility functions
│   └── emailService.js
├── .env.local              # Environment variables (create this)
├── next.config.js
├── package.json
├── tailwind.config.js
└── PORTFOLIO.md            # This file
```

---

## 📄 Pages & Components

### Pages

1. **Home (`/`)**
   - Hero banner
   - Featured projects
   - Navigation to projects

2. **About (`/about`)**
   - Professional bio
   - Experience and skills
   - Client testimonials

3. **Projects (`/projects`)**
   - All projects with filtering
   - Project categories
   - Search functionality

4. **Project Detail (`/projects/[id]`)**
   - Individual project details
   - Project images
   - Related projects

5. **Contact (`/contact`)**
   - Contact form
   - Contact information
   - Social links

### Key Components

- **Chatbot**: Interactive assistant (bottom-right corner)
- **ContactForm**: Email-enabled contact form
- **HireMeModal**: Modal for project inquiries
- **ProjectsGrid**: Filterable project showcase
- **AboutCounter**: Animated experience/skills counters

---

## 📧 Email Setup

### Overview

The portfolio uses **Nodemailer with Gmail** to send emails from contact forms. This approach uses Gmail App Passwords, which is simpler and more reliable than OAuth.

### Step-by-Step Setup

#### Step 1: Enable 2-Step Verification

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. This is required to generate App Passwords

### Step 2: Generate Gmail App Password

1. Go to [Google Account App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter a name like "Portfolio Contact Form"
5. Click **Generate**
6. **Copy the 16-character password** (it won't be shown again!)

### Step 3: Configure Environment Variables

1. Create `.env.local` in the `portfolio` folder:
   ```env
   EMAIL_USER=vijay10101992@gmail.com
   EMAIL_PASSWORD=your_16_character_app_password_here
   ```

2. **Important Notes:**
   - Use your full Gmail address for `EMAIL_USER`
   - Use the 16-character App Password (NOT your regular password)
   - Never commit `.env.local` to git (already in `.gitignore`)

### Step 4: Update Recipient Email (Optional)

The email is sent to: **vijay10101992@gmail.com**

To change the recipient, edit `pages/api/send-email.js` and update the `to` field in `mailOptions` (around line 85).

### Step 5: Test

1. Start development server: `npm run dev`
2. Fill out the contact form or hire me modal
3. Submit the form
4. Check your email inbox

### Email Features

- **Contact Form**: Sends name, email, subject, and message
- **Hire Me Modal**: Sends name, email, project type, and description
- **HTML Email Templates**: Formatted emails with styling
- **Reply-To**: Set to sender's email for easy replies

### Troubleshooting Email

**"Invalid login" or "Authentication failed"**
- Ensure you're using the **App Password**, not your regular password
- Verify 2-Step Verification is enabled
- Check the App Password is copied correctly (no spaces)

**"Email service not configured"**
- Verify `.env.local` exists in the `portfolio` folder
- Check both `EMAIL_USER` and `EMAIL_PASSWORD` are set
- Restart the development server after adding environment variables

**Emails not arriving**
- Check spam/junk folder
- Verify recipient email in `send-email.js`
- Check server console for error messages

---

## 🤖 Chatbot Setup

### Overview

The chatbot is **completely free** - it uses only React state with no external APIs or costs. It answers common questions about experience, skills, projects, CTC, and more.

### How It Works

- **Keyword-based matching**: Matches user questions to predefined answers
- **Knowledge base**: All Q&A pairs stored in `data/chatbotData.js`
- **Smart matching**: Handles variations in question phrasing
- **Quick questions**: Predefined buttons for common queries

### Features

✅ **Free** - No API costs, uses only React state  
✅ **Fast** - Instant responses  
✅ **Customizable** - Easy to update answers  
✅ **Responsive** - Works on mobile and desktop  
✅ **Animated** - Smooth transitions and typing indicators  
✅ **Smart Matching** - Handles variations in question phrasing

### Customizing the Chatbot

#### Update Existing Answers

1. Open `data/chatbotData.js`
2. Find the question category you want to update
3. Modify the `answer` field

#### Example: Updating CTC Information

```javascript
{
	keywords: ['ctc', 'current ctc', 'current salary', 'current package', 'present ctc'],
	answer: `My current CTC is X LPA. I'm open to discussing opportunities based on the role and responsibilities.`,
},
```

#### Adding New Questions

Add a new object to the `chatbotKnowledge` array:

```javascript
{
	keywords: ['your', 'keywords', 'here'],
	answer: 'Your answer here',
},
```

**Tips:**
- Add multiple keywords for the same question
- Use common variations (e.g., 'ctc', 'salary', 'package')
- Keep answers concise but informative

### Common Customizations

#### 1. CTC and Expected CTC

Update these entries in `chatbotData.js`:
- Keywords: `['ctc', 'current ctc', ...]`
- Keywords: `['expected', 'expected ctc', ...]`

#### 2. Notice Period

```javascript
{
	keywords: ['available', 'notice period', 'joining', 'when can join', 'availability'],
	answer: `I'm currently serving a notice period of X days/weeks. I can join immediately after that.`,
},
```

#### 3. Location Preferences

```javascript
{
	keywords: ['location', 'where', 'based', 'city', 'relocate'],
	answer: `I'm currently based in [Your City]. I'm open to [remote/hybrid/onsite] opportunities.`,
},
```

#### 4. Contact Information

```javascript
{
	keywords: ['contact', 'reach', 'email', 'how to contact', 'get in touch'],
	answer: `You can contact me through:
• The contact form on this website
• Email: your-email@example.com`,
},
```

### Styling Customization

Edit `components/chatbot/Chatbot.jsx` to customize:
- **Colors**: Change `bg-indigo-500` to your preferred color
- **Size**: Adjust `w-96` and `h-[600px]` for dimensions
- **Position**: Change `bottom-6 right-6` for placement

### Testing

1. Start development server: `npm run dev`
2. Click the chatbot button (bottom right)
3. Try asking questions using different keywords
4. Verify answers appear correctly

---

## 🎨 Customization

### Updating Personal Information

#### About Me

Edit `data/aboutMeData.js`:
```javascript
export const aboutMeData = [
	{
		id: uuidv4(),
		bio: 'Your bio text here...',
	},
];
```

#### Experience & Skills

Edit `components/about/AboutCounter.jsx`:
- Update experience years: `useCountUp({ ref: 'experienceCounter', end: 9, ...})`
- Update projects count: `useCountUp({ ref: 'projectsCounter', end: 30, ...})`
- Modify skills array to add/remove technologies

#### Projects

Edit `data/projectsData.js` to add/update projects:
```javascript
{
	id: uuidv4(),
	title: 'Project Name',
	description: 'Project description...',
	// ... other fields
}
```

### Styling

#### Colors

Edit `tailwind.config.js` to customize color scheme:
```javascript
theme: {
	extend: {
		colors: {
			'primary-dark': '#...',
			'primary-light': '#...',
			// ... other colors
		}
	}
}
```

#### Fonts

Update fonts in `styles/globals.css` or `tailwind.config.js`

### Images

Replace images in `public/images/`:
- `profile.jpg` - Profile picture
- `logo-light.png` / `logo-dark.png` - Logo files
- Project images in `public/images/`

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `EMAIL_USER`
     - `EMAIL_PASSWORD`
   - Deploy

### Other Platforms

#### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

#### Custom Server

1. Build: `npm run build`
2. Start: `npm start`
3. Ensure Node.js 16+ is installed

### Environment Variables in Production

Make sure to add these in your hosting platform:
- `EMAIL_USER`
- `EMAIL_PASSWORD`

---

## 🔧 Troubleshooting

### Common Issues

#### Development Server Won't Start

- Check Node.js version (16+ required)
- Delete `node_modules` and `package-lock.json`, then `npm install`
- Check for port conflicts (default: 3000)

#### Email Not Sending

- Verify `.env.local` exists and has correct values
- Check App Password is correct (16 characters, no spaces)
- Ensure 2-Step Verification is enabled
- Check server console for error messages

#### Chatbot Not Appearing

- Verify `Chatbot` component is imported in `DefaultLayout.jsx`
- Check browser console for errors
- Ensure `data/chatbotData.js` exists and is properly formatted

#### Build Errors

- Run `npm run lint` to check for errors
- Verify all imports are correct
- Check for missing dependencies

#### Styling Issues

- Clear browser cache
- Restart development server
- Verify Tailwind CSS is properly configured

### Getting Help

1. Check browser console for errors
2. Check server console for errors
3. Verify all environment variables are set
4. Ensure all dependencies are installed

---

## 📊 Portfolio Information

### Current Details

- **Experience**: 9+ years
- **Projects**: 30+ completed
- **Skills**: 28+ technologies
- **Email**: vijay10101992@gmail.com

### Skills List

- **Frontend**: Next.js, React.js, TypeScript, JavaScript
- **Styling**: Tailwind CSS, SCSS, Bootstrap
- **Tools**: GraphQL, Storybook, Shadcn/UI
- **CMS**: Sitecore XMC, Sitecore SXA, Drupal
- **AI Tools**: Cursor AI, Cody AI, ChatGPT, Builder.io, V0.dev
- **Other**: Accessibility, Responsive Design, Performance Optimization, Micro Front-end Architecture, CI/CD, Unit Testing, Prompt Engineering, Agentic AI

---

## 📝 License

This project is open source and available for personal and commercial use.

---

## 🙏 Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Icons from React Icons
- Animations with Framer Motion

---

## 📞 Support

For questions or issues:
- Check this documentation
- Review the code comments
- Check browser/server console for errors

---

**Last Updated**: 2024  
**Version**: 1.0.0

