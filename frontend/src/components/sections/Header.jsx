import { Divider, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Facebook, Instagram, LinkedIn, MenuOpen, WhatsApp } from '@mui/icons-material';
import { href, Link } from 'react-router-dom';

const Header = ({ connectOpen, setConnectOpen }) => {
    const NAV_ITEMS = [
        { label: 'Home', to: 'home', callBack: () => { } },
        { label: 'About', to: 'about', callBack: () => { } },
        { label: 'Services', to: 'services', callBack: () => { } },
        { label: 'Connect', to: 'connect', callBack: () => { setConnectOpen(true) } },
    ];

    const [isScroll, setIsScroll] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Header */}
            <header className={`${isScroll ? "md:-translate-y-100 translate-y-0" : ""}  relative md:h-[135px] shadow-lg h-[70px] left-0 z-40 top-0 w-full bg-white`}>
                {/* Top Bar */}
                <nav className="h-[35px] fixed z-40 px-15 text-xs hidden md:flex items-center justify-between bg-[#d4f7e8] w-full">
                    <p>Welcome to our website</p>
                    <div className="flex items-center gap-5 py-2 text-xs">
                        {NAV_ITEMS.map((item, index) => (
                            <button
                                onClick={item.callBack} key={item.to}>
                                <ScrollLink
                                    className="cursor-pointer text-xs"
                                    to={item.to}
                                    offset={-100}
                                    smooth={true}
                                    duration={500}
                                >
                                    {item.label}

                                </ScrollLink>
                                {index < NAV_ITEMS.length - 1 && <Divider flexItem orientation="vertical" />}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Main Navbar */}
                <nav className="h-[70px] fixed md:h-[100px] z-40 w-full top-0 md:top-[35px] py-7 flex items-center justify-between bg-white px-4 md:px-15 shadow-md">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img className="h-12" src="/logo/261E53FA-0E50-46EB-8208-40B3F387A021_4_5005_c.jpeg" alt="Logo" />
                    </div>

                    {/* Contact Info & Social Icons */}
                    <div className="md:flex hidden gap-7 text-xs">
                        <div>
                            <p>Need Help? 24x7</p>
                            <p>+91 9119071612</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            {[
                                {
                                    icon: <Instagram fontSize='inherit' />,
                                    href: "http://instagram.com/health.care.connect/?igsh=dWE4Zm14OG55eXE0#"
                                }, {
                                    icon: <LinkedIn fontSize='inherit' />,
                                    href: "https://www.facebook.com/people/Kajal-Kiran/pfbid059tZtpXsYxyRystJpPLuhQ8a8s6dXkK8eG2RhYj3TsM5GJske471xo4PWMFZLbk2l/?rdid=shmmWt9df5fNfhHt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Dwn8mXM7v%2F"
                                }, {
                                    icon: <WhatsApp fontSize='inherit' />,
                                    href: "https://wa.me/+919119071612"
                                }, {
                                    icon: <Facebook fontSize='inherit' />,
                                    href: "https://www.facebook.com/people/Kajal-Kiran/pfbid059tZtpXsYxyRystJpPLuhQ8a8s6dXkK8eG2RhYj3TsM5GJske471xo4PWMFZLbk2l/?rdid=shmmWt9df5fNfhHt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Dwn8mXM7v%2F"
                                }].map((I, idx) => (
                                    <Link
                                        to={I.href}
                                        key={idx}
                                        className="cursor-pointer text-xs p-2 h-6 w-6 flex justify-center items-center border border-black rounded-full"
                                    >
                                        {I.icon}
                                    </Link>
                                ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <IconButton onClick={() => setMenuOpen(!menuOpen)}>
                            <MenuOpen />
                        </IconButton>
                    </div>
                </nav>
            </header>

            {/* Fixed Navbar on Scroll */}
            <nav
                className={`${isScroll ? "translate-y-0" : "-translate-y-full"} fixed w-full px-10 top-0 h-[100px] justify-between hidden md:flex items-center bg-white transition-all duration-200 z-50 shadow-md`}
            >
                <img className="h-12" src="/logo/261E53FA-0E50-46EB-8208-40B3F387A021_4_5005_c.jpeg" alt="Logo" />
                <section className="flex gap-7">
                    <div className="flex items-center gap-5 py-2 text-xs">
                        {NAV_ITEMS.map((item, index) => (
                            <React.Fragment key={item.to}>
                                <ScrollLink
                                    className="cursor-pointer text-xs"
                                    to={item.to}
                                    smooth={true}
                                    duration={500}
                                >
                                    {item.label}
                                </ScrollLink>
                                {index < NAV_ITEMS.length - 1 && <Divider flexItem orientation="vertical" />}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="flex gap-3 items-center">
                        {[
                            {
                                icon: <Instagram fontSize='inherit' />,
                                href: "http://instagram.com/health.care.connect/?igsh=dWE4Zm14OG55eXE0#"
                            }, {
                                icon: <LinkedIn fontSize='inherit' />,
                                href: "https://www.facebook.com/people/Kajal-Kiran/pfbid059tZtpXsYxyRystJpPLuhQ8a8s6dXkK8eG2RhYj3TsM5GJske471xo4PWMFZLbk2l/?rdid=shmmWt9df5fNfhHt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Dwn8mXM7v%2F"
                            }, {
                                icon: <WhatsApp fontSize='inherit' />,
                                href: "https://wa.me/+919119071612"
                            }, {
                                icon: <Facebook fontSize='inherit' />,
                                href: "https://www.facebook.com/people/Kajal-Kiran/pfbid059tZtpXsYxyRystJpPLuhQ8a8s6dXkK8eG2RhYj3TsM5GJske471xo4PWMFZLbk2l/?rdid=shmmWt9df5fNfhHt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Dwn8mXM7v%2F"
                            }].map((I, idx) => (
                                <Link
                                    to={I.href}
                                    key={idx}
                                    className="cursor-pointer text-xs p-2 h-6 w-6 flex justify-center items-center border border-black rounded-full"
                                >
                                    {I.icon}
                                </Link>
                            ))}
                    </div>
                </section>
            </nav>

            {/* Mobile Menu */}

            <div onClick={()=>{setMenuOpen(false)}} className={`${menuOpen ? '' : 'hidden' } fixed top-0 w-screen bg-black transition-all duration-75 right-0 h-screen z-50 opacity-15 p-5 shadow-md md:hidden`} />
            <div className={`${menuOpen ? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 h-screen w-64 z-50 bg-white shadow-lg md:hidden transition-transform duration-200 ease-in-out rounded-l-xl p-6`}>
    <ul className="space-y-4">
        {NAV_ITEMS.map((item) => (
            <ScrollLink
                key={item.to}
                className="block p-3 text-base font-medium text-gray-800 border-b border-gray-200 hover:bg-gray-100 hover:rounded-lg transition-all"
                to={item.to}
                smooth={true}
                duration={500}
                onClick={() => setMenuOpen(false)}
            >
                {item.label}
            </ScrollLink>
        ))}
    </ul>
</div>


        </>
    );
};

export default Header;
