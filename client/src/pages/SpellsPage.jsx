import { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const SpellsPage = () => {
    const [spells, setSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/spells');
                setSpells(res.data);
            } catch (error) {
                console.error("Error cargando hechizos", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSpells();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="text-center py-20 text-slate-500 animate-pulse" > Invocando datos...</div>
            ) : (

                <div>
                    {spells.map(spell => (
                        <div key={spell._id} className="mb-4 p-4 border border-gray-300 rounded">
                            <h2 className="text-xl font-bold">{spell.name}</h2>
                            <p className="text-sm text-gray-500 mb-2">Nivel: {spell.level} | Escuela: {spell.school}</p>
                            <p className="text-gray-700 mb-2">Tiempo de lanzamiento: {spell.castingTime}</p>
                            <p className="text-gray-700">{spell.description}</p>
                            <p className="text-gray-900 pt-2">{spell.higherLevels}</p>

                        </div>
                    ))}
                </div>
            )
            }
        </div>
    );
}

export default SpellsPage;