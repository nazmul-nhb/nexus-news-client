import SiteTitle from "../components/SiteTitle/SiteTitle";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {

    return (<>
        <SiteTitle />
        <section className="overflow-x-auto">
            <div className="flex items-start justify-start gap-4">
                <Sidebar />
                <div className={`mx-auto flex my-6 w-[99%]`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    </>
    );
};

export default Dashboard;