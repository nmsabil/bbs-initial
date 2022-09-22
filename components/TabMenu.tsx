import React from 'react';
import parse from 'html-react-parser';
import { useState } from 'react';

interface ProductsShowcaseProps {
	data: any;
	column: number;
	withIcon?: boolean;
}

const TabMenu = ({ data, column, withIcon }: ProductsShowcaseProps): JSX.Element => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<>
			<section className="w-full pb-18 px-8">
				<div className="container flex-cc flex-col w-full">
					<ul className={`grid grid-cols-${column} gap-4 justify-between ${withIcon ? 'mt-20' : ''}`}>
						{data.map((item, index) => (
							<div className="relative" key={index}>
								{item.icon && (
									<div className="absolute h-32 -top-24">
										<img src={item.icon} alt="icon" className="h-full" />
									</div>
								)}
								<li className={`py-5 pl-4 pr-16 text-1.5xl font-secondary cursor-pointer h-full z-50 ${index === selectedIndex && 'text-pink'}`} style={{ backgroundColor: item.color, zIndex: 50 }} key={index} onClick={() => setSelectedIndex(index)}>{item.label}</li>
								<div className={`overlay absolute w-full ${index === selectedIndex && 'h-4'}`} style={{ backgroundColor: item.color }}></div>
							</div>
						))}
					</ul>
					{selectedIndex !== -1 && <div className="bg-light-pink py-14 mt-4 w-full flex-cc" style={{ backgroundColor: data[selectedIndex].color }}>
						<div className="content max-w-4xl w-3/6 rich-text">
							{
								typeof data[selectedIndex].content === 'string' ?
									parse(data[selectedIndex].content)
									:
									data[selectedIndex].content
							}
						</div>
					</div>}
				</div>
				<style
					dangerouslySetInnerHTML={{
						__html: `
                    .content h2{
                        margin-bottom:24px;
                        font-size:34px;
                        font-weight:medium;
                        font-family: TJ Evolette A Basic;
                    }
                    .content h2{
                        margin-top:64px;
                    }
                    .content h2:first-of-type{
                        margin-top:0px;
                    }
                    .content p{
                        margin-bottom:24px;
                        font-size:22px;
												font-weight: 300;
                    }
					.content h1{
						display: none;
					}
					.content figure{
						display:none;
					}
                    `,
					}}
				/>
			</section>
		</>
	);
};

export default TabMenu;
