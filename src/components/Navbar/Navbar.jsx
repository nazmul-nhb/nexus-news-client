import "./Navbar.css";
import Button from "../Button/Button";
import defaultPP from '../../assets/user.png';
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MdMenuOpen, MdOutlineClose } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, userLoading, logOut } = useAuth();
    const [openNavbar, setOpenNavbar] = useState(false);
    const [userName, setUserName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const sidebarRef = useRef(null);

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
        };

        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [sidebarRef]);

    const navItems = <>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/'}>Public Route</NavLink>

        {
            user && <>
                <NavLink to={'/add-article'}>Add Article</NavLink>
                <NavLink to={'/'}>Private Route</NavLink>
            </>
        }
        <NavLink to={'/contact'}>Contact</NavLink>
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
        <nav className="max-w-screen-2xl flex items-center gap-0 md:gap-4 mx-auto shadow-md px-3 py-4 md:px-10 xl:px-20 sticky top-0 bg-gradient-to-l from-[#829ae8fa] to-[#7690e5fa] bg-opacity-100 z-50 text-[#1e4080]">
            <div ref={sidebarRef} className="min-[1170px]:hidden max-[430px]:text-3xl text-5xl cursor-pointer" onClick={() => setOpenNavbar(!openNavbar)}>
                {
                    openNavbar
                        ? <MdOutlineClose className="text-[#ea0c0c] hover:text-[midnightblue] transform transition-all duration-1000"></MdOutlineClose>
                        : <MdMenuOpen className="text-[midnightblue] hover:text-[#ea0c0c] transform transition-all duration-1000"></MdMenuOpen>
                }
            </div>
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1" title="Nexus News">
                    <Link to="/">
                        <div className="flex flex-col">
                            <h3 className="text-base md:text-2xl font-semibold text-[midnightblue]">Nexus News</h3>
                        </div></Link>
                </div>
                {/* Navbar Items/Links/Routes */}
                <div className="text-sm xl:text-base">
                    <ul className={`w-3/5 min-[1170px]:w-full flex flex-col min-[1170px]:flex-row justify-start min-[1170px]:justify-center gap-2 text-lg md:text-xl font-semibold duration-500 absolute min-[1170px]:static shadow-lg shadow-slate-700 min-[1170px]:shadow-none h-screen min-[1170px]:h-auto p-4 min-[1170px]:p-0 ${openNavbar ? 'left-0 min-[430px]:top-20 top-[68px] md:top-[88px] bg-gradient-to-t from-[#7690e5fa] to-[#829ae8fa] bg-opacity-100 flex z-30' : '-left-full min-[430px]:top-20 top-[68px] md:top-[88px]'}`}>
                        {navItems}
                    </ul>
                </div>

                <ToggleTheme />

                {userLoading ?
                    "Loading..."
                    : user
                        ? <div className="flex items-center gap-2 md:gap-3">
                            <Tooltip anchorSelect=".nameIcon" place="bottom">
                                {userName}
                            </Tooltip>
                            <Link to={'/profile'}><img className="nameIcon w-9 md:w-14 h-9 md:h-14 rounded-full border-2 p-[2px] border-[#0e1d42e8] hover:opacity-70 transition-all duration-1000" src={profilePicture} alt={userName} /></Link>
                            <Tooltip anchorSelect=".logOutIcon" place="bottom">
                                Log out
                            </Tooltip>
                            <div className="logOutIcon flex items-center justify-center w-9 md:w-14 h-9 md:h-14 rounded-full border-2 border-[midnightblue] p-[2px] cursor-pointer text-2xl md:text-4xl hover:text-3xl hover:md:text-5xl bg-[midnightblue] text-[#ffffff] hover:text-[#ea0c0c] hover:bg-[#e0d5d5] hover:border-[#ea0c0c] transform transition-all duration-1000" onClick={handleLogout}>
                                <IoMdLogOut />
                            </div>
                        </div>
                        : <div className="flex items-center gap-1 md:gap-3">
                            <NavLink to={'/login'}><Button className="border text-base md:text-xl xl:text-2xl rounded-3xl px-2 md:px-4 py-[2px] md:py-1 font-bold " buttonText={"Login"} color={"#272c50"} hoverColor={"white"} hoverBgColor={"transparent"}></Button></NavLink>
                            <NavLink to={'/register'}><Button className="border text-sm md:text-xl xl:text-2xl rounded-3xl px-2 md:px-4 py-[2px] md:py-1 font-bold " buttonText={"Register"} color={"#272c50"} hoverColor={"white"} hoverBgColor={"transparent"}></Button></NavLink>
                        </div>
                }
            </div>
        </nav>
    );
};

export default Navbar;
