import useNexusUsers from "../../../hooks/useNexusUsers";

const AllUsers = () => {
    const { data: nexusUsers = [] } = useNexusUsers(['nexusUsers']);

    console.log(nexusUsers);
    return (
        <section>
            All Users {nexusUsers?.length}
        </section>
    );
};

export default AllUsers;