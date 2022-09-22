import React, { useEffect, useRef, useState } from 'react';
import Link from '@components/_shared/Link';
import MenuLarge from './MenuLarge';
import MenuLeft from './MenuLeft';
import { toggleOpenCart, useCart } from '@core/redux/reducers/cart';
import { VscChromeClose } from 'react-icons/vsc';
import Search from './Search';
import { useDispatch } from 'react-redux';
import SideCart from './SideCart';
import { useLayouts } from '@core/redux/reducers/layout';
import { toggleAnnouncementBar } from '@core/redux/actions/layout';
import { IoMdClose } from 'react-icons/io';
import Cookies from 'js-cookie';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '@core/utils/link-resolver';

interface NavbarProps {
	data: any
	announcement: any
}

const Navbar = ({ data, announcement }: NavbarProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const { announcementOpen } = useLayouts();
	const { qty, cartOpen } = useCart();
	const dispatch = useDispatch();

	const handleToggleCart = () => {
		dispatch(toggleOpenCart());
	};

	const handleToggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const NavbarRef = useRef(null);

	useEffect(() => {
		if(isOpen){
			document.body.style.position = 'fixed';
			document.body.style.width = '100%';
		}else{
			document.body.style.position = 'relative';
			document.body.style.width = '100%';
		}
	}, [isOpen]);

	useEffect(() => {

		let lastScrollTop = window.pageYOffset;
		const navbar = NavbarRef.current;
		const navbarPosition = navbar.offsetTop;

		const handler = ()=>{
			const pagePosition = window.pageYOffset;


			if((pagePosition-navbarPosition > 50) && lastScrollTop > pagePosition){
				navbar.classList.remove('translate-y-0');
				navbar.classList.add('translate-y-[80px]');
			}else {
				navbar.classList.remove('translate-y-[80px]');
				navbar.classList.add('translate-y-0');
			}

			lastScrollTop = pagePosition;
		};

		window.addEventListener('scroll', handler);

		return ()=>{
			window.removeEventListener('scroll', handler);
		};
	}, []);

	const closeAnnouncement = async () => {
		Cookies.set('announcement', 'hide', { expires: 0.5 });
		await dispatch(toggleAnnouncementBar(false));
	};

	useEffect(() => {
		const announcement = Cookies.get('announcement');
		if(announcement === 'hide'){
			dispatch(toggleAnnouncementBar(false));
		}else{
			dispatch(toggleAnnouncementBar(true));
		}
	}, []);

	return (
		<>
			<nav className="relative w-full pt-20 z-20" style={{ zIndex: cartOpen ? 70 : 22 }}>
				<div className="fixed top-0 z-30 flex-sc flex-col pointer-events-none full">
					{announcement.primary.text && announcement.primary.text !== '' && (
						<>
							{ announcementOpen && (
								<div className="announcement font-medium text-center -md:text-left w-full h-12 flex-cc pointer-events-auto bg-light-pink -md:h-16 pl-4 pr-12 md:pl-4 md:pr-4 -md:text-xs relative rich-text">
									{/* announcement.primary.text && RichText.render(announcement.primary.text, linkResolver)*/}
									{ announcement.primary.text && <RichText render={announcement.primary.text} linkResolver={linkResolver} />}
									<div className="h-full w-12 flex-cc absolute right-0 top-0 cursor-pointer" style={{ background: '#D5C8CF' }} onClick={() => closeAnnouncement()}><IoMdClose className="pointer-events-none select-none"/></div>
								</div>
							)}
						</>
					)}
					<div className="relative flex-bc w-full h-20 px-8 bg-white pointer-events-auto -lg:px-5" style={{ boxShadow: '0px 5px 20px #00000029' }}>
						<button className="flex-cc" onClick={() => handleToggleMenu()}>
							<img src="/icons/menu.svg" alt="menu" className="xl:hidden" />
						</button>
						<div className="absolute inset-0 flex-cc w-full pointer-events-none">
							<Link href="/" className="pointer-events-auto">
								<img src="/icons/logo.svg" alt="logo" />
							</Link>
						</div>
						<div className="flex-cc">
							{!cartOpen ? (
								<>
									{searchOpen ? <VscChromeClose className="text-2xl cursor-pointer" onClick={() => setSearchOpen(false)} /> : <img src="/icons/search.svg" alt="search" className="cursor-pointer" onClick={() => setSearchOpen(true)} />}
									<div className="ml-4 flex-cc cursor-pointer" onClick={() => handleToggleCart()}>
										<img src="/icons/cart.svg" alt="cart" />
										<div className="absolute w-6 h-6 flex-cc text-xs text-pink" style={{ bottom: 23 }}>{qty}</div>
									</div>
								</>
							) : (
								<VscChromeClose className="text-2xl cursor-pointer" onClick={() => handleToggleCart()} />
							)}
						</div>
					</div>
				</div>

				<div className={`fixed top-0 z-50 flex-sc ${isOpen ? '' : 'pointer-events-none'}  full`}>
					<div className='full absolute z-0' onClick={()=>handleToggleMenu()} ></div>
					<MenuLeft data={data} isOpen={isOpen} toggleMenu={handleToggleMenu} />
				</div>

				<div className="w-full -xl:hidden">
					<div className={`w-full ${announcementOpen ? 'mt-12' : ''}`}>
						<MenuLarge data={data} />
					</div>
					<div ref={NavbarRef} className={`w-full fixed ${announcementOpen ? 'top-12' : 'top-0'} z-20 transform duration-500 translate-y-0 transition-transform`} >
						<MenuLarge data={data} />
					</div>
				</div>

				<div className="xl:hidden">
					{ cartOpen && <SideCart cartOpen={cartOpen}/>}
				</div>

				{searchOpen && <Search handleSearchOpen={setSearchOpen} />}
			</nav>
		</>
	);
};

export default Navbar;
