import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Button from './reusable/Button';
import { sendEmail } from '../utils/emailService';

const selectOptions = [
	'Web Application',
	'Mobile Application',
];

function HireMeModal({ onClose, onRequest }) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		projectType: 'Web Application',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState({
		type: null, // 'success' or 'error'
		message: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear status message when user starts typing
		if (submitStatus.type) {
			setSubmitStatus({ type: null, message: '' });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: '' });

		try {
			const result = await sendEmail({
				...formData,
				subject: `Project Request: ${formData.projectType}`,
			});

			if (result.success) {
				setSubmitStatus({
					type: 'success',
					message: 'Request sent successfully! I will get back to you soon.',
				});
				// Reset form
				setFormData({
					name: '',
					email: '',
					projectType: 'Web Application',
					message: '',
				});
				// Call onRequest if provided
				if (onRequest) {
					onRequest();
				}
				// Auto close modal after 2 seconds on success
				setTimeout(() => {
					onClose();
				}, 2000);
			} else {
				setSubmitStatus({
					type: 'error',
					message: result.message || 'Failed to send request. Please try again.',
				});
			}
		} catch (error) {
			setSubmitStatus({
				type: 'error',
				message: 'An error occurred. Please try again later.',
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
			className="font-general-medium fixed inset-0 z-30 transition-all duration-500"
		>
			{/* Modal Backdrop */}
			<div className="bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-20"></div>

			{/* Modal Content */}
			<main className="flex flex-col items-center justify-center h-full w-full">
				<div className="modal-wrapper flex items-center z-30">
					<div className="modal max-w-md mx-5 xl:max-w-xl lg:max-w-xl md:max-w-xl bg-secondary-light dark:bg-primary-dark max-h-screen shadow-lg flex-row rounded-lg relative">
						<div className="modal-header flex justify-between gap-10 p-5 border-b border-ternary-light dark:border-ternary-dark">
							<h5 className=" text-primary-dark dark:text-primary-light text-xl">
								What project are you looking for?
							</h5>
							<button
								onClick={onClose}
								className="px-4 font-bold text-primary-dark dark:text-primary-light"
							>
								<FiX className="text-3xl" />
							</button>
						</div>
						<div className="modal-body p-5 w-full h-full">
							<form onSubmit={handleSubmit} className="max-w-xl m-4 text-left">
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

								<div className="">
									<input
										className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
										id="name"
										name="name"
										type="text"
										required
										placeholder="Name"
										aria-label="Name"
										value={formData.name}
										onChange={handleChange}
									/>
								</div>
								<div className="mt-6">
									<input
										className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
										id="email"
										name="email"
										type="email"
										required
										placeholder="Email"
										aria-label="Email"
										value={formData.email}
										onChange={handleChange}
									/>
								</div>
								<div className="mt-6">
									<select
										className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
										id="subject"
										name="projectType"
										required
										aria-label="Project Category"
										value={formData.projectType}
										onChange={handleChange}
									>
										{selectOptions.map((option) => (
											<option
												className="text-normal sm:text-md"
												key={option}
												value={option}
											>
												{option}
											</option>
										))}
									</select>
								</div>

								<div className="mt-6">
									<textarea
										className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
										id="message"
										name="message"
										cols="14"
										rows="6"
										aria-label="Details"
										placeholder="Project description"
										value={formData.message}
										onChange={handleChange}
										required
									></textarea>
								</div>

								<div className="mt-6 pb-4 sm:pb-1">
									<button
										type="submit"
										disabled={isSubmitting}
										className="px-4 sm:px-6 py-2 sm:py-2.5 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-900 duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
										aria-label="Submit Request"
									>
										<Button title={isSubmitting ? 'Sending...' : 'Send Request'} />
									</button>
								</div>
							</form>
						</div>
						<div className="modal-footer mt-2 sm:mt-0 py-5 px-8 border0-t text-right">
							<span
								onClick={onClose}
								type="button"
								className="px-4
									sm:px-6
									py-2 bg-gray-600 text-primary-light hover:bg-ternary-dark dark:bg-gray-200 dark:text-secondary-dark dark:hover:bg-primary-light
									rounded-md
									focus:ring-1 focus:ring-indigo-900 duration-500 cursor-pointer"
								aria-label="Close Modal"
							>
								<Button title="Close" />
							</span>
						</div>
					</div>
				</div>
			</main>
		</motion.div>
	);
}

export default HireMeModal;
