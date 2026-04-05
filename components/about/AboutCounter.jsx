import { useCountUp } from 'react-countup';
import CounterItem from './CounterItem';
import { motion } from 'framer-motion';

function AboutCounter() {
	useCountUp({ ref: 'experienceCounter', end: 9, duration: 2 });
	useCountUp({ ref: 'projectsCounter', end: 30, duration: 2 });
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

	];

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
				<div className="flex-shrink-0">
					<CounterItem
						title="Years of experience"
						counter={<span id="experienceCounter" />}
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

				<div className="flex-shrink-0">
					<CounterItem
						title="Projects completed"
						counter={<span id="projectsCounter" />}
						measurement="+"
					/>
				</div>
			</div>
		</div>
	);
}

export default AboutCounter;
