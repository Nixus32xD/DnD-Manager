import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {
    Loader2, ArrowLeft, Heart, Shield, Zap, Activity,
    Swords, Brain, Scroll, Edit, User as UserIcon, PlusCircle, Trash2
} from 'lucide-react';

// Diccionario de atributos
const STAT_LABELS = {
    strength: "Fuerza",
    dexterity: "Destreza",
    constitution: "Constitución",
    intelligence: "Inteligencia",
    wisdom: "Sabiduría",
    charisma: "Carisma"
};

// Diccionario de Habilidades
const SKILL_ABILITY_MAP = {
    "Acrobacias": "dexterity",
    "Atletismo": "strength",
    "Conocimiento Arcano": "intelligence",
    "Engaño": "charisma",
    "Historia": "intelligence",
    "Interpretación": "charisma",
    "Intimidación": "charisma",
    "Investigación": "intelligence",
    "Juego de Manos": "dexterity",
    "Medicina": "wisdom",
    "Naturaleza": "intelligence",
    "Percepción": "wisdom",
    "Perspicacia": "wisdom",
    "Persuasión": "charisma",
    "Religión": "intelligence",
    "Sigilo": "dexterity",
    "Supervivencia": "wisdom",
    "Trato con Animales": "wisdom"
};

const CharacterDetailsPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- MATEMÁTICAS ---
    const getRawMod = (val) => {
        const score = val?.value || val || 10;
        return Math.floor((score - 10) / 2);
    };

    const formatBonus = (val) => val >= 0 ? `+${val}` : val;

    const getProficiencyBonus = (level) => 2 + Math.floor((level - 1) / 4);

    const getInitiative = (stats) => {
        if (!stats?.dexterity) return 0;
        const val = stats.dexterity.value || stats.dexterity;
        return getRawMod(val);
    };

    // --- ACCIONES ---
    const handleLevelUp = async () => {
        if (!window.confirm(`¿Seguro que quieres subir a ${character.name} a nivel ${character.level + 1}?`)) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.patch(`http://localhost:4000/api/characters/${id}/level-up`, {}, config);
            setCharacter(res.data);
            alert("¡Nivel arriba! 🎉");
        } catch (err) {
            console.error(err);
            alert("Error al subir de nivel.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`⚠️ ¿Eliminar a ${character.name}? No hay vuelta atrás.`)) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:4000/api/characters/${id}`, config);
            navigate("/characters");
        } catch (err) {
            console.error(err);
            alert("No se pudo borrar.");
        }
    };

    // --- CARGA ---
    useEffect(() => {
        const fetchCharacter = async () => {
            if (!user?.token) return;
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const res = await axios.get(`http://localhost:4000/api/characters/${id}`, config);
                setCharacter(res.data);
            } catch (error) {
                console.error("Error cargando personaje", error);
                navigate('/characters');
            } finally {
                setLoading(false);
            }
        };
        fetchCharacter();
    }, [id, user, navigate]);

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-amber-500"><Loader2 className="animate-spin" /> Cargando...</div>;
    if (!character) return null;

    const pb = getProficiencyBonus(character.level);
    const stats = character.stats || {};
    const initiative = getInitiative(stats);
    const proficiencyList = character.proficiencies?.skills || character.selectedSkills || [];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">

            {/* --- HERO HEADER --- */}
            <div className="bg-slate-900 border-b border-slate-800 pb-8 pt-6 px-4 shadow-xl">
                <div className="container mx-auto max-w-6xl">
                    <Link to="/characters" className="inline-flex items-center text-slate-500 hover:text-white mb-6 transition">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Volver
                    </Link>

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-800 rounded-2xl border-2 border-slate-700 flex items-center justify-center shadow-lg">
                                <UserIcon className="w-10 h-10 text-slate-500" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{character.name}</h1>
                                <div className="flex flex-wrap gap-2 text-sm md:text-base text-slate-400">
                                    <span className="bg-amber-900/30 text-amber-500 px-3 py-1 rounded-full border border-amber-900/50 font-bold">Nivel {character.level}</span>
                                    <span className="px-2 py-1">{character.species?.name || "Especie"} {character.subspecies ? `(${character.subspecies})` : ''}</span>
                                    <span>•</span>
                                    <span className="px-2 py-1 text-slate-300 font-bold">{character.class?.name || "Clase"}</span>
                                    <span>•</span>
                                    <span className="px-2 py-1">{character.background?.name || "Trasfondo"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"><Edit className="w-4 h-4" /> Editar</button>
                            <button onClick={handleLevelUp} className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 rounded-lg border border-emerald-700 text-emerald-200 transition"><PlusCircle className="w-4 h-4" /> Nivel</button>
                            <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-800 rounded-lg border border-red-700 text-red-200 transition"><Trash2 className="w-4 h-4" /> Borrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 -mt-8">
                
                {/* --- HUD DE COMBATE --- */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-lg text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1 flex justify-center items-center gap-1"><Heart className="w-3 h-3" /> Puntos de Golpe</div>
                        <div className="text-3xl font-bold text-white">{character.hp?.current || 10} <span className="text-sm text-slate-600">/ {character.hp?.max || 10}</span></div>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-lg text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1 flex justify-center items-center gap-1"><Shield className="w-3 h-3" /> CA</div>
                        <div className="text-3xl font-bold text-white">{character.ac || 10}</div>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-lg text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600"></div>
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1 flex justify-center items-center gap-1"><Activity className="w-3 h-3" /> Velocidad</div>
                        <div className="text-3xl font-bold text-white">{character.speed || 9}<span className="text-sm">m</span></div>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-lg text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-600"></div>
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1 flex justify-center items-center gap-1"><Zap className="w-3 h-3" /> Iniciativa</div>
                        <div className="text-3xl font-bold text-white">{formatBonus(initiative)}</div>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-lg text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1 flex justify-center items-center gap-1"><Swords className="w-3 h-3" /> Competencia</div>
                        <div className="text-3xl font-bold text-white">+{pb}</div>
                    </div>
                </div>

                {/* --- GRILLA PRINCIPAL --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* 1. ATRIBUTOS Y SALVACIONES (CENTRADO MEJORADO) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h2 className="text-lg font-bold text-amber-500 border-b border-slate-800 pb-2">Atributos</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                            {Object.entries(stats).map(([key, val]) => {
                                const rawMod = getRawMod(val.value || val);
                                const isSaveProficient = !!val.save;
                                const saveTotal = rawMod + (isSaveProficient ? pb : 0);

                                return (
                                    <div key={key} className={`relative h-24 rounded-xl flex items-center justify-center border-2 transition-all 
                                        ${isSaveProficient 
                                            ? 'bg-amber-900/10 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.15)]' 
                                            : 'bg-slate-900 border-slate-800' 
                                        }`}>
                                        
                                        {/* Nombre y Valor (Fijo a la izquierda) */}
                                        <div className="absolute left-4 flex flex-col items-center gap-1">
                                            <div className={`text-[10px] uppercase font-bold tracking-wider ${isSaveProficient ? 'text-amber-500' : 'text-slate-500'}`}>
                                                {STAT_LABELS[key].slice(0, 3)}
                                            </div>
                                            <div className="text-sm text-slate-400 font-mono font-bold bg-slate-950/50 px-2 rounded border border-slate-800">
                                                {val.value || val}
                                            </div>
                                        </div>

                                        {/* Modificador Grande (Centrado Absoluto) */}
                                        <div className={`text-4xl font-bold ${isSaveProficient ? 'text-amber-100' : 'text-white'}`}>
                                            {formatBonus(rawMod)}
                                        </div>

                                        {/* Escudo de Salvación (Abajo) */}
                                        <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-3 py-0.5 rounded-full border flex items-center gap-1.5 shadow-md z-10
                                            ${isSaveProficient 
                                                ? 'bg-amber-600 border-amber-400 text-white' 
                                                : 'bg-slate-950 border-slate-700 text-slate-500'
                                            }`} 
                                            title="Tirada de Salvación">
                                            <Shield className="w-4 h-4 fill-current" />
                                            <span className="text-sm font-bold font-mono">
                                                {formatBonus(saveTotal)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. HABILIDADES (CON CÁLCULO REAL) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2"><Brain className="w-5 h-5" /> Habilidades</h2>
                            <div className="space-y-2">
                                {Object.keys(SKILL_ABILITY_MAP).sort().map(skillName => {
                                    const isProficient = proficiencyList.includes(skillName);
                                    const abilityKey = SKILL_ABILITY_MAP[skillName];
                                    const abilityMod = getRawMod(stats[abilityKey] || 10);
                                    const totalBonus = abilityMod + (isProficient ? pb : 0);

                                    return (
                                        <div key={skillName} className={`flex justify-between items-center p-2 rounded transition-colors ${isProficient ? 'bg-amber-900/20' : 'hover:bg-slate-800/50'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2.5 h-2.5 rounded-full ${isProficient ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-slate-700'}`}></div>
                                                <div>
                                                    <span className={`${isProficient ? 'text-white font-bold' : 'text-slate-400'}`}>{skillName}</span>
                                                    <span className="text-[10px] text-slate-600 ml-2 uppercase">({STAT_LABELS[abilityKey]?.slice(0,3)})</span>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-mono ${isProficient ? 'text-amber-500 font-bold' : 'text-slate-600'}`}>
                                                {formatBonus(totalBonus)}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 3. DERECHA */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2"><Scroll className="w-5 h-5" /> Rasgos y Dotes</h2>
                            {character.features && character.features.length > 0 ? (
                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {character.features.map((feat, idx) => (
                                        <div key={idx} className="border-l-2 border-amber-600 pl-3 py-1">
                                            <h4 className="font-bold text-slate-200 text-sm">{feat.name}</h4>
                                            <p className="text-[10px] text-amber-500/80 mb-1 uppercase tracking-wider">{feat.source}</p>
                                            <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500 italic text-sm">Sin rasgos especiales.</p>
                            )}
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2"><Scroll className="w-5 h-5" /> Trasfondo</h2>
                            <div className="prose prose-invert prose-sm max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                <p className="text-slate-300 text-sm italic">"{character.backstory || "Un libro en blanco..."}"</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="block text-slate-500 text-xs uppercase font-bold">Alineamiento</span>
                                    <span className="text-white">{character.alignment || "Neutral"}</span>
                                </div>
                                <div>
                                    <span className="block text-slate-500 text-xs uppercase font-bold">Apariencia</span>
                                    <span className="text-white line-clamp-1" title={character.appearance}>{character.appearance || "Desconocida"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetailsPage;