import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import './Publishers.css';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ArticleLoading from "../LoadingSpinners/ArticleLoading";

const animation = { duration: 30000, easing: (t) => t };

const carousel = (slider) => {
    const z = 300
    function rotate() {
        const deg = 360 * slider.track.details.progress
        slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`
    }
    slider.on("created", () => {
        const deg = 360 / slider.slides.length
        slider.slides.forEach((element, idx) => {
            element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`
        })
        rotate()
    })
    slider.on("detailsChanged", rotate)
}

const Publishers = () => {
    const axiosPublic = useAxiosPublic();

    const { isFetching, isError, error, data: sliderPublishers = [] } = useQuery({
        queryKey: ['sliderPublishers'],
        queryFn: async () => {
            const res = await axiosPublic('/publishers?size=7')
            return res.data;
        }
    });

    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            selector: ".carousel__cell",
            renderMode: "custom",
            mode: "free-snap",
            created(s) {
                s.moveToIdx(5, true, animation)
            },
            updated(s) {
                s.moveToIdx(s.track.details.abs + 5, true, animation)
            },
            animationEnded(s) {
                s.moveToIdx(s.track.details.abs + 5, true, animation)
            },
        },
        [carousel]
    );

    if(isFetching){
        return <ArticleLoading/>
    }

    return (
        <div className="wrapper">
            <div className="scene">
                <div className="carousel keen-slider" ref={sliderRef}>
                    {
                        sliderPublishers?.map(publisher => <div key={publisher._id}
                            className="carousel__cell flex flex-col items-center justify-center gap-3 bg-nexus-secondary p-3">
                            <img src={publisher.publisher_logo} alt={publisher.publisher} />
                            <h3 className="text-center font-kreonSerif text-lg text-white">{publisher.publisher}</h3>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Publishers;