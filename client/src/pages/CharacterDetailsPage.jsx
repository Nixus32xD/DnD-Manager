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

    // Asumimos que character.spellcastingAbility guarda el stat clave (ej: "intelligence")
    const spellAbilityKey = character.class?.spellcastingAbility || "intelligence";
    const spellMod = getRawMod(stats[spellAbilityKey] || 10);
    const spellSaveDC = 8 + pb + spellMod;
    const spellAttackBonus = pb + spellMod;

    // Helper para formatear monedas
    const formatMoney = (money) => {
        if (!money) return "0 po";
        return `${money.gp || 0}po ${money.sp || 0}pp ${money.cp || 0}pc`;
    };

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
                                                    <span className="text-[10px] text-slate-600 ml-2 uppercase">({STAT_LABELS[abilityKey]?.slice(0, 3)})</span>
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
                    {/* --- SECCIÓN INFERIOR: COMBATE, EQUIPO Y MAGIA --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                        {/* COLUMNA IZQUIERDA: COMBATE Y EQUIPO */}
                        <div className="space-y-6">

                            {/* 1. ATAQUES Y ARMAS */}
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                                <h2 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2">
                                    <Swords className="w-5 h-5" /> Acciones y Ataques
                                </h2>

                                {/* Tabla de Armas */}
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="text-slate-500 border-b border-slate-800">
                                                <th className="pb-2 font-bold uppercase text-xs">Nombre</th>
                                                <th className="pb-2 font-bold uppercase text-xs text-center">Bono</th>
                                                <th className="pb-2 font-bold uppercase text-xs">Daño</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            {/* Ejemplo estático o mapeo de character.weapons */}
                                            {(character.weapons || []).length > 0 ? (
                                                character.weapons.map((w, i) => (
                                                    <tr key={i} className="group hover:bg-slate-800/50 transition">
                                                        <td className="py-3 font-bold text-slate-200">{w.name}</td>
                                                        <td className="py-3 text-center text-amber-500 font-mono font-bold">
                                                            {formatBonus((w.isProficient ? pb : 0) + getRawMod(stats[w.stat || 'strength']))}
                                                        </td>
                                                        <td className="py-3 text-slate-400">
                                                            {w.damage} <span className="text-slate-600 text-xs">({w.damageType})</span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="py-4 text-center text-slate-600 italic">Sin armas equipadas</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* 2. INVENTARIO Y DINERO */}
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold text-amber-500 flex items-center gap-2">
                                        <Shield className="w-5 h-5" /> Equipo
                                    </h2>
                                    <div className="bg-amber-900/20 text-amber-500 px-3 py-1 rounded-lg text-xs font-mono font-bold border border-amber-900/50">
                                        {formatMoney(character.money)}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Lista simple de items */}
                                    <ul className="col-span-2 space-y-2 text-sm text-slate-300 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                        {(character.inventory || []).map((item, idx) => (
                                            <li key={idx} className="flex justify-between items-center border-b border-slate-800/50 pb-1 last:border-0">
                                                <span>{item.name}</span>
                                                <span className="text-slate-500 text-xs">x{item.quantity || 1}</span>
                                            </li>
                                        ))}
                                        {(character.inventory || []).length === 0 && <li className="text-slate-600 italic">Mochila vacía...</li>}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: MAGIA Y RECURSOS DE CLASE */}
                        <div className="space-y-6">

                            {/* 3. ADICIONALES (Recursos de Clase, Ki, Maestrias, Invocaciones) */}
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                                <h2 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2">
                                    <Zap className="w-5 h-5" /> Recursos de Clase
                                </h2>

                                {/* Grid de recursos contables (Ej: Ki, Rage, Espacios de Conjuro si querés ponerlos acá) */}
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {(character.resources || []).map((res, i) => (
                                        <div key={i} className="bg-slate-950 p-2 rounded border border-slate-800 text-center">
                                            <span className="block text-[10px] text-slate-500 uppercase font-bold truncate">{res.name}</span>
                                            <div className="text-xl font-bold text-white">
                                                {res.current} <span className="text-sm text-slate-600">/ {res.max}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Placeholder si no hay recursos */}
                                    {(character.resources || []).length === 0 && (
                                        <div className="col-span-3 text-center text-slate-600 text-sm italic py-2">
                                            Sin recursos especiales activos.
                                        </div>
                                    )}
                                </div>

                                {/* Lista de habilidades pasivas adicionales (Ej: Invocaciones, Estilos de combate) */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase border-b border-slate-800 pb-1">Maestrías / Invocaciones</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(character.additionals || []).map((add, i) => (
                                            <span key={i} className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs border border-slate-700" title={add.description}>
                                                {add.name}
                                            </span>
                                        ))}
                                        {(character.additionals || []).length === 0 && <span className="text-slate-600 text-xs italic">N/A</span>}
                                    </div>
                                </div>
                            </div>

                            {/* 4. CONJUROS (Solo si tiene spellcasting) */}
                            {(character.class?.canCastSpells || true) && ( // Cambiar true por la lógica real
                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-lg font-bold text-purple-400 flex items-center gap-2">
                                            <Brain className="w-5 h-5" /> Libro de Conjuros
                                        </h2>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-500 uppercase font-bold">CD Salvación</div>
                                            <div className="text-xl font-bold text-white">{spellSaveDC}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-500 uppercase font-bold">Ataque Mág.</div>
                                            <div className="text-xl font-bold text-white">+{spellAttackBonus}</div>
                                        </div>
                                    </div>

                                    {/* Renderizado de conjuros por nivel (Simplificado) */}
                                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {[0, 1, 2, 3, 4, 5].map(level => {
                                            // Filtrar conjuros por nivel (asumiendo estructura)
                                            const spells = (character.spells || []).filter(s => s.level === level);
                                            if (spells.length === 0) return null;

                                            return (
                                                <div key={level}>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="text-sm font-bold text-slate-400 uppercase">
                                                            {level === 0 ? "Trucos" : `Nivel ${level}`}
                                                        </h3>
                                                        {level > 0 && (
                                                            <div className="flex gap-1 ml-auto">
                                                                {/* Slots visuales (solo visual por ahora) */}
                                                                {[...Array(character.spellSlots?.[`level${level}`]?.max || 0)].map((_, i) => (
                                                                    <div key={i} className={`w-3 h-3 rounded-full border border-purple-500 ${i < (character.spellSlots?.[`level${level}`]?.current || 0) ? 'bg-purple-600' : 'bg-transparent'}`}></div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-1">
                                                        {spells.map((spell, idx) => (
                                                            <div key={idx} className="flex justify-between text-sm bg-slate-950/50 px-3 py-2 rounded hover:bg-slate-800 transition cursor-help group relative">
                                                                <span className="text-purple-200">{spell.name}</span>
                                                                <span className="text-xs text-slate-600 uppercase group-hover:text-slate-400">{spell.school || "Univ."}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {(character.spells || []).length === 0 && (
                                            <p className="text-slate-600 text-center italic py-4">Este personaje no conoce magia aún.</p>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};



export default CharacterDetailsPage;