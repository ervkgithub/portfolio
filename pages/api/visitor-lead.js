import nodemailer from 'nodemailer';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const { name, location, emailOrPhone, page, userAgent, createdAt } = req.body;

		if (!name || !location || !emailOrPhone) {
			return res.status(400).json({
				success: false,
				message: 'Missing required fields',
			});
		}

		if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
			return res.status(500).json({
				success: false,
				message: 'Email service not configured. Please contact the administrator.',
			});
		}

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const toEmail = process.env.LEAD_TO_EMAIL || process.env.EMAIL_USER || 'vijay10101992@gmail.com';

		const emailSubject = `New Portfolio Visitor: ${name}`;
		const emailText = `
New Portfolio Visitor

Name: ${name}
Location: ${location}
Email/Phone: ${emailOrPhone}

Page: ${page || 'N/A'}
Time: ${createdAt || 'N/A'}
User Agent: ${userAgent || 'N/A'}
		`;

		const emailHtml = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2 style="color: #4F46E5;">New Portfolio Visitor</h2>
				<div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Location:</strong> ${location}</p>
					<p><strong>Email/Phone:</strong> ${emailOrPhone}</p>
					<p><strong>Page:</strong> ${page || 'N/A'}</p>
					<p><strong>Time:</strong> ${createdAt || 'N/A'}</p>
				</div>
				<div style="margin: 20px 0;">
					<p style="color: #6B7280; font-size: 12px; word-break: break-word;">User Agent: ${userAgent || 'N/A'}</p>
				</div>
			</div>
		`;

		await transporter.sendMail({
			from: `"Portfolio" <${process.env.EMAIL_USER}>`,
			to: toEmail,
			subject: emailSubject,
			text: emailText,
			html: emailHtml,
		});

		return res.status(200).json({
			success: true,
			message: 'Submitted successfully',
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message || 'Failed to submit details. Please try again later.',
		});
	}
}
