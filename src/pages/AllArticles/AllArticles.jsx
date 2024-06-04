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
import { FaRegNewspaper } from "react-icons/fa6";

const animatedComponents = makeAnimated();

const AllArticles = () => {
    const [selectedTag, setSelectedTag] = useState({});
    const [selectedPublisher, setSelectedPublisher] = useState({});
    const axiosPublic = useAxiosPublic();

    // load articles using the hook
    const { isLoading, data: allArticles } = useGetArticles(
        ['allArticles', selectedTag?.value, selectedPublisher?.value],
        `tag=${selectedTag?.value}&publisher=${selectedPublisher?.value}`);

    // console.log(selectedTag);

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

    return (
        <section>
            <Helmet>
                <title>All Articles - Nexus News</title>
            </Helmet>
            {/* Filter */}
            <div className="flex justify-center items-center gap-3">
                {/* Filter by Publisher */}
                <div className="col-span-9 lg:col-span-3 flex flex-col gap-3">
                    <div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-nexus-primary">
                        <FaNewspaper />
                        <Select isClearable
                            // value={selectedPublisher}
                            styles={customStyles}
                            components={animatedComponents}
                            onChange={setSelectedPublisher}
                            options={publishers.map(publisher => ({
                                value: publisher.publisher,
                                label: publisher.publisher
                            }))}
                            required
                            placeholder="Filter by Publisher"
                            className="px-2 rounded-r-lg py-1 bg-transparent w-full border-l border-nexus-primary focus:outline-0" id='publisher' name='publisher'
                        />
                    </div>
                </div>
                {/* Filter by Tags */}
                <div className="col-span-9 lg:col-span-3 flex flex-col gap-3">
                    <div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-nexus-primary">
                        <FaRegNewspaper />
                        <Select isClearable
                            // value={selectedTag && selectedTag}
                            styles={customStyles}
                            components={animatedComponents}
                            onChange={setSelectedTag}
                            options={tags.map(tag => ({
                                value: tag.value,
                                label: tag.label
                            }))}
                            required
                            placeholder="Filter by Tag"
                            className="px-2 rounded-r-lg py-1 bg-transparent w-full border-l border-nexus-primary focus:outline-0" id='tag' name='tag'
                        />
                    </div>
                </div>
            </div>
            {isLoading ?
                < ArticleLoading />
                : !allArticles.length ? <p>Nothing to Show</p>
                    : <div className="grid grid-cols-3 gap-6">
                        {
                            allArticles?.map(article => <ArticleCard key={article._id}
                                article={article}
                            />)
                        }
                    </div>

            }
        </section>
    );
};

export default AllArticles;