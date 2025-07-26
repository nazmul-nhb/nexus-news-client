import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useGetArticles from '../../hooks/useGetArticles';
import useHandleArticleDetails from '../../hooks/useHandleArticleDetails';
import SectionHeader from '../SectionHeader/SectionHeader';

import ReactPlaceholder from 'react-placeholder';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TrendingArticles = () => {
	const handleGoToArticleDetails = useHandleArticleDetails();
	const { isLoading, data: trendingArticles } = useGetArticles(
		['trendingArticles'],
		'sort=view_descending&size=6'
	);

	return (
		<div className="w-full lg:w-2/3">
			<SectionHeader heading={'Trending Articles'} />
			<ReactPlaceholder
				showLoadingAnimation
				widths={['100%']}
				type="rect"
				color="#6897bb"
				ready={!isLoading}
			>
				<Swiper
					style={{
						'--swiper-navigation-color': 'transparent',
						'--swiper-pagination-color': '#fff',
						'--swiper-pagination-bullet-size': '16px',
						'--swiper-pagination-bullet-width': '16px',
						'--swiper-pagination-bullet-height': '16px',
					}}
					autoplay={{
						delay: 4000,
						pauseOnMouseEnter: true,
						disableOnInteraction: false,
					}}
					grabCursor={true}
					loop={true}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					effect={'creative'}
					creativeEffect={{
						prev: {
							shadow: true,
							translate: [0, 0, -400],
						},
						next: {
							translate: ['100%', 0, 0],
						},
					}}
					modules={[Autoplay, Pagination, Navigation, EffectCreative]}
					className="mySwiper"
				>
					{trendingArticles?.map((article) => (
						<SwiperSlide key={article._id}>
							<div className="flex relative">
								<img
									src={article.full_image}
									className="w-full aspect-[1.8/1]"
									alt={article.headline}
								/>
								<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-center w-full text-white bg-[#8692c971] h-full py-4 font-kreonSerif flex flex-col gap-4 items-center justify-around">
									<h3
										className="text-white hover:text-blue-600 cursor-pointer max-[430px]:text-base text-2xl md:text-3xl lg:text-5xl transition-all duration-500"
										onClick={() =>
											handleGoToArticleDetails(article._id)
										}
									>
										{article.headline}
									</h3>
									<h3 className="flex items-center gap-1 text-xl font-bold">
										<MdOutlineRemoveRedEye />
										{article.view_count}
									</h3>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</ReactPlaceholder>
		</div>
	);
};

export default TrendingArticles;
