import React from 'react';
import parse from 'html-react-parser';
import { format } from 'date-fns';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import NewsCarousel from './NewsCarousel';
import ShareButton from './ShareButton';

interface NewsContentProps {
	content: any
	title: string
	date: string
	carousel: any
}

const NewsContent = ({ content, title, date, carousel }: NewsContentProps): JSX.Element => {
	return (
		<>
			<section className="content w-full max-w-5xl pt-16 relative">
				<div className="flex items-start">
					<ShareButton title={title} variant="sticky" />
					<div className="-sm:pr-8">
						<header className="md:text-center text-left">
							<h1>{title}</h1>
							<h5>{format(new Date(date), 'd MMMM yyyy')}</h5>
						</header>
						{parse(content || '')}
						<hr className="md:mt-20 mt-10" />
						<ShareButton variant="normal" title={title} />
					</div>
				</div>
			</section>
			<div className="max-w-5xl w-full md:pl-10 mt-16 pb-16">
				<div className="flex-bc md:px-0 px-5">
					<span className="flex items-center text-medium-gray hover:text-pink"><BsChevronLeft className="mr-2" />Previous</span>
					<h3 className="md:text-2xl text-xl text-center font-secondary"><span className="text-pink">MORE</span><br/>INTERVIEWS</h3>
					<span className="flex items-center text-medium-gray hover:text-pink">Next<BsChevronRight className="ml-2" /></span>
				</div>
				<NewsCarousel carousel={carousel} />
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
                    .content header{
                        max-width:390px;
                        margin-left:auto;
                        margin-right:auto;
                        margin-bottom:120px;
                    }

                    .content header h1{
                        font-size:34px;
                        font-family: TJ Evolette A Basic;
                    }

                    .content header h5{
                        font-size:22px;
                        font-weight:300;
                        margin-top:21px;
                    }
                    section.content p{
                        margin-bottom:16px;
                        font-size:22px;
                        max-width:51rem;
                        margin-left:auto;
                        margin-right:auto;
                        font-weight:300;
                    }

                    .content h2{
                        font-size:34px;
                        font-weight:medium;
                        font-family: TJ Evolette A Basic;
                        text-align:center;
                        margin-top:56px;
												margin-bottom:36px;
                    }
                    .content h3{
                        margin-bottom:36px;
                        font-size:34px;
                        font-weight:medium;
                        font-family: TJ Evolette A Basic;
                        text-align:center;
                    }

										.has-pale-pink-color {
												color:#FF5897;
										}

                    figure{
                        position:relative;
                        margin-bottom:18px;
                        margin-top:54px;
                    }

                    figure img{
                        background:#F5F5F5;
                        margin-bottom:16px;
                    }

                    figcaption{
                        position:relative;
                        text-align:left;
                        color: #FF5897;
                        max-width: 100%;
                        font-size: 24px;
                        font-weight: 300;
                        padding-bottom:16px;
                    }
                    `,
				}}
			/>
		</>
	);
};

export default NewsContent;
