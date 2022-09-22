import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useRouter } from 'next/router';

const Rating = (): JSX.Element => {
	const [userRating, setUserRating] = useState(0);
	const router = useRouter();
	const slug = router.query.customs;

	const rateRecipe = (slug, rating) => {
		if (slug && rating) {
			const ratingDataStringified = localStorage.getItem('recipe_rating');

			if (ratingDataStringified) {
				const ratingDataJSON = JSON.parse(ratingDataStringified);
				const find = ratingDataJSON.find(obj => obj.slug === slug);

				if (find) {
					const filteredRatingData = ratingDataJSON.filter(obj => obj.slug !== slug);

					const newData = {
						slug,
						rating
					};

					const newRatingData = [...filteredRatingData, newData];
					const stringifiedData = JSON.stringify(newRatingData);

					localStorage.setItem('recipe_rating', stringifiedData);
					setUserRating(rating);

					// save user rating to wordpress
					// axios.post('/api/rate-post', { id: post.id, rating, number_of_votes: post.acf.number_of_votes, current_rating: post.acf.overall_rating });
				} else {
					const data = {
						slug,
						rating
					};

					const newRatingData = [...ratingDataJSON, data];
					const stringifiedData = JSON.stringify(newRatingData);

					localStorage.setItem('recipe_rating', stringifiedData);
					setUserRating(rating);
				}
			} else {
				const data = [{
					slug,
					rating
				}];

				const stringifiedData = JSON.stringify(data);

				localStorage.setItem('recipe_rating', stringifiedData);
				setUserRating(rating);
			}

		}
	};

	useEffect(() => {
		const ratingDataStringified = localStorage.getItem('recipe_rating');
		if (ratingDataStringified) {
			const ratingDataJSON = JSON.parse(ratingDataStringified);
			const find = ratingDataJSON.find(obj => obj.slug === slug);

			if (find) {
				setUserRating(find.rating);
			}
		}
	}, []);

	return (
		<>
			<section className="lg:px-4" >
				<div className="w-full flex-cc flex-col my-9 py-5 bg-light-yellow">
					<h3 className=" font-secondary" >rate this recipe</h3>
					<div className="flex mt-2" >
						{[...Array(5)].map((item, index) => {
							return (
								<>
									<AiFillStar className={`mr-2 cursor-pointer ${userRating >= index + 1 ? 'text-pink' : 'text-black'}`} key={index} onClick={() => rateRecipe(slug, index + 1)} />
								</>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
};

export default Rating;