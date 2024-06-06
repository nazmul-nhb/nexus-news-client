import SiteTitle from "../components/SiteTitle/SiteTitle";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {

    return (<>
        <SiteTitle />
        <section className="overflow-x-auto">
            <div className="flex items-start justify-start gap-1">
                <Sidebar />
                <div className={`mx-4 my-6 flex justify-center w-[99%]`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    </>
    );
};

export default Dashboard;