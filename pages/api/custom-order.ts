import sgMail from '@sendgrid/mail';
import { titleCase } from '@core/utils/string';

export default async function (req, res) {
	try {
		const data = req.body;

		let email_content = '';
		Object.keys(data).map(
			(item, index) => (email_content += `<p>${titleCase(item)}: ${Object.values(data)[index]}</p>`)
		);

		sgMail.setApiKey(process.env.SENDGRID_API_KEY);

		const SENDER_EMAIL = process.env.SENDER_EMAIL_DIFF;
		const RECIPIENT_EMAIL = process.env.SENDER_EMAIL;

		const msg = {
			to: RECIPIENT_EMAIL,
			from: SENDER_EMAIL,
			subject: `[Website Custom Order] - ${data.name}`,
			html: email_content,
		};
		// const msg = {
		// 	to: RECIPIENT_EMAIL,
		// 	from: RECIPIENT_EMAIL,
		// 	subject: `[BakedBySteph Custom Order] - ${name}`,
		// 	html: `<p>Name: ${name}</p> <p>Email: ${email}</p> <p>Company: ${company}</p> <p>Message: ${message}</p> <p>Date: ${date}</p> <p>Reference: ${reference}</p> <img src="${image}"/>`,
		// };

		await sgMail.send(msg);

		return res.status(200).json({ status: 'Success', data: req.body });
	} catch (error) {
		return res.status(500).json({ status: 'Failed' });
	}
}
