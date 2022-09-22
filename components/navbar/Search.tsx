import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Link from '@components/_shared/Link';
import OutsideClickHandler from 'react-outside-click-handler';


interface Props {
	handleSearchOpen: any
}

const Search = ({handleSearchOpen}: Props) => {
	const [keyword, setKeyword] = useState('');
	const [searched, setSearched] = useState(false);
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState([]);
	const inputRef = useRef(null);

	const searchHandler = async () => {
		if (keyword !== '') {
			setLoading(true);

			const res = await axios.get(`/api/search?q=${keyword}`);
			setResults(res.data.results);

			setSearched(true);
			setLoading(false);
		}
	};

	const handleClose = () => {
		handleSearchOpen(false);
	};

	useEffect(() => {
		if(inputRef){
			inputRef.current.focus();
		}
	}, []);

	return (
		<OutsideClickHandler onOutsideClick={handleClose}>
			<div className="w-full bg-white top-20 pt-20 pb-20 fixed left-0 z-20" style={{ boxShadow: '0 0 20px #0005' }}>
				<div className="max-w-4xl lg:w-full w-10/12 m-auto">
					<div className="w-full relative flex-cc">
						<input type="text" className="w-full border-pink border-b text-xl py-4 text-black font-light" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? searchHandler(): ''} ref={inputRef}/>
						<button className="text-pink absolute right-0 text-xl font-light" onClick={() => searchHandler()}>Go</button>
					</div>
					<div className="w-full mt-16">
						{keyword === '' && results.length === 0 && <p className="mt-2">Enter a keyword</p>}
						{results.length > 0 ? (
							<>
								<h2 className="font-secondary text-xl mb-6">SEARCH RESULTS</h2>
								<ul className="h-48 overflow-y-auto">
									{results?.map((item, index) => (
										<Link key={index} onClick={handleClose} href={'/shop/' + item.slug}><li className="mb-2 hover:text-pink">{item.name}</li></Link>
									))}
								</ul>
							</>
						) : (
							<>
								{searched ? <p className="mt-2">Not found</p> : ''}
							</>
						)}
						{loading && <p className="mt-2">Loading...</p>}
					</div>
				</div>
				<style
					dangerouslySetInnerHTML={{
						__html: `
                    input::placeholder{
                        color:black;
                    }
                    `,
					}}
				/>
			</div>
		</OutsideClickHandler>

	);
};

export default Search;
