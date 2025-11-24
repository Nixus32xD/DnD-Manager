import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Scroll, X, Star, Backpack, Hammer, BookOpen, Dna, User } from "lucide-react";

// --- COMPONENTE MODAL ---
function BackgroundModal({ background, onClose }) {
    if (!background) return null;

    // Cerrar con ESC
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div 
                className="bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto dark-scrollbar relative flex flex-col" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón Cerrar */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors z-10">
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="p-6 border-b border-slate-800 bg-slate-900/50 sticky top-0 backdrop-blur-md z-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-900/20 border border-emerald-500/30 text-emerald-400">
                            <Scroll className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-100 font-serif leading-tight">
                                {background.name}
                            </h2>
                            <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">Trasfondo de Origen</span>
                        </div>
                    </div>
                </div>

                {/* Cuerpo */}
                <div className="p-6 space-y-6">
                    
                    {/* Descripción */}
                    <p className="text-slate-300 italic text-lg leading-relaxed border-l-4 border-emerald-600/50 pl-4 bg-emerald-950/10 py-2 rounded-r">
                        "{background.description}"
                    </p>

                    {/* Grid de Características */}
                    <div className="grid md:grid-cols-2 gap-6">
                        
                        {/* Bonificadores de Característica */}
                        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                            <h4 className="text-sm font-bold text-amber-500 uppercase mb-3 flex items-center gap-2">
                                <Dna className="w-4 h-4" /> Mejora de Característica
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {background.abilityScores.map((stat, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-600">
                                        + {stat}
                                    </span>
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Elige tres características. Aumenta una en +2 y otra en +1, o tres distintas en +1.
                            </p>
                        </div>

                        {/* Dote Otorgada */}
                        <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-500/30">
                            <h4 className="text-sm font-bold text-amber-400 uppercase mb-2 flex items-center gap-2">
                                <Star className="w-4 h-4" /> Dote de Origen
                            </h4>
                            {background.feat ? (
                                <div>
                                    <span className="text-lg font-serif font-bold text-slate-100 block mb-1">
                                        {background.feat.name}
                                    </span>
                                    <p className="text-xs text-slate-400 line-clamp-3">
                                        {background.feat.description}
                                    </p>
                                </div>
                            ) : (
                                <span className="text-slate-500 text-sm italic">Sin dote asignada</span>
                            )}
                        </div>
                    </div>

                    {/* Competencias */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-2">Competencias</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <BookOpen className="w-5 h-5 text-blue-400 mt-0.5" />
                                <div>
                                    <span className="block text-sm font-bold text-slate-300">Habilidades</span>
                                    <span className="text-sm text-slate-400">{background.skillProficiencies.join(", ")}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Hammer className="w-5 h-5 text-rose-400 mt-0.5" />
                                <div>
                                    <span className="block text-sm font-bold text-slate-300">Herramientas</span>
                                    <span className="text-sm text-slate-400">{background.toolProficiencies.join(", ")}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Equipo Inicial */}
                    <div className="bg-black/20 p-4 rounded-xl border border-slate-800">
                        <h4 className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                            <Backpack className="w-4 h-4" /> Equipo Inicial
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {background.equipment.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

// --- COMPONENTE TARJETA GRID ---
function BackgroundCard({ background, onClick }) {
    return (
        <div 
            onClick={() => onClick(background)}
            className="group flex flex-col p-6 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm 
                       hover:border-emerald-500/30 hover:bg-slate-800/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full relative overflow-hidden"
        >
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 p-20 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full">
                {/* Encabezado */}
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700 group-hover:border-emerald-500/30 group-hover:text-emerald-300 transition-colors">
                        <User className="w-6 h-6" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-100 font-serif group-hover:text-emerald-400 transition-colors mb-2">
                    {background.name}
                </h3>

                <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-grow">
                    {background.description}
                </p>

                {/* Footer: Dote y Stats */}
                <div className="space-y-3 pt-4 border-t border-slate-800/50">
                    {/* Dote */}
                    <div className="flex items-center gap-2 text-xs font-medium text-amber-500 bg-amber-950/20 px-2 py-1.5 rounded border border-amber-900/30">
                        <Star className="w-3 h-3" />
                        <span>Dote: {background.feat ? background.feat.name : "Desconocida"}</span>
                    </div>

                    {/* Stats Mini */}
                    <div className="flex flex-wrap gap-1">
                        {background.abilityScores.map((stat, i) => (
                            <span key={i} className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                                {stat.substring(0, 3)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- PÁGINA PRINCIPAL ---
export default function BackgroundsPage() {
    const [backgrounds, setBackgrounds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBg, setSelectedBg] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchBackgrounds = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/backgrounds");
                setBackgrounds(res.data);
            } catch (error) {
                console.error("Error cargando trasfondos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBackgrounds();
    }, []);

    const filteredBackgrounds = backgrounds.filter(bg => 
        bg.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200 font-sans pb-20">
            
            {selectedBg && <BackgroundModal background={selectedBg} onClose={() => setSelectedBg(null)} />}

            <div className="container mx-auto px-4 py-12">
                
                {/* Header */}
                <div className="text-center mb-12 space-y-3">
                    <h1 className="text-4xl md:text-6xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-emerald-500 to-teal-700 filter drop-shadow-lg">
                        Orígenes y Trasfondos
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Descubre quién eras antes de convertirte en aventurero. Cada origen moldea tus habilidades y talentos.
                    </p>
                </div>

                {/* Buscador */}
                <div className="max-w-md mx-auto mb-12 relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar trasfondo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/40 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 
                                   text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="text-center py-20 animate-pulse text-slate-500 font-serif text-lg">Recordando vidas pasadas...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredBackgrounds.length > 0 ? (
                            filteredBackgrounds.map(bg => (
                                <BackgroundCard key={bg._id} background={bg} onClick={setSelectedBg} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-slate-500 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                                No se encontraron trasfondos con ese nombre.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}