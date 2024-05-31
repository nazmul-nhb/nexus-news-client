import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import Error404 from '../../assets/error-404.svg';

const ErrorPage = () => {
    return (
        <section className="flex items-center h-svh sm:p-16 dark:bg-gray-50 dark:text-gray-800">
            <Helmet>
                <title>Error : : 404</title>
            </Helmet>
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-6 space-y-2 text-center">
                <div className="w-full text-center">
                    <h2 className="mb-8 font-extrabold text-9xl text-red-600">404</h2>
                </div>
                {/* <img src={Error404} alt="404" /> */}
                <p className="text-lg font-semibold md:text-3xl">Page Not Found!</p>
                <p className="mt-4 mb-8 dark:text-gray-600">But don&rsquo;t worry, you can find plenty of other things on our homepage.</p>
                <Link to={'/'} className="px-8 py-3 font-semibold bg-[#8c8c8c] text-white border border-[#8c8c8c] rounded-3xl hover:bg-white hover:text-[#8c8c8c] transition duration-500">Back to Homepage</Link>
            </div>
        </section>
    );
};

export default ErrorPage;
