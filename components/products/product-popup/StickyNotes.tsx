import React, { useState } from 'react';
import moment from 'moment';
import Reminder from './Reminder';
import axios from 'axios';

const StickyNotes = ({ product }: any): JSX.Element => {
	const [date, setDate] = useState(moment());
	const [reminderOpen, setReminderOpen] = useState(false);
	const [form, setForm] = useState({
		email: '',
		name: ''
	});

	const setReminder = () => {
		const timestamp = moment(date).format('x');

		if (form.email !== '' && form.name !== '') {
			axios.post('/api/reminder', {
				email: form.email,
				name: form.name,
				date: parseInt(timestamp)/1000,
				url: 'https://www.bakedbysteph.co.uk/' + product.slug
			})
				.then(() => alert('Reminder set!'))
				.catch(err => {
					console.log(err);
					alert('Failed to set reminder');
				});
		} else {
			alert('Please enter a valid email address and name');
		}
	};

	return (
		<div className="flex-cc col w-full gap-4">
			{product.acf.reminder &&
			<div className="w-full flex-col bg-light-green">
				<div className="flex-bc w-full">
					<div className="my-6 ml-4 flex-cs col" style={{ minHeight: 48 }}>
						<p className="text-black font-medium text-md">Not ready to buy yet?</p>
						<button className="text-pink underline font-medium text-md" onClick={() => setReminderOpen(!reminderOpen)}>Let us set a reminder</button>
					</div>
					<div className="h-20 w-20 mr-2">
						<img src="" alt="" />
					</div>
				</div>
				<div className="flex-cc flex-col">
					{reminderOpen && <Reminder value={date} setValue={setDate} />}
					{reminderOpen && (
						<form className="form-reminder mb-5">
							<input type="email" name="email" placeholder="Email" className="w-full mb-2 px-3 py-2 border" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
							<input type="text" name="name" placeholder="Name"  className="w-full mb-2 px-3 py-2 border" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
						</form>
					)}
					{reminderOpen && <button className="mb-8 flex-cc px-8 py-2 font-bold text-white rounded-full text-md -sm:text-sm bg-pink -sm:py-1 -sm:px-4" onClick={() => setReminder()}>Set Reminder</button>}
				</div>
			</div> }

			{product.acf.letterbox && product.acf.letterbox.title && product.acf.letterbox.subtitle && (
				<div className="w-full flex-bc bg-light-yellow">
					<div className="my-6 ml-4 flex-cs col" style={{ minHeight: 48 }}>
						<p className="text-black font-medium text-md">{product.acf.letterbox.title}<br />{product.acf.letterbox.subtitle}</p>
					</div>
					<div className="w-32 mr-2">
						<img className="filter-pink h-full" src="/images/letterbox.svg" alt="" />
					</div>
				</div>
			)}

			{product.acf.preorder && product.acf.preorder.title && product.acf.preorder.subtitle && (
				<div className="w-full flex-bc" style={{ background: '#FFE2EE' }}>
					<div className="my-6 ml-4 flex-cs col" style={{ minHeight: 48 }}>
						<p className="text-black font-medium text-md">{product.acf.preorder.title}<br />{product.acf.preorder.subtitle}</p>
					</div>
					<div className="h-20 w-20 mr-2">
						<img src="/images/van.gif" alt="" />
					</div>
				</div>
			)}
			<style jsx>{`
				.form-reminder{
					max-width:60%;
					width:100%;
				}

				.filter-pink {
					filter: invert(48%) sepia(47%) saturate(1459%) hue-rotate(305deg) brightness(101%) contrast(104%);
				}

				@media (max-width: 1536px){
					.form-reminder{
						max-width:90%;
						width:100%;
					}
				}
			`}</style>
		</div>
	);
};

export default StickyNotes;
