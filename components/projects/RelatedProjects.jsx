import Image from 'next/image';
import Link from 'next/link';

const RelatedProject = {
	title: 'Related Projects',
	Projects: [
		{
			id: 4,
			title: 'Mobile Application: SafeWebKey',
			img: '/images/safewebkey-app.png',
		},
		{
			id: 6,
			title: 'Mobile Application: Parking User App',
			img: '/images/parking-user-app.png',
		},
		{
			id: 2,
			title: 'Web Application: TheJointCommission',
			img: '/images/tjc-web-app.png',
		},
		{
			id: 6,
			title: 'Mobile Application: Partner App',
			img: '/images/parking-partner-app.png',
		},
		
	],
};

function RelatedProjects() {
	return (
		<div className="mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-primary-light dark:border-secondary-dark">
			<p className="font-general-regular text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left">
				{RelatedProject.title}
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
				{RelatedProject.Projects.map((project, index) => {
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
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default RelatedProjects;
