function Header() {
    return (
        <>
            <nav className="flex flex-col sm:flex-row justify-between items-center text-xl font-serif w-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 py-4 px-6 sm:px-12 rounded-lg shadow-lg transition-all duration-500 hover:bg-sky-700">
                <span className="logo text-3xl sm:text-4xl font-bold font-mono text-white hover:cursor-pointer duration-500 transform hover:scale-110 hover:text-blue-800">
                    List Builder
                </span>
                <ul className="flex flex-col sm:flex-row items-center list-none sm:gap-6 gap-4">
                    <li className="text-white text-lg sm:text-xl hover:cursor-pointer duration-500 transform hover:scale-105 hover:text-sky-200 hover:underline">Tasks</li>
                    <li className="text-white text-lg sm:text-xl hover:cursor-pointer duration-500 transform hover:scale-105 hover:text-sky-200 hover:underline">Completed</li>
                    <li className="text-white text-lg sm:text-xl hover:cursor-pointer duration-500 transform hover:scale-105 hover:text-sky-200 hover:underline">Remains</li>
                </ul>
            </nav>
        </>
    );
}

export default Header;
