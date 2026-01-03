export const sendVisitorLead = async (visitorData) => {
	try {
		const response = await fetch('/api/visitor-lead', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(visitorData),
		});

		const data = await response.json();

		if (!response.ok) {
			return {
				success: false,
				message: data.message || 'Failed to submit details. Please try again.',
			};
		}

		return { success: true, message: data.message || 'Submitted successfully!' };
	} catch (error) {
		console.error('Visitor lead error:', error);
		return {
			success: false,
			message: 'Network error. Please check your connection and try again.',
		};
	}
};
