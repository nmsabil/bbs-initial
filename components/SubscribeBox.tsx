import React, { useState } from 'react';

interface SubscribeBoxProps {
    title: string
    text: string
}

const SubscribeBox = ({ title, text }: SubscribeBoxProps): JSX.Element => {
	const [email, setEmail] = useState('');

	return (
		<section className="w-full py-28 -lg:py-12">
			<div className="container flex-cc flex-col w-full max-w-4xl -lg:max-w-xs text-center -lg:px-5">
				<h2 className="text-7xl -lg:text-5xl font-bold font-secondary">{ title }</h2>
				<p className="text-1.5xl -lg:text-base mt-4">{ text }</p>
				<div className="w-full relative flex-cc mt-28 -lg:mt-9">
					<input type="email" placeholder="Email" className="w-full text-xl border-b py-4 border-pink text-black placeholder-black" onChange={(e) => setEmail(e.target.value)} value={email}/>
					<button className="right-0 absolute text-pink text-xl cursor-pointer">Join</button>
				</div>
			</div>
		</section>
	);
};

export default SubscribeBox;
