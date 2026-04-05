import Image from "next/legacy/image";
import { useState } from 'react';
import { aboutMeData } from '../../data/aboutMeData';
import { motion } from 'framer-motion';

function AboutMeBio() {
	const [aboutMe, setAboutMe] = useState(aboutMeData);
	return (
		<motion.div 
			initial={{ opacity: 0, y: 20 }} 
			whileInView={{ opacity: 1, y: 0 }} 
			viewport={{ once: true }} 
			transition={{ duration: 0.5 }}
			className="block sm:flex sm:gap-10 mt-10 sm:mt-20"
		>
			<motion.div 
				initial={{ opacity: 0, scale: 0.9 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="w-full sm:w-1/4 mb-7 sm:mb-0"
			>
				<Image
					src="/images/profile.jpg"
					width={300}
					height={200}
					className="w-full h-auto lg:width-[300px] lg:height-[200px]"
					alt="Profile Image"
				/>
			</motion.div>

			<motion.div 
				initial={{ opacity: 0, x: 20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="font-general-regular w-full sm:w-3/4 text-left"
			>
				{aboutMe.map((bio) => (
					<p
						className="mb-4 text-ternary-dark dark:text-ternary-light text-lg"
						key={bio.id}
					>
						{bio.bio}
					</p>
				))}
			</motion.div>
		</motion.div>
	);
}

export default AboutMeBio;
