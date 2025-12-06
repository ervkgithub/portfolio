import { useEffect, useState } from 'react';

const useThemeSwitcher = () => {
	// Initialize with 'light' to ensure consistent SSR rendering
	const [theme, setTheme] = useState('light');
	const [mounted, setMounted] = useState(false);
	const activeTheme = theme === 'dark' ? 'light' : 'dark';

	useEffect(() => {
		setMounted(true);
		// Only access localStorage after component mounts (client-side only)
		const storedTheme = localStorage.getItem('theme') || 'light';
		setTheme(storedTheme);
	}, []);

	useEffect(() => {
		if (!mounted) return;
		
		const root = window.document.documentElement;

		root.classList.remove('light', 'dark');
		root.classList.add(theme);
		localStorage.setItem('theme', theme);
	}, [theme, mounted]);

	return [activeTheme, setTheme];
};

export default useThemeSwitcher;
