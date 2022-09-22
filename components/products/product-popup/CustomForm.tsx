import React, { useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { BiCheck } from 'react-icons/bi';
import { getAttributes, slugify } from '@core/utils/shop';
import parse from 'html-react-parser';
interface CustomFormProps {
	product: any
	form: any
	mutateForm: any
	uploadToClient: any
	createObjectURL: any
	wsForm: any
}

interface DropdownProps {
	form: any
	mutateForm(boolean): void
	list?: any
	field?: string
}

const TextDropdown = ({ form, mutateForm, list, field }: DropdownProps) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="mt-4 -md:mt-3 border border-pink rounded-full w-full max-w-sm relative bg-white">
			<div className="px-5 py-3 cursor-pointer flex items-center" onClick={() => setOpen(!open)}>{form[field] ? parse(form[field] || '') : ''} <AiOutlineCaretDown className="absolute right-4 text-pink" /></div>
			{open && (
				<div className="py-3 -md:py-2 absolute bg-white w-full left-0 top-16 rounded-3xl border border-pink z-10">
					{list?.map((item, index) => (
						<div key={index} className={`px-5 py-2 hover:bg-gray cursor-pointer ${form[field] === item ? 'bg-gray' : ''}`} onClick={() => { mutateForm({ ...form, [field]: item }); setOpen(false); }}>{parse(item || '')}</div>
					))}
				</div>
			)}
		</div>
	);
};

const Select = ({ form, mutateForm, list, field }: DropdownProps) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="mt-4 -md:mt-3 border border-pink rounded-full w-full max-w-sm relative bg-white">
			<div className="px-5 py-3 cursor-pointer flex items-center" onClick={() => setOpen(!open)}>{form[field] ? parse(form[field].label || '') : ''} <AiOutlineCaretDown className="absolute right-4 text-pink" /></div>
			{open && (
				<div className="py-3 -md:py-2 absolute bg-white w-full left-0 top-16 rounded-3xl border border-pink z-10">
					{list?.map((item, index) => (
						<div key={index} className={`px-5 py-2 hover:bg-gray cursor-pointer ${form[field].value === item.value ? 'bg-gray' : ''}`} onClick={() => { mutateForm({ ...form, [field]: item.value }); setOpen(false); }}>{parse(item.label || '')}</div>
					))}
				</div>
			)}
		</div>
	);
};

interface FileProps {
	cta_text: string;
	uploadToClient(e: any, key: any): void;
	createObjectURL?: any;
	fieldKey: any
}

export const FileInput = ({ cta_text, uploadToClient, createObjectURL, fieldKey }: FileProps) => {
	return (
		<>
			<input type="file" name="file" id="file" accept="image/*" className="hidden" onChange={(e) => uploadToClient(e, fieldKey)} multiple />
			<label htmlFor="file" className="border border-pink px-5 rounded-full mt-4 mb-10 py-3 text-left text-lg font-light cursor-pointer flex-bc w-3/5 -sm:w-full">
				{cta_text} <AiOutlineCaretDown color="#FF5897" />
			</label>
			<div className="images">
				{createObjectURL && createObjectURL.length > 0 && createObjectURL.map((item, index) => {
					return (
						<div key={index} className="image-preview">
							<img src={item} alt="preview" className="w-96 mb-4" />
							{item && <p className="text-center mb-10">{item.name}</p>}
						</div>
					);
				})}
			</div>
			<style jsx>{`
			.images{
				display:flex;
			}
			.image-preview{
				width:100px;
				height:100px;
				margin-right:8px;
			}
			.image-preview img{
				width:100%;
				height:100%;
				object-fit: cover;
			}
			`}</style>
		</>
	);
};

const CustomForm = ({ product, form, mutateForm, uploadToClient, createObjectURL, wsForm }: CustomFormProps): JSX.Element => {
	const attributes = getAttributes(product);

	const [warning, setWarning] = useState(false);

	const handleOnClickCheckbox = (input, item) => {
		if( !form[`field_${input.id}[]`] ) return mutateForm({ ...form, [`field_${input.id}[]`]: [item.value] });

		if(form[`field_${input.id}[]`].includes(item.value)){
			const filtered = form[`field_${input.id}[]`].filter(x => x !== item.value);

			mutateForm({ ...form, [`field_${input.id}[]`]: filtered });
		} else {
			mutateForm({ ...form, [`field_${input.id}[]`]: [...form[`field_${input.id}[]`], item.value] });
		}
	};

	const lengthValid = (string, max) => {
		if (!max) return true;
		return (string?.replaceAll(' ','').length <= max);
	}

	return (
		<section className="w-full mb-12">
			<div className="flex-cc col w-full">
				{wsForm && wsForm.length > 0 && wsForm.map((input, index) => {
					if(input.type === 'text'){
						return (
							<div key={index} className="w-full mt-10 -md:mt-5 font-light text-lg -md:text-base flex-ss flex-col">
								<label htmlFor="custom">{input.label}{ input.required && <span>*</span> }:</label>
								<input className="px-5 py-3 mt-5 border border-pink rounded-full font-light w-full max-w-lg" maxLength={input.max_length ?? 20} placeholder={input.placeholder} value={form[`field_${input.id}`] || ''} onChange={(e) => {if (lengthValid(e.target.value, input.max_length)) (mutateForm({ ...form, [`field_${input.id}`]: e.target.value }))}}></input>
							</div>
						);
					} else if (input.type === 'checkbox'){
						return (
							<div key={index} className="w-full mt-10 -md:mt-5 font-light text-lg -md:text-base flex-ss flex-col">
								<label htmlFor="custom">{input.label}{ input.required && <span>*</span> }</label>
								<div className="mt-5">
									{input.checkbox_options.map((item, index) => (
										<div key={index} className="flex items-center mb-1 cursor-pointer" onClick={() => handleOnClickCheckbox(input, item)}>
											<div className={`w-4 h-4 mr-4 border rounded-sm flex-cc ${form[`field_${input.id}[]`]?.includes(item.value) ? 'bg-pink border-pink text-white' : ''}`}>
												{form[`field_${input.id}[]`]?.includes(item.value) && <BiCheck/>}
											</div>
											{item.label}
										</div>
									))}
								</div>
							</div>
						);
					} else if (input.type === 'file'){
						return (
							<div key={index} className="w-full mt-10 -md:mt-5 font-light text-lg -md:text-base flex-ss flex-col">
								<label htmlFor="custom">{input.label}{ input.required && <span>*</span> }</label>
								<FileInput cta_text="Upload file(s)*" uploadToClient={uploadToClient} createObjectURL={createObjectURL} fieldKey={`field_${input.id}[]`}/>
							</div>
						);
					} else if(input.type === 'select'){
						return (
							<div className="w-full mt-10 -md:mt-5 font-light text-lg -md:text-base flex-ss flex-col" key={index}>
								<label htmlFor="custom">{input.label}{ input.required && <span>*</span> }:</label>
								<Select mutateForm={mutateForm} form={form} list={input.options} field={`field_${input.id}`} />
							</div>
						);
					}
				})}
				{/* {product.acf.custom_message && (
					<div className="w-full mt-10 -md:mt-5 font-light text-lg -md:text-base flex-ss flex-col">
						<label htmlFor="custom">Personalization:</label>
						<input maxLength={20} className="px-5 py-3 mt-5 border border-pink rounded-full font-light w-full max-w-lg" placeholder={`Add message (${20} characters max.)`} value={form.message} onChange={(e) => mutateForm({ ...form, message: e.target.value })}></input>
					</div>
				)} */}
				{attributes.map((attribute, index) => (
					<div className="w-full mt-10 -md:mt-5 font-light text-lg -md:text-base flex-ss flex-col" key={index}>
						<label htmlFor="custom">{attribute.name}:</label>
						<TextDropdown mutateForm={mutateForm} form={form} list={attribute.options} field={slugify(attribute.name)} />
					</div>
				))}
				<div className="w-full mt-10 -md:mt-5 font-light text-lg -md:text-base flex-ss flex-col">
					<label htmlFor="custom">Quantity:</label>
					<input type="number" className="px-5 py-3 mt-4 border border-pink rounded-full font-light w-full max-w-vxs" min="1" max={product.stock_quantity} value={form.quantity} onChange={(e) => {if(e.target.value == product.stock_quantity) {setWarning(true);} else {setWarning(false);} mutateForm({ ...form, quantity: e.target.value });}}></input>
					{warning && <p className='mt-2 text-red-500'>Maximum stock has been reached</p>}
				</div>
			</div>
		</section>
	);
};

export default CustomForm;
