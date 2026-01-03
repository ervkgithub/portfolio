import PagesMetaHead from '../../components/PagesMetaHead';
import ProjectsGrid from '../../components/projects/ProjectsGrid';

function index() {
	return (
		<div className="container px-4 lg:px-10">
			<PagesMetaHead title="Projects" />

			<ProjectsGrid />
		</div>
	);
}

export default index;
