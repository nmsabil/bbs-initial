import React from 'react';
import { SliceType } from '@core/prismic/client';
import ContactAddress from '@components/_slices/contact/ContactAddress';
import ContactFormAndDetails from '@components/_slices/contact/ContactForm';

interface Props {
	slice: SliceType
}

const ContactForm = ({ slice }: Props): JSX.Element => {
	return (
		<>
			<div className="md:flex md:space-x-10 container max-w-5xl -lg:px-8">
				<ContactFormAndDetails slice={slice} />
				<ContactAddress slice={slice}/>
			</div>
		</>
	);
};

export default ContactForm;
