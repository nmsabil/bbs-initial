import React from 'react';
import { SliceType } from '@core/prismic/client';
import ColoredAccordion from '@components/ColoerdAccordion';
import TabMenu from '@components/TabMenu';
import { RichText } from 'prismic-reactjs';

interface Props {
	slice: SliceType
}

const ColoredTab = ({ slice }: Props) => {
	const formatedData = [];

	slice.items.forEach(item=>{
		formatedData.push({
			label : item.tab_label,
			color : item.tab_color,
			icon : item.image?.url,
			content : RichText.render(item.content)
		});
	});


	return (
		<>
			<div className="-lg:hidden w-full">
				<TabMenu data={formatedData} column={formatedData.length} withIcon />
			</div>
			<div className="lg:hidden w-full rich-text">
				<ColoredAccordion data={formatedData} />
			</div>
		</>
	);
};

export default ColoredTab;
