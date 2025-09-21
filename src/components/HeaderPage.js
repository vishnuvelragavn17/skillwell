import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Logo } from "../svg.function"
import { CloseIcon, MenuIcon } from "../svg.function"


export default function HeaderPage({ goToLoginPage, handleLogin }) {
    const location = useLocation();
    const navigate = useNavigate();
    const isAbout = location.pathname === "/about";

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <header className="bg-white/80 shadow-sm sticky top-0 z-50 backdrop-blur-lg">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Logo />
                </div>
                <div className="hidden md:flex items-center space-x-2">
                    <button
                        className="px-4 py-2 font-medium rounded-lg transition-colors text-[#0b0d50] hover:bg-indigo-100"
                        onClick={() => navigate(isAbout ? "/" : "/about")}
                    >
                        {isAbout ? "Home" : "About Us"}
                    </button>
                    <button className="px-4 py-2 text-[#0b0d50] font-medium hover:bg-indigo-100 transition-colors rounded-lg" onClick={goToLoginPage}>Student Login</button>
                    <button onClick={goToLoginPage} className="bg-[#0b0d50] text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                        Mentor Login
                    </button>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <button
                        className="w-full text-left block px-6 py-3 font-medium rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
                        onClick={() => { navigate(isAbout ? "/" : "/about"); setIsMenuOpen(false); }}
                    >
                        {isAbout ? "Home" : "About Us"}
                    </button>
                    <button  className="w-full text-left block px-6 py-3 text-gray-600 hover:bg-gray-100 " onClick={goToLoginPage}>Student Login</button>
                    <button onClick={goToLoginPage} className="w-full text-left block px-6 py-3 text-gray-600 hover:bg-gray-100">Mentor Login</button>
                </div>
            )}
        </header>
    );
}

