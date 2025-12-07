// Email service using Next.js API route with Nodemailer
// This avoids Gmail OAuth scope issues by using App Passwords

export const sendEmail = async (formData) => {
	try {
		const response = await fetch('/api/send-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: formData.name,
				email: formData.email,
				subject: formData.subject || formData.projectType || 'Contact Form Submission',
				message: formData.message,
				projectType: formData.projectType || 'N/A',
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			return {
				success: false,
				message: data.message || 'Failed to send email. Please try again.',
			};
		}

		return { success: true, message: 'Email sent successfully!' };
	} catch (error) {
		console.error('Email sending error:', error);
		return {
			success: false,
			message: 'Network error. Please check your connection and try again.',
		};
	}
};

