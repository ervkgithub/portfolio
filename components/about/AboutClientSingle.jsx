import Image from "next/legacy/image";

function AboutClientSingle({ title, image, url }) {
	// If no URL is provided, render as a non-clickable div
	if (!url) {
		return (
			<div className="py-5 px-10 h-full border bg-secondary-light border-ternary-light dark:border-ternary-dark shadow-sm rounded-lg flex items-center justify-center">
				<Image
					src={image}
					alt={title}
					width={100}
					height={50}
					className="object-contain max-h-12 w-auto"
				/>
			</div>
		);
	}

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="py-5 px-10 h-full border bg-secondary-light border-ternary-light dark:border-ternary-dark shadow-sm rounded-lg cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center justify-center"
			aria-label={`Visit ${title} website`}
		>
			<Image
				src={image}
				alt={title}
				width={100}
				height={50}
				className="object-contain max-h-12 w-auto"
			/>
		</a>
	);
}

export default AboutClientSingle;
