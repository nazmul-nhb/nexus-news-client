import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";
import logo from '../../assets/logo.png'

const Footer = () => {

    return (
        <footer className="max-w-screen-2xl mx-auto bg-nexusBG">
            <div className="px-6 py-8 md:py-12 md:px-20">
                <div className="flex gap-4 lg:gap-0 flex-col lg:flex-row justify-center lg:items-center lg:justify-between">
                    <div className="flex gap-1.5 flex-col items-center justify-center mx-auto">
                        <img className="w-10 md:w-16" src={logo} alt="Logo" />
                        <h3 className="font-kreonSerif text-2xl md:text-4xl font-semibold tracking-wider text-nexus-secondary">Nexus <span className="text-nexus-primary">News</span></h3>
                    </div>
                </div>
                <hr className="text-nexus-secondary my-8 z-50" />
                <div className="flex flex-col justify-center items-center gap-4 text-nexus-secondary">
                    <div className="flex-1 text-center">
                        <h3><a href="#">Terms & Conditions</a></h3>
                        <h3><a href="#">Privacy Policy</a></h3>
                    </div>
                    {/* Social Media */}
                    <div className="flex-1 flex flex-row gap-8 justify-center text-2xl text-nexus-secondary">
                        <a href="https://x.com/nhb42" target="_blank" className="hover:text-nexus-primary">
                            <FaXTwitter></FaXTwitter></a>
                        <a href="https://fb.com/nazmul.batchu" target="_blank" className="hover:text-nexus-primary">
                            <FaFacebookF></FaFacebookF></a>
                        <a href="https://www.instagram.com/nazmulbatchu" target="_blank" className="hover:text-[darkred]">
                            <FaInstagram></FaInstagram></a>
                        <a href="https://github.com/nazmul-nhb/" target="_blank" className="hover:text-nexus-primary">
                            <FaGithub></FaGithub></a>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 items-center">
                        <span className="font-semibold text-nexus-primary">Nexus News</span>
                        <span className="text-nexus-secondary">2024 &copy; All Rights Reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;