import AppHeader from '../shared/AppHeader';
import AppFooter from '../shared/AppFooter';
import PagesMetaHead from '../PagesMetaHead';
import Chatbot from '../chatbot/Chatbot';

const DefaultLayout = ({ children }) => {
	return (
		<>
			<PagesMetaHead />
			<AppHeader />
			<div>{children}</div>
			<AppFooter />
			<Chatbot />
		</>
	);
};

export default DefaultLayout;
