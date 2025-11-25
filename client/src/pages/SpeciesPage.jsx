import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Eye, Activity, Ruler, X, Info, Sparkles, Table as TableIcon } from 'lucide-react';

const SpeciesPage = () => {
    const [speciesList, setSpeciesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSpecies, setSelectedSpecies] = useState(null);

    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/species');
                setSpeciesList(res.data);
            } catch (error) {
                console.error("Error cargando especies", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSpecies();
    }, []);

    return (
        <div className="container mx-auto animate-fadeIn p-4 pb-20">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-amber-500 font-serif mb-4 drop-shadow-md">
                    Especies del Multiverso
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">
                    Explora las opciones para tu personaje.
                </p>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="text-center py-20">
                    <Sparkles className="w-10 h-10 text-amber-500 mx-auto animate-spin mb-4" />
                    <p className="text-slate-500">Consultando los archivos de los sabios...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {speciesList.map((species) => (
                        <div
                            key={species._id}
                            onClick={() => setSelectedSpecies(species)}
                            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-amber-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/20 group cursor-pointer flex flex-col"
                        >
                            {/* Cabecera de Tarjeta */}
                            <div className="bg-slate-950 p-5 border-b border-slate-800 flex justify-between items-center group-hover:bg-slate-900 transition-colors relative">
                                <h2 className="text-2xl font-bold text-slate-200 font-serif group-hover:text-amber-500">
                                    {species.name}
                                </h2>
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                                    {species.creatureType}
                                </span>
                            </div>

                            {/* Cuerpo */}
                            <div className="p-6 flex-1 flex flex-col gap-6">
                                <p className="text-slate-400 text-sm italic leading-relaxed line-clamp-3">
                                    "{species.description}"
                                </p>

                                {/* Stats Rápidos */}
                                <div className="grid grid-cols-3 gap-3 text-center">
                                    <StatBadge icon={Activity} label="Velocidad" value={`${species.speed}m`} color="text-green-500" />
                                    <StatBadge icon={Eye} label="Visión" value={species.darkvision > 0 ? `${species.darkvision}m en la oscuridad` : 'Normal'} color="text-blue-500" />
                                    <StatBadge icon={Ruler} label="Tamaño" value={species.size === 'Medium' ? 'Med' : 'Peq'} color="text-amber-500" />
                                </div>

                                {/* Preview de Rasgos */}
                                <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                                    <span className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" /> {species.traits.length} Rasgos
                                    </span>
                                    <span className="flex items-center gap-1 text-amber-600/80 text-xs font-bold uppercase tracking-wider">
                                        Ver Detalles <Info className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- MODAL DE DETALLES --- */}
            {selectedSpecies && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedSpecies(null)}>
                    
                    <div 
                        className="bg-slate-900 border border-amber-700/50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Botón Cerrar */}
                        <button 
                            onClick={() => setSelectedSpecies(null)}
                            className="absolute top-4 right-4 p-2 bg-slate-950/50 hover:bg-red-900/50 text-slate-400 hover:text-white rounded-full transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Header del Modal */}
                        <div className="bg-slate-950 p-8 border-b border-slate-800 relative overflow-hidden shrink-0">
                             {/* Fondo decorativo */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                            <h2 className="text-4xl font-bold text-amber-500 font-serif mb-4 relative z-10">{selectedSpecies.name}</h2>
                            
                             {/* Descripción con Scroll */}
                            <div className="relative z-10 max-h-32 overflow-y-auto pr-4 custom-scrollbar">
                                <p className="text-slate-300 text-lg font-light leading-relaxed">
                                    {selectedSpecies.description}
                                </p>
                            </div>
                        </div>

                        {/* Contenido Scrollable */}
                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            
                            {/* 1. PRIMERO MOSTRAMOS LOS RASGOS */}
                            <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2 pb-2 border-b border-slate-800">
                                <Sparkles className="w-5 h-5 text-amber-500" /> Rasgos de la Especie
                            </h3>

                            <div className="grid gap-4 mb-8">
                                {selectedSpecies.traits.map((trait, idx) => (
                                    <div key={idx} className="bg-slate-950/50 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-colors">
                                        <h4 className="text-amber-400 font-bold text-lg mb-2 font-serif flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                                            {trait.name}
                                        </h4>
                                        <p className="text-slate-300 text-sm leading-relaxed pl-4 border-l-2 border-slate-800">
                                            {trait.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* 2. DESPUÉS MOSTRAMOS LA TABLA (SI EXISTE) */}
                            {selectedSpecies.table && selectedSpecies.table.rows.length > 0 && (
                                <div className="mb-2 border border-slate-800 rounded-xl overflow-hidden shadow-lg animate-fadeIn">
                                    <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center gap-2">
                                        <TableIcon className="w-4 h-4 text-amber-500" />
                                        <h4 className="text-amber-500 font-bold font-serif text-sm tracking-wider uppercase">
                                            {selectedSpecies.table.title}
                                        </h4>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm text-slate-300">
                                            <thead className="bg-slate-800/50 text-xs uppercase font-bold text-slate-400">
                                                <tr>
                                                    {selectedSpecies.table.headers.map((header, i) => (
                                                        <th key={i} className="px-6 py-3 whitespace-nowrap">{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800">
                                                {selectedSpecies.table.rows.map((row, i) => (
                                                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                                        {row.map((cell, j) => (
                                                            <td key={j} className={`px-6 py-3 ${j === 0 ? 'font-bold text-amber-500/90' : ''}`}>
                                                                {cell}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Componente auxiliar para los badges de stats
const StatBadge = ({ icon: Icon, label, value, color }) => (
    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/50 flex flex-col items-center justify-center gap-1 group-hover:border-slate-700/80 transition-colors">
        <Icon className={`w-5 h-5 ${color} mb-1`} />
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{label}</span>
        <span className="text-sm font-bold text-slate-200">{value}</span>
    </div>
);

export default SpeciesPage;