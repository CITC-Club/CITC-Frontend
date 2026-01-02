import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { IoWater } from 'react-icons/io5';

const ThemeToggler = () => {
    const { theme, toggleTheme } = useTheme();

    const getIcon = () => {
        switch (theme) {
            case 'light':
                return <FaSun className="h-5 w-5 text-yellow-500" />;
            case 'blue':
                return <IoWater className="h-5 w-5 text-white" />;
            case 'dark':
                return <FaMoon className="h-5 w-5 text-blue-300" />;
            default:
                return <FaSun className="h-5 w-5" />;
        }
    };

    const getLabel = () => {
        switch (theme) {
            case 'light':
                return 'Light Mode';
            case 'blue':
                return 'Blue Mode';
            case 'dark':
                return 'Dark Mode';
            default:
                return 'Light Mode';
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 blue:text-white hover:bg-gray-100 dark:hover:bg-gray-700 blue:hover:bg-blue-600 focus:outline-none transition-all duration-300"
            aria-label={`Switch theme - Currently ${getLabel()}`}
            title={`Switch to next theme (Current: ${getLabel()})`}
        >
            {getIcon()}
        </button>
    );
};

export default ThemeToggler;
