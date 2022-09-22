import React from 'react';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface ShareButtonProps {
	title: string;
	variant: string;
}

const ShareButton = ({title, variant}: ShareButtonProps): JSX.Element => {

	const defaultClass = 'flex justify-end items-center py-5 space-x-3';

	const variants = {
		sticky: 'flex-col lg:sticky lg:visible -sm:invisible top-40 z-10 space-y-2',
		recipe: `${defaultClass}`,
		normal: `md:hidden ${defaultClass}`,
	};
	const pickedVariant = variant ? `${variants[variant]}` : `md:hidden ${variants['normal']}`;
	const stickyStyle = { marginTop: 256, transform: 'translateX(34px)' };

	const path = useRouter().asPath;

	const shareButtonList = [
		{
			link: `http://twitter.com/share?text=${title}&url=http://bakedbysteph.co.uk${path}`,
			icon: <FaTwitter />
		},
		{
			link: 'https://www.instagram.com/baked.by.steph/',
			icon: <FaInstagram />
		},
		{
			link: `https://www.facebook.com/sharer/sharer.php?u=http://bakedbysteph.co.uk${path}`,
			icon: <FaFacebookF />
		},
	];

	return (
		<div className={pickedVariant} style={variant === 'sticky' ? stickyStyle : {}}>
			<span className={`font-medium ${variant === 'sticky' ? 'hidden' : ''}`}>Share</span>
			{shareButtonList.map((item, i) => (
				<a key={i} href={item.link} className="p-2 border bg-white flex-cc rounded-full">{item.icon}</a>
			))}
		</div>
	);
};

export default ShareButton;
