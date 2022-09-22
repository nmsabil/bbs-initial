import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';


interface PopUpHeaderProps {
	title: string;
	handleClose(): void;
	price: number;
	regularPrice: number;
	salePrice: number;
	addToCart(boolean): void;
	status: string;
	loading?: boolean;
	disableBuy?: boolean;
	inventoryLow?: boolean;
	error: any;
}


const PopUpHeader = ({title, handleClose, price, regularPrice, salePrice, addToCart, status, loading, disableBuy, error, inventoryLow}: PopUpHeaderProps): JSX.Element => {
	const [openMessage, setOpenMessage] = useState(false);
	const handleBuy = () => {
		if(disableBuy){
			setOpenMessage(true);
			scrollToMissingField();
			return;
		}
		addToCart(true);
	};

	const handleCart = () => {
		if (disableBuy){
			setOpenMessage(true);
			scrollToMissingField();
			return;
		}
		addToCart(false);
	};

	const scrollToMissingField = () => {
		const element = document.getElementById('custom-message');
		if (element) {
			const y = element.getBoundingClientRect().top + window.pageYOffset - 250;
			window.scrollTo({top: y, behavior: 'smooth'});
		}
	};

	useEffect(() => {
		setTimeout(() => setOpenMessage(false), 7000);
	}, [openMessage]);
	return (
		<div className="absolute top-0 py-4 flex-bc w-full pl-8 pr-4 bg-white pointer-events-auto z-50" style={{boxShadow: '0 0 20px #0005'}}>
			<p className="flex-cc text-xl font-bold uppercase font-secondary" style={{minHeight: 40}}>{title}</p>
			<div className="flex-cc gap-6">
				<div className="-lg:hidden flex-cc gap-2">
					{salePrice ? (
						<>
							<p className="flex-cc text-xl font-semibold line-through uppercase -sm:text-base font-secondary">£{regularPrice}</p>
							<p className="flex-cc text-xl font-semibold uppercase -sm:text-md text-pink font-secondary">£{salePrice}</p>
						</>
					) : (
						<p className="flex-cc text-xl font-semibold uppercase -sm:text-md text-pink font-secondary">£{price.toFixed(2)}</p>
					)}
				</div>
				{
					(status === 'instock') ? (
						<div className='-lg:hidden relative'>
							{openMessage && <div className='absolute whitespace-nowrap bottom-[-3.75rem] right-0 bg-pink rounded-sm text-white px-4 py-2'>
								{inventoryLow && <span>Not enough stock left</span>}
								{!inventoryLow && <span>Please fill out all required fields!</span>}
							</div>}
							{error && <div className='absolute whitespace-nowrap bottom-[-3.75rem] right-0 bg-pink rounded-sm text-white px-4 py-2'>Error adding item to cart - Please try again!</div>}
							<div className="flex-cc">
								<button className={`${disableBuy ? 'opacity-60' : ''} flex-cc px-12 py-2 text-white rounded-full text-md -sm:text-sm bg-pink -sm:py-1 -sm:px-7 font-medium ${loading ? 'loading' : ''}`} onClick={handleCart}>
									{loading && <div className="loader"></div>}
									<p className="whitespace-nowrap">Add to Basket</p>
								</button>
							</div>
						</div>
					) : (<p className="-lg:hidden ml-4 text-pink whitespace-nowrap -sm:text-lg text-xl">[OUT OF STOCK]</p>)
				}
				<style
					dangerouslySetInnerHTML={{
						__html: `
					@keyframes loading {
						0% {width: 0%; }
						50% { width: 40%; }
						80% { width: 80%; }
						99% { width: 100%; }
					}

					.button-loading{
						transition: .3s ease-in-out;
						width:184px;
						position:relative;
					}
					@media (max-width: 768px) {
						.button-loading{
							transition: .3s ease-in-out;
							width:140px;
							position:relative;
						}
					}

					.button-loading:focus, .button-loading:active{
						border:0;
						outline:0;
					}

					button span{
						position:absolute;
						top:50%;
						left:50%;
						transform: translate(-50%,-50%);
					}

					button.loading{
						position:relative;
						padding-top:0;
						padding-bottom:0;
						height:18px;
						background:#cccccc;
					}

					.loader{
						background: #FF5897;
						width:100%;
						height:100%;
						position:absolute;
						left:0;
						top:0;
						animation: loading 2s;
					}

					button.loading span{
						opacity:0;
					}
					`,
					}}
				/>
				<IoMdClose className="w-10 h-10 cursor-pointer text-pink" style={{minWidth: 40}} onClick={handleClose}/>
			</div>
		</div>
	);
};

export default PopUpHeader;
