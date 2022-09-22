import React, { useState, useEffect } from 'react';
import type { Moment } from 'moment';

interface Props {
	value: Moment;
	setValue: (Moment) => void;
}

const Reminder = ({ value, setValue }: Props): JSX.Element => {
	const [calendar, setCalendar] = useState([]);

	const buildCalendar = (value) => {
		const startDay = value.clone().startOf('month').startOf('week');
		const endDay = value.clone().endOf('month').endOf('week');
		const day = startDay.clone();
		const calendar = [];
		while (day.isBefore(endDay, 'day')) {
			calendar.push(
				Array(7)
					.fill(0)
					.map(() => day.add(1, 'day').clone())
			);
		}
		return calendar;
	};

	const isSelected = (day) => {
		return value.isSame(day, 'day');
	};

	const beforeToday = (day) => {
		return day.isBefore(new Date(), 'day');
	};

	const afterToday = (day) => {
		return day.isAfter(new Date(), 'day');
	};

	const isToday = (day) => {
		return day.isSame(new Date(), 'day');
	};

	const currMonthName = () => {
		return value.format('MMMM');
	};

	const currYear = () => {
		return value.format('YYYY');
	};

	const prevMonth = () => {
		return value.clone().subtract(1, 'month');
	};

	const nextMonth = () => {
		return value.clone().add(1, 'month');
	};

	const isSameMonth = (date) => {
		return value.isSame(date, 'month');
	};

	const thisMonth = () => {
		return value.isSame(new Date(), 'month');
	};

	const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

	const dayStyles = (day) => {
		if (isSelected(day)) return 'selected';
		if (beforeToday(day) && isSameMonth(day)) return 'before';
		if (afterToday(day) && isSameMonth(day) || isToday(day)) return 'after';
		return 'blank';
	};

	useEffect(() => {
		setCalendar(buildCalendar(value));
	}, [value]);

	return (
		<>
			<div className="w-full">
				<div className="calendar-container bg-white">
					<div className="calendar">
						<div className="calendar-header">
							<div className={`previous ${thisMonth() ? 'text-medium-gray' : ''}`} onClick={() => !thisMonth() && setValue(prevMonth())}>{String.fromCharCode(171)}</div>
							<div>{currMonthName()} {currYear()}</div>
							<div className="next" onClick={() => setValue(nextMonth())}>{String.fromCharCode(187)}</div>
						</div>
						<div className="calendar-body">
							<div className="day-header">
								{days.map((day, i) => (
									<div className="day-name" key={i}>{day}</div>
								))}
							</div>
							{calendar.map((week, i) => (
								<div className="week" key={i}>
									{week.map((day, i) => (
										<div className="day" onClick={() => !beforeToday(day) && setValue(day)} key={i}>
											<div className={dayStyles(day)}>{day.format('D').toString()}</div>
										</div>
									))
									}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
			.calendar-container {
				max-width: 60%;
				border-width: 1px;
				border-color: #444444;
				padding: 0.5rem 1rem;
				margin-left: auto;
				margin-right: auto;
				margin-bottom:1rem;
			}

			.header {
				display: flex;
				justify-content: space-between;
				font-size: 1.25rem;
				line-height: 1.75rem;
				cursor: pointer;
			}

			.calendar {
				display: flex;
				flex-direction: column;
				padding: 0 0.5rem 0.5rem 0.5rem;
				margin: 1.5rem 0 2rem 0;
				border-width: 1px;
				border-color: rgba(0, 0, 0, 1);
			}

			.calendar-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0.5rem 0;
				text-transform: uppercase;
			}

			.arrow {
				display: flex;
			}

			.previous {
				cursor: pointer;
			}

			.next {
				cursor: pointer;
			}

			.week, .day-header {
				display: grid;
				grid-template-columns: repeat(7, minmax(0, 1fr));
			}

			.day-name {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0.25rem 0;
				font-size: 0.75rem;
			}

			.day {
				padding: 0.1rem;
			}

			.before {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #F5F5F5;
				padding: 0.2rem 0;
				color: #3b3b3b;
				cursor: pointer;
			}

			.after {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #BCF2C9;
				padding: 0.2rem 0;
				color: #3b3b3b;
				cursor: pointer;
			}

			.selected {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #FF5897;
				padding: 0.2rem 0;
				color: #3b3b3b;
				cursor: pointer;
			}

			.blank {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				padding: 0.2rem 0;
				color: #3b3b3b;
				cursor: pointer;
			}

			@media(max-width: 1536px){
				.calendar-container {
					max-width: 90%;
				}
			}
		`}</style>
		</>
	);
};

export default Reminder;
