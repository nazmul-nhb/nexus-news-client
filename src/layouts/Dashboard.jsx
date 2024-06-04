import { useState } from "react";
import SiteTitle from "../components/SiteTitle/SiteTitle";
// import useUserRole from "../hooks/useUserRole";
import { CgCloseR } from "react-icons/cg";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Dashboard = () => {
    const { user, logOut } = useAuth();
    // const { role } = useUserRole();
    const [openSidebar, setOpenSidebar] = useState(true);
    // const sidebarRef = useRef(null);

    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
    //             setOpenSidebar(false);
    //         }
    //     };

    //     document.addEventListener("mouseup", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("mouseup", handleClickOutside);
    //     };
    // }, [sidebarRef]);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out Successfully!");
            })
            .catch(error => {
                toast.error(error.message.split(': ')[1]);
            })
    }

    return (<>
        <SiteTitle />
        <section className="my-2 md:my-8">
            <div className="text-sm xl:text-base flex items-start justify-start gap-3">
                <div className={`relative ${openSidebar && 'bg-orange-200'} w-auto p-3 transform transition-all duration-500`}>
                    <div className="z-50 w-auto" onClick={() => setOpenSidebar(!openSidebar)}>
                        {
                            openSidebar
                                ? <CgCloseR className="max-[430px]:text-3xl text-5xl cursor-pointer text-nexus-primary hover:text-nexus-secondary transform transition-all duration-1000" />
                                : <AiOutlineMenu className="max-[430px]:text-3xl text-5xl cursor-pointer text-nexus-secondary hover:text-nexus-primary transform transition-all duration-1000" />
                        }
                    </div>
                    <div className={`text-lg md:text-xl font-semibold transform transition-all duration-500 relative h-screen ${openSidebar ? 'left-0 top-0 bg-opacity-95 flex transform transition-all duration-500 z-30' : '-left-full top-0 max-w-0 overflow-hidden'}`}>
                        <div className="flex flex-col gap-6 justify-start items-start pt-3">
                            <NavLink to={'/'}>Home</NavLink>
                            <NavLink to={'/dashboard/all-users'}>All Users</NavLink>
                            <NavLink to={'/dashboard/all-articles'}>All Articles</NavLink>
                            <NavLink to={'/'}>Add Publisher</NavLink>
                            <NavLink to={'/dashboard/'}>Dashboard Home</NavLink>
                            <button onClick={handleLogout}>Logout</button>
                            {
                                user && <Link to="/profile">
                                    <div className="flex items-center gap-2 pt-4 border-t">
                                        <img className="w-16 rounded-full" src={user?.photoURL} alt="" />
                                        <div>
                                            <h3>{user?.displayName}</h3>
                                            <h3>Profile</h3>
                                        </div>
                                    </div>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
                <div className={`flex-1 mt-5 transform transition-all duration-500`}>
                    <Outlet></Outlet>
                    Hola!
                </div>
            </div>
        </section>
    </>
    );
};

export default Dashboard;