// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import { Link } from 'react-router-dom';
import ArticleLoading from '../LoadingSpinners/ArticleLoading';

const TrendingArticles = () => {
    const axiosPublic = useAxiosPublic();

    const pagination = {
        clickable: true,
    };

    const { isLoading, data: tArticles = [] } = useQuery({
        queryKey: ['tArticles'],
        queryFn: async () => {
            const res = await axiosPublic('/articles?sort=view_descending&size=6')
            return res.data;
        }
    });

    // console.log(tArticles);

    if(isLoading){
        return <ArticleLoading/>
    }

    return (
        <div>
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
                    tArticles?.map(article => <SwiperSlide key={article._id}>
                        <Link to={`/news/${article._id}`}>
                            <div>
                                <img src={article.full_image} className='w-full' alt={article.headline} />
                            </div>
                            <h3>{article.headline}</h3>
                            <h3>View: {article.view_count}</h3>
                        </Link>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default TrendingArticles;