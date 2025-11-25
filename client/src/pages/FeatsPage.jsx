import { useState, useEffect } from "react";
import axios from "axios";
import { Zap, Star, Shield, Sword, Crown, Search, X, CheckCircle2, AlertCircle, ArrowUpCircle } from "lucide-react";

// --- CONSTANTES ---

const CATEGORIES = [
    { id: "all", label: "Todas", icon: Zap },
    { id: "Origin", label: "De Origen", icon: Star },
    { id: "General", label: "General", icon: Shield },
    { id: "Fighting Style", label: "Estilos de Combate", icon: Sword },
    { id: "Epic Boon", label: "Dones Épicos", icon: Crown },
];

// Mapa de iconos para usar dinámicamente en las tarjetas
const CATEGORY_ICONS = {
    "Origin": Star,
    "General": Shield,
    "Fighting Style": Sword,
    "Epic Boon": Crown,
    "default": Zap
};

const CATEGORY_COLORS = {
    "Origin": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    "General": "text-blue-400 bg-blue-500/10 border-blue-500/20",
    "Fighting Style": "text-rose-400 bg-rose-500/10 border-rose-500/20",
    "Epic Boon": "text-amber-400 bg-amber-500/10 border-amber-500/20",
    "default": "text-slate-400 bg-slate-500/10 border-slate-500/20"
};

// --- COMPONENTE: MODAL DE DETALLES ---

function FeatModal({ feat, onClose }) {
    if (!feat) return null;

    // Cerrar con ESC
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const Icon = CATEGORY_ICONS[feat.category] || CATEGORY_ICONS["default"];
    const colorClass = CATEGORY_COLORS[feat.category] || CATEGORY_COLORS["default"];

    // Helper para renderizar prerrequisitos de forma limpia
    const hasPrerequisites = feat.prerequisites && (feat.prerequisites.level || feat.prerequisites.stat || feat.prerequisites.classFeature);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto dark-scrollbar relative flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón Cerrar */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors z-10">
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="p-6 border-b border-slate-800 bg-slate-900/50 sticky top-0 backdrop-blur-md z-0">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl border ${colorClass}`}>
                            <Icon className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 font-serif leading-tight">
                                {feat.name}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                                    {feat.category}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cuerpo */}
                <div className="p-6 space-y-6">

                    {/* Prerrequisitos (Caja de alerta visual) */}
                    {hasPrerequisites && (
                        <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 flex flex-col gap-2">
                            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                                <AlertCircle className="w-3 h-3" /> Prerrequisitos
                            </h4>
                            <div className="flex flex-wrap gap-3 text-sm text-slate-300 font-mono">
                                {feat.prerequisites.level && (
                                    <span className="bg-slate-800 px-2 py-1 rounded">Nivel {feat.prerequisites.level}+</span>
                                )}
                                {feat.prerequisites.stat && (
                                    <span className="bg-slate-800 px-2 py-1 rounded">
                                        {feat.prerequisites.stat.name} {feat.prerequisites.stat.value}+
                                    </span>
                                )}
                                {feat.prerequisites.classFeature && (
                                    <span className="bg-slate-800 px-2 py-1 rounded">
                                        Rasgo: {feat.prerequisites.classFeature}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Descripción */}
                    <div>
                        <p className="text-slate-300 italic leading-relaxed border-l-2 border-slate-700 pl-4">
                            "{feat.description}"
                        </p>
                    </div>

                    {/* Beneficios (Lista) */}
                    {feat.benefits && feat.benefits.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-serif font-bold text-slate-200 border-b border-slate-800 pb-2">
                                Beneficios
                            </h3>
                            <ul className="space-y-3">
                                {feat.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm group">
                                        <div className="mt-0.5 p-1 rounded-full bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors">
                                            {/* Icono condicional simple */}
                                            {benefit.includes("Mejora de característica") ? <ArrowUpCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                        </div>
                                        <span className="leading-relaxed">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {feat.table && (
                        <div className="mt-6">
                            <h4 className="text-sm font-bold text-amber-500 uppercase mb-3 tracking-widest border-b border-slate-800 pb-2">
                                {feat.table.title}
                            </h4>
                            <div className="overflow-hidden rounded-lg ">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-slate-950/80 text-slate-200 border-b border-slate-700">
                                            {feat.table.headers.map((header, i) => (
                                                <th key={i} className="p-3 font-serif font-bold">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50 bg-slate-900/30">
                                        {feat.table.rows.map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className="hover:bg-slate-800/50 transition-colors"
                                            >
                                                {row.map((cell, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        className={`p-3 text-slate-400 ${cellIndex === 0 ? 'font-medium text-amber-500/80' : ''}`}
                                                    >
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
    );
}

// --- COMPONENTE: TARJETA DE GRID ---

function FeatCard({ feat, onClick }) {
    const Icon = CATEGORY_ICONS[feat.category] || CATEGORY_ICONS["default"];
    const colorClass = CATEGORY_COLORS[feat.category] || CATEGORY_COLORS["default"];

    return (
        <div
            onClick={() => onClick(feat)}
            className="group flex flex-col h-full p-6 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm 
                       hover:border-amber-500/30 hover:bg-slate-800/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${colorClass} transition-colors`}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-100 font-serif group-hover:text-amber-400 transition-colors leading-tight">
                            {feat.name}
                        </h3>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                            {feat.category}
                        </span>
                    </div>
                </div>
            </div>

            {/* Previa de Requisitos */}
            {feat.prerequisites && (feat.prerequisites.level || feat.prerequisites.stat || feat.prerequisites.classFeature) ? (
                <div className="mb-3 text-xs font-mono text-amber-500/90 bg-amber-950/30 px-2 py-1 rounded inline-block self-start border border-amber-900/50">
                    Requisito: {feat.prerequisites.level ? `Nv ${feat.prerequisites.level}` :
                        feat.prerequisites.stat ? `${feat.prerequisites.stat.name.substring(0, 3)} ${feat.prerequisites.stat.value}` :
                            "Especial"}
                </div>
            ) : (
                <div className="mb-3 text-xs font-mono text-emerald-500/90 bg-emerald-950/30 px-2 py-1 rounded inline-block self-start border border-emerald-900/50">
                    Sin requisitos
                </div>
            )}

            <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-grow">
                {feat.description}
            </p>

            {/* Indicador visual de cantidad de beneficios */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3 h-3" />
                {feat.benefits ? `${feat.benefits.length} beneficios` : "Detalles"}
            </div>
        </div>
    );
}

// --- PÁGINA PRINCIPAL ---

export default function FeatsPage() {
    const [feats, setFeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFeat, setSelectedFeat] = useState(null); // Estado para el modal

    useEffect(() => {
        const fetchFeats = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/feats");
                setFeats(res.data);
            } catch (error) {
                console.error("Error fetching feats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeats();
    }, []);

    // Filtrado
    const filteredFeats = feats.filter(feat => {
        const matchesSearch = feat.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "all" || feat.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200 font-sans pb-20">

            {/* Modal */}
            {selectedFeat && (
                <FeatModal feat={selectedFeat} onClose={() => setSelectedFeat(null)} />
            )}

            <div className="container mx-auto px-4 py-12">

                {/* Header */}
                <div className="text-center mb-10 space-y-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 filter drop-shadow-lg">
                        Dotes y Talentos
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Personaliza tu personaje con habilidades especiales, estilos de combate y dones legendarios.
                    </p>
                </div>

                {/* Navegación por Categorías (Tabs) */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 font-medium text-sm
                                          ${isActive
                                        ? "bg-amber-600 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-105"
                                        : "bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Buscador Simple */}
                <div className="max-w-md mx-auto mb-10 relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar dote..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/40 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 
                                   text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                    />
                </div>

                {/* Grid de Dotes */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-slate-800 border-t-amber-600 rounded-full animate-spin"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Zap className="h-5 w-5 text-amber-500" />
                            </div>
                        </div>
                        <p className="mt-4 text-slate-500 font-serif animate-pulse">Consultando talentos...</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 px-2 flex justify-between items-end border-b border-slate-800 pb-2">
                            <p className="text-slate-400 text-sm">
                                Mostrando <span className="text-amber-500 font-bold">{filteredFeats.length}</span> dotes
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredFeats.length > 0 ? (
                                filteredFeats.map((feat) => (
                                    <FeatCard
                                        key={feat._id}
                                        feat={feat}
                                        onClick={setSelectedFeat} // Abre el modal
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 text-slate-500 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                                    No se encontraron dotes en esta categoría.
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}