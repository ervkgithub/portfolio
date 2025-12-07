import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

const ProjectSingle = (props) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, delay: 1 }}
			transition={{
				ease: 'easeInOut',
				duration: 0.7,
				delay: 0.15,
			}}
			className="h-full"
		>
			<Link
				href="/projects/[id]"
				as={'/projects/' + props.id}
				aria-label="Single Project"
				passHref
			>
				<div className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark h-full flex flex-col">
					<div className="relative w-full h-96 overflow-hidden">
						<Image
							src={props.img}
							className="rounded-t-xl border-none object-cover"
							alt="Single Project"
							layout="fill"
							objectFit="cover"
						/>
					</div>
					<div className="text-center px-4 py-6 flex-grow flex flex-col justify-center">
						<p className="font-general-medium text-xl md:text-2xl text-ternary-dark dark:text-ternary-light mb-2">
							{props.title}
						</p>
						<span className="text-lg text-ternary-dark dark:text-ternary-light">
							{props.category}
						</span>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

ProjectSingle.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
};

export default ProjectSingle;
