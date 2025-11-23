import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-red-900 selection:text-white">

            {/* Navbar estilo "Pergamino Oscuro" */}
            <nav className="bg-slate-900 border-b border-amber-900/50 sticky top-0 z-50 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            {/* Icono simulado */}
                            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center transform group-hover:rotate-45 transition duration-300 shadow-lg shadow-red-900/50">
                                <span className="text-amber-100 font-bold text-lg">D&D</span>
                            </div>
                            <span className="text-xl font-bold text-slate-100 tracking-wider group-hover:text-amber-500 transition">
                                MANAGER
                            </span>
                        </Link>

                        {/* Enlaces */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/characters" className="text-slate-400 hover:text-amber-400 transition font-medium uppercase text-sm tracking-widest">
                                Personajes
                            </Link>
                            <Link to="/spells" className="text-slate-400 hover:text-amber-400 transition font-medium uppercase text-sm tracking-widest">
                                Conjuros
                            </Link>
                            <Link to="/rules" className="text-slate-400 hover:text-amber-400 transition font-medium uppercase text-sm tracking-widest">
                                Manual
                            </Link>
                            <Link to="/ua" className="text-slate-400 hover:text-amber-400 transition font-medium uppercase text-sm tracking-widest">
                                UNEARTHED ARCANA
                            </Link>
                            <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded border border-red-500 transition shadow-lg shadow-red-900/20">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenido Dinámico */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

        </div>
    );
};

export default MainLayout;