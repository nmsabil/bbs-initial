import sgMail from '@sendgrid/mail';

export default async function (req, res) {
	try {
		const { name, email, message, subject, reference } = req.body;

		sgMail.setApiKey(process.env.SENDGRID_API_KEY);

		const SENDER_EMAIL = process.env.SENDER_EMAIL_DIFF;
		const RECIPIENT_EMAIL = process.env.SENDER_EMAIL;

		const msg = {
			to: RECIPIENT_EMAIL,
			from: SENDER_EMAIL,
			subject: `[Website Contact Form] ${subject} - ${name}`,
			html: `<p>Name: ${name}</p> <p>Email: ${email}</p> <p>Subject: ${subject}</p> <p>Message: ${message}</p> <p>Reference: ${reference}</p> <p>Source: Website contact form</p>`,
		};

		await sgMail.send(msg);

		return res.status(200).json({ status: 'Success', data: req.body });
	} catch (error) {
		console.log(error)
		console.log(error?.response?.body)
		return res.status(500).json({ status: 'Failed' });
	}
}
