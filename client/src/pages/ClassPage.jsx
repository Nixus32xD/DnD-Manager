import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sword, Shield, Zap, X, ChevronRight, Scroll, BookOpen, Star, List } from 'lucide-react';
import Keyword from '../components/Keyword';

// Importamos íconos específicos de rol
import { GiSharpAxe, GiFragmentedSword, GiWarlockEye, GiHolyGrail, GiChargedArrow, GiSwordsEmblem, GiCrystalWand, GiSpellBook, GiPunchBlast, GiCloakDagger } from "react-icons/gi";
import { LiaGuitarSolid } from "react-icons/lia";
import { FaWolfPackBattalion } from "react-icons/fa";

const CLASS_ICONS = {
    "Bárbaro": GiSharpAxe,
    "Paladín": GiFragmentedSword,
    "Bardo": LiaGuitarSolid,
    "Brujo": GiWarlockEye,
    "Clérigo": GiHolyGrail,
    "Druida": FaWolfPackBattalion,
    "Explorador": GiChargedArrow,
    "Hechicero": GiCrystalWand,
    "Guerrero": GiSwordsEmblem,
    "Mago": GiSpellBook,
    "Monje": GiPunchBlast,
    "Pícaro": GiCloakDagger,
};

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [loading, setLoading] = useState(true);

    // Estado para las pestañas: 'general' | 'subclasses' | 'options'
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/classes');
                setClasses(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    const openModal = (cls) => {
        setSelectedClass(cls);
        setActiveTab('general'); // Reseteamos a la primera pestaña siempre que se abre
    };

    return (
        <div className="container mx-auto animate-fadeIn p-4 pb-20">
            <div className="mb-12 text-center">
                <h1 className="text-5xl font-bold text-amber-500 font-serif mb-4 drop-shadow-md">Clases</h1>
                <p className="text-slate-400 text-lg">Elige tu camino y define tu destino.</p>
            </div>

            {/* GRID DE CLASES */}
            {loading ? (
                <div className="text-center text-slate-500">Consultando los tomos...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((cls) => (
                        <div
                            key={cls._id}
                            onClick={() => openModal(cls)}
                            className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-amber-600/50 cursor-pointer transition-all hover:-translate-y-1 group relative overflow-hidden"
                        >
                            {(() => {
                                const Icon = CLASS_ICONS[cls.name];
                                return Icon ? (
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Icon className="w-24 h-24 text-amber-500" />
                                    </div>
                                ) : null;
                            })()}
                            <h2 className="text-2xl font-bold text-slate-100 font-serif mb-2 group-hover:text-amber-500 transition-colors">{cls.name}</h2>
                            <div className="flex gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                                <span>d{cls.hitDie} PG</span>
                                <span>•</span>
                                <span>{cls.primaryAbility.join(" / ")}</span>
                            </div>
                            <p className="text-slate-400 text-sm line-clamp-3">{cls.description}</p>
                            <div className="mt-4 flex items-center text-amber-600 text-sm font-bold">
                                Ver Detalles <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL DE DETALLE */}
            {selectedClass && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedClass(null)}>
                    <div className="bg-slate-900 border border-slate-700 w-full max-w-6xl max-h-[95vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>

                        {/* HEADER DEL MODAL (Fijo) */}
                        <div className="bg-slate-950 border-b border-slate-800 shrink-0">
                            <div className="p-6 flex justify-between items-start">
                                <div>
                                    <h2 className="text-4xl font-bold text-amber-500 font-serif mb-2">{selectedClass.name}</h2>
                                    <div className="flex gap-4 text-sm text-slate-400">
                                        <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> d{selectedClass.hitDie}</span>
                                        <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> {selectedClass.primaryAbility.join("/")}</span>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedClass(null)} className="p-2 hover:bg-red-900/30 rounded-full text-slate-400 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* MENÚ DE PESTAÑAS */}
                            <div className="flex px-6 gap-6 text-sm font-bold uppercase tracking-wider overflow-x-auto custom-scrollbar">
                                <button
                                    onClick={() => setActiveTab('general')}
                                    className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'general' ? 'text-amber-500 border-amber-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                                >
                                    Progresión
                                </button>

                                {selectedClass.subclasses && selectedClass.subclasses.length > 0 && (
                                    <button
                                        onClick={() => setActiveTab('subclasses')}
                                        className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'subclasses' ? 'text-amber-500 border-amber-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                                    >
                                        Subclases
                                    </button>
                                )}

                                {selectedClass.optionalFeatures && selectedClass.optionalFeatures.length > 0 && (
                                    <button
                                        onClick={() => setActiveTab('options')}
                                        className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'options' ? 'text-amber-500 border-amber-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                                    >
                                        Opciones de Clase
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* CONTENIDO (Variable según la pestaña) */}
                        <div className="overflow-y-auto p-6 custom-scrollbar flex-1">

                            {/* 1. PESTAÑA GENERAL: Tabla y Equipo */}
                            {activeTab === 'general' && (
                                <div className="animate-in slide-in-from-bottom-2 duration-300">
                                    {/* Tabla de Progresión */}
                                    <div className="mb-8 border border-slate-800 rounded-lg overflow-hidden shadow-lg bg-slate-950">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-sm text-slate-300">
                                                <thead className="bg-slate-900 text-xs uppercase font-bold text-amber-500 border-b border-slate-800">
                                                    <tr>
                                                        <th className="px-4 py-3 w-16 text-center">Nivel</th>
                                                        <th className="px-4 py-3 w-16 text-center">Bonif.</th>
                                                        <th className="px-4 py-3 min-w-[200px]">Rasgos</th>
                                                        {selectedClass.tableMetadata?.columns.map((col, idx) => (
                                                            <th key={idx} className="px-4 py-3 text-center whitespace-nowrap">{col.label}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-800">
                                                    {selectedClass.progression.map((level) => (
                                                        <tr key={level.level} className="hover:bg-slate-800/50 transition-colors">
                                                            <td className="px-4 py-3 text-center font-bold text-slate-500">{level.level}</td>
                                                            <td className="px-4 py-3 text-center text-slate-200">+{level.proficiencyBonus}</td>
                                                            <td className="px-4 py-3">
                                                                {/* Rasgos con Keyword */}
                                                                {level.features.length > 0 ? (
                                                                    level.features.map((f, i) => (
                                                                        <span key={i}>
                                                                            <Keyword>{f.name}</Keyword>
                                                                            {i < level.features.length - 1 && ", "}
                                                                        </span>
                                                                    ))
                                                                ) : "-"}
                                                            </td>
                                                            {/* Celdas Dinámicas */}
                                                            {selectedClass.tableMetadata?.columns.map((col, idx) => (
                                                                <td key={idx} className="px-4 py-3 text-center text-amber-100/80">
                                                                    {level.classSpecific ? level.classSpecific[col.dataKey] : "-"}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Proficiencias y Equipo */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-slate-800/30 p-5 rounded-lg border border-slate-800">
                                            <h3 className="text-amber-500 font-bold mb-3 font-serif flex items-center gap-2"><Shield className="w-4 h-4" /> Proficiencias</h3>
                                            <ul className="space-y-2 text-sm text-slate-300">
                                                <li><strong className="text-slate-500 uppercase text-xs">Armadura:</strong> <br /> {selectedClass.proficiencies.armor.join(", ")}</li>
                                                <li><strong className="text-slate-500 uppercase text-xs">Armas:</strong> <br /> {selectedClass.proficiencies.weapons.join(", ")}</li>
                                                <li><strong className="text-slate-500 uppercase text-xs">Salvaciones:</strong> <br /> {selectedClass.savingThrows.join(", ")}</li>
                                            </ul>
                                        </div>
                                        <div className="bg-slate-800/30 p-5 rounded-lg border border-slate-800">
                                            <h3 className="text-amber-500 font-bold mb-3 font-serif flex items-center gap-2"><Scroll className="w-4 h-4" /> Equipo Inicial</h3>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300 marker:text-amber-700">
                                                {selectedClass.startingEquipment.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 2. PESTAÑA SUBCLASES */}
                            {activeTab === 'subclasses' && selectedClass.subclasses && (
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
                                    {selectedClass.subclasses.map((sub, idx) => (
                                        <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-amber-700/50 transition-colors">
                                            <h4 className="text-xl font-bold text-amber-500 font-serif mb-2 flex items-center justify-between">
                                                {sub.name}
                                                <Star className="w-4 h-4 text-slate-600" />
                                            </h4>
                                            <p className="text-slate-400 text-sm mb-6 italic border-l-2 border-slate-800 pl-3">"{sub.description}"</p>

                                            {/* TABLA DE CONJUROS AMPLIADA (SI TIENE) */}
                                            {sub.expandedSpells && sub.expandedSpells.length > 0 && (
                                                <div className="mb-6 bg-slate-900/80 rounded-lg border border-slate-800 overflow-hidden">
                                                    <div className="bg-slate-800/50 px-3 py-2 border-b border-slate-800 text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-2">
                                                        <BookOpen className="w-3 h-3" /> Conjuros de Patrón
                                                    </div>
                                                    <table className="w-full text-sm text-left">
                                                        <tbody className="divide-y divide-slate-800">
                                                            {sub.expandedSpells.map((row, i) => (
                                                                <tr key={i} className="hover:bg-slate-800/30">
                                                                    <td className="px-3 py-2 text-slate-500 font-mono text-xs w-20 border-r border-slate-800">
                                                                        Nivel {row.spellLevel}
                                                                    </td>
                                                                    <td className="px-3 py-2 text-slate-300">
                                                                        {row.list.map((spell, j) => (
                                                                            <span key={j}>
                                                                                <Keyword>{spell}</Keyword>
                                                                                {j < row.list.length - 1 && ", "}
                                                                            </span>
                                                                        ))}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}

                                            <div className="space-y-3">
                                                {sub.features.map((feat, fIdx) => (
                                                    <div key={fIdx} className="bg-slate-900/50 rounded p-3 text-sm border border-slate-800/50">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="font-bold text-slate-200" >
                                                                {feat.name}
                                                            </span>
                                                            <span className="text-[10px] font-bold bg-slate-800 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">Nivel {feat.level}</span>
                                                        </div>
                                                        <p className="text-slate-400 text-xs leading-relaxed" dangerouslySetInnerHTML={{
                                                            __html: feat.description.replace(/\n/g, '<br />')
                                                        }}></p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 3. PESTAÑA OPCIONES (Solo si existen) */}
                            {activeTab === 'options' && selectedClass.optionalFeatures && (
                                <div className="animate-in slide-in-from-right-4 duration-300 space-y-8">
                                    {selectedClass.optionalFeatures.map((opt, idx) => (
                                        <div key={idx}>
                                            <div className="mb-6">
                                                <h3 className="text-2xl font-bold text-amber-500 font-serif flex items-center gap-2">
                                                    <List className="w-6 h-6" /> {opt.title}
                                                </h3>
                                                <p className="text-slate-400 mt-1">{opt.description}</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {opt.items.map((item, i) => (
                                                    <div key={i} className="bg-slate-950 border border-slate-800 p-4 rounded-lg hover:border-slate-600 transition-colors">
                                                        <h4 className="font-bold text-slate-200 mb-1">
                                                            {item.name}
                                                        </h4>
                                                        {item.requirements && item.requirements !== '-' && (
                                                            <span className="text-xs text-amber-600 font-bold uppercase tracking-wider mb-2 block">
                                                                Req: {item.requirements}
                                                            </span>
                                                        )}
                                                        <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{
                                                            __html: item.description.replace(/\n/g, '<br />')
                                                        }}></p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassesPage;