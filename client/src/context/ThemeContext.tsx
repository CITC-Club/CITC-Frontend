import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'blue' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'blue' || savedTheme === 'dark') {
            return savedTheme as Theme;
        }

        // Fall back to system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove all theme classes first to ensure clean state
        root.classList.remove('light', 'blue', 'dark');

        // Add the current theme class
        root.classList.add(theme);

        // Save to localStorage
        localStorage.setItem('theme', theme);

        // Update meta theme-color for mobile browsers (Safari iOS, Chrome Android)
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        const themeColors = {
            light: '#ffffff',
            blue: '#1E5FBF',
            dark: '#0f172a'
        };

        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', themeColors[theme]);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = themeColors[theme];
            document.head.appendChild(meta);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => {
            // Cycle through: light → blue → dark → light
            if (prev === 'light') return 'blue';
            if (prev === 'blue') return 'dark';
            return 'light';
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
