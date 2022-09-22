import React, { useState } from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import moment from 'moment';
import axios from 'axios';
import useForm from '@core/hooks/useForm';
import { Input, TextAreaInput, FileInput, TextDropdown, SubmitButton, PlainText } from '@components/_shared/FormField';
import Calendar from '@components/Calendar';
import { linkResolver } from '@core/utils/link-resolver';

interface Props {
	slice: SliceType
}

/**
 *	Custom form for custom cookie page
 */

const Form = ({ slice }: Props) => {
	const [date, setDate] = useState(moment());
	const [image, setImage] = useState(null);
	// TODO: image preview
	const [createObjectURL, setCreateObjectURL] = useState(null);

	const fields = slice.items;

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	/**
	 * Create state based on field name on prismic
	 */
	let formState = {};
	fields.forEach(field => {
		formState = field.type === 'Calendar' ?
			{ ...formState, [RichText.asText(field.name)]: date.toDate() } : field.type === 'Dropdown' ?
				{ ...formState, [RichText.asText(field.name)]: RichText.asText(field.placeholder) } : field.type !== 'PlainText' && field.type !== 'SubmitButton' ?
					{ ...formState, [RichText.asText(field.name)]: '' } : { ...formState };
	});

	// TODO: custom typescript interface for useForm (optional)
	const { form, resetForm, mutateForm, setForm } = useForm<any>(formState);

	const uploadToServer = async () => {
		setLoading(true);
		const body = new FormData();
		if (image) {
			body.append('file', image);
			body.append('type', image.type);
			body.append('filename', image.name);
		}
		axios.post('/api/upload', body).then(res => {
			const image_url = res.data.source_url;
			axios.post('/api/custom-order', {
				...form,
				delivery_date: date,
				image: image_url ? image_url : 'No image uploaded'
			}).then(() => {
				setError(false);
				setLoading(false);
				setSuccess(true);
			}).catch(err => {
				setSuccess(false);
				setLoading(false);
				setError(true);
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
		<>
			<section className="w-full -lg:px-6 font-light py-32 lg:pt-52 -xl:pt-40 -lg:pt-20 -md:pt-36" id="form">
				<div className="container max-w-3xl">
					<h1 className="uppercase font-black font-secondary text-7xl -lg:text-4xl -sm:text-6xl -sm:text-center mb-10 -lg:mb-5">{RichText.asText(slice.primary.title)}</h1>
					<p className="text-1.5xl -lg:text-base py-5 mb-8 -lg:mb-0 font-light">{RichText.asText(slice.primary.description)}</p>
					<form onSubmit={handleSubmit} className="-lg:text-base font-light">
						{fields.map((item, i) => (
							<div key={i}>
								{{
									TextInput: <Input type="text" name={RichText.asText(item.name)} placeholder={RichText.asText(item.placeholder)} required={item.required} value={form[item.name]} mutateForm={mutateForm} className="mb-8 -lg:mb-4"/>,
									TextArea: <TextAreaInput name={RichText.asText(item.name)} required={item.required} text={RichText.asText(item.placeholder)} cols={30} rows={10} value={form.message} mutateForm={mutateForm} className="bg-light-gray my-4 w-full p-4"/>,
									FileInput: <FileInput cta_text={RichText.asText(item.placeholder)} uploadToClient={uploadToClient} createObjectURL={createObjectURL} image={image} />,
									Calendar: <Calendar value={date} setValue={setDate} text={RichText.asText(item.placeholder)} />,
									Dropdown: <TextDropdown form={form} setForm={setForm} list={item.options?.map(x => x.text)} field={'reference'} className="w-3/5 -sm:w-full mt-10 mb-20 -sm:mb-5" />,
									SubmitButton: <SubmitButton cta_text={RichText.asText(item.placeholder)} className="w-3/5 text-xl -sm:flex-cc" />,
									PlainText: <PlainText text={RichText.asText(item.placeholder)} />,
								}[item.type]}
							</div>
						))}
						{loading && (<div className="text-left text-pink -md:text-center"><p>Submitting...</p></div>)}
						{success && (<div className="text-left text-pink -md:text-center"><RichText render={slice.primary.confirmation_message} linkResolver={linkResolver} /></div>)}
						{error && (<div className="text-left text-pink -md:text-center"><RichText render={slice.primary.error_message} linkResolver={linkResolver} /></div>)}
					</form>
				</div>
			</section>
		</>
	);
};

export default Form;
