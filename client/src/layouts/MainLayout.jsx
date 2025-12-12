import { useContext, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importamos el contexto
import { Shield, User, LogOut, Menu, X, Crown, Scroll } from 'lucide-react';

const MainLayout = () => {
    const { user, logout } = useContext(AuthContext); // Obtenemos el usuario y la función logout
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-red-900 selection:text-white flex flex-col">

            {/* Navbar estilo "Pergamino Oscuro" */}
            <nav className="bg-slate-900 border-b border-amber-900/50 sticky top-0 z-50 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center transform group-hover:rotate-45 transition duration-300 shadow-lg shadow-red-900/50">
                                <span className="text-amber-100 font-bold text-lg">D</span>
                            </div>
                            <span className="text-xl font-bold text-slate-100 tracking-wider group-hover:text-amber-500 transition font-serif">
                                D&D MANAGER
                            </span>
                        </Link>

                        {/* Enlaces de Escritorio */}
                        <div className="hidden md:flex items-center space-x-8">

                            {/* Enlaces Públicos/Comunes */}
                            <Link to="/rules" className="text-slate-400 hover:text-amber-400 transition font-medium uppercase text-sm tracking-widest flex items-center gap-1">
                                <Scroll className="w-4 h-4" /> Reglas
                            </Link>

                            {/* Lógica de Usuario Logueado */}
                            {user ? (
                                <>
                                    {/* Enlace para Jugadores (Mis Personajes) */}
                                    <Link to="/characters" className="text-slate-400 hover:text-amber-400 transition font-medium uppercase text-sm tracking-widest flex items-center gap-1">
                                        <User className="w-4 h-4" /> Mis Héroes
                                    </Link>

                                    {/* Enlace Exclusivo para DM */}
                                    {user.role === 'dm' && (
                                        <Link to="/dm-dashboard" className="text-amber-500 hover:text-amber-300 transition font-medium uppercase text-sm tracking-widest flex items-center gap-1">
                                            <Crown className="w-4 h-4" /> Gestionar Partidas
                                        </Link>
                                    )}

                                    {/* Menú de Usuario */}
                                    <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-700">
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 uppercase font-bold">
                                                {user.role === 'dm' ? 'Dungeon Master' : 'Aventurero'}
                                            </p>
                                            <p className="text-sm font-bold text-slate-200 leading-none">{user.username}</p>
                                        </div>

                                        <button
                                            onClick={handleLogout}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-900/20 rounded-full transition-colors"
                                            title="Cerrar Sesión"
                                        >
                                            <LogOut className="w-5 h-5" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                /* Lógica de Usuario NO Logueado */
                                <div className="flex gap-4">
                                    <Link to="/login" className="text-slate-300 hover:text-white font-medium px-3 py-2 transition">
                                        Iniciar Sesión
                                    </Link>
                                    <Link to="/register" className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded border border-red-500 transition shadow-lg shadow-red-900/20 font-bold">
                                        Registrarse
                                    </Link>
                                </div>
                            )}

                        </div>

                        {/* Botón Menú Móvil */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-white">
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menú Móvil Desplegable */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
                        <Link to="/spells" className="block text-slate-300 hover:text-amber-500 py-2">Compendio</Link>

                        {user ? (
                            <>
                                <Link to="/characters" className="block text-slate-300 hover:text-amber-500 py-2">Mis Héroes</Link>
                                {user.role === 'dm' && (
                                    <Link to="/dm-dashboard" className="block text-amber-500 font-bold py-2">Gestionar Partidas</Link>
                                )}
                                <div className="border-t border-slate-800 my-2 pt-2">
                                    <p className="text-xs text-slate-500 mb-1">Sesión de {user.username}</p>
                                    <button onClick={handleLogout} className="text-red-400 hover:text-red-300 flex items-center gap-2 w-full text-left py-2">
                                        <LogOut className="w-4 h-4" /> Cerrar Sesión
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <Link to="/login" className="text-center py-2 border border-slate-700 rounded text-slate-300">Login</Link>
                                <Link to="/register" className="text-center py-2 bg-red-700 text-white rounded font-bold">Registro</Link>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            {/* Contenido Dinámico */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <Outlet />
            </main>

        </div>
    );
};

export default MainLayout;