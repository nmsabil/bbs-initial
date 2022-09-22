import React, { useState } from 'react';
import axios from 'axios';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import useForm from '@core/hooks/useForm';
import moment from 'moment';
import { Input, TextDropdown, TextAreaInput, SubmitButton, PlainText } from '@components/_shared/FormField';
import { linkResolver } from '@core/utils/link-resolver';
import Calendar from '@components/Calendar';

interface Props {
	slice: SliceType
}

const ContactForm = ({ slice }: Props): JSX.Element => {
	const [date, setDate] = useState(moment());
	const fields = slice.items;

	let formState = {};
	fields.forEach(field => {
		formState = field.type === 'Calendar' ?
			{ ...formState, [RichText.asText(field.name)]: date.toDate() } : field.type === 'Dropdown' ?
				{ ...formState, [RichText.asText(field.name)]: RichText.asText(field.placeholder) } : field.type !== 'PlainText' && field.type !== 'SubmitButton' ?
					{ ...formState, [RichText.asText(field.name)]: '' } : { ...formState };
	});

	const { form, mutateForm, setForm, resetForm } = useForm<any>(formState);

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		axios.post('/api/contact', form)
			.then(() => {
				setError(false);
				setSuccess(true);
			})
			.catch(err => {
				console.log(err);
				setSuccess(false);
				setError(true);
			});

		resetForm();
	};

	return (
		<section className="w-full -lg:px-6">
			<div className="container max-w-5xl my-10 md:my-20">
				<form className="md:w-full" onSubmit={handleSubmit}>
					{/* Only for first 2 fields */}
					<div className="grid md:grid-cols-2 grid-cols-1 md:gap-4">
						{fields.slice(0,2).map((item, i) => (
							<div key={i}>
								{{
									TextInput: <Input type="text" name={RichText.asText(item.name)} placeholder={RichText.asText(item.placeholder)} required={item.required} value={form[item.name]} mutateForm={mutateForm} className="border border-pink rounded-3xl font-light mb-6 px-5 py-3 text-base"/>,
									TextArea: <TextAreaInput name={RichText.asText(item.name)} required={item.required} placeholder={RichText.asText(item.placeholder)} cols={30} rows={6} value={form.message} mutateForm={mutateForm} className="w-full my-4 p-4 border border-pink rounded-3xl font-light placeholder-black resize-none"/>,
									Calendar: <Calendar value={date} setValue={setDate} text={RichText.asText(item.placeholder)} />,
									Dropdown: <TextDropdown form={form} setForm={setForm} list={item.options?.map(x => x.text)} field={RichText.asText(item.name)} className="w-full mb-2 font-light text-base" />,
									SubmitButton: <SubmitButton cta_text={RichText.asText(item.placeholder)} className="w-full text-base -sm:block" />,
									PlainText: <PlainText text={RichText.asText(item.placeholder)} />,
									Email: <Input type="email" name={RichText.asText(item.name)} placeholder={RichText.asText(item.placeholder)} required className="border border-pink rounded-3xl font-light mb-6 px-5 py-3 text-base" value={form.email} mutateForm={mutateForm} />
								}[item.type]}
							</div>
						))}
					</div>
					{/* Rest of the fields */}
					{fields.slice(2).map((item, i) => (
						<div key={i}>
							{{
								TextInput: <Input type="text" name={RichText.asText(item.name)} placeholder={RichText.asText(item.placeholder)} required={item.required} value={form[item.name]} mutateForm={mutateForm} className="border border-pink rounded-3xl font-light mb-6 px-5 py-3 text-base"/>,
								TextArea: <TextAreaInput name={RichText.asText(item.name)} required={item.required} placeholder={RichText.asText(item.placeholder)} cols={30} rows={6} value={form.message} mutateForm={mutateForm} className="w-full my-4 p-4 border border-pink rounded-3xl font-light placeholder-black resize-none"/>,
								Calendar: <Calendar value={date} setValue={setDate} text={RichText.asText(item.placeholder)} />,
								Dropdown: <TextDropdown form={form} setForm={setForm} list={item.options?.map(x => x.text)} field={RichText.asText(item.name)} className="w-full mb-2 font-light text-base" />,
								SubmitButton: <SubmitButton cta_text={RichText.asText(item.placeholder)} className="w-full text-base -sm:block" />,
								PlainText: <PlainText text={RichText.asText(item.placeholder)} />,
								Email: <Input type="email" name={RichText.asText(item.name)} placeholder={RichText.asText(item.placeholder)} required className="border border-pink rounded-3xl font-light mb-6 px-5 py-3 text-base" value={form.email} mutateForm={mutateForm} />
							}[item.type]}
						</div>
					))}
					{success && (<div className="text-center text-pink w-72 ml-auto -md:m-auto"><RichText render={slice.primary.confirmation_message} linkResolver={linkResolver} /></div>)}
					{error && (<div className="text-center text-pink w-72 ml-auto -md:m-auto"><RichText render={slice.primary.error_message} linkResolver={linkResolver} /></div>)}
				</form>
			</div>
		</section>
	);
};

export default ContactForm;
