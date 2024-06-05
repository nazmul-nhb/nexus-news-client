import { useMemo } from "react";
import useNexusUsers from "../../../hooks/useNexusUsers";
import NexusTable from "../../../components/NexusTable/NexusTable";

const AllUsers = () => {
    const { data: nexusUsers = [] } = useNexusUsers(['nexusUsers']);

    const userData = useMemo(() => nexusUsers, [nexusUsers]);

    const handleMakeAdmin = (email) => {
        console.log(email);
    }

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const userColumns = [
        {
            header: '#',
            accessorKey: 'joined_on',
            // enableSorting: false
        },
        {
            header: 'Name',
            accessorKey: 'name'
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Profile Picture',
            accessorKey: 'profile_image',
            cell: (cell) => {
                return <img className="w-16 rounded-full p-[1px] border border-furry mx-auto" src={cell.row.original.profile_image} title={cell.row.original.email} alt={cell.row.original.name} />;
            },
        },
        {
            header: 'Action',
            accessorKey: '',
            enableSorting: false,
            cell: (cell) => {
                return <button className="flex items-center justify-center" onClick={() => handleMakeAdmin(cell.row.original.email)}>{cell.row.original.role === 'admin' ? 'Admin' : 'Make Admin'}</button>;
            }
        }
    ]

    return (
        <section>
            All Users {nexusUsers?.length}

            <NexusTable data={userData} columns={userColumns} />
        </section>
    );
};

export default AllUsers;