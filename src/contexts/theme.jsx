import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  themeMode: 'light',
  darkTheme: () => {},
  lightTheme: () => {},
  cardBackgroundColor: 'white', // Add card background color to the context
});

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    localStorage.setItem('theme', themeMode);
    document.body.style.backgroundColor = themeMode === 'dark' ? 'black' : 'white';
  }, [themeMode]);

  const lightTheme = () => setThemeMode('light');
  const darkTheme = () => setThemeMode('dark');

  const cardBackgroundColor = themeMode === 'dark' ? 'white' : 'black';

  return (
    <ThemeContext.Provider value={{ themeMode, lightTheme, darkTheme, cardBackgroundColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  return useContext(ThemeContext);
}
