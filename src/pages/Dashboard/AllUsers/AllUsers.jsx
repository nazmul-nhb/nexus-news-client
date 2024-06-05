import { useMemo } from "react";
import useNexusUsers from "../../../hooks/useNexusUsers";
import NexusTable from "../../../components/NexusTable/NexusTable";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";

const AllUsers = () => {
    const { data: nexusUsers = [], refetch } = useNexusUsers(['nexusUsers']);
    const axiosSecure = useAxiosSecure();

    const handleMakeAdmin = (name, email) => {
        console.log({ name, email });
        Swal.fire({
            title: 'Are You Sure?',
            text: `Want to Make "${name}" Admin?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#24a145',
            cancelButtonColor: '#ff0000',
            confirmButtonText: 'Yes, Make Admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users`, { email, role: 'admin', admin_since: moment().format("YYYY-MM-DD HH:mm:ss") })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: 'Congratulations!',
                                text: `"${name}" is Now an Admin!`,
                                icon: 'success',
                                confirmButtonText: 'Okay!'
                            })
                            refetch();
                        }
                    })
            }
        })

    }

    const usersWithSerial = nexusUsers?.map((user, index) => ({ ...user, serial: index + 1 }));

    console.log(usersWithSerial);

    const userData = useMemo(() => usersWithSerial, [usersWithSerial]);

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const userColumns = [
        {
            header: '#',
            accessorKey: 'serial',
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
            // enableSorting: false,
            cell: (cell) => {
                const { name, email } = cell.row.original;
                return (<>{
                    cell.row.original.role === 'admin'
                        ? <h3 className="flex items-center gap-1 text-green-700 mx-auto justify-center">
                            <MdOutlineAdminPanelSettings /> Admin
                        </h3>
                        : <h3 className="flex items-center justify-center mx-auto cursor-pointer" onClick={() => handleMakeAdmin(name, email)}>Make Admin</h3>
                }</>)
            }
        }
    ]

    return (
        <section className="mx-auto">
            <Helmet>
                <title>Dashboard - All Users - Nexus News</title>
            </Helmet>
            <h3 className="text-center text-2xl mb-4">Total Registered Users: {nexusUsers?.length}</h3>

            <NexusTable data={userData} columns={userColumns} />
        </section>
    );
};

export default AllUsers;