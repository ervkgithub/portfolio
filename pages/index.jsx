import Link from 'next/link';
import PagesMetaHead from '../components/PagesMetaHead';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import Button from '../components/reusable/Button';
import { motion } from 'framer-motion';
import AppBanner from '../components/shared/AppBanner';
import AboutCounter from '../components/about/AboutCounter';
import AboutClients from '../components/about/AboutClients';

export default function Home() {
	return (
		<div>
			<PagesMetaHead title="Home" />

			<div className="container mx-auto px-4 lg:px-10">
				<AppBanner />
			</div>

			{/** Counter without paddings */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, delay: 1 }}
				exit={{ opacity: 0 }}
			>
				<AboutCounter />
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, delay: 1 }}
				exit={{ opacity: 0 }}
				className="container px-4 lg:px-10"
			>
				<AboutClients />
			</motion.div>

			<div className="container mx-auto px-4 lg:px-10">
				<ProjectsGrid />
			</div>
		</div>
	);
}
