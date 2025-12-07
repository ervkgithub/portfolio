import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '../../data/projectsData';
import PropTypes from 'prop-types';

// Function to shuffle array randomly
function shuffleArray(array) {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

function RelatedProjects({ currentProjectId }) {
	// Filter out the current project and get related projects
	const relatedProjects = projectsData
		.filter((project) => project.id !== currentProjectId)
		.map((project) => ({
			id: project.id,
			title: project.title,
			img: project.img,
			category: project.category,
		}));

	// Shuffle and get maximum 4 projects
	const shuffledProjects = shuffleArray(relatedProjects).slice(0, Math.min(4, relatedProjects.length));

	// Don't render if there are no related projects
	if (shuffledProjects.length === 0) {
		return null;
	}

	return (
		<div className="mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-primary-light dark:border-secondary-dark">
			<p className="font-general-regular text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left">
				Related Projects
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
				{shuffledProjects.map((project, index) => {
					return (
						<Link
							key={`${project.id}-${index}`}
							href="/projects/[id]"
							as={`/projects/${project.id}`}
							aria-label="Related Project"
							passHref
						>
							<div className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer bg-secondary-light dark:bg-ternary-dark h-full flex flex-col">
								<div className="relative w-full h-[432px] overflow-hidden">
									<Image
										src={project.img}
										className="rounded-t-xl border-none object-cover"
										alt={project.title}
										layout="fill"
										objectFit="cover"
									/>
								</div>
								<div className="text-center px-4 py-6 flex-grow flex flex-col justify-center">
									<p className="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light">
										{project.title}
									</p>
									<span className="text-sm text-ternary-dark dark:text-ternary-light mt-1">
										{project.category}
									</span>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

RelatedProjects.propTypes = {
	currentProjectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default RelatedProjects;
