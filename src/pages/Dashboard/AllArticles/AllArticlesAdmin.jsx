import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AdminActionArticle from "../../../components/AdminActionArticle/AdminActionArticle";
import useUserRole from "../../../hooks/useUserRole";
import { Helmet } from "react-helmet-async";
import { articleLoader } from "../../../components/LoadingSpinners/Loaders";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import { useState } from "react";

const AllArticlesAdmin = () => {
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const { role, roleLoading } = useUserRole();
    const axiosSecure = useAxiosSecure();

    const { isFetching, data: articleCount = 0 } = useQuery({
        queryKey: ['articleCount'],
        queryFn: async () => {
            const res = await
                axiosSecure.get(`/articles/article-count`)
            return res.data.count;
        }
    });

    // console.log(articleCount);

    // Calculate Pages
    const totalPages = Math.ceil(articleCount / itemsPerPage);
    const pages = [...Array(totalPages).keys()];

    const { isLoading, data: allRawArticles = [], refetch } = useQuery({
        enabled: true,
        queryKey: ['allRawArticles', role, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/all?role=${role}&sort=time_descending&page=${currentPage - 1}&size=${itemsPerPage}`);
            return res.data;
        }
    });

    const handleItemsPerPage = (e) => {
        const pageValue = parseInt(e.target.value);
        setItemsPerPage(pageValue);
        setCurrentPage(1);
    }

    const handlePreviousPage = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        currentPage < pages?.length && setCurrentPage(currentPage + 1);
    }

    // console.log(allRawArticles);

    return (
        <section className="mx-auto space-y-8">
            <Helmet>
                <title>All Articles || Dashboard - Nexus News</title>
            </Helmet>
            <SectionHeader heading={`Total ${articleCount} Articles`} />
            <div className="grid lg:grid-cols-2 gap-6">
                {isLoading || isFetching || roleLoading ? articleLoader :
                    allRawArticles?.map(article => <AdminActionArticle key={article._id}
                        article={article}
                        refetch={refetch}
                    />)
                }
            </div>
            <div className="flex flex-col gap-4 justify-center items-center font-semibold mt-8 lg:mt-16">
                <p className="text-nexus-primary">Page: {currentPage} of {totalPages}</p>
                <div className="flex gap-3">
                    <button className={"px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-nexus-primary border-nexus-primary hover:bg-nexus-primary hover:text-white"} disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>

                    {
                        pages?.map(page => <button
                            className={`px-3 border ${currentPage === page + 1 ? 'bg-nexus-primary border-nexus-primary text-white hover:bg-transparent hover:text-nexus-primary' : ' text-nexus-primary border-nexus-primary hover:bg-nexus-primary hover:text-white'}`}
                            onClick={() => setCurrentPage(page + 1)}
                            key={page}
                        >{page + 1}</button>)
                    }

                    <button className={"px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-nexus-primary border-nexus-primary hover:bg-nexus-primary hover:text-white"} disabled={currentPage === pages?.length || totalPages === 0} onClick={handleNextPage}>Next</button>
                </div>
                <select className="border px-2 py-1 focus:text-nexus-primary outline-nexus-primary border-nexus-primary text-nexus-primary bg-transparent focus:border-2 mx-auto" value={itemsPerPage} onChange={handleItemsPerPage} name="blogs" id="blogs">
                    <option value="6">Articles Per Page: 6</option>
                    <option value="12">Articles Per Page: 12</option>
                    <option value="24">Articles Per Page: 24</option>
                    <option value="48">Articles Per Page: 48</option>
                </select>
            </div>
        </section>
    );
};

export default AllArticlesAdmin;