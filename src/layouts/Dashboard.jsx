import SiteTitle from "../components/SiteTitle/SiteTitle";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {

    return (<>
        <SiteTitle />
        <section className="overflow-x-auto max-w-screen-2xl mx-auto">
            <div className="flex items-start h-full justify-start gap-4">
                <div className="h-dvh">
                    <Sidebar />
                </div>
                <div className={`flex-1 mx-auto overflow-auto flex h-screen my-6 w-[99%%]`}>
                    <Outlet />
                </div>
            </div>
        </section>
    </>
    );
};

export default Dashboard;