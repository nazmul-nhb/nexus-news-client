import PublisherPieChart from "../../../components/Graphs/PublisherPieChart/PublisherPieChart";
import SubscriptionStats from "../../../components/Graphs/SubscriptionStats/SubscriptionStats";
import RevenueStats from "../../../components/Graphs/RevenueStats/RevenueStats";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";

const AdminHome = () => {
  
    return (
        <section className="mx-auto w-[99%] flex flex-col items-center gap-4">
            <Helmet>
                <title>Admin Home || Dashboard - Nexus News</title>
            </Helmet>
            <SectionHeader heading={"Statistics"}/>
            <PublisherPieChart />
            <SubscriptionStats />
            <RevenueStats />
        </section>
    );
};

export default AdminHome;