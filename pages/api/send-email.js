import nodemailer from 'nodemailer';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const { name, email, subject, message, projectType } = req.body;

		// Validate required fields
		if (!name || !email || !message) {
			return res.status(400).json({
				success: false,
				message: 'Missing required fields',
			});
		}

		// Validate environment variables
		if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
			console.error('Email credentials not configured');
			return res.status(500).json({
				success: false,
				message: 'Email service not configured. Please contact the administrator.',
			});
		}

		// Create transporter using Gmail
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD, // Use App Password, not regular password
			},
		});

		// Email content
		const emailSubject = subject || `Contact Form: ${projectType || 'General Inquiry'}`;
		const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Project Type: ${projectType || 'N/A'}
Subject: ${subject || 'N/A'}

Message:
${message}

---
This email was sent from your portfolio contact form.
		`;

		const emailHtml = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2 style="color: #4F46E5;">New Contact Form Submission</h2>
				<div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
					<p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
					<p><strong>Subject:</strong> ${subject || 'N/A'}</p>
				</div>
				<div style="margin: 20px 0;">
					<h3 style="color: #4F46E5;">Message:</h3>
					<p style="white-space: pre-wrap; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
				</div>
				<hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
				<p style="color: #6B7280; font-size: 12px;">This email was sent from your portfolio contact form.</p>
			</div>
		`;

		// Send email
		const mailOptions = {
			from: `"${name}" <${process.env.EMAIL_USER}>`,
			replyTo: email,
			to: 'vijay10101992@gmail.com',
			subject: emailSubject,
			text: emailText,
			html: emailHtml,
		};

		await transporter.sendMail(mailOptions);

		// Return success response
		return res.status(200).json({
			success: true,
			message: 'Email sent successfully!',
		});
	} catch (error) {
		console.error('Email sending error:', error);
		return res.status(500).json({
			success: false,
			message: error.message || 'Failed to send email. Please try again later.',
		});
	}
}

