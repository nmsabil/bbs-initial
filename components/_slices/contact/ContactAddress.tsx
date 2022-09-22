import React from 'react';
import Maps from './Maps';
import { RichText } from 'prismic-reactjs';
import { SliceType } from '@core/prismic/client';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import Link from '@components/_shared/Link';

interface Props {
	slice: SliceType
}

const ContactAddress = ({ slice }: Props): JSX.Element => {
	return (
		<section className="w-full">
			<div className="md:container max-w-5xl my-20">
				<div className="bg-light-pink grid md:grid-cols-2 gap-4 px-8 py-6">
					<div className="md:space-y-3 grid md:grid-cols-1 grid-cols-2">
						<div className="text-xl font-medium uppercase font-secondary">Address</div>
						<div>
							<p>{ RichText.asText(slice.primary.address) }</p>
							<p>{ slice.primary.phone_number }</p>
						</div>
					</div>
					<div className="block space-y-3">
						<div className="text-xl font-medium uppercase font-secondary -md:hidden">Social</div>
						<div  className="flex space-x-3">
							<Link target="_blank" href={slice.primary.facebook_url} className="cursor-pointer w-10 h-10 flex-cc text-xl"><FaFacebookF /></Link>
							<Link target="_blank" href={slice.primary.instagram_url} className="cursor-pointer w-10 h-10 flex-cc text-xl"><FaInstagram /></Link>
							<Link target="_blank" href={slice.primary.twitter_url} className="cursor-pointer w-10 h-10 flex-cc text-xl"><FaTwitter /></Link>
							<Link target="_blank" href={slice.primary.youtube_url} className="cursor-pointer w-10 h-10 flex-cc text-xl"><FaYoutube /></Link>
							<Link target="_blank" href={slice.primary.tiktok_url} className="cursor-pointer w-10 h-10 flex-cc text-xl"><SiTiktok /></Link>
						</div>
					</div>
				</div>
				<Maps />
			</div>
		</section>
	);
};

export default ContactAddress;
