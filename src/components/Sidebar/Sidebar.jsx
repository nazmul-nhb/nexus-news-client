import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaUsersCog } from "react-icons/fa";
import { FaFileCirclePlus, FaNewspaper } from "react-icons/fa6";
import { RiHome7Fill, RiHomeGearFill } from "react-icons/ri";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";

const Sidebar = () => {
    const { user, logOut } = useAuth();
    const [openSidebar, setOpenSidebar] = useState(true);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out Successfully!");
            })
            .catch(error => {
                toast.error(error.message.split(': ')[1]);
            })
    }

    const sideBarClasses = ({ isActive }) => isActive ? 'text-orange-900 font-bold flex items-center gap-2' : 'text-nexus-primary hover:text-orange-900 flex items-center gap-2 font-semibold';

    const sidebarMenus = [
        { icon: <RiHome7Fill className="text-4xl" />, link: '/', title: 'Home' },
        { icon: <RiHomeGearFill className="text-4xl" />, link: '/dashboard', title: 'Admin Home' },
        { icon: <FaUsersCog className="text-4xl" />, link: '/dashboard/all-users', title: 'All Users' },
        { icon: <FaNewspaper className="text-4xl" />, link: '/dashboard/all-articles', title: 'All Articles' },
        { icon: <FaFileCirclePlus className="text-4xl" />, link: '/dashboard/add-publisher', title: 'Add Publisher' },
    ]

    return (
        <div className={` ${openSidebar ? "w-72" : "w-20 "} bg-nexus-secondary border-nexus-secondary h-screen p-5  pt-8 relative transition-all transform duration-300`}>
            {/* sidebar control */}
            <IoIosArrowDroprightCircle className={`absolute cursor-pointer -right-3 top-[30] w-7 text-4xl text-nexus-primary ${!openSidebar && "rotate-180"}`} onClick={() => setOpenSidebar(!openSidebar)} />

            {/* dashboard icon */}
            <Link to='/profile'>
                <div className="flex gap-3 items-center">
                    <img src={user?.photoURL} alt={user?.displayName}
                        className={`cursor-pointer transition-all transform duration-500 text-4xl w-10 h-10 rounded-full ${openSidebar && "rotate-[360deg]"}`} />
                    {/* <MdAdminPanelSettings className={`cursor-pointer transition-all transform duration-500 text-4xl ${openSidebar && "rotate-[360deg]"}`} /> */}
                    <h1 className={`text-white origin-left font-medium text-xl transition-all transform duration-200 ${!openSidebar && "hidden"}`}>{user?.displayName}</h1>
                </div>
            </Link>
            <hr className="my-5" />
            <ul className="flex flex-col gap-5 items-start">
                {
                    sidebarMenus.map((menu, index) => (
                        <NavLink className={sideBarClasses} to={menu.link} key={index}>
                            {menu.icon}
                            <h3 className={`${!openSidebar && "hidden"} text-xl origin-left transition-all transform duration-200`}> {menu.title}</h3>
                        </NavLink>
                    ))
                }
            </ul>
            <hr className="my-5" />
            <button className="flex items-center gap-2 font-semibold hover:font-bold duration-300 transition-all"
                onClick={handleLogout}>
                <GiExitDoor className="text-4xl" /> <span className={`${!openSidebar && "hidden"} text-xl origin-left transition-all transform duration-200`}>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;