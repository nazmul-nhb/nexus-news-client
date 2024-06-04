import useUserRole from "../../hooks/useUserRole";

const Dashboard = () => {
    const { role } = useUserRole();

    console.log(role);

    return (
        <section>
            Vua Dashboard
        </section>
    );
};

export default Dashboard;