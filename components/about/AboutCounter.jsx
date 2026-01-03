import { useCountUp } from 'react-countup';
import CounterItem from './CounterItem';

function AboutCounter() {
	useCountUp({ ref: 'experienceCounter', end: 9, duration: 2 });
	useCountUp({ ref: 'projectsCounter', end: 30, duration: 2 });
	const skills = [
		'Next.js',
		'React.js',
		'TypeScript',
		'Tailwind.css',
		'GraphQL',
		'JavaScript',
		'Storybook',
		'Shadcn/UI',
		'Accessibility',
		'Responsive',
		'Performance Optimization',
		'Micro Front-end Str',
		'CI/CD',
		'Cursor AI',
		'Cody AI',
		'ChatGPT',
		'Builder.io',
		'V0.dev',
		'Gen AI',
		'Unit Test Writing',
		'Prompt Engineering',
		'Agentic AI',
		'Bootstrap',
		'SCSS',
		'jQuery',
		'Sitecore XMC',
		'Sitecore SXA',
		'Drupal',
	];

	return (
		<div className="mt-10 sm:mt-20 bg-primary-light dark:bg-ternary-dark shadow-sm">
			<div className="font-general-medium container px-4 lg:px-10 py-10 lg:py-20 block sm:flex sm:justify-between items-center">
			<CounterItem
				title="Years of experience"
				counter={<span id="experienceCounter" />}
				measurement="+"
			/>

			<div className="mb-20 sm:mb-0 w-full sm:w-auto">
				<h2 className="text-2xl sm:text-3xl text-center text-secondary-dark dark:text-secondary-light mb-4">
					Skill Sets
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 max-w-4xl mx-auto">
					{skills.map((skill) => (
						<span
							key={skill}
							className="font-general-regular text-xs sm:text-sm text-center text-ternary-dark dark:text-ternary-light bg-white dark:bg-ternary-dark px-2 sm:px-3 py-1 sm:py-2 rounded-md shadow-sm hover:shadow-md transition-shadow"
						>
							{skill}
						</span>
					))}
				</div>
			</div>


			<CounterItem
				title="Projects completed"
				counter={<span id="projectsCounter" />}
				measurement="+"
			/>
			</div>
		</div>
	);
}

export default AboutCounter;
