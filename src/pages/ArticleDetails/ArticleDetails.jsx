import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SameCategoryArticles from "../../components/SameCategoryArticles/SameCategoryArticles";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { articleLoader } from "../../components/LoadingSpinners/Loaders";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import SectionHeader from "../../components/SectionHeader/SectionHeader";

const ArticleDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: article, refetch } = useQuery({
        enabled: !!id,
        queryKey: ['article', id],
        queryFn: async () => {
            const res = await axiosSecure(`/articles/${id}`)
            return res.data;
        }
    });

    // refetch if clicked on the similar id links
    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id, refetch]);

    if (isLoading) {
        return articleLoader;
    }

    const { _id, headline, view_count, posted_on, full_image, tags, publisher, description } = article;

    return (
        <section className="grid lg:grid-cols-7 gap-6 mx-6 md:mx-10 py-2 md:py-8 p-2 md:px-4">
            <Helmet>
                <title>{headline} - Nexus News</title>
            </Helmet>
            <div className="col-span-5 flex flex-col gap-4 border px-3">
                <h3 className="font-kreonSerif text-3xl text-nexus-primary mt-2">{headline}</h3>
                <h3 className='first-letter:capitalize flex items-center gap-1 font-semibold text-lg'><IoNewspaper />{publisher}</h3>
                <PhotoProvider>
                    <PhotoView src={full_image}>
                        <img className="border p-1 cursor-pointer" src={full_image} alt={headline} />
                    </PhotoView>
                </PhotoProvider>
                <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between text-gray-400">
                    <h4 className='flex items-center gap-1'><FaHistory />{posted_on}</h4>
                    <h3 className='flex items-center gap-1 font-bold'><MdOutlineRemoveRedEye />{view_count}</h3>
                </div>
                <p className="whitespace-pre-wrap text-justify first-letter:text-6xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:font-kreonSerif">{description}</p>
                <div>
                    <h3 className="text-lg font-semibold">Found in Categories:</h3>
                    {
                        tags?.map((tag, index) => <span className="text-blue-700 mr-2" key={index}>
                            #{tag}
                        </span>)
                    }
                </div>
            </div>

            {/* Related Articles */}
            <div className="col-span-5 lg:col-span-2">
                <SectionHeader heading={'Related Articles'}/>
                <SameCategoryArticles exclude={_id} tags={tags} />
            </div>
        </section>
    );
};

export default ArticleDetails;