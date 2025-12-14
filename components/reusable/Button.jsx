function Button({ title, onClick, className = '' }) {
	return (
		<button
			onClick={onClick}
			className={`
				font-general-medium
				rounded-lg
				shadow-lg
				hover:shadow-xl
				cursor-pointer
				focus:ring-1 focus:ring-indigo-900
				focus:ring-offset-1
				transition duration-300
				ease-in-out
				transform hover:-translate-y-1
				${className}
			`}
		>
		{title}
		</button>
	);
}

export default Button;
