import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Shield, Sword, Backpack, Hammer, Gavel, X, Coins, Scale, Box } from "lucide-react";

// Categorías para los filtros (Coinciden con el Enum del Schema)
const CATEGORIES = [
    { id: "all", label: "Todo", icon: Box },
    { id: "Weapon", label: "Armas", icon: Sword },
    { id: "Armor", label: "Armaduras", icon: Shield },
    { id: "Gear", label: "Equipo", icon: Backpack },
    { id: "Tool", label: "Herramientas", icon: Hammer },
];

// --- COMPONENTE MODAL ---
function ItemModal({ item, onClose }) {
    if (!item) return null;

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div 
                className="bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto dark-scrollbar relative flex flex-col" 
                onClick={(e) => e.stopPropagation()}
            >
                
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors z-10">
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="p-6 border-b border-slate-800 bg-slate-900/50 sticky top-0 backdrop-blur-md z-0 ">
                    <h2 className="text-2xl font-bold text-slate-100 font-serif">{item.name}</h2>
                    <div className="flex gap-2 mt-2">
                        <span className="text-xs font-bold px-2 py-1 bg-slate-800 text-amber-500 rounded border border-slate-700 uppercase tracking-wider">
                            {item.type === 'Weapon' ? 'Arma' : 
                             item.type === 'Armor' ? 'Armadura' : 
                             item.type === 'Tool' ? 'Herramienta' : 'Equipo'}
                        </span>

                        {(item.weaponCategory || item.armorCategory) && (
                            <span className="text-xs font-bold px-2 py-1 bg-slate-800 text-slate-400 rounded border border-slate-700 uppercase tracking-wider">
                                {item.weaponCategory || item.armorCategory}
                            </span>
                        )}
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
                            <div className="p-2 rounded-full bg-amber-500/10 text-amber-500"><Coins className="w-4 h-4"/></div>
                            <div>
                                <span className="text-xs text-slate-500 block uppercase font-bold">Coste</span>
                                <span className="text-slate-200 font-mono">
                                    {item.cost ? `${item.cost.quantity} ${item.cost.unit}` : "-"}
                                </span>
                            </div>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
                            <div className="p-2 rounded-full bg-slate-700/30 text-slate-400"><Scale className="w-4 h-4"/></div>
                            <div>
                                <span className="text-xs text-slate-500 block uppercase font-bold">Peso</span>
                                <span className="text-slate-200 font-mono">{item.weight} kg</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {item.damage && (
                            <div className="p-4 bg-red-950/10 border border-red-900/30 rounded-lg flex justify-between items-center">
                                <div>
                                    <span className="text-red-400 font-bold text-xs uppercase block mb-1">Daño</span>
                                    <span className="text-slate-100 text-lg font-serif">
                                        {item.damage.dice} <span className="text-sm text-slate-400 lowercase">{item.damage.type}</span>
                                    </span>
                                </div>
                                {item.range && item.range.normal && (
                                    <div className="text-right">
                                        <span className="text-slate-500 font-bold text-xs uppercase block mb-1">Alcance</span>
                                        <span className="text-slate-300 text-sm font-mono">
                                            {item.range.normal}m {item.range.long ? `/ ${item.range.long}m` : ""}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {item.ac && (
                            <div className="p-4 bg-blue-950/10 border border-blue-900/30 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-blue-400 font-bold text-xs uppercase">Clase de Armadura</span>
                                    <span className="text-slate-100 text-xl font-serif font-bold">
                                        {item.ac.base > 0 ? item.ac.base : "+" + item.ac.base}
                                    </span>
                                </div>
                                <div className="flex gap-2 text-xs text-slate-400">
                                    {item.ac.addDex && <span className="bg-blue-900/20 px-2 py-1 rounded">+ Des {item.ac.maxDex ? `(Máx ${item.ac.maxDex})` : ""}</span>}
                                    {item.stealthDisadvantage && <span className="text-red-400 bg-red-950/20 px-2 py-1 rounded border border-red-900/20">Desv. Sigilo</span>}
                                    {item.strengthReq > 0 && <span className="bg-slate-800 px-2 py-1 rounded">Fuerza {item.strengthReq}</span>}
                                </div>
                            </div>
                        )}

                        {item.masteryProperty && (
                            <div className="flex items-center gap-3 text-sm text-purple-200 bg-purple-900/10 p-3 rounded border border-purple-500/20">
                                <div className="p-1.5 bg-purple-500/20 rounded-full text-purple-400"><Gavel className="w-4 h-4" /></div>
                                <span>Propiedad de Maestría: <strong className="text-purple-100 uppercase tracking-wide">{item.masteryProperty}</strong></span>
                            </div>
                        )}

                        {item.properties && item.properties.length > 0 && (
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Propiedades</h4>
                                <div className="flex flex-wrap gap-2">
                                    {item.properties.map((prop, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700">
                                            {prop}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {item.description && (
                            <div className="text-slate-400 text-sm leading-relaxed pt-4 border-t border-slate-800">
                                {item.description}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- COMPONENTE TARJETA GRID ---
function ItemCard({ item, onClick }) {
    let Icon = Box;
    if (item.type === "Weapon") Icon = Sword;
    if (item.type === "Armor") Icon = Shield;
    if (item.type === "Tool") Icon = Hammer;
    if (item.type === "Gear") Icon = Backpack;

    return (
        <div 
            onClick={() => onClick(item)}
            className="group flex flex-col h-full p-5 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm 
                       hover:border-amber-500/40 hover:bg-slate-800/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-lg bg-slate-800 text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-950/30 transition-colors border border-slate-700 group-hover:border-amber-500/20">
                        <Icon className="w-5 h-5" />
                    </div>

                    {/* FIX TRUNCATE → min-w-0 agregado */}
                    <div className="overflow-hidden min-w-0">
                        <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors leading-tight truncate pr-2">
                            {item.name}
                        </h3>

                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-0.5 truncate">
                            {item.weaponCategory || item.armorCategory || item.subcategory || item.type}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-grow space-y-2 mb-4">
                {item.damage ? (
                    <p className="text-sm text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        {item.damage.dice} <span className="text-xs text-slate-500 uppercase">{item.damage.type}</span>
                    </p>
                ) : item.ac ? (
                    <p className="text-sm text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        CA {item.ac.base} {item.ac.addDex ? "+ Des" : ""}
                    </p>
                ) : (
                    <p className="text-xs text-slate-500 line-clamp-2 italic leading-relaxed">
                        {item.description}
                    </p>
                )}
            </div>

            <div className="mt-auto pt-3 border-t border-slate-800/60 flex justify-between items-center text-xs font-mono text-amber-500/80">
                <span className="flex items-center gap-1"><Coins className="w-3 h-3"/> {item.cost?.quantity} {item.cost?.unit}</span>
                {item.weight > 0 && <span className="text-slate-600">{item.weight} kg</span>}
            </div>
        </div>
    );
}

// --- PÁGINA PRINCIPAL ---
export default function ItemsPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeType, setActiveType] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/items");
                setItems(res.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = activeType === "all" || item.type === activeType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200 font-sans pb-20">
            
            {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}

            <div className="container mx-auto px-4 py-12">
                
                <div className="text-center mb-10 space-y-3">
                    <h1 className="text-4xl md:text-6xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 filter drop-shadow-lg mb-4">
                        Armería y Equipo
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Equípate para la aventura con las mejores armas, armaduras y herramientas del reino.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeType === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveType(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-medium
                                    ${isActive 
                                        ? "bg-amber-600 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]" 
                                        : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200"}`}
                            >
                                <Icon className="w-4 h-4" /> {cat.label}
                            </button>
                        );
                    })}
                </div>

                <div className="max-w-md mx-auto mb-10 relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar objeto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/40 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 
                                   text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                    />
                </div>

                {loading ? (
                    <div className="text-center py-20 animate-pulse text-slate-500 font-serif text-lg">
                        Abriendo el inventario...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                                <ItemCard key={item._id} item={item} onClick={setSelectedItem} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-slate-500 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                                No se encontraron objetos en el inventario.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
