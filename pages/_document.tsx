import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<script async src="https://www.googletagmanager.com/gtag/js?id=UA-190419482-1"></script>
					<script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=bakedbysteph"></script>
          <script
              dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-190419482-1');
                  `,
              }}
          />
          <script
              dangerouslySetInnerHTML={{
                  __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '1596282480723378');
                  fbq('track', 'PageView');
                  `,
              }}
          />
				</Head>
				<body>
					<Main />
					<NextScript />
					<div id="modal-root"></div>
					<script async type="text/javascript" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=UXCGDn"></script>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
