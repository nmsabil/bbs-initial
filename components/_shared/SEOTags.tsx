import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';

const DEFAULT = {
	sitename: 'Baked by Steph',
	domain: 'http://bakedbysteph.vercel.app/',
	description: 'London based treat creators. Whether you\'re looking for cakes, cookies or macarons we\'ve got you covered.',
	image: 'https://images.squarespace-cdn.com/content/5c718c7429f2cc28940bf981/1551013773057-1K2C3ZAMI8BZCYKF1X9P/BBS-logo-circular.png?format=1500w&content-type=image%2Fpng',
};


const SEOTags = (props: any) => {
	const data = {...DEFAULT, ...props};

	const router = useRouter();

	const supertitle = data.title ? `${data.title} — ${data.sitename} ` : (data.content?.html_title ? data.content.html_title : data.sitename);

	return (
		<Head>
			<title>{supertitle}</title>

			<meta name="robots" content="follow, index" />
			<meta name="description" content={data.description || DEFAULT.description} />
			<meta property="og:url" content={router.asPath} />
			<link rel="canonical" href={router.asPath} />

			<meta property="og:type" content="website" />
			<meta property="og:title" content={supertitle} />
			<meta property="og:site_name" content={supertitle} />
			<meta property="og:description" content={data.description || DEFAULT.description} />
			<meta property="og:image" name="image" content={data.image || data.content?.thumbnail?.url || DEFAULT.image} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={supertitle} />
			<meta name="twitter:title" content={supertitle} />
			<meta name="twitter:description" content={data.description || DEFAULT.description} />
			<meta name="twitter:image" content={data.image || data.content?.thumbnail?.url || DEFAULT.image} />
		</Head>
	);
};

export default SEOTags;
