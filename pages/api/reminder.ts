import sgMail from '@sendgrid/mail';

export default async function (req, res) {
	const { date, name, email, url } = req.body;

	try {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);

		const SENDER_EMAIL = process.env.SENDER_EMAIL;

		const msg = {
			to: email,
			from: SENDER_EMAIL,
			subject: 'REMINDERS - BakedBySteph',
			html: `<p>Hi ${name}! Don't forget to buy your cookies! ${url}</p>`,
			sendAt: parseInt(date),
		};

		await sgMail.send(msg);

		return res.status(200).json({ status: 'Success', data: req.body });
	} catch (error) {
		console.log(error);
		console.log(error.response.body);
		return res.status(500).json({ status: 'Failed', error: error });
	}
}
