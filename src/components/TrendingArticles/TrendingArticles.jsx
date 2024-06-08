import ArticleLoading from '../LoadingSpinners/ArticleLoading';
import useGetArticles from '../../hooks/useGetArticles';
import useHandleArticleDetails from '../../hooks/useHandleArticleDetails';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';

const TrendingArticles = () => {
    const handleGoToArticleDetails = useHandleArticleDetails();
    const { isLoading, data: trendingArticles } = useGetArticles(['trendingArticles'], 'sort=view_descending&size=6');

    const pagination = {
        clickable: true,
    };

    // console.log(trendingArticles);

    if (isLoading) {
        return <ArticleLoading />
    }

    return (
        <div className='w-2/3'>
            <Swiper
                style={{
                    '--swiper-navigation-color': 'orange',
                    '--swiper-pagination-color': 'orange',
                    '--swiper-pagination-bullet-size': '16px',
                    '--swiper-pagination-bullet-width': '16px',
                    '--swiper-pagination-bullet-height': '16px'
                }}
                autoplay={{
                    delay: 4000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
                grabCursor={true}
                loop={true}
                pagination={pagination}
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
                {
                    trendingArticles?.map(article => <SwiperSlide key={article._id}>
                        <button onClick={() => handleGoToArticleDetails(article._id)}>
                            <div>
                                <img src={article.full_image} className='w-full' alt={article.headline} />
                            </div>
                            <h3>{article.headline}</h3>
                            <h3>View: {article.view_count}</h3>
                        </button>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default TrendingArticles;