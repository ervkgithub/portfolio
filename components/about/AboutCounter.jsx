import { useRef, useState, useEffect } from 'react';
import CounterItem from './CounterItem';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

function AboutCounter() {
	const skills = [
		'Next.js',
		'React.js',
		'TypeScript',
		'Tailwind Css',
		'GraphQL',
		'JavaScript ES6+',
		'Storybook',
		'Shadcn/UI',
		'Accessibility',
		'Responsive',
		'Performance Optimization',
		'Micro Frontend',
		'CI/CD',
		'Cursor AI',
		'Cody AI',
		'ChatGPT',
		'Builder.io',
		'V0.dev',
		'Gen AI',
		'Jest',
		'Prompt Engineering',
		'Agentic AI',
		'Bootstrap',
		'SCSS',
		'jQuery',
		'Sitecore XMC',
		'Sitecore SXA',
		'Drupal',
		'Websocket',
		'Antigravity',
		'Github Copilot',
		'Claude AI',
		'Chatbot Development',
		'React Testing Library',
		'SEO',
		'HTML5',
		'CSS3',
		'Redux',
		'Redux Toolkit',
		'Azure Devops',
		'Jira',
		'Webpack/Gulp/Vite',
		'Cross-Browser Compatibility',
		'PWA',
		'Version Control (Git, Bitbucket)',
		'UI Best Practices',
		'API Integration',
		'GraphQl, REST API',
		'JQuery',
		'Code Review',
		'Mentoring',
		'Framer Motion',
	];

	const expRef = useRef(null);
	const projRef = useRef(null);
	
	const expValue = useMotionValue(0);
	const projValue = useMotionValue(0);
	
	const smoothExp = useSpring(expValue, { stiffness: 50, damping: 20 });
	const smoothProj = useSpring(projValue, { stiffness: 50, damping: 20 });
	
	const [exp, setExp] = useState(0);
	const [proj, setProj] = useState(0);

	const allowScrubbingExp = useRef(false);
	const allowScrubbingProj = useRef(false);

	useEffect(() => {
		const unsubscribeExp = smoothExp.onChange((latest) => setExp(Math.round(latest)));
		const unsubscribeProj = smoothProj.onChange((latest) => setProj(Math.round(latest)));

		return () => {
			unsubscribeExp();
			unsubscribeProj();
		};
	}, [smoothExp, smoothProj]);

	// Automatically animate to 100% when first seen on load using IntersectionObserver
	useEffect(() => {
		const observerEx = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				animate(expValue, 9, { 
					duration: 1.5, 
					ease: "easeOut",
					onComplete: () => allowScrubbingExp.current = true
				});
				observerEx.disconnect();
			}
		});
		if (expRef.current) observerEx.observe(expRef.current);

		const observerPr = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				animate(projValue, 30, { 
					duration: 1.5, 
					ease: "easeOut",
					onComplete: () => allowScrubbingProj.current = true
				});
				observerPr.disconnect();
			}
		});
		if (projRef.current) observerPr.observe(projRef.current);

		return () => {
			observerEx.disconnect();
			observerPr.disconnect();
		};
	}, [expValue, projValue]);

	useEffect(() => {
		const handleScroll = () => {
			const windowHeight = window.innerHeight;
			const scrollDistance = windowHeight / 1.5;

			if (expRef.current && allowScrubbingExp.current) {
				const rectExp = expRef.current.getBoundingClientRect();
				let progressExp = (windowHeight - rectExp.top) / scrollDistance;
				if (progressExp < 0) progressExp = 0;
				if (progressExp > 1) progressExp = 1;
				expValue.set(progressExp * 9);
			}

			if (projRef.current && allowScrubbingProj.current) {
				const rectProj = projRef.current.getBoundingClientRect();
				let progressProj = (windowHeight - rectProj.top) / scrollDistance;
				if (progressProj < 0) progressProj = 0;
				if (progressProj > 1) progressProj = 1;
				projValue.set(progressProj * 30);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [expValue, projValue]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 100,
			},
		},
	};

	return (
		<div className="mt-10 sm:mt-20 bg-primary-light dark:bg-ternary-dark shadow-sm">
			<div className="font-general-medium container mx-auto px-4 lg:px-10 py-10 lg:py-20 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-4">
				<div ref={expRef} className="flex-shrink-0">
					<CounterItem
						title="Years of experience"
						counter={<span>{exp}</span>}
						measurement="+"
					/>
				</div>

				<div className="w-full lg:w-[60%] flex-grow z-10">
					<h2 className="text-2xl sm:text-3xl text-center text-primary-dark dark:text-primary-light mb-8 font-semibold tracking-wide">
						Skill Sets
					</h2>
					<motion.div
						className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.1 }}
					>
						{skills.map((skill) => (
							<motion.span
								key={skill}
								variants={itemVariants}
								className="font-general-medium text-xs sm:text-sm text-center text-secondary-dark dark:text-ternary-light bg-white dark:bg-primary-dark border border-gray-200 dark:border-secondary-dark px-4 sm:px-5 py-2 sm:py-2.5 rounded-full cursor-default shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700"
							>
								{skill}
							</motion.span>
						))}
					</motion.div>
				</div>

				<div ref={projRef} className="flex-shrink-0">
					<CounterItem
						title="Projects completed"
						counter={<span>{proj}</span>}
						measurement="+"
					/>
				</div>
			</div>
		</div>
	);
}

export default AboutCounter;
