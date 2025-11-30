import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Al cargar, revisamos si hay un usuario guardado en el navegador
        const storedUser = localStorage.getItem('dndUser');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('dndUser', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('dndUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};