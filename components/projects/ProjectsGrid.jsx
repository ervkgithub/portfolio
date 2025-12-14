import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import ProjectSingle from './ProjectSingle';
import { projectsData } from '../../data/projectsData';
import ProjectsFilter from './ProjectsFilter';
import Button from '../reusable/Button';

const PROJECTS_PER_PAGE = 6;

// Get unique categories for quick filter buttons
const categories = [...new Set(projectsData.map(project => project.category))];

function ProjectsGrid() {
	const [searchProject, setSearchProject] = useState('');
	const [selectProject, setSelectProject] = useState();
	const [visibleProjects, setVisibleProjects] = useState(PROJECTS_PER_PAGE);
	const [filteredProjects, setFilteredProjects] = useState(projectsData);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [suggestions, setSuggestions] = useState([]);
	const searchInputRef = useRef(null);

	// Generate search suggestions
	const generateSuggestions = (query) => {
		if (!query.trim()) {
			setSuggestions([]);
			return;
		}

		const searchTerm = query.toLowerCase().trim();
		const projectTitles = [...new Set(projectsData.map(p => p.title))];
		const projectCategories = [...new Set(projectsData.map(p => p.category))];

		// Match project titles and categories
		const titleMatches = projectTitles.filter(title => 
			title.toLowerCase().includes(searchTerm)
		);
		
		const categoryMatches = projectCategories.filter(category => 
			category.toLowerCase().includes(searchTerm)
		);

		// Combine and limit suggestions
		setSuggestions([...new Set([...titleMatches, ...categoryMatches])].slice(0, 5));
	};

	// Handle suggestion click
	const handleSuggestionClick = (suggestion) => {
		setSearchProject(suggestion);
		setShowSuggestions(false);
		searchInputRef.current.focus();
	};

	// Handle search input change
	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchProject(value);
		generateSuggestions(value);
		setShowSuggestions(true);
	};

	// Clear search
	const clearSearch = () => {
		setSearchProject('');
		setSuggestions([]);
		setShowSuggestions(false);
	};

	// Quick filter by category
	const handleQuickFilter = (category) => {
		setSelectProject(category);
		setSearchProject('');
		setSuggestions([]);
	};

	// Filter projects based on search and category
	useEffect(() => {
		let result = [...projectsData];

		// Apply search filter
		if (searchProject) {
			const searchTerm = searchProject.toLowerCase().trim();
			result = result.filter(project => 
				project.title.toLowerCase().includes(searchTerm) ||
				project.category.toLowerCase().includes(searchTerm)
			);
		}

		// Apply category filter
		if (selectProject) {
			result = result.filter(project => {
				const category = project.category.charAt(0).toUpperCase() + project.category.slice(1);
				return category.includes(selectProject);
			});
		}

		setFilteredProjects(result);
		setVisibleProjects(PROJECTS_PER_PAGE);
	}, [searchProject, selectProject]);

	const loadMoreProjects = () => {
		setVisibleProjects(prev => prev + PROJECTS_PER_PAGE);
	};

	// Calculate if there are more projects to load
	const hasMoreProjects = visibleProjects < filteredProjects.length;

	return (
		<section className="py-5 sm:py-10 mt-5 sm:mt-10">
			<div className="text-center">
				<p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
					Projects portfolio
				</p>
			</div>

			<div className="mt-10 sm:mt-16">
				<h3
					className="
                        font-general-regular 
                        text-center text-secondary-dark
                        dark:text-ternary-light
                        text-md
                        sm:text-xl
                        mb-3
                        "
				>
					Search projects by title or filter by category
				</h3>
				<div
					className="
                        flex
                        justify-between
                        border-b border-primary-light
                        dark:border-secondary-dark
                        pb-3
                        gap-3
                        "
				>
					<div className="flex justify-between gap-2">
						<span
							className="
                                hidden
                                sm:block
                                bg-primary-light
                                dark:bg-ternary-dark
                                p-2.5
                                shadow-sm
                                rounded-xl
                                cursor-pointer
                                "
						>
							<FiSearch className="text-ternary-dark dark:text-ternary-light w-5 h-5"></FiSearch>
						</span>
						<div className="relative w-full">
							<input
								ref={searchInputRef}
								value={searchProject}
								onChange={handleSearchChange}
								onFocus={() => setShowSuggestions(true)}
								onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
								className="
									font-general-medium 
									w-full
									pl-3
									pr-8
									sm:px-4
									py-2
									border 
									border-gray-200
									dark:border-secondary-dark
									rounded-lg
									text-sm
									sm:text-md
									bg-secondary-light
									dark:bg-ternary-dark
									text-primary-dark
									dark:text-ternary-light
								"
								id="project-search"
								name="project-search"
								type="search"
								placeholder="Search by project name or category"
								aria-label="Search projects"
							/>
							{searchProject && (
								<button
									onClick={clearSearch}
									className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
									aria-label="Clear search"
								>
									<FiX className="w-5 h-5" />
								</button>
							)}
							{showSuggestions && suggestions.length > 0 && (
								<ul className="absolute z-10 w-full mt-1 bg-ternary-dark rounded-md shadow-lg max-h-60 overflow-auto">
									{suggestions.map((suggestion, index) => (
										<li 
											key={index}
											onMouseDown={() => handleSuggestionClick(suggestion)}
											className="px-4 py-2 text-white hover:bg-ternary-light hover:text-gray-900 cursor-pointer"
										>
											{suggestion}
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-6">
				{filteredProjects.slice(0, visibleProjects).map((project) => (
					<ProjectSingle key={project.id} {...project} />
				))}
			</div>

			{hasMoreProjects && (
				<div className="flex justify-center mt-8">
					<Button 
						onClick={loadMoreProjects}
						title="Load More Projects"
						className="px-8 py-3 text-lg bg-indigo-500 hover:bg-indigo-600 text-white"
					/>
				</div>
			)}

			{filteredProjects.length === 0 && (
				<div className="text-center py-10">
					<p className="text-xl text-ternary-dark dark:text-ternary-light">
						No projects found matching your search criteria.
					</p>
				</div>
			)}
		</section>
	);
}

export default ProjectsGrid;
