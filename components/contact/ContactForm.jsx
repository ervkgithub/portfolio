import { useState } from 'react';
import Button from '../reusable/Button';
import FormInput from '../reusable/FormInput';
import { sendEmail } from '../../utils/emailService';

function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
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
			const result = await sendEmail(formData);

			if (result.success) {
				setSubmitStatus({
					type: 'success',
					message: 'Message sent successfully! I will get back to you soon.',
				});
				// Reset form
				setFormData({
					name: '',
					email: '',
					subject: '',
					message: '',
				});
			} else {
				setSubmitStatus({
					type: 'error',
					message: result.message || 'Failed to send message. Please try again.',
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
		<div className="w-full lg:w-1/2">
			<div className="leading-loose">
				<form
					onSubmit={handleSubmit}
					className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
				>
					<p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
						Contact Form
					</p>

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

					<FormInput
						inputLabel="Full Name"
						labelFor="name"
						inputType="text"
						inputId="name"
						inputName="name"
						placeholderText="Your Name"
						ariaLabelName="Name"
						value={formData.name}
						onChange={handleChange}
					/>
					<FormInput
						inputLabel="Email"
						labelFor="email"
						inputType="email"
						inputId="email"
						inputName="email"
						placeholderText="Your email"
						ariaLabelName="Email"
						value={formData.email}
						onChange={handleChange}
					/>
					<FormInput
						inputLabel="Subject"
						labelFor="subject"
						inputType="text"
						inputId="subject"
						inputName="subject"
						placeholderText="Subject"
						ariaLabelName="Subject"
						value={formData.subject}
						onChange={handleChange}
					/>

					<div className="mt-6">
						<label
							className="block text-lg text-primary-dark dark:text-primary-light mb-2"
							htmlFor="message"
						>
							Message
						</label>
						<textarea
							className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
							id="message"
							name="message"
							cols="14"
							rows="6"
							aria-label="Message"
							value={formData.message}
							onChange={handleChange}
							required
						></textarea>
					</div>

					<div className="mt-6">
						<span className="font-general-medium px-7 py-4 text-white text-center font-medium tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500 disabled:opacity-50 disabled:cursor-not-allowed">
							<Button
								title={isSubmitting ? 'Sending...' : 'Send Message'}
								type="submit"
								aria-label="Send Message"
								disabled={isSubmitting}
							/>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ContactForm;
