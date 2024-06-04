import useNexusUsers from "../../../hooks/useNexusUsers";

const AllUsers = () => {
    const { data: nexusUsers = [] } = useNexusUsers(['nexusUsers']);

    console.log(nexusUsers);
    return (
        <div>
            All Users {nexusUsers?.length}
        </div>
    );
};

export default AllUsers;