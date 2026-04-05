import { useState } from 'react';
import { clientsData } from '../../data/clientsData';
import { clientsHeading } from '../../data/clientsData';
import AboutClientSingle from './AboutClientSingle';
import { motion } from 'framer-motion';

function AboutClients() {
	const [clients, setClients] = useState(clientsData);
	return (
		<div className="mt-10 sm:mt-20">
			<p className="font-general-medium text-2xl sm:text-3xl text-center text-primary-dark dark:text-primary-light">
				{clientsHeading}
			</p>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, staggerChildren: 0.1 }}
				className="grid grid-cols-2 sm:grid-cols-4 mt-10 sm:mt-14 gap-4"
			>
				{clients.map((client) => (
					<motion.div key={client.id} className="h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
						<AboutClientSingle
							title={client.title}
							image={client.img}
							url={client.url}
						/>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}

export default AboutClients;
