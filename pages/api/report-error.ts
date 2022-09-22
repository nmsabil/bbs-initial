import sgMail from '@sendgrid/mail';

export default async function (req, res) {
	try {
		const { subject, error, body, info, message } = req.body;

		if (process.env.ENV != 'prod') return res.status(200).json({ status: "Didn't report error - Dev environemnt"});

		sgMail.setApiKey(process.env.SENDGRID_API_KEY_DEV);

		const SENDER_EMAIL = process.env.SENDER_EMAIL_DEV;

		const msg = {
			to: SENDER_EMAIL,
			from: SENDER_EMAIL,
			subject: `[Baked By Steph] - ${subject}`,
			html: `<p>Error: ${error?.message}</p>
			<p>Body: ${body}</p>
			<p>Message: ${message}</p>
			<p>Info: ${info}</p>`,
		};

		await sgMail.send(msg);

		return res.status(200).json({ status: 'Success', data: req.body });
	} catch (error) {
		console.log(error)
		return res.status(500).json({ status: 'Failed' });
	}
}
