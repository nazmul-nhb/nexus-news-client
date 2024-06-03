import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import SiteTitle from '../components/SiteTitle/SiteTitle';

const Root = () => {
    return (
        <>
            <SiteTitle />
            <Navbar />
            <main className="max-w-screen-2xl mx-auto">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Root;
