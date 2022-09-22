import React from 'react';
import Accordion from './Accordion';
import CustomForm from './CustomForm';
import Description from './Description';
import LoveLetter from './LoveLetter';
import OtherProductsNew from './OtherProductsNew';
import StickyNotes from './StickyNotes';

interface Props {
	product: any
	form: any
	mutateForm: any
	uploadToClient: any
	createObjectURL: any
	wsForm: any
}

const PopUpContent = ({ product, form, mutateForm, uploadToClient, createObjectURL, wsForm }: Props): JSX.Element => (
	<div className="">
		<Description product={product} />
		<CustomForm product={product} form={form} mutateForm={mutateForm} uploadToClient={uploadToClient} createObjectURL={createObjectURL} wsForm={wsForm}/>
		<StickyNotes product={product}/>
		<Accordion product={product} />
		<LoveLetter product={product}/>
		<OtherProductsNew product={product} />
	</div>
);

export default PopUpContent;