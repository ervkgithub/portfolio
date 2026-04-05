import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../reusable/Button';
import { sendVisitorLead } from '../../utils/visitorService';

const STORAGE_KEY = 'portfolio_visitor_profile_v1';

function VisitorWelcomeModal({ onComplete }) {
	const [mounted, setMounted] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		location: '',
	});

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					try {
						const { latitude, longitude } = position.coords;
						const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
						const data = await res.json();
						const city = data.address?.city || data.address?.town || data.address?.village || '';
						const country = data.address?.country || '';
						const locStr = `${city ? city + ', ' : ''}${country}`;
						setFormData(prev => ({ ...prev, location: locStr || 'Unknown location' }));
					} catch (e) {
						setFormData(prev => ({ ...prev, location: 'Unknown location' }));
					}
				},
				() => {
					setFormData(prev => ({ ...prev, location: 'Location access denied' }));
				}
			);
		} else {
			setFormData(prev => ({ ...prev, location: 'Geolocation not supported' }));
		}
	}, []);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

	useEffect(() => {
		setMounted(true);
		try {
			const existing = localStorage.getItem(STORAGE_KEY);
			if (existing) {
				const parsed = JSON.parse(existing);
				if (parsed && parsed.name && parsed.email && parsed.phone) {
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

		const { name, email, phone } = formData;

		const cleanName = name.trim();
		if (!/^[a-zA-Z\s]{3,50}$/.test(cleanName) || cleanName.split(' ').join('').length < 3) {
			setSubmitStatus({ type: 'error', message: 'Name must be at least 3 characters long and contain only letters.' });
			setIsSubmitting(false);
			return;
		}

		const cleanEmail = email.trim();
		if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cleanEmail)) {
			setSubmitStatus({ type: 'error', message: 'Please enter a valid email address with a proper domain.' });
			setIsSubmitting(false);
			return;
		}

		const cleanPhone = phone.trim();
		const digitCount = cleanPhone.replace(/\D/g, '').length;
		if (!/^[\d\s+\-()]+$/.test(cleanPhone) || digitCount < 10 || digitCount > 15 || /^(.)\1+$/.test(cleanPhone.replace(/\D/g, ''))) {
			setSubmitStatus({ type: 'error', message: 'Please enter a real phone number containing 10-15 digits.' });
			setIsSubmitting(false);
			return;
		}

		const payload = {
			name: cleanName,
			location: formData.location.trim() || 'Location pending or denied',
			email: cleanEmail,
			phone: cleanPhone,
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

	const handleSkip = () => {
		const payload = { name: 'Guest', skipped: true };
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
		} catch {
			// ignore
		}
		if (onComplete) onComplete(payload);
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
						<div className="modal-header p-6 border-b border-ternary-light dark:border-ternary-dark relative">
							<button
								onClick={handleSkip}
								className="absolute top-4 right-4 text-ternary-dark dark:text-ternary-light hover:bg-gray-200 dark:hover:bg-secondary-dark p-1.5 rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 outline-none"
								aria-label="Close modal"
								type="button"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
							<h5 className="text-primary-dark dark:text-primary-light text-xl font-semibold">
								Welcome to My Portfolio! 👋
							</h5>
							<p className="mt-2 text-sm text-ternary-dark dark:text-ternary-light leading-relaxed pr-8">
								I&apos;m thrilled you&apos;re here. Feel free to drop your details below so we can stay connected, or simply close this to explore my world.
							</p>
						</div>

						<div className="modal-body p-6 w-full h-full">
							<form onSubmit={handleSubmit} className="max-w-xl text-left">
								{submitStatus.type && (
									<div
										className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success'
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
									<label className="block text-sm text-primary-dark dark:text-primary-light mb-2" htmlFor="visitor_email">
										Email
									</label>
									<input
										className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
										id="visitor_email"
										name="email"
										type="email"
										required
										placeholder="Email address"
										aria-label="Email"
										value={formData.email}
										onChange={handleChange}
									/>
								</div>

								<div className="mt-5">
									<label className="block text-sm text-primary-dark dark:text-primary-light mb-2" htmlFor="visitor_phone">
										Phone
									</label>
									<input
										className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
										id="visitor_phone"
										name="phone"
										type="tel"
										required
										placeholder="Phone number"
										aria-label="Phone"
										value={formData.phone}
										onChange={handleChange}
									/>
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
