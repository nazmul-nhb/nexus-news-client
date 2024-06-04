import { Helmet } from "react-helmet-async";
import useGetArticles from "../../hooks/useGetArticles";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import ArticleLoading from "../../components/LoadingSpinners/ArticleLoading";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import customStyles from "../../utilities/selectStyles";
import { FaNewspaper } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";

const animatedComponents = makeAnimated();

const AllArticles = () => {
    const { isLoading, data: allArticles } = useGetArticles(['allArticles'], 'size=15');
    // console.log(allArticles);
    const [publisher, setPublisher] = useState({}); // for showing in the select field
    const axiosPublic = useAxiosPublic();

    const { data: publishers = [] } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axiosPublic('/publishers')
            return res.data;
        }
    });

    const { data: tags = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosPublic('/tags')
            return res.data;
        }
    });
    if(isLoading){
        return <ArticleLoading/>
    }

    return (
        <section>
            <Helmet>
                <title>All Articles - Nexus News</title>
            </Helmet>

            <div className="col-span-9 lg:col-span-3 flex flex-col gap-3">
                <div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-nexus-primary">
                    <FaNewspaper />
                    <label className="font-medium" htmlFor="publisher">Publisher</label>
                    <Select isClearable
                        styles={customStyles}
                        components={animatedComponents}
                        onChange={setPublisher}
                        options={publishers.map(publisher => ({
                            value: publisher.publisher,
                            label: publisher.publisher
                        }))}
                        required
                        placeholder="Select Publisher"
                        className="px-2 rounded-r-lg py-1 bg-transparent w-full border-l border-nexus-primary focus:outline-0" id='publisher' name='publisher'
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                {
                    allArticles?.map(article =><ArticleCard key={article._id}
                    article={article}
                    />)
                }
            </div>
        </section>
    );
};

export default AllArticles;