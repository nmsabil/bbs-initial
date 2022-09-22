import React from 'react';
import { SliceType } from '@core/prismic/client';
import Accordion from '@components/Accordion';
interface Props {
	slice: SliceType
}

const SimpleAccordion =  ({ slice }: Props) => {
	return <Accordion data={slice.items} />;
};

export default SimpleAccordion;
