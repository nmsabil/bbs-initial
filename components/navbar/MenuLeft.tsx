import Link from '@components/_shared/Link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaChevronRight, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

interface Props {
	isOpen: boolean
	toggleMenu(): void
	data: any[]
}

const MenuLeft = ({ isOpen, toggleMenu, data }: Props): JSX.Element => {
	const [openedMenu, setOpenedMenu] = useState(0);
	const router = useRouter();
	data = data.filter(item => !item.desktop_only);

	return (
		<div className={['relative flex-sc col h-full max-w-xl overflow-hidden transition-all duration-300 bg-white pointer-events-auto xl:hidden overflow-y-auto', isOpen ? 'w-full' : 'w-0'].join(' ')}>
			<IoMdClose className="absolute top-0 text-4xl right-0 m-4 z-50 cursor-pointer text-pink" onClick={() => toggleMenu()} />
			<div className={['relative flex-bc col w-5/6 h-full max-w-sm pt-20 pb-8 transition-all duration-300', isOpen ? 'opacity-1' : 'opacity-0'].join(' ')}>
				<div className="flex-cs col w-full mt-7">
					{data?.map((item, i) => (
						item?.children?.length > 0 ? (
							<LinkMapper toggleMenu={toggleMenu} label={item.label} submenu={[item.children[0], ...item.children[1].children]} key={i} initOpen={i === 0} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} index={i}/>
						) : (item?.children_own?.length > 0 ? (
							<LinkMapper toggleMenu={toggleMenu} label={item.label} submenu={item.children_own} key={i} initOpen={i === 0} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} index={i}/>
						) : (item.url === router.asPath ?
							(<div className="text-3xl font-bold uppercase font-secondary hover:text-pink hover:cursor-pointer" onClick={() => toggleMenu()} key={i}>{item.label}</div>)
							:
							(<Link href={item.url || '#'} disabled={!item.url} className="text-3xl font-bold uppercase font-secondary hover:text-pink" key={i}>{item.label}</Link>)
						)
						)
					))}
				</div>
				<div style={{ height: 40 }} className="flex-sc w-full gap-2 mt-8 pb-8">
					{data_contact.map((item, i) => (
						<Link href={item.link} key={i}>
							<div className="flex-cc w-8 h-8 transition border rounded-full hover:bg-black hover:text-white">
								<item.icon />
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

const LinkMapper = ({ label, submenu, openedMenu, setOpenedMenu, index, toggleMenu }: any) => {
	const router = useRouter();
	return (
		<div className="flex-cs col w-full">
			<button className="text-3xl font-bold uppercase font-secondary hover:text-pink" onClick={() => setOpenedMenu(index)}>{label}</button>
			<div className={['w-full overflow-hidden transition-all', openedMenu === index ? 'opacity-1 my-3' : 'h-0 opacity-0'].join(' ')}>
				{submenu?.map((item, i) => (
					<div key={i}>
						<hr className="w-full h-px bg-black" />
						<div onClick={()=>{
							toggleMenu();
							if(item.url !== router.asPath)
								router.push(item.url);
						}} className="flex-bc w-full py-2 group cursor-pointer">
							<p className="text-sm font-secondary group-hover:font-bold group-hover:text-pink">{item.label}</p>
							<FaChevronRight className="transition-all text-pink group-hover:mr-2" />
						</div>
					</div>
				))}
				<hr className="w-full h-px bg-black" />
			</div>
		</div>
	);
};

export default MenuLeft;


const data_contact = [
	{
		icon: FaFacebookF,
		link: 'https://www.facebook.com/bakedbysteph1/',
	},
	{
		icon: FaInstagram,
		link: 'https://www.instagram.com/baked.by.steph/',
	},
	{
		icon: FaTwitter,
		link: 'https://twitter.com/Baked_by_Steph?lang=en',
	},
	{
		icon: FaYoutube,
		link: 'https://www.youtube.com/channel/UCRBLJpQNbRLC_7_eLbJUx3w',
	},

];
