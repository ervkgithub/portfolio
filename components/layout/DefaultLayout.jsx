import AppHeader from '../shared/AppHeader';
import AppFooter from '../shared/AppFooter';
import PagesMetaHead from '../PagesMetaHead';
import Chatbot from '../chatbot/Chatbot';
import { useEffect, useState } from 'react';
import VisitorWelcomeModal, { STORAGE_KEY } from '../shared/VisitorWelcomeModal';

const DefaultLayout = ({ children }) => {
	const [visitor, setVisitor] = useState(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		try {
			const existing = localStorage.getItem(STORAGE_KEY);
			if (existing) {
				const parsed = JSON.parse(existing);
				if (parsed && parsed.name) {
					setVisitor(parsed);
				}
			}
		} catch {
			// ignore
		} finally {
			setIsReady(true);
		}
	}, []);

	return (
		<>
			<PagesMetaHead />
			<AppHeader visitor={visitor} />
			{isReady && !visitor ? (
				<VisitorWelcomeModal onComplete={setVisitor} />
			) : null}
			<main id="main-content">{children}</main>
			<AppFooter />
			<Chatbot />
		</>
	);
};

export default DefaultLayout;
