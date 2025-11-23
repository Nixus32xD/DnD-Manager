import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, Scroll, Brain, Sparkles, BookOpen, X, Hand, Mic, Box, Clock, Ruler, Hourglass, Shield } from "lucide-react";

// --- CONSTANTES Y UTILIDADES ---

const CLASSES = [
    "Bardo", "Brujo", "Clérigo", "Druida", "Explorador",
    "Guerrero", "Hechicero", "Mago", "Monje", "Paladín", "Pícaro"
];

const SCHOOLS = [
    "Abjuración", "Adivinación", "Conjuración", "Encantamiento",
    "Evocación", "Ilusionismo", "Nigromancia", "Transmutación"
];

const SCHOOL_COLORS = {
    "Abjuración": "text-blue-400 bg-blue-500/10 border-blue-500/20",
    "Adivinación": "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    "Conjuración": "text-orange-400 bg-orange-500/10 border-orange-500/20",
    "Encantamiento": "text-pink-400 bg-pink-500/10 border-pink-500/20",
    "Evocación": "text-red-500 bg-red-500/10 border-red-500/20",
    "Ilusionismo": "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    "Nigromancia": "text-purple-400 bg-purple-500/10 border-purple-500/20",
    "Transmutación": "text-amber-500 bg-amber-500/10 border-amber-500/20",
};

// --- COMPONENTE: MODAL DE DETALLES (LA TARJETA GRANDE) ---

function SpellModal({ spell, onClose }) {
    if (!spell) return null;

    // Cerrar al hacer clic fuera o presionar ESC
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const iconColorClass = SCHOOL_COLORS[spell.school] || "text-slate-400 bg-slate-500/10 border-slate-500/20";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar relative flex flex-col"
                onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
            >
                {/* Botón Cerrar */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors z-10">
                    <X className="w-5 h-5" />
                </button>

                {/* Header del Modal */}
                <div className="p-6 border-b border-slate-800 bg-slate-900/50 sticky top-0 backdrop-blur-md z-0">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl border ${iconColorClass}`}>
                            <Sparkles className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 font-serif leading-tight">
                                {spell.name}
                            </h2>
                            <div className="flex items-center gap-2 mt-1 text-sm font-medium text-slate-400 uppercase tracking-wider">
                                <span>{spell.level === 0 ? "Truco" : `Nivel ${spell.level}`}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                <span className="text-amber-500">{spell.school}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cuerpo del Modal */}
                <div className="p-6 space-y-6">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-black/20 p-3 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase font-bold mb-1">
                                <Clock className="w-3 h-3" /> Tiempo
                            </div>
                            <div className="text-sm text-slate-200 font-medium">{spell.castingTime}</div>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase font-bold mb-1">
                                <Ruler className="w-3 h-3" /> Alcance
                            </div>
                            <div className="text-sm text-slate-200 font-medium">{spell.range}</div>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase font-bold mb-1">
                                <Hourglass className="w-3 h-3" /> Duración
                            </div>
                            <div className="text-sm text-slate-200 font-medium">{spell.duration}</div>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg border border-slate-800 flex flex-col justify-center">
                            <div className="flex flex-wrap gap-1">
                                {spell.ritual && <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-400 text-xs rounded border border-emerald-800/50">Ritual</span>}
                                {spell.concentration && <span className="px-2 py-0.5 bg-indigo-900/40 text-indigo-400 text-xs rounded border border-indigo-800/50">Concen.</span>}
                                {!spell.ritual && !spell.concentration && <span className="text-xs text-slate-500">Instantáneo</span>}
                            </div>
                        </div>
                    </div>

                    {/* Componentes Detallados */}
                    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                        <h4 className="text-xs uppercase font-bold text-slate-500 mb-2 flex items-center gap-2">
                            <Box className="w-3 h-3" /> Componentes
                        </h4>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
                            <span className={spell.components.verbal ? "text-slate-200 font-bold" : "text-slate-600 line-through"}>Verbal</span>
                            <span className={spell.components.somatic ? "text-slate-200 font-bold" : "text-slate-600 line-through"}>Somático</span>
                            <span className={spell.components.material ? "text-amber-400 font-bold" : "text-slate-600 line-through"}>Material</span>
                        </div>
                        {spell.components.material && (
                            <div className="mt-2 text-sm text-amber-200/80 bg-amber-950/20 p-2 rounded border-l-2 border-amber-600 italic">
                                {spell.components.materialDescription}
                                {spell.components.cost > 0 && <span className="block text-xs not-italic text-amber-500 mt-1">Coste: {spell.components.cost} po {spell.components.consumed ? "(Se consume)" : ""}</span>}
                            </div>
                        )}
                    </div>

                    {/* Descripción Completa */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-serif font-bold text-slate-200 mb-2 flex items-center gap-2">
                                <Scroll className="w-4 h-4 text-slate-500" /> Descripción
                            </h3>
                            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                                {spell.description}
                            </div>
                        </div>

                        {spell.higherLevels && (
                            <div className="bg-slate-800/20 p-4 rounded-lg border-l-4 border-indigo-500">
                                <h4 className="text-sm font-bold text-indigo-400 mb-1">A Niveles Superiores</h4>
                                <p className="text-sm text-slate-300">{spell.higherLevels}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer del Modal */}
                <div className="p-4 bg-slate-950/50 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        <span className="font-bold uppercase">Clases:</span>
                        {spell.classes.map(cls => (
                            <span key={cls} className="px-2 py-0.5 bg-slate-800 rounded text-slate-300">{cls}</span>
                        ))}
                    </div>
                    <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Fuente: {spell.source}
                    </div>
                </div>

            </div>
        </div>
    );
}

// --- COMPONENTE: TARJETA DE GRID (VISTA PREVIA) ---

function SpellCard({ spell, onClick }) {
    const iconColorClass = SCHOOL_COLORS[spell.school] || "text-slate-400 bg-slate-500/10 border-slate-500/20";

    return (
        <div
            onClick={() => onClick(spell)}
            className="flex flex-col h-full p-5 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm
                   hover:border-amber-500/50 hover:bg-slate-800/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] 
                   hover:-translate-y-1 transition-all duration-300 group relative cursor-pointer"
        >

            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-full border ${iconColorClass} transition-colors`}>
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-100 font-serif leading-tight group-hover:text-amber-400 transition-colors">
                            {spell.name}
                        </h2>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {spell.level === 0 ? "Truco" : `Nivel ${spell.level}`} • {spell.school}
                        </span>
                    </div>
                </div>
            </div>

            {/* Info rápida */}
            <div className="flex gap-3 mb-3 text-xs text-slate-400 font-mono border-b border-slate-800/50 pb-2">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {spell.castingTime.split(',')[0]}</span>
                <span className="flex items-center gap-1"><Ruler className="w-3 h-3" /> {spell.range}</span>
            </div>

            {/* Descripción truncada */}
            <div className="flex-grow relative">
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-3">
                    {spell.description}
                </p>
                {/* Sombra de degradado para indicar más texto */}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-900/10 to-transparent" />
            </div>

            {/* Etiquetas Mini */}
            <div className="mt-auto pt-3 border-t border-slate-800 flex justify-between items-center">
                <div className="flex gap-1">
                    {spell.ritual && <span className="px-1.5 py-0.5 bg-emerald-900/30 text-emerald-400 text-[10px] rounded font-bold border border-emerald-900/50">R</span>}
                    {spell.concentration && <span className="px-1.5 py-0.5 bg-indigo-900/30 text-indigo-400 text-[10px] rounded font-bold border border-indigo-900/50">C</span>}
                </div>
                <div className="flex gap-1 text-[10px] text-slate-500 font-mono">
                    <span className={spell.components.verbal ? "text-slate-300" : "opacity-30"}>V</span>
                    <span className={spell.components.somatic ? "text-slate-300" : "opacity-30"}>S</span>
                    <span className={spell.components.material ? "text-amber-500" : "opacity-30"}>M</span>
                </div>
            </div>

            {/* Indicador de "Click para ver más" */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-white/[0.02] rounded-xl transition-colors pointer-events-none" />
        </div>
    );
}

// --- PÁGINA PRINCIPAL ---

export default function SpellsPage() {
    const [spells, setSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSpell, setSelectedSpell] = useState(null); // Estado para el modal

    // Estado de los filtros
    const [filters, setFilters] = useState({
        search: "",
        level: "",
        school: "",
        classe: "",
        ritual: false,
        concentration: false
    });

    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/spells");
                setSpells(res.data);
            } catch (error) {
                console.error("Error cargando hechizos", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSpells();
    }, []);

    // Manejador de filtros
    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const clearFilters = () => {
        setFilters({ search: "", level: "", school: "", classe: "", ritual: false, concentration: false });
    };

    // Lógica de filtrado
    const filteredSpells = spells.filter(spell => {
        if (filters.search && !spell.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.level !== "" && spell.level !== parseInt(filters.level)) return false;
        if (filters.school && spell.school !== filters.school) return false;
        if (filters.classe && !spell.classes.includes(filters.classe)) return false;
        if (filters.ritual && !spell.ritual) return false;
        if (filters.concentration && !spell.concentration) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200 font-sans pb-20">

            {/* Modal de Detalle */}
            {selectedSpell && (
                <SpellModal spell={selectedSpell} onClose={() => setSelectedSpell(null)} />
            )}

            <div className="container mx-auto px-4 py-12">

                {/* Header */}
                <div className="text-center mb-10 space-y-3">
                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                        <BookOpen className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 filter drop-shadow-lg">
                        Grimorio Arcano
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Consulta los antiguos tomos y descubre los secretos de la magia.
                    </p>
                </div>

                {/* Barra de Filtros */}
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 mb-8 shadow-2xl sticky top-20 z-30">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                        {/* Input Búsqueda */}
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
                            <input
                                type="text"
                                name="search"
                                placeholder="Buscar conjuro..."
                                value={filters.search}
                                onChange={handleFilterChange}
                                className="w-full bg-black/40 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 
                                   text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                            />
                        </div>

                        {/* Select Nivel */}
                        <div className="relative">
                            <select
                                name="level"
                                value={filters.level}
                                onChange={handleFilterChange}
                                className="w-full bg-black/40 border border-slate-700 rounded-lg py-2.5 px-4 
                                   text-slate-300 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Todos los Niveles</option>
                                <option value="0">Trucos (Nivel 0)</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => (
                                    <option key={lvl} value={lvl}>Nivel {lvl}</option>
                                ))}
                            </select>
                        </div>

                        {/* Select Clase */}
                        <div className="relative">
                            <select
                                name="classe"
                                value={filters.classe}
                                onChange={handleFilterChange}
                                className="w-full bg-black/40 border border-slate-700 rounded-lg py-2.5 px-4 
                                   text-slate-300 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Todas las Clases</option>
                                {CLASSES.map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                        </div>

                        {/* Select Escuela */}
                        <div className="relative">
                            <select
                                name="school"
                                value={filters.school}
                                onChange={handleFilterChange}
                                className="w-full bg-black/40 border border-slate-700 rounded-lg py-2.5 px-4 
                                   text-slate-300 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Todas las Escuelas</option>
                                {SCHOOLS.map(sch => (
                                    <option key={sch} value={sch}>{sch}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-4">
                        <div className="flex gap-4">
                            <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all select-none ${filters.ritual ? 'bg-emerald-950/50 border-emerald-700 text-emerald-400' : 'bg-black/20 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                                <input type="checkbox" name="ritual" checked={filters.ritual} onChange={handleFilterChange} className="hidden" />
                                <Scroll className="w-4 h-4" />
                                <span className="text-sm font-medium">Ritual</span>
                            </label>

                            <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all select-none ${filters.concentration ? 'bg-indigo-950/50 border-indigo-700 text-indigo-400' : 'bg-black/20 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                                <input type="checkbox" name="concentration" checked={filters.concentration} onChange={handleFilterChange} className="hidden" />
                                <Brain className="w-4 h-4" />
                                <span className="text-sm font-medium">Concentración</span>
                            </label>
                        </div>

                        <button onClick={clearFilters} className="text-xs font-medium text-slate-500 hover:text-amber-500 flex items-center gap-1 transition-colors uppercase tracking-wider">
                            <X className="h-3 w-3" /> Limpiar filtros
                        </button>
                    </div>
                </div>

                {/* Grid de Resultados */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-slate-800 border-t-amber-600 rounded-full animate-spin"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Sparkles className="h-6 w-6 text-amber-500" />
                            </div>
                        </div>
                        <p className="mt-6 text-slate-500 font-serif text-lg animate-pulse">Consultando los planos arcanos...</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 px-2 flex justify-between items-end border-b border-slate-800 pb-2">
                            <p className="text-slate-400 text-sm">
                                Mostrando <span className="text-amber-500 font-bold">{filteredSpells.length}</span> conjuros
                            </p>
                        </div>

                        {filteredSpells.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredSpells.map(spell => (
                                    <SpellCard
                                        key={spell._id}
                                        spell={spell}
                                        onClick={setSelectedSpell} // Pasamos la función para abrir el modal
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 bg-slate-900/30 rounded-xl border border-slate-800 border-dashed">
                                <div className="p-4 bg-slate-900 rounded-full mb-4">
                                    <BookOpen className="h-10 w-10 text-slate-700" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-300 mb-2 font-serif">Sin resultados</h3>
                                <p className="text-slate-500 text-center max-w-md mb-6">
                                    Ningún conjuro coincide con tu búsqueda. Intenta ajustar los filtros o el término de búsqueda.
                                </p>
                                <button onClick={clearFilters} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-amber-500 font-medium rounded-lg transition-colors border border-slate-700 hover:border-amber-500/30">
                                    Restablecer búsqueda
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}