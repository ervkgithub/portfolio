import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../reusable/Button';
import { sendVisitorLead } from '../../utils/visitorService';

const STORAGE_KEY = 'portfolio_visitor_profile_v1';

function VisitorWelcomeModal({ onComplete }) {
	const [mounted, setMounted] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		location: '',
		emailOrPhone: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

	useEffect(() => {
		setMounted(true);
		try {
			const existing = localStorage.getItem(STORAGE_KEY);
			if (existing) {
				const parsed = JSON.parse(existing);
				if (parsed && parsed.name && parsed.location && parsed.emailOrPhone) {
					if (onComplete) onComplete(parsed);
				}
			}
		} catch {
			// ignore
		}
	}, [onComplete]);

	useEffect(() => {
		if (!mounted) return;
		try {
			document.getElementsByTagName('html')[0].classList.add('overflow-y-hidden');
			return () => {
				document.getElementsByTagName('html')[0].classList.remove('overflow-y-hidden');
			};
		} catch {
			return undefined;
		}
	}, [mounted]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (submitStatus.type) setSubmitStatus({ type: null, message: '' });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: '' });

		const payload = {
			name: formData.name.trim(),
			location: formData.location.trim(),
			emailOrPhone: formData.emailOrPhone.trim(),
			page: typeof window !== 'undefined' ? window.location.pathname : '',
			userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
			createdAt: new Date().toISOString(),
		};

		try {
			const result = await sendVisitorLead(payload);
			if (!result.success) {
				setSubmitStatus({
					type: 'error',
					message: result.message || 'Unable to submit details. Please try again.',
				});
				return;
			}

			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
			} catch {
				// ignore
			}

			setSubmitStatus({ type: 'success', message: 'Thanks! Redirecting you to the portfolio…' });

			setTimeout(() => {
				if (onComplete) onComplete(payload);
			}, 500);
		} catch {
			setSubmitStatus({
				type: 'error',
				message: 'An unexpected error occurred. Please try again.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="font-general-medium fixed inset-0 z-40 transition-all duration-500"
		>
			<div className="bg-filter bg-black bg-opacity-60 fixed inset-0 w-full h-full z-20"></div>
			<main className="flex flex-col items-center justify-center h-full w-full">
				<div className="modal-wrapper flex items-center z-30">
					<div className="modal max-w-md mx-5 xl:max-w-xl lg:max-w-xl md:max-w-xl bg-secondary-light dark:bg-primary-dark max-h-screen shadow-lg flex-row rounded-lg relative">
						<div className="modal-header p-6 border-b border-ternary-light dark:border-ternary-dark">
							<h5 className="text-primary-dark dark:text-primary-light text-xl">
								Welcome — quick intro
							</h5>
							<p className="mt-2 text-sm text-ternary-dark dark:text-ternary-light leading-relaxed">
								To personalize your experience and help me understand who is viewing the profile, please share your details.
								It takes less than a minute.
							</p>
						</div>

						<div className="modal-body p-6 w-full h-full">
							<form onSubmit={handleSubmit} className="max-w-xl text-left">
								{submitStatus.type && (
									<div
										className={`mb-6 p-4 rounded-lg ${
											submitStatus.type === 'success'
												? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
												: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
										}`}
									>
										<p className="text-sm font-medium">{submitStatus.message}</p>
									</div>
								)}

								<div>
									<label className="block text-sm text-primary-dark dark:text-primary-light mb-2" htmlFor="visitor_name">
										Full name
									</label>
									<input
										className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
										id="visitor_name"
										name="name"
										type="text"
										required
										placeholder="Your name"
										aria-label="Name"
										value={formData.name}
										onChange={handleChange}
									/>
								</div>

								<div className="mt-5">
									<label className="block text-sm text-primary-dark dark:text-primary-light mb-2" htmlFor="visitor_location">
										Location
									</label>
									<input
										className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
										id="visitor_location"
										name="location"
										type="text"
										required
										placeholder="City, Country"
										aria-label="Location"
										value={formData.location}
										onChange={handleChange}
									/>
								</div>

								<div className="mt-5">
									<label className="block text-sm text-primary-dark dark:text-primary-light mb-2" htmlFor="visitor_contact">
										Email or phone
									</label>
									<input
										className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
										id="visitor_contact"
										name="emailOrPhone"
										type="text"
										required
										placeholder="Email address or phone number"
										aria-label="Email or phone"
										value={formData.emailOrPhone}
										onChange={handleChange}
									/>
									<p className="mt-2 text-xs text-ternary-dark dark:text-ternary-light">
										I’ll only use this to reply if needed.
									</p>
								</div>

								<div className="mt-6">
									<button
										type="submit"
										disabled={isSubmitting}
										className="w-full px-6 py-2.5 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-900 duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
										aria-label="Submit Visitor Details"
									>
										<Button title={isSubmitting ? 'Submitting…' : 'Continue to Portfolio'} />
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
		</motion.div>
	);
}

export { STORAGE_KEY };
export default VisitorWelcomeModal;
