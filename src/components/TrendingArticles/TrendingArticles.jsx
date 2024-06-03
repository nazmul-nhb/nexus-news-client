// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, EffectCreative } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const TrendingArticles = () => {
    const axiosPublic = useAxiosPublic();

    const { data: tArticles=[] } = useQuery({
        queryKey: ['tArticles'],
        queryFn: async () => {
            const res = await axiosPublic('/articles?sort=view_descending')
            return res.data;
        }
    });

    console.log(tArticles);

    return (
        <div>
            <Swiper
                autoplay={{
                    delay: 4000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
                grabCursor={true}
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
                modules={[Autoplay, EffectCreative]}
                className="mySwiper"
            >
                {
                    tArticles?.map(article => <SwiperSlide key={article._id}>
                        <div>
                            <img src={article.full_image} className='w-full' alt={article.headline} />
                        </div>
                        <h3>{article.headline}</h3>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default TrendingArticles;