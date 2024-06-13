import "./Navbar.css";
import defaultPP from '../../assets/user.png';
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MdAppRegistration, MdMenuOpen, MdOutlineClose, MdOutlineDashboard, MdOutlineWorkspacePremium, MdPostAdd } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import useAuth from "../../hooks/useAuth";
import { ImProfile } from "react-icons/im";
import { FaUserLock } from "react-icons/fa6";
import { GiExitDoor } from "react-icons/gi";
import useUserRole from "../../hooks/useUserRole";
import logo from '../../assets/logo.png'
import { buttonLoader } from "../LoadingSpinners/Loaders";
import { IoHomeOutline, IoLogoUsd } from "react-icons/io5";
import { RiArticleLine } from "react-icons/ri";
import { PiArticleMediumBold } from "react-icons/pi";
import { TiInfoLargeOutline } from "react-icons/ti";

const Navbar = () => {
    const { user, userLoading, logOut } = useAuth();
    const [openNavbar, setOpenNavbar] = useState(false);
    const [userName, setUserName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [profileOpen, setProfileOpen] = useState(false);
    const sidebarRef = useRef(null);
    const dropdownRef = useRef(null);
    const { role } = useUserRole();

    useEffect(() => {
        if (user) {
            setUserName(user?.displayName || 'No Name Provided');
            setProfilePicture(user?.photoURL || defaultPP);
        } else {
            setUserName('No Name Provided');
            setProfilePicture(defaultPP);
        }
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setOpenNavbar(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [sidebarRef, dropdownRef]);

    const navClasses = ({ isActive }) => isActive ? 'text-nexus-primary font-bold border-b-2 border-nexus-primary flex items-center gap-0.5' : 'text-nexus-secondary hover:text-nexus-primary font-semibold flex items-center gap-0.5';

    const navItems = <>
        <NavLink className={navClasses} to={'/'}><IoHomeOutline />Home</NavLink>
        <NavLink className={navClasses} to={'/all-articles'}><RiArticleLine />All Articles</NavLink>
        {user && <>
            <NavLink className={navClasses} to={'/subscription'}><IoLogoUsd />Subscription</NavLink>
            <NavLink className={navClasses} to={'/add-article'}><MdPostAdd />Add Articles</NavLink>
            <NavLink className={navClasses} to={'my-articles'}><PiArticleMediumBold />My Articles</NavLink>
            <NavLink className={navClasses} to={'/premium-articles'}><MdOutlineWorkspacePremium />Premium Articles</NavLink>
            {role === 'admin' && <NavLink className={navClasses} to={'/dashboard'}><MdOutlineDashboard />Dashboard</NavLink>}
        </>}
        <NavLink className={navClasses} to={'/about'}><TiInfoLargeOutline />About</NavLink>
    </>

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out Successfully!");
            })
            .catch(error => {
                toast.error(error.message.split(': ')[1]);
            })
    }

    return (
        <nav className="max-w-screen-2xl flex items-center gap-0 md:gap-4 mx-auto shadow-md px-3 py-2 md:px-14 sticky top-0 bg-navBG bg-opacity-100 z-50 text-nexus-secondary transition-all duration-1000">
            <div ref={sidebarRef} className="min-[1170px]:hidden max-[430px]:text-3xl text-5xl cursor-pointer z-50" onClick={() => setOpenNavbar(!openNavbar)}>
                {
                    openNavbar
                        ? <MdOutlineClose className="-ml-14 text-nexus-secondary hover:text-nexus-primary transform transition-all duration-1000"></MdOutlineClose>
                        : <MdMenuOpen className="-ml-1 text-nexus-primary hover:text-nexus-secondary transform transition-all duration-1000"></MdMenuOpen>
                }
            </div>

            {/* Site Logo */}
            <figure className="flex items-center gap-2 font-kreonSerif">
                <img className="w-9 md:w-12 h-7 md:h-10" src={logo} alt="logo" />
                {user && <NavLink
                    className="min-[1170px]:hidden transition-all duration-500 text-2xl font-semibold text-nexus-secondary flex items-center gap-1" to={'/'}>
                    Nexus
                    <span className='text-nexus-primary'>News</span>
                </NavLink>}
            </figure>

            <div className="flex justify-between items-center w-full">
                {/* Navbar Items/Links/Routes */}
                <div className="text-sm xl:text-base">
                    <ul className={`w-3/5 min-[1170px]:w-full flex flex-col min-[1170px]:flex-row justify-start min-[1170px]:justify-center gap-2 min-[1170px]:gap-6 text-lg md:text-xl font-semibold duration-500 absolute min-[1170px]:static shadow-lg shadow-slate-700 min-[1170px]:shadow-none h-screen min-[1170px]:h-auto p-4 min-[1170px]:p-0 ${openNavbar ? 'md:pl-14 left-0 top-0 bg-navBG flex z-30' : '-left-full top-0'}`}>
                        {navItems}
                    </ul>
                </div>

                <div className="flex gap-8 items-center">
                    <ToggleTheme />

                    {!user && userLoading ?
                        buttonLoader
                        : user
                            ? <div className="flex items-center gap-2 md:gap-3">
                                <Tooltip anchorSelect=".nameIcon" place="right">
                                    {userName}
                                </Tooltip>
                                <div className="relative" ref={dropdownRef}>
                                    <img
                                        className="nameIcon w-9 md:w-12 h-9 md:h-12 rounded-full border-2 border-nexus-secondary hover:opacity-70 transition-all duration-1000 cursor-pointer"
                                        src={profilePicture} alt={userName}
                                        onClick={() => setProfileOpen(!profileOpen)}
                                    />
                                    {profileOpen && (
                                        <div className="dropdown-arrow absolute md:right-[16%] right-[1%] mt-2 w-56 overflow-x-auto-auto rounded-md shadow-md z-30 bg-nexus-primary shadow-[#6897bb] p-2 flex flex-col gap-2 animate__animated animate__bounceIn">
                                            <NavLink to={'/profile'}
                                                onClick={() => setProfileOpen(!profileOpen)}
                                                className={'flex gap-2 items-center text-white'}><ImProfile />
                                                {userName}
                                            </NavLink>
                                            <button className={'flex gap-2 items-center text-white'}
                                                onClick={() => { handleLogout(); setProfileOpen(!profileOpen) }}
                                            ><GiExitDoor />Logout</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            : <div className="font-jokeyOneSans flex items-center gap-1 md:gap-3 text-lg md:text-xl xl:text-2xl font-medium md:pt-0 pt-1">
                                <NavLink to={'/login'} className={navClasses}><FaUserLock />Login</NavLink>
                                <NavLink to={'/register'} className={navClasses}><MdAppRegistration />Register</NavLink>
                            </div>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
