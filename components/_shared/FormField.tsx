import React, { useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';

interface InputProps {
	type: string;
	name: string;
	placeholder: string;
	required?: boolean;
	className?: string;
	value: string;
	mutateForm: (arg0: React.SyntheticEvent<Element, Event>) => void;
}

export const Input = ({ type, name, placeholder, required, className = '', value, mutateForm }: InputProps) => {
	return (
		<input type={type} name={name} value={value} onChange={mutateForm} placeholder={placeholder} required={required} className={`font-light w-full text-xl border-b py-2 border-pink text-black placeholder-black -lg:text-base ${className}`} />
	);
};

interface TextAreaProps {
	text?: string;
	name: string;
	placeholder?: string;
	required?: boolean;
	className?: string;
	value: string;
	mutateForm: (arg0: React.SyntheticEvent<Element, Event>) => void;
	cols: number;
	rows: number;
}

export const TextAreaInput = ({ text, name, placeholder, required, className = '', cols, rows, value, mutateForm }: TextAreaProps) => {
	return (
		<>
			<p className="text-1.5xl -lg:mt-5 -lg:text-base">{text}</p>
			<textarea name={name} value={value} onChange={mutateForm} placeholder={placeholder} required={required} cols={cols} rows={rows} className={`${className}`}></textarea>
		</>
	);
};

interface FileProps {
	cta_text: string;
	uploadToClient(e: any): void;
	createObjectURL?: string;
	image?: {
		name: string;
		type: string;
	}
}

export const FileInput = ({ cta_text, uploadToClient, createObjectURL, image }: FileProps) => {
	return (
		<>
			<input type="file" name="file" id="file" accept="image/*" className="hidden" onChange={uploadToClient} multiple />
			<label htmlFor="file" className="border border-pink px-5 rounded-full mt-16 mb-10 py-2 text-left text-xl cursor-pointer flex-bc w-3/5 -sm:w-full -lg:mt-6">
				{cta_text} <AiOutlineCaretDown color="#FF5897" />
			</label>
			{createObjectURL && (
				<>
					<img src={createObjectURL} alt="preview" className="-md:ml-auto -md:mr-auto w-96 mb-4" />
					{image && <p className="text-center mb-10">{image.name}</p>}
				</>
			)}
		</>
	);
};

interface DropdownProps {
	form: any;
	setForm(field: string, value: any): void;
	list?: any;
	field?: string;
	className?: string;
}

export const TextDropdown = ({ form, setForm, list, field, className = '' }: DropdownProps) => {
	const [open, setOpen] = useState(false);

	return (
		<div className={`border border-pink rounded-full relative bg-white text-xl ${className}`}>
			<div className="px-5 py-3 cursor-pointer flex items-center" onClick={() => setOpen(!open)}>{form[field]} <AiOutlineCaretDown className="absolute right-4 text-pink" /></div>
			{open && (
				<div className="py-3 absolute bg-white w-full left-0 top-16 rounded-3xl border border-pink z-10">
					{list?.map((item, index) => (
						<div key={index} className={`px-5 py-2 hover:bg-gray cursor-pointer ${form[field] === item ? 'bg-gray' : ''}`} onClick={() => { setForm(field, item); setOpen(false); }}>{item}</div>
					))}
				</div>
			)}
		</div>
	);
};

interface SubmitButtonProps {
	cta_text: string;
	className?: string;
}

export const SubmitButton = ({ cta_text, className = '' }: SubmitButtonProps) => {
	return (
		<button type="submit" className={`flex-ec -sm:w-full ${className}`}>
			<div className="bg-pink text-white py-3 px-20 -sm:px-10 rounded-full my-5">{cta_text}</div>
		</button>
	);
};

interface PlainTextProps {
	text: string;
	className?: string;
}

export const PlainText = ({ text, className = '' }: PlainTextProps) => {
	return (
		<div className={`text-1.5xl my-4 -lg:text-base ${className}`}>
			{text}
		</div>
	);
};
