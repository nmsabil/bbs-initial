import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/dist/shared/lib/router/router';
import ProgressBar from 'nextjs-progressbar';
import ContextProvider from '@core/contexts';
import { Provider } from 'react-redux';
import store from '@core/redux/store';
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../prismicio'

import '@core/styles/tailwind.css';
import '@core/styles/typefaces.css';
import '@core/styles/extras.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<>
			<Head>
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.jfif"/>
				<meta name="theme-color" content="#000000" />
			</Head>
			<ProgressBar
				color="#FF5897"
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				options={{showSpinner: false}}
			/>
			<Provider store={store}>
				<ContextProvider>
						<Component {...pageProps} />
				</ContextProvider>
			</Provider>
		</>
	);
};

export default App;
