import React from 'react';
import Link from '@components/_shared/Link';
import { format } from 'date-fns';

interface BlogsProps {
    data: any,
    featuredStory: any
}

const Blogs = ({ data, featuredStory }: BlogsProps): JSX.Element => {
	if (data) return (
		<>
			<section className="w-full py-12">
				<div className="container -xl:px-5 flex-cc flex-col w-full">
					<ul className="grid grid-cols-4 -lg:grid-cols-2 w-full gap-4 text-center">
						{ data.map((item, index) => {
              if (item && item.uid != featuredStory.uid) {
                return (
                  <Link href={ item.route } key={index}>
                    <li key={index} className="mb-6">
                      <div className="relative" style={{paddingBottom:'100%'}}>
                        {  item.thumbnail?.url ? (
                          <img src={ item.thumbnail.url } alt={item.thumbnail.alt} className="w-full h-full object-cover absolute"/>
                        ) : (
                          <div className="bg-gray w-full h-full absolute"></div>
                        ) }
                      </div>
                      <div className="mt-6 -lg:mt-2 lg:text-xl">
                        <h3 className="font-bold">{ item.html_title }</h3>
                        <h4 className="font-light">{ format(new Date(item.date_created), 'dd/MM/yy') }</h4>
                      </div>
                    </li>
                  </Link>
                );
              }
						}) }
					</ul>
				</div>
			</section>
		</>
	); else return (<></>)
};

export default Blogs;
