import Head from 'next/head';

function PagesMetaHead({ title, keywords, description }) {
	return (
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<title>{title}</title>
			{/* Set default dark theme before React hydrates */}
			<script
				dangerouslySetInnerHTML={{
					__html: `
						(function() {
							const storedTheme = localStorage.getItem('theme') || 'dark';
							document.documentElement.classList.remove('light', 'dark');
							document.documentElement.classList.add(storedTheme);
						})();
					`,
				}}
			/>
		</Head>
	);
}

PagesMetaHead.defaultProps = {
	title: 'Portfolio Vijay Kumart',
	keywords: 'next.js, react, graphQl, tailwind, storybook, web, ui, responsive, accessibility, seo, performance, optimization',
	description: 'Portfolio of Vijay Kumar, a software engineer with a passion for building web applications and websites.',
};

export default PagesMetaHead;
