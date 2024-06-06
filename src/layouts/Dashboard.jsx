import SiteTitle from "../components/SiteTitle/SiteTitle";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState();

    return (<>
        <SiteTitle />
        <section className="overflow-x-auto">
            <div className="flex items-start justify-start gap-1">
                <Sidebar setSidebarOpen={setSidebarOpen} />
                <div className={`mx-4 my-6 flex justify-center ${sidebarOpen ? 'w-[calc(100%-256px)]' : 'w-[calc(100%-80px)]'}`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    </>
    );
};

export default Dashboard;