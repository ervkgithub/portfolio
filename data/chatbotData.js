// Chatbot Knowledge Base - Predefined Q&A pairs
export const chatbotKnowledge = [
	{
		keywords: ['about', 'who', 'introduce', 'tell me about', 'background'],
		answer: `I'm a Senior Frontend Developer with 9+ years of experience in building scalable, high-performing, and SEO-friendly web applications. I specialize in React.js, Next.js, TypeScript, Tailwind CSS, GraphQL, and modern UI frameworks. I've successfully delivered enterprise-grade solutions across domains like eCommerce, Banking, and Healthcare.`,
	},
	{
		keywords: ['experience', 'years', 'total experience', 'how long', 'experience level'],
		answer: `I have 9+ years of total experience in frontend development. Throughout my career, I've worked on various projects including eCommerce platforms, banking applications, and healthcare systems. I've completed 30+ projects successfully.`,
	},
	{
		keywords: ['skills', 'technologies', 'tech stack', 'what technologies', 'expertise', 'proficient'],
		answer: `My core skills include:
• Frontend: Next.js, React.js, TypeScript, JavaScript
• Styling: Tailwind CSS, SCSS, Bootstrap
• Tools: GraphQL, Storybook, Shadcn/UI
• CMS: Sitecore XMC, Sitecore SXA, Drupal
• AI Tools: Cursor AI, Cody AI, ChatGPT, Builder.io, V0.dev
• Other: Accessibility (A11y), Responsive Design, Performance Optimization, Micro Front-end Architecture, CI/CD, Unit Testing, Prompt Engineering, Agentic AI`,
	},
	{
		keywords: ['ctc', 'current ctc', 'current salary', 'current package', 'present ctc'],
		answer: `I'd be happy to discuss compensation details. For current CTC and package information, please reach out to me directly through the contact form or email. I'm open to discussing this based on the role and opportunity.`,
	},
	{
		keywords: ['expected', 'expected ctc', 'expected salary', 'expected package', 'salary expectation'],
		answer: `My expected CTC depends on the role, responsibilities, and company. I'm open to discussing this based on the opportunity. Please feel free to contact me through the contact form, and we can have a detailed conversation about expectations.`,
	},
	{
		keywords: ['projects', 'portfolio', 'work', 'completed projects', 'what projects'],
		answer: `I've completed 30+ projects across various domains including eCommerce, Banking, and Healthcare. You can explore my detailed projects in the Projects section of this portfolio. Each project showcases different aspects of my expertise in frontend development, UI/UX, and modern web technologies.`,
	},
	{
		keywords: ['available', 'notice period', 'joining', 'when can join', 'availability'],
		answer: `I'm actively looking for new opportunities. For specific details about my notice period and availability, please contact me directly through the contact form. I'm open to discussing timelines that work for both parties.`,
	},
	{
		keywords: ['location', 'where', 'based', 'city', 'relocate'],
		answer: `I'm looking for remote position. Please reach out through the contact form for more specific details.`,
	},
	{
		keywords: ['contact', 'reach', 'email', 'how to contact', 'get in touch'],
		answer: `You can contact me through:
• The contact form on this website
• Email: vijay10101992@gmail.com
• Mob: +91 - 9953038020
• The "Hire Me" button for project inquiries
I typically respond within 24-48 hours.`,
	},
	{
		keywords: ['react', 'react.js', 'reactjs', 'next.js', 'tailwind', 'tailwindcss', 'typescript', 'graphql', 'storybook', 'shadcn/ui', 'javascript', 'html5', 'css3', 'jquery', 'bootstrap', 'scss', 'ai', 'chatgpt', 'agentic ai', 'gen ai', 'v0.dev', 'cody', 'cursor ai', 'builder.io', 'prompt engineering'],
		answer: `Yes, I'm highly proficient in React.js and next.js with extensive experience building complex, scalable applications. I've worked with React for 4+ years, creating component-based architectures, managing state, and implementing modern React patterns including hooks, context API, and performance optimization.`,
	},
	{
		keywords: ['next.js', 'nextjs', 'next'],
		answer: `Absolutely! Next.js is one of my core technologies. I have extensive experience building production-ready applications with Next.js, including SSR (Server-Side Rendering), SSG (Static Site Generation), API routes, and optimizing for performance and SEO.`,
	},
	{
		keywords: ['typescript', 'ts'],
		answer: `Yes, I'm proficient in TypeScript and use it extensively in my projects. TypeScript helps me write more maintainable, type-safe code and catch errors early in the development process.`,
	},
	{
		keywords: ['resume', 'cv', 'download resume'],
		answer: `You can download my resume from the portfolio. Look for the resume/CV download link in the header or contact section. If you need it in a specific format, please reach out through the contact form.`,
	},
	{
		keywords: ['hire', 'hiring', 'looking for', 'opportunity', 'job'],
		answer: `I'm actively looking for new opportunities! I'm interested in frontend development roles, especially those involving React, Next.js, and modern web technologies. Please use the "Hire Me" button or contact form to discuss potential opportunities.`,
	},
	{
		keywords: ['hello', 'hi', 'hey', 'greetings'],
		answer: `Hello! 👋 I'm here to help answer questions about my experience, skills, and background. Feel free to ask me anything! You can ask about my experience, skills, projects, or anything else you'd like to know.`,
	},
	{
		keywords: ['help', 'what can you do', 'capabilities'],
		answer: `I can help answer questions about:
• My experience and background
• Technical skills and technologies
• Projects and portfolio
• Availability and notice period
• Contact information
• And more!

Just ask me anything you'd like to know!`,
	},
];

// Function to find the best matching answer
export const findAnswer = (userMessage) => {
	const message = userMessage.toLowerCase().trim();
	
	// Check for exact matches first
	for (const item of chatbotKnowledge) {
		for (const keyword of item.keywords) {
			if (message === keyword || message.includes(keyword)) {
				return item.answer;
			}
		}
	}
	
	// Check for partial matches
	for (const item of chatbotKnowledge) {
		for (const keyword of item.keywords) {
			if (message.includes(keyword)) {
				return item.answer;
			}
		}
	}
	
	// Default response if no match found
	return `I understand you're asking about "${userMessage}". While I can answer questions about my experience, skills, projects, and background, I might need more specific information. Could you rephrase your question? You can also ask about:
• My experience and years
• Technical skills
• Projects
• Availability
• Contact information`;
};

