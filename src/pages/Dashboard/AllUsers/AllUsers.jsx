import { useMemo } from "react";
import useNexusUsers from "../../../hooks/useNexusUsers";
import NexusTable from "../../../components/NexusTable/NexusTable";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

const AllUsers = () => {
    const { data: nexusUsers = [] } = useNexusUsers(['nexusUsers']);


    const handleMakeAdmin = (email) => {
        console.log(email);
    }

    const userData = useMemo(() => nexusUsers, [nexusUsers]);

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
                const { profile_image, email, name } = cell.row.original;
                return (
                    <PhotoProvider>
                        <PhotoView src={profile_image}>
                            <img
                                className="w-11 h-11 cursor-pointer rounded-full p-[1px] border border-furry mx-auto"
                                src={profile_image}
                                title={email}
                                alt={name}
                            />
                        </PhotoView>
                    </PhotoProvider>
                );
            },
        },
        {
            header: 'Action',
            accessorKey: 'role',
            enableSorting: false,
            cell: (cell) => {
                return <>{
                    cell.row.original.role === 'admin'
                        ? <h3 className="flex items-center gap-1 text-green-700 mx-auto justify-center">
                            <MdOutlineAdminPanelSettings /> Admin
                        </h3>
                        : <h3 className="flex items-center justify-center mx-auto cursor-pointer" onClick={() => handleMakeAdmin(cell.row.original.email)}>Make Admin</h3>
                }</>;
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