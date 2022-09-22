import React, { useState} from 'react';
import { RichText } from 'prismic-reactjs';
import { SliceType } from '@core/prismic/client';
import axios from 'axios';

interface Props {
	slice: SliceType
}

const SubscribeBox = ({ slice }: Props) => {
	const [email, setEmail] = useState('');
	const [Loading, setLoading] = useState(false);
	const [Message, setMessage] = useState(null);
	const handleSubmit = async (event : React.FormEvent<HTMLFormElement> )=>{
		event.preventDefault();
		setLoading(true);
		setMessage(null);
		return axios.put('/api/add-email-to-contact-klaviyo', {email}).then(()=>{
			setMessage('Thank you for signing up!');
		}).catch(err=>{
			console.log(err);
			if(err.response && err.response.data.error?.message){
				setMessage(err.response.data.error?.message);
			}else{
				setMessage('Error adding subscriber. Please try again or contact info@bakedbysteph.co.uk');
			}
		}).finally(()=>setLoading(false));
	};
	return (
		<section className="w-full py-28 -lg:py-12">
			<div className="container flex-cc flex-col w-full max-w-4xl -md:max-w-xs -lg:max-w-xl text-center -lg:px-5">
				<h2 className="text-7xl -lg:text-5xl font-bold font-secondary">{ RichText.asText(slice.primary.title) }</h2>
				<p className="text-1.5xl -lg:text-base mt-4 font-light">{  RichText.asText(slice.primary.description) }</p>
			</div>
			<div className="container flex-cc flex-col w-full max-w-4xl -lg:max-w-xl text-center -lg:px-5">
				<div className='mt-28 -lg:mt-9 w-full' >
					{Message &&
						<div className='my-4 text-pink'>
							<p>{Message}</p>
						</div>
					}
					<div className="klaviyo-form-WyHhhf"></div>
					<form className="hidden w-full relative" onSubmit={handleSubmit} >
						<input disabled={Loading} type="email" placeholder="Email" className="font-light w-full disabled:opacity-50 text-xl border-b py-4 border-pink text-black placeholder-black" onChange={(e) => setEmail(e.target.value)} value={email}/>
						<button disabled={Loading} className="right-0 disabled:opacity-50 absolute text-pink text-xl cursor-pointer">Join</button>
					</form>
				</div>
			</div>
			<style jsx>{`
			section:first-of-type {
				padding-top: 6rem;
			}
		`}</style>
		</section>
	);
};

export default SubscribeBox;
