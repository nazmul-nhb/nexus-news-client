import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import useGetArticles from "../../hooks/useGetArticles";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import customStyles from "../../utilities/selectStyles";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaNewspaper, FaSearch } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import toast from "react-hot-toast";
import { articleLoader, searchLoader } from "../../components/LoadingSpinners/Loaders";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

const animatedComponents = makeAnimated();

const AllArticles = () => {
    const [selectedTag, setSelectedTag] = useState({});
    const [selectedPublisher, setSelectedPublisher] = useState({});
    const [searchText, setSearchText] = useState('');
    const [sortByTime, setSortByTime] = useState(false);

    // const [sortByTime, setSortByTime] = useState(false);
    const inputRef = useRef(null);
    const axiosPublic = useAxiosPublic();

    // load articles using the hook
    const { isLoading, data: allArticles } = useGetArticles(
        ['allArticles', selectedTag?.value, selectedPublisher?.value, searchText, sortByTime],
        `tag=${selectedTag?.value}&publisher=${selectedPublisher?.value}&search=${searchText}&sort=${sortByTime ? 'time_descending' : 'time_ascending'}`);

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

    const handleSearchArticle = (e) => {
        e.preventDefault();
        if (e.target.search.value === '') {
            return toast.error('Cannot Perform Empty Search!');
        }
        setSearchText(e.target.search.value);
    }

    // Show Toast with Search Count
    useEffect(() => {
        if (searchText && allArticles?.length > 0) {
            toast.success(`${allArticles?.length} ${allArticles?.length > 1 ? 'Matches' : 'Match'} Found!`);
        }
    }, [allArticles, searchText]);

    // Clear Search Text after a search
    const clearSearchText = () => {
        setSearchText('');
        inputRef.current.value = '';
    }

    return (
        <section className="mx-6 md:mx-10 py-2 md:py-8 p-2 md:px-4">
            <Helmet>
                <title>All Articles - Nexus News</title>
            </Helmet>
            <SectionHeader heading={'Explore All Our Articles'} subHeading={`Total: ${allArticles.length}  ${allArticles?.length > 1 ? 'Articles' : 'Article'}`} />
            <div className="w-full my-6 md:my-16"></div>
            {/* Filter */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 mx-auto gap-4 mb-8 text-sm">
                {/* Filter by Publisher */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-nexus-secondary">
                        <FaNewspaper />
                        <Select isClearable
                            styles={customStyles}
                            components={animatedComponents}
                            onChange={setSelectedPublisher}
                            options={publishers.map(publisher => ({
                                value: publisher.publisher,
                                label: publisher.publisher
                            }))}
                            required
                            placeholder="Filter by Publisher"
                            className="px-2 rounded-r-lg py-1 bg-transparent w-full border-l border-nexus-secondary focus:outline-0" id='publisher' name='publisher'
                        />
                    </div>
                </div>
                {/* Filter by Tags */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-nexus-secondary">
                        <FaHashtag />
                        <Select isClearable
                            styles={customStyles}
                            components={animatedComponents}
                            onChange={setSelectedTag}
                            options={tags.map(tag => ({
                                value: tag.value,
                                label: tag.label
                            }))}
                            required
                            placeholder="Filter by Tag"
                            className="px-2 rounded-r-lg py-1 bg-transparent w-full border-l border-nexus-secondary focus:outline-0" id='tag' name='tag'
                        />
                    </div>
                </div>
                {/* Search Articles */}
                <form onSubmit={handleSearchArticle} className="flex gap-2 items-center justify-start text-nexus-secondary">
                    <div className="flex gap-2 w-full items-center relative pl-2 bg-transparent rounded-lg border border-nexus-secondary">
                        <label className="font-medium" htmlFor="search"><FaSearch /></label>
                        <input ref={inputRef} defaultValue={searchText} className="px-2 rounded-r-lg py-[9px] bg-transparent w-full border-l border-nexus-secondary focus:outline-0" placeholder="Search Articles" type="text" name="search" id="search" />
                        <div className="absolute right-0 flex gap-2">
                            {
                                searchText !== '' && <button title="Clear Search Field" onClick={clearSearchText} className="text-2xl hover:text-nexus-primary transition-all duration-500"><MdClear /></button>
                            }
                            <button className="border py-[9px] px-4 rounded-r-lg font-bold tracking-wider border-nexus-secondary bg-nexus-secondary text-white hover:bg-white hover:text-nexus-secondary transition-all duration-700" type="submit">Search</button>
                        </div>
                    </div>

                </form>
                <button
                    onClick={() => setSortByTime(!sortByTime)}
                    className="border py-1 px-2 rounded-lg font-semibold border-nexus-secondary bg-transparent text-nexus-secondary hover:bg-nexus-secondary text-lg hover:text-white transition-all duration-700"
                    type="submit">{sortByTime ? 'See Oldest Articles' : 'See Latest Articles'}
                </button>
            </div>
            <div className="">
                {isLoading && !searchText ?
                    articleLoader
                    : searchText && isLoading ? searchLoader
                        : !allArticles.length ? <p className="flex items-center justify-center text-lg font-semibold text-red-700">Nothing Found!</p>
                            : <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-6">
                                {
                                    allArticles?.map(article => <ArticleCard key={article._id}
                                        article={article}
                                    />)
                                }
                            </div>
                }
            </div>
            <div>

            </div>
        </section>
    );
};

export default AllArticles;