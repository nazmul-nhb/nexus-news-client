import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaUsersCog } from "react-icons/fa";
import { FaFileCirclePlus, FaNewspaper } from "react-icons/fa6";
import { RiHome7Fill, RiHomeGearFill } from "react-icons/ri";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { ThemeContext } from "../../providers/ThemeProvider";
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
    const { user, logOut } = useAuth();
    const [openSidebar, setOpenSidebar] = useState(true);
    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate();

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
        <div className={` ${openSidebar ? "w-72" : "w-20 "} bg-nexus-secondary border-nexus-secondary h-dvh p-5 pt-6 relative transition-all transform duration-300`}>
            {/* sidebar control */}
            <IoIosArrowDropleftCircle className={`absolute cursor-pointer -right-3 top-[30] w-7 text-4xl text-nexus-primary ${!openSidebar && "rotate-180"}`} onClick={() => setOpenSidebar(!openSidebar)} />
            <Tooltip anchorSelect=".userName" place="right">
                {user?.displayName}
            </Tooltip>
            {/* Profile */}
            <Link to='/profile'>
                <div className="flex gap-3 items-center userName">
                    <img src={user?.photoURL} alt={user?.displayName}
                        className={`border p-[1px] cursor-pointer transition-all transform duration-500 text-4xl w-10 h-10 rounded-full ${openSidebar && "rotate-[360deg]"}`} />
                    <div className={`text-white origin-left font-medium transition-all transform duration-200 ${!openSidebar && "hidden"}`}>
                        <h3 className="text-xl">{user?.displayName}</h3>
                        <h4 className="text-xs">Profile</h4>
                    </div>
                </div>
            </Link>
            <hr className="my-5" />
            <ul className="flex flex-col gap-5 items-start">
                {
                    sidebarMenus.map((menu, index) => (
                        <NavLink title={menu.title} className={sideBarClasses} to={menu.link} key={index}>
                            {menu.icon}
                            <h3 className={`${!openSidebar && "hidden"} text-xl origin-left transition-all transform duration-200`}> {menu.title}</h3>
                        </NavLink>
                    ))
                }
            </ul>
            <hr className="my-5" />
            <div className="flex items-center gap-2 duration-300 transition-all mb-5">
                <ToggleTheme />
                <h3 className={`${!openSidebar && "hidden"} text-xl font-semibold origin-left transition-all transform duration-200`}>{theme === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}</h3>
            </div>
            <button className="flex items-center gap-2 font-semibold hover:font-bold duration-300 transition-all"
                onClick={() => { handleLogout(); navigate('/') }}>
                <GiExitDoor className="text-4xl" title="Log out" /> <span className={`${!openSidebar && "hidden"} text-xl origin-left transition-all transform duration-200`}>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;