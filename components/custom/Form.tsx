import React, { useState } from 'react';
import * as cheerio from 'cheerio';
import moment from 'moment';
import axios from 'axios';
import useForm from '@core/hooks/useForm';
import { Input, TextAreaInput, FileInput, TextDropdown, SubmitButton } from '@components/_shared/FormField';
import Calendar from '@components/Calendar';
import sanitizer from '@core/utils/sanitizer';
import { join } from '@core/utils/string';

interface Props {
	content: any;
}

interface FormType {
	name: string;
	company?: string;
	email: string;
	message: string;
	file?: File;
	date?: Date;
	reference?: string;
}

const RequestQuote = ({ content }: Props): JSX.Element => {
	const $ = cheerio.load(content);
	const section = {
		title: sanitizer($('h2').text()),
		description: sanitizer($('p').text()),
		file_instruction: sanitizer($('h4').text()),
		options: $('.wp-block-cwp-select option').toArray().map(group => cheerio.load($.html(group))('option').text()),
		placeholder: {
			name: sanitizer(join($('.wp-block-cwp-name label').text())),
			company: sanitizer(join($('.wp-block-cwp-text label').text())),
			email: sanitizer(join($('.wp-block-cwp-email label').text())),
			message: sanitizer(join($('.wp-block-cwp-message label').text())),
			file: sanitizer(join($('.wp-block-cwp-file-upload label').text())),
			date: sanitizer(join($('.wp-block-cwp-datepicker label').text())),
			reference: sanitizer(join($('.wp-block-cwp-select label').text())),
		}
	};

	const [date, setDate] = useState(moment());
	const { form, resetForm, mutateForm, setForm } = useForm<FormType>({
		name: '',
		company: '',
		email: '',
		message: '',
		date: date.toDate(),
		reference: section.placeholder.reference
	});
	const [image, setImage] = useState(null);
	const [createObjectURL, setCreateObjectURL] = useState(null);

	const uploadToServer = async () => {
		const body = new FormData();
		body.append('file', image);
		body.append('type', image.type);
		body.append('filename', image.name);

		axios.post('/api/upload', body).then(res => {
			const image_url = res.data.source_url;

			axios.post('/api/custom-order', {
				name: form.name,
				company: form.company,
				email: form.email,
				message: form.message,
				reference: form.reference,
				date,
				image: image_url
			}).then(() => {
				alert('Order sent!');
			}).catch(err => {
				alert('Failed to send order');
				console.log(err);
			});
		}).catch(err => console.log(err));
	};

	const uploadToClient = (event) => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];

			setImage(i);
			setCreateObjectURL(URL.createObjectURL(i));
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		uploadToServer().then(res => console.log(res)).catch(err => console.log(err));
		resetForm();
	};

	return (
		<section className="w-full -lg:px-6">
			<div className="container max-w-3xl my-14">
				<h1 className="uppercase font-black font-secondary text-7xl -sm:text-6xl -sm:text-center mb-10">{section.title}</h1>
				<p className="text-1.5xl py-5 mb-8">{section.description}</p>
				<form onSubmit={handleSubmit}>
					<Input type="text" name="name" placeholder={section.placeholder.name} required value={form.name} mutateForm={mutateForm} className="mb-8" />
					<Input type="text" name="company" placeholder={section.placeholder.company} value={form.company} mutateForm={mutateForm} className="mb-8" />
					<Input type="email" name="email" placeholder={section.placeholder.email} required value={form.email} mutateForm={mutateForm} className="mb-8" />
					<TextAreaInput text={section.placeholder.message} name="message" cols={30} rows={10} value={form.message} mutateForm={mutateForm} className="bg-light-gray my-4 w-full p-4" />
					<FileInput cta_text={section.placeholder.file} uploadToClient={uploadToClient} createObjectURL={createObjectURL} image={image} />
					<Calendar value={date} setValue={setDate} text={section.placeholder.date} />
					<TextDropdown form={form} setForm={setForm} list={section.options} field={'reference'} className="w-3/5 -sm:w-full mt-10 mb-20 -sm:mb-5" />
					<SubmitButton cta_text="Submit" className="w-3/5 text-xl -sm:flex-cc" />
				</form>
			</div>
		</section>
	);
};

export default RequestQuote;
