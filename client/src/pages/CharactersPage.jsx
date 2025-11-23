import { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard';
import { Link } from 'react-router-dom';

const CharactersPage = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/characters');
                setCharacters(res.data);
            } catch (error) {
                console.error("Error cargando personajes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

    return (
        <div>
            {/* Cabecera de la sección */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white font-serif">Tus Héroes</h1>
                    <p className="text-slate-400 mt-1">Gestiona tus personajes para la próxima aventura.</p>
                </div>
                <Link
                    to="/characters/create"
                    className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-2 px-6 rounded shadow-lg shadow-amber-900/40 transition transform hover:scale-105 flex items-center gap-2"
                >
                    <span>+</span> Crear Nuevo
                </Link>
            </div>

            {/* Estado de carga y Grilla */}
            {loading ? (
                <div className="text-center py-20 text-slate-500 animate-pulse">Invocando datos...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {characters.map(char => (
                        <CharacterCard key={char._id} character={char} />
                    ))}

                    {/* Tarjeta vacía para "Crear" (Opcional visual) */}
                    {characters.length === 0 && (
                        <div className="col-span-full text-center py-20 border-2 border-dashed border-slate-800 rounded-xl text-slate-600">
                            No hay héroes todavía. Es hora de forjar una leyenda.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CharactersPage;