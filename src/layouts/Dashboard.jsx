import SiteTitle from "../components/SiteTitle/SiteTitle";
// import useUserRole from "../hooks/useUserRole";
import {Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {

    return (<>
        <SiteTitle />
        <section className="my-2 md:my-8">
            <div className="flex items-start justify-start gap-6">
                <Sidebar/>
                <div className={`flex-1 mt-5 transform transition-all duration-500`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    </>
    );
};

export default Dashboard;