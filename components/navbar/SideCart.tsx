import React, { useState } from 'react';
import { useCart, toggleOpenCart } from '@core/redux/reducers/cart';
import { useDispatch } from 'react-redux';
import { removeProductFromCart, updateProductQuantity } from '@core/redux/actions/cart';
import Link from '@components/_shared/Link';
import { MdClose } from 'react-icons/md';
import { IoTrashBin, IoAdd, IoRemove } from 'react-icons/io5';
import parse from 'html-react-parser';
import Cookies from 'js-cookie';
import OutsideClickHandler from 'react-outside-click-handler';

interface SideCartProps {
	cartOpen: boolean
}

const SideCart = ({ cartOpen }: SideCartProps): JSX.Element => {
	const { products, qty,coupons } = useCart();
	const [loading, setLoading] = useState(false);
	const [warning, setWarning] = useState(false);
	const [product, setProduct] = useState('');

	const dispatch = useDispatch();
	const key = Cookies.get('baked_cart_key');

	const getTotalPrice = (products) => {
		const total = products?.map(item => {
			const priceStr = item.totals.total;

			return parseFloat(priceStr);
		})?.reduce((prev, next) => prev + next, 0);

		return total;
	};

	const handleUpdateQuantity = async (item_key, quantity) => {
		const product = products.find(product => product.item_key == item_key);

		if(product.quantity.max_purchase+1 == quantity) {
			setTimeout(() => {
				setProduct('');
				setWarning(false);
			}, 1000);
			setProduct(product.name);
			setWarning(true);
			return;
		}

		setWarning(false);
		if(quantity <= 0) {
			await dispatch(removeProductFromCart(item_key, setLoading));
		}  else {
			await dispatch(updateProductQuantity(quantity, item_key, setLoading));
		}
	};

	const handleRemoveProduct = async (item_key) => {
		await dispatch(removeProductFromCart(item_key, setLoading));
	};

	const handleToggleCart = () => {
		dispatch(toggleOpenCart());
	};

	return (
		<>
			<div className={`bg-black fixed top-0 left-0 h-full w-full ${cartOpen ? 'bg-opacity-60' : 'bg-opacity-0 select-none pointer-events-none'}`} style={{ transition: 'ease-in-out .5s', zIndex: 20 }} onClick={() => handleToggleCart()}></div>
			<OutsideClickHandler onOutsideClick={() => 1}>
				<div className={`cart-menu fixed top-0 overflow-auto bottom-0 w-3/5 bg-white -md:z-40 min-h-screen pt-20 -md:pt-0 px-40 -xl:px-20 -lg:px-10 -md:px-0 -md:w-80 menu-closed ${cartOpen ? 'menu-open' : ''}`} style={{ boxShadow: '0px 5px 20px #00000029' }}>
					{loading && <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 text-white flex-cc text-lg">Loading...</div>}
					{warning && <p className='absolute z-50 top-0 left-0 w-full h-full bg-black bg-opacity-70 text-red-500 font-bold flex-cc text-lg'>Maximum stock of {product} has been reached</p>}
					{qty === 0 ? (
						<>
							<div className="-md:h-20 w-full border-b border-medium-gray md:mt-20 flex-ec">
								<div className="md:hidden px-6">
									<MdClose className="text-pink text-3xl" onClick={() => handleToggleCart()} />
								</div>
							</div>
							<div className="-md:px-6 mt-7">
								<p className="font-light text-xl">Cart empty</p>
							</div>
						</>
					) : (
						<>
							<div className="border-t border-b py-10 mt-20 -md:border-0 -lg:border-t-0 -lg:border-medium-gray -lg:pt-0 -lg:mt-0">
								<div className="-lg:h-20 -lg:flex-sc -lg:border-b -lg:border-medium-gray -lg:px-6">
									<h2 className="font-secondary text-3xl -md:text-xl -md:font-semibold flex-bc w-full">order summary <MdClose className="text-pink text-3xl lg:hidden cursor-pointer" onClick={() => handleToggleCart()} /></h2>
								</div>
								{/* <h3 className="font-light text-xl mt-7 -md:hidden">Order summary</h3> */}
								<ul className="scrollable-container mt-7 pr-6 -md:mx-6 -md:border-b border-black -md:px-6 overflow-y-auto">
									{products?.map((item, index) => (
										<li className="relative flex mb-6 -md:mb-8" key={index}>
											<div className="w-28 h-28 -md:w-20 -md:h-20" style={{ minWidth: '5rem', minHeight: '5rem' }}>
												<img src={item?.featured_image} alt="preview" className="w-full h-full object-cover" />
											</div>
											<div className="flex -lg:flex-col flex-1">
												<div className="text-lg ml-4 flex-1">
													<div className="font-semibold w-1/2 -md:text-sm -lg:w-full -md:font-secondary">{parse(item.name || '')}</div>
													<div className="font-light mt-2">{item.category}</div>
												</div>
												<div className='flex-cc flex h-[min-content] -lg:justify-start -lg:ml-4 mb-2 sm:-ml-8 sm:mr-4'>
													<div className="text-xl font-light total -lg:text-base mr-2 leading-tight">x{item.quantity.value}</div>
													<div className="border-2 border-pink rounded font-light text-sm cursor-pointer hover:text-primary mr-1" onClick={() => handleUpdateQuantity(item.item_key, item.quantity.value-1)}><IoRemove className="text-lg -lg:text-base" /></div>
													<div className="border-2 border-pink rounded font-light text-sm cursor-pointer hover:text-primary" onClick={() => handleUpdateQuantity(item.item_key, item.quantity.value+1)}><IoAdd className="text-lg -lg:text-base" /></div>
												</div>
												<div className="text-xl w-1/6 flex sm:flex-col items-end -lg:items-center ml-2 -lg:ml-5">
													<div className="font-semibold -md:font-normal -md:text-base -md:leading-tight">£{item.totals.total.toFixed(2)}</div>
													<div className="font-light text-sm cursor-pointer hover:text-primary -sm:ml-4" style={{ color: '#606060' }} onClick={() => handleRemoveProduct(item.item_key)}><span className="-sm:hidden">Remove</span><IoTrashBin className="sm:hidden text-xl" /></div>
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
							{coupons.length > 0 &&
									<>
										{coupons.map((coupon,index)=>(
											<div key={index} className="font-semibold flex-bc text-xl mt-7 -md:mx-6 -md:mt-0">
												<div>{coupon.label}</div>
												<div>{coupon.saving_html}</div>
											</div>
										))}
									</>
							}
							<div className="font-semibold flex-bc text-xl mt-7 -md:mx-6 -md:mt-0">
								<div>Total (excl. shipping)</div>
								<div>£{getTotalPrice(products).toFixed(2)}</div>
							</div>
							<div className="flex justify-end -md:justify-center">
								<Link href={process.env.NEXT_PUBLIC_BASE_URL + '/checkout?cart_key=' + key} className="bg-pink text-white py-3 rounded-full mt-9 lg:text-xl -lg:w-44 w-60 flex-cc">Buy now</Link>
							</div>
							<div className="flex justify-end -md:justify-center">
								<p className="py-3 -lg:w-44 w-60 font-medium text-xl cursor-pointer text-center block whitespace-nowrap mb-20 leading-4" onClick={() => handleToggleCart()}><span className="block py-3">or </span> Continue shopping</p>
							</div>
						</>
					)}
					<style
						dangerouslySetInnerHTML={{
							__html: `
							.cart-menu{
								z-index:30;
							}

							.menu-closed {
								right: -100%;
								transition: ease-in-out .5s;
							}

							.menu-open{
								right: 0% !important;
							}

							.scrollable-container{
								overflow-y:auto;
								max-height:400px;
							}

							.scrollable-container::-webkit-scrollbar {
								// display:none;
							}

							@media(max-width:1439px){
								.scrollable-container{
									overflow-y:auto;
									max-height:300px;
								}
							}

							@media(max-width:639px){
								.scrollable-container{
									overflow-y:auto;
									max-height:400px;
								}
							}

							@media(min-width:1024px){
								.total{
									flex:.2;
								}
								.cart-menu{
									z-index:20;
								}
							}
							@media(max-width:639px){
								.cart-menu{
									z-index:40;
								}
							}
						`,
						}}
					/>
				</div>
			</OutsideClickHandler>
		</>
	);
};

export default SideCart;
