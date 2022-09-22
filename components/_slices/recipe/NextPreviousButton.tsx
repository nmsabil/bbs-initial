import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Link from '@components/_shared/Link';


const NextPreviousButton = (): JSX.Element => {
	const router = useRouter();
	const slug = router.query.customs;
	const [prevPost, setPrevPost] = useState();
	const [nextPost, setNextPost] = useState();
	useEffect(() => {
		(async () => {
			const res = await axios.get('/api/post?slug=' + slug).then(res => res.data).catch(err => console.log(err));
			setPrevPost(res.data.prev_post);
			setNextPost(res.data.next_post);
		})();
	}, []);

	return (
		<>
			<section className="grid grid-cols-3 gap-4" >
				<div className="flex-sc">
					{prevPost &&
						<Link href={`/recipe/${prevPost}`}>
							<div className="flex-cc text-medium-gray">
								<HiOutlineChevronLeft className="text-3xl" />
								<span>Previous</span>
							</div>
						</Link>
					}
				</div>
				<div className="flex-cc" >
					<Link href={'/blog?category=recipes'}>
						<div className="w-min text-center font-secondary text-xl">
							<span className="text-pink" >more</span> recipes
						</div>
					</Link>
				</div>
				<div className="flex-ec">
					{nextPost &&
						<Link href={`/recipe/${nextPost}`} >
							<div className="flex-cc text-medium-gray">
								<span>Next</span>
								<HiOutlineChevronRight className="text-3xl" />
							</div>
						</Link>
					}
				</div>
			</section>
		</>
	);
};

export default NextPreviousButton;