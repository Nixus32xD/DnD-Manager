import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Loader2, Plus, Ghost } from 'lucide-react';
import CharacterCard from '../components/CharacterCard'; // <--- Importamos la tarjeta nueva

const CharactersPage = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchCharacters = async () => {
            if (!user || !user.token) {
                setLoading(false);
                return;
            }
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                // NOTA: Asegurate que tu backend use .populate() para 'class', 'species' y 'background'
                const res = await axios.get('http://localhost:4000/api/characters', config);
                setCharacters(res.data);
            } catch (error) {
                console.error("Error cargando personajes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, [user]);

    // Render de no logueado
    if (!user) return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl text-amber-500 font-serif mb-4">Acceso Restringido</h2>
            <p className="text-slate-400 mb-6">Debes iniciar sesión para ver tus héroes.</p>
            <Link to="/login" className="px-6 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition border border-slate-700">Conectarse</Link>
        </div>
    );

    return (
        <div className="container mx-auto p-6 max-w-7xl animate-in fade-in duration-500 pb-32">
            
            {/* Cabecera */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-amber-500">Tus Héroes</h1>
                    <p className="text-slate-400 mt-2 text-sm md:text-base">Gestiona tus personajes y prepárate para la aventura.</p>
                </div>
                <Link
                    to="/characters/create"
                    className="group bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-3 px-6 rounded-lg shadow-lg shadow-amber-900/20 transition-all flex items-center gap-2 transform active:scale-95"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> 
                    Crear Nuevo
                </Link>
            </div>

            {/* Contenido */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-amber-500/50">
                    <Loader2 className="w-10 h-10 animate-spin mb-4" />
                    <p>Invocando pergaminos...</p>
                </div>
            ) : (
                <>
                    {characters.length === 0 ? (
                        // Estado Vacío (Empty State)
                        <div className="text-center py-24 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/50 flex flex-col items-center">
                            <Ghost className="w-16 h-16 text-slate-700 mb-4" />
                            <h3 className="text-xl text-slate-300 font-bold mb-2">No hay héroes todavía</h3>
                            <p className="text-slate-500 mb-6 max-w-md">Tu taberna está vacía. Es hora de forjar una leyenda y comenzar tu viaje.</p>
                            <Link to="/characters/create" className="text-amber-500 hover:text-amber-400 font-bold hover:underline transition-colors">
                                ¡Crear mi primer personaje!
                            </Link>
                        </div>
                    ) : (
                        // Grilla de Personajes
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {characters.map(char => (
                                <CharacterCard key={char._id} character={char} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CharactersPage;