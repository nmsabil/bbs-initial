import React, { useState } from 'react';
import Link from '@components/_shared/Link';
import OutsideClickHandler from 'react-outside-click-handler';
import SideCart from './SideCart';
import { useCart } from '@core/redux/reducers/cart';
import { useRouter } from 'next/router';
interface Props {
	data: any[]
}

const MenuLarge = ({ data }: Props): JSX.Element => {
	const [subMenu, setSubMenu] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const { cartOpen } = useCart();
	const router = useRouter();
	function showSubMenu(item : any, index: number) {
		setSubMenu(item.children);
		setSelectedIndex(index);
		setIsOpen(true);
	}
	function hideSubMenu() {
		setSubMenu(null);
		setSelectedIndex(null);
		setIsOpen(false);
	}

	function OnClick(item:any, index:number) {
		if (index !== selectedIndex) {
			showSubMenu(item, index);
		} else {
			hideSubMenu();
		}
	}
	return (
		<OutsideClickHandler onOutsideClick={() => { setSubMenu(null); setSelectedIndex(null); setIsOpen(false); }}>
			<div onMouseLeave={hideSubMenu} className={`h-20 w-full px-8 ${subMenu ? 'bg-white' : 'bg-light-pink'}`}>
				<ul className="flex-cc h-full font-secondary">
					{data?.map((item, index) => {
						if (!item.only_mobile) {
							if (item.children) {
								return <Link href={item.url === router.asPath ? '#' : item.url} key={index}><li onMouseEnter={()=>showSubMenu(item,index)} onClick={()=>OnClick(item, index)} className={`uppercase text-lg text-pink cursor-pointer ${index !== 0 ? 'ml-6' : ''} ${index === selectedIndex ? 'underline' : ''}`} key={index} >{item.label}</li></Link>;
							} else {
								return <Link href={item.url === router.asPath ? '#' : item.url} key={index}><li onMouseEnter={hideSubMenu} className={`uppercase text-lg text-pink ${index !== 0 ? 'ml-6' : ''}`}>{item.label}</li></Link>;
							}
						}
					})}
				</ul>
				{isOpen && (
					<div className="w-full pb-10 bg-white absolute right-0 left-0 z-10">
						<div className="container flex-bs gap-8 max-w-3xl">
							{subMenu?.map((item, index) => {
								if (item.children) {
									return (
										<div className="w-1/3 border-t border-black pt-4" key={index}>
											<div className="text-xl font-medium mb-6">{item.label}</div>
											<div className="flex flex-col">
												{item.children?.map((item, index) => (
													<div onClick={() => {
														setIsOpen(false);
														if(item.url !== router.asPath)
															router.push(item.url);
													}} key={index} className="mb-1 text-lg cursor-pointer">{item.label}</div>
												))}
											</div>
										</div>
									);
								} else {
									return (
										<div className="w-1/3 border-t border-black pt-4 cursor-pointer" key={index}>
											<div onClick={() => {
												setIsOpen(false);
												if(item.url !== router.asPath)
													router.push(item.url);
											}} className="text-xl font-medium">{item.label}</div>
										</div>
									);
								}
							})}
						</div>
					</div>
				)}
				<SideCart cartOpen={cartOpen} />
			</div>
		</OutsideClickHandler>
	);
};

export default MenuLarge;
