import React, { useState, useEffect } from 'react';
import { Logo } from '../svg.function';
import { SearchIcon, FilterIcon, ArrowsUpDownIcon, MenuIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '../svg.function';
import { useNavigate } from 'react-router-dom';
import HeaderPage from './HeaderPage';


// --- Helper Data & Components ---

// Expanded course data to demonstrate pagination and pricing
const coursesData = [
    { id: 1, title: 'Introduction to Web Development', category: 'Web Development', description: 'Master the basics of HTML, CSS, and JavaScript. Perfect for beginners.', image: 'https://placehold.co/600x400/8e44ad/ffffff?text=Web+Dev', price: 49.99 },
    { id: 2, title: 'Advanced React & Hooks', category: 'Web Development', description: 'Dive deep into React, state management, and advanced patterns.', image: 'https://placehold.co/600x400/27ae60/ffffff?text=React', price: 99.99 },
    { id: 3, title: 'UI/UX Design Fundamentals', category: 'Design', description: 'Learn the principles of user-centric design and create beautiful interfaces.', image: 'https://placehold.co/600x400/c0392b/ffffff?text=UI/UX', price: 79.99 },
    { id: 4, title: 'Data Science with Python', category: 'Data Science', description: 'Unlock the power of data with Python, Pandas, and Matplotlib.', image: 'https://placehold.co/600x400/f39c12/ffffff?text=Data+Science', price: 129.99 },
    { id: 5, title: 'Machine Learning A-Z', category: 'Data Science', description: 'From regression to neural networks, build your first ML models.', image: 'https://placehold.co/600x400/2980b9/ffffff?text=ML', price: 199.99 },
    { id: 6, title: 'Digital Marketing Mastery', category: 'Marketing', description: 'Learn SEO, SEM, and social media marketing to grow any business.', image: 'https://placehold.co/600x400/16a085/ffffff?text=Marketing', price: 89.99 },
    { id: 7, title: 'The Complete JavaScript Course', category: 'Web Development', description: 'From fundamentals to advanced topics, become a JS pro.', image: 'https://placehold.co/600x400/f1c40f/ffffff?text=JavaScript', price: 149.99 },
    { id: 8, title: 'Graphic Design Masterclass', category: 'Design', description: 'Learn Adobe Photoshop, Illustrator, and InDesign from scratch.', image: 'https://placehold.co/600x400/e74c3c/ffffff?text=Graphics', price: 99.99 },
    { id: 9, title: 'SQL for Data Analysis', category: 'Data Science', description: 'Master SQL, database management, and data analysis techniques.', image: 'https://placehold.co/600x400/34495e/ffffff?text=SQL', price: 79.99 },
    { id: 10, title: 'Content Marketing Strategy', category: 'Marketing', description: 'Build a content strategy that drives traffic and conversions.', image: 'https://placehold.co/600x400/9b59b6/ffffff?text=Content', price: 59.99 },
    { id: 11, title: 'Vue.js - The Complete Guide', category: 'Web Development', description: 'Build amazing Vue.js applications from scratch. Includes Vuex!', image: 'https://placehold.co/600x400/2ecc71/ffffff?text=Vue.js', price: 99.99 },
    { id: 12, title: 'Figma for UI/UX Designers', category: 'Design', description: 'Master Figma for collaborative interface design and prototyping.', image: 'https://placehold.co/600x400/3498db/ffffff?text=Figma', price: 69.99 },
];


// --- Main App Component ---
export default function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [allFilteredCourses, setAllFilteredCourses] = useState([]);
    const [sortOption, setSortOption] = useState('a-z');
    const [loginMessage, setLoginMessage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    const navigate = useNavigate();
    const goToAnotherPage = () => {

        navigate('/about');
    };
    const goToLoginPage = () => {

        navigate('/login');
    };

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 6;

    const categories = ['All', ...new Set(coursesData.map(course => course.category))];
    const sortOptions = {
        'a-z': 'A-Z',
        'z-a': 'Z-A',
        'price-low-high': 'Price: Low to High',
        'price-high-low': 'Price: High to Low',
    };

    useEffect(() => {
        // Initial load
        setAllFilteredCourses(coursesData);
    }, []);

    useEffect(() => {
        let results = [...coursesData];

        if (selectedCategory !== 'All') {
            results = results.filter(course => course.category === selectedCategory);
        }

        if (searchTerm.trim() !== '') {
            results = results.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        results.sort((a, b) => {
            switch (sortOption) {
                case 'z-a':
                    return b.title.localeCompare(a.title);
                case 'price-low-high':
                    return a.price - b.price;
                case 'price-high-low':
                    return b.price - a.price;
                case 'a-z':
                default:
                    return a.title.localeCompare(b.title);
            }
        });

        // Trigger reflow for animation
        setAllFilteredCourses([]);
        setTimeout(() => setAllFilteredCourses(results), 50);

    }, [searchTerm, sortOption, selectedCategory]);

    // Reset to page 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, sortOption]);

    const handleLogin = async (userType) => {
        setLoginMessage(`Attempting ${userType} login...`);
        try {
            await new Promise(res => setTimeout(res, 1000)); // Mock network delay
            setLoginMessage(`${userType} login successful!`);
        } catch (error) {
            setLoginMessage(`Network error during ${userType} login.`);
        }
        setTimeout(() => setLoginMessage(''), 4000);
    };

    // Pagination logic
    const lastCourseIndex = currentPage * coursesPerPage;
    const firstCourseIndex = lastCourseIndex - coursesPerPage;
    const displayedCourses = allFilteredCourses.slice(firstCourseIndex, lastCourseIndex);
    const totalPages = Math.ceil(allFilteredCourses.length / coursesPerPage);


    return (
        <>
            <style>{`
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }

            @keyframes card-fade-in {
                from { opacity: 0; transform: scale(0.95) translateY(10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .card-animate { animation: card-fade-in 0.5s ease-out forwards; }
        `}</style>
            {/* <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen font-sans text-gray-800"> */}
            <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen font-sans text-gray-800 text-[17px] leading-[1.7]">
                {/* Header */}
                <HeaderPage
                    goToAnotherPage={goToAnotherPage}
                    goToLoginPage={goToLoginPage}
                    handleLogin={handleLogin}
                />

                {loginMessage && (
                    <div className="fixed top-20 right-6 bg-white shadow-xl rounded-lg p-4 z-50 border-l-4 border-indigo-500 animate-pulse">
                        <p className="text-sm font-medium text-gray-700">{loginMessage}</p>
                    </div>
                )}

                {/* Main Content */}
                <main className="container mx-auto px-6 py-12">
                    <section className="text-center mb-20 relative z-20">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-[#0b0d50] mb-4 tracking-tight fade-in-up" style={{ animationDelay: '100ms' }}>
                            Find Your Next <span className="text-indigo-600">Passion</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 fade-in-up" style={{ animationDelay: '200ms' }}>
                            Explore thousands of courses from top mentors around the world. Your learning journey starts here.
                        </p>
                        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 fade-in-up" style={{ animationDelay: '300ms' }}>
                            <div className="relative flex-grow">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for courses, categories, or skills..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm focus:shadow-md"
                                />
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <div className="relative z-[1000]">
                                    <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors w-full justify-center sm:w-auto shadow-sm hover:shadow-md">
                                        <FilterIcon className="h-5 w-5 text-gray-500" />
                                        <span className="font-medium">Filter</span>
                                    </button>
                                    {isFilterOpen && (
                                        <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl z-[1000] border right-0 sm:right-auto sm:left-0">
                                            {categories.map(category => (
                                                <button
                                                    key={category}
                                                    onClick={() => { setSelectedCategory(category); setIsFilterOpen(false); }}
                                                    className={`w-full text-left px-4 py-2 text-gray-700 transition-colors duration-150 ${selectedCategory === category ? 'bg-indigo-100 font-semibold text-indigo-700' : 'hover:bg-gray-100'}`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="relative z-[1000]">
                                    <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2 bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md">
                                        <ArrowsUpDownIcon className="h-5 w-5 text-gray-500" />
                                        <span className="font-medium">Sort</span>
                                    </button>
                                    {isSortOpen && (
                                        <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl z-[1000] border right-0">
                                            {Object.entries(sortOptions).map(([key, value]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => { setSortOption(key); setIsSortOpen(false); }}
                                                    className={`w-full text-left px-4 py-2 text-gray-700 transition-colors duration-150 ${sortOption === key ? 'bg-indigo-100 font-semibold text-indigo-700' : 'hover:bg-gray-100'}`}
                                                >
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="relative z-0">
                        <h2 className="text-3xl font-bold mb-8 text-[#0b0d50]">
                            {selectedCategory === 'All' ? 'All Courses' : `${selectedCategory} Courses`}
                        </h2>
                        {displayedCourses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {displayedCourses.map((course, index) => (
                                    <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group flex flex-col card-animate" style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}>
                                        <div className="relative">
                                            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="text-sm font-semibold text-indigo-600 mb-1">{course.category}</p>
                                                <p className="text-xl font-bold text-green-600">${course.price.toFixed(2)}</p>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#0b0d50] mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                                            <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
                                            <button className="w-full bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform group-hover:scale-105 mt-4 shadow-md group-hover:shadow-lg">
                                                View Course
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-gray-100 rounded-lg card-animate">
                                <p className="text-xl text-gray-500 font-semibold">No courses found.</p>
                                <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria.</p>
                            </div>
                        )}
                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center items-center space-x-1 sm:space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeftIcon className="h-5 w-5" />
                                    <span className="ml-1 hidden sm:inline">Prev</span>
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-lg border border-gray-300 font-medium transition-colors ${currentPage === page ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <span className="mr-1 hidden sm:inline">Next</span>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 text-white mt-20">
                    <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Logo />
                            </div>
                            <p className="text-gray-400">Empowering minds through accessible online education.</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Courses</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Development</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Data Science</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Design</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Marketing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                                {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li> */}

                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Connect</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.72-1.88-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.8 1.91 3.56-.71 0-1.37-.22-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.94.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.35 0-.69-.02-1.03-.06A12.02 12.02 0 0 0 8.5 20c7.79 0 12.05-6.46 12.05-12.05 0-.18 0-.37-.01-.55.83-.6 1.55-1.35 2.14-2.22z"></path></svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-900">
                        <div className="container mx-auto px-6 py-4 text-center text-gray-500">
                            &copy; 2022 SkillWell. All Rights Reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

