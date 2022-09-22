import React, { useEffect } from 'react';
import useClearance from '@core/hooks/useClearance';
import { useLayout } from '@core/contexts';
import AlertHandler from '@components/_shared/AlertHandler';
import SEOTags from '@components/_shared/SEOTags';
import Navbar from '@components/navbar';
import Footer from '@components/Footer';
import Popup from '@components/_slices/Popup';
import CookiePopup from '@components/_slices/CookiePopup';
import Cookies from 'js-cookie';
import { useCart } from '@core/redux/reducers/cart';
import { loadCartByKey } from '@core/redux/actions/cart';
import { useDispatch } from 'react-redux';
import { customAlphabet } from 'nanoid';
import { loadFooterMenus } from '@core/redux/actions/layout';
import pipingBag from '../../public/lottie/piping-bag.json';

interface Props {
	children: React.ReactNode
	title?: string
	description?: string
	image?: any
	className?: string
	style?: React.CSSProperties
	hideFooter?: boolean
	navbar: any
	footer: any
	announcement: any
	popup: any
	cookiePopup: any
	content: any
}

const MainLayout = ({ children, title, description, image, className, style, hideFooter, navbar, footer, announcement, popup, cookiePopup, content }: Props): JSX.Element => {
	const { alert_value } = useLayout();
	const [clearance, upperRef, lowerRef] = useClearance();
	const key = Cookies.get('baked_cart_key');
	const { cart_loaded, cartOpen } = useCart();
	const dispatch = useDispatch();

	const generateCartKey = () => {
		const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
		const nanoid = customAlphabet(alphabet, 32);

		return nanoid();
	};

	useEffect(() => {
		if(cartOpen){
			document.body.style.position = 'fixed';
			document.body.style.width = '100%';
		}else{
			document.body.style.position = 'relative';
			document.body.style.width = '100%';
		}
	}, [cartOpen]);

	useEffect(() => {
		if (!key) {
			const baked_cart_key = generateCartKey();
			Cookies.set('baked_cart_key', baked_cart_key, { expires: 365 });
		} else {
			(async () => {
				if (!cart_loaded && key) {
					dispatch(loadCartByKey(key));
				}
			})();
		}
	}, [key]);

	useEffect(() => {
		if (footer) {
			dispatch(loadFooterMenus(footer));
		}
	}, [footer]);

	return (
		<>
			<SEOTags title={title} description={description} image={image} content={content} />
			<header ref={upperRef}>
				<Navbar data={navbar} announcement={announcement}/>
			</header>

			<main style={{ minHeight: clearance, ...style }} className={className}>
				{children}
				{popup && <Popup slice={popup} />}
				{cookiePopup && <CookiePopup slice={cookiePopup} />}
			</main>

			<footer ref={lowerRef}>
				{!hideFooter && <Footer lottie={pipingBag} />}
			</footer>

			{alert_value && <AlertHandler />}

		</>
	);
};

export default MainLayout;
