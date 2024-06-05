import SiteTitle from "../components/SiteTitle/SiteTitle";
// import useUserRole from "../hooks/useUserRole";
import {Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {

    return (<>
        <SiteTitle />
        <section className="overflow-x-auto">
            <div className="flex items-start justify-start gap-1">
                <Sidebar/>
                <div className={`mx-4 my-6 flex justify-center md:w-full w-auto`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    </>
    );
};

export default Dashboard;