import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Sword, User, Heart, ChevronRight, ChevronLeft, Check, Loader2, Save, BookOpen, Shield, FileText, Brain, Lock, Star, Zap } from 'lucide-react';

// 1. CONSTANTES Y DICCIONARIOS

const STAT_TRANSLATIONS = {
    strength: "Fuerza", dexterity: "Destreza", constitution: "Constitución",
    intelligence: "Inteligencia", wisdom: "Sabiduría", charisma: "Carisma"
};

const SPANISH_TO_ENGLISH = {
    "Fuerza": "strength", "Destreza": "dexterity", "Constitución": "constitution",
    "Inteligencia": "intelligence", "Sabiduría": "wisdom", "Carisma": "charisma"
};

const ALL_SKILLS = [
    "Acrobacias", "Atletismo", "Conocimiento Arcano", "Engaño", "Historia",
    "Interpretación", "Intimidación", "Investigación", "Juego de Manos",
    "Medicina", "Naturaleza", "Percepción", "Perspicacia", "Persuasión",
    "Religión", "Sigilo", "Supervivencia", "Trato con Animales"
];

const POINT_COSTS = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

// Dotes que SÍ se pueden repetir (para no bloquearlos)
const REPEATABLE_FEATS = ["Habilidoso", "Iniciado en la Magia"];

const CreateCharacterPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // --- ESTADOS DE CARGA ---
    const [options, setOptions] = useState({ classes: [], species: [], backgrounds: [], feats: [] });
    const [loadingData, setLoadingData] = useState(true);
    const [saving, setSaving] = useState(false);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        level: 1,
        class: '',
        species: '',
        subspecies: '',
        speciesFeat: '',
        background: '',
        stats: { strength: 8, dexterity: 8, constitution: 8, intelligence: 8, wisdom: 8, charisma: 8 },
        asiMode: '+2+1',
        asiSelection: { '+2': '', '+1a': '', '+1b': '', '+1c': '' },
        selectedSkills: [],
        featSkills: [],
        lore: { appearance: '', backstory: '', alignment: 'Neutral' }
    });

    const [statMethod, setStatMethod] = useState('pointBuy');
    const [pointsRemaining, setPointsRemaining] = useState(27);
    const [standardUsage, setStandardUsage] = useState({
        strength: null, dexterity: null, constitution: null, intelligence: null, wisdom: null, charisma: null
    });

    // 1. CARGAR DATOS
    useEffect(() => {
        const loadOptions = async () => {
            try {
                const [cls, spc, bgs, fts] = await Promise.all([
                    axios.get('http://localhost:4000/api/classes'),
                    axios.get('http://localhost:4000/api/species'),
                    axios.get('http://localhost:4000/api/backgrounds'),
                    axios.get('http://localhost:4000/api/feats')
                ]);

                const originFeats = fts.data.filter(f => f.category === 'Origin');

                setOptions({
                    classes: cls.data,
                    species: spc.data,
                    backgrounds: bgs.data,
                    feats: originFeats
                });
            } catch (error) {
                console.error("Error cargando datos", error);
            } finally {
                setLoadingData(false);
            }
        };
        loadOptions();
    }, []);

    // --- HELPERS DE DATOS ---
    const getSubspeciesOptions = () => {
        if (!formData.species) return null;
        const spc = options.species.find(s => s._id === formData.species);
        if (spc?.table?.rows?.length > 0) {
            return { title: spc.table.title, options: spc.table.rows.map(row => row[0]) };
        }
        return null;
    };

    const getSkilledLimit = () => {
        let limit = 0;
        const bg = options.backgrounds.find(b => b._id === formData.background);
        if (bg?.feat?.name === "Habilidoso") limit += 3;
        if (formData.speciesFeat) {
            const spFeat = options.feats.find(f => f._id === formData.speciesFeat);
            if (spFeat?.name === "Habilidoso") limit += 3;
        }
        return limit;
    };

    const getBackgroundAbilityScores = () => {
        const bg = options.backgrounds.find(b => b._id === formData.background);
        if (!bg || !bg.abilityScores) return Object.values(STAT_TRANSLATIONS);
        return bg.abilityScores;
    };

    const getBackgroundSkills = () => {
        const bg = options.backgrounds.find(b => b._id === formData.background);
        return bg ? bg.skillProficiencies : [];
    };

    // --- CÁLCULOS ---
    const calculateFinalStats = () => {
        const final = { ...formData.stats };
        const { asiMode, asiSelection } = formData;

        const addBonus = (selectionKey, amount) => {
            if (!selectionKey) return;
            const internalKey = SPANISH_TO_ENGLISH[selectionKey] || selectionKey;
            if (final[internalKey] !== undefined) {
                final[internalKey] += amount;
            }
        };

        if (asiMode === '+2+1') {
            addBonus(asiSelection['+2'], 2);
            addBonus(asiSelection['+1a'], 1);
        } else {
            ['+1a', '+1b', '+1c'].forEach(k => addBonus(asiSelection[k], 1));
        }
        return final;
    };

    const calculateSpeed = () => {
        const spc = options.species.find(s => s._id === formData.species);
        let speed = spc?.speed || 9;
        if (formData.subspecies === "Alto Elfo" || formData.subspecies === "Elfo de los Bosques") {
            speed = 10.5;
        }
        return speed;
    };

    // --- EFECTOS ---
    useEffect(() => setFormData(prev => ({ ...prev, subspecies: '', speciesFeat: '' })), [formData.species]);

    useEffect(() => {
        const bgSkills = getBackgroundSkills();
        const currentLimit = getSkilledLimit();

        setFormData(prev => {
            const adjustedFeatSkills = prev.featSkills.slice(0, currentLimit);
            return {
                ...prev,
                selectedSkills: [...bgSkills],
                featSkills: adjustedFeatSkills
            };
        });
    }, [formData.background, formData.species, formData.speciesFeat]);

    // --- HANDLERS ---

    // Cambio de Método de Stats: Reseteamos valores para evitar bugs
    const changeStatMethod = (method) => {
        setStatMethod(method);
        // Reseteamos stats a base 8 y puntos a 27 para evitar inconsistencias
        setFormData(prev => ({
            ...prev,
            stats: { strength: 8, dexterity: 8, constitution: 8, intelligence: 8, wisdom: 8, charisma: 8 }
        }));
        setPointsRemaining(27);
        setStandardUsage({ strength: null, dexterity: null, constitution: null, intelligence: null, wisdom: null, charisma: null });
    };

    const handlePointBuy = (stat, op) => {
        const current = formData.stats[stat];
        let next = op === 'inc' ? current + 1 : current - 1;
        if (next > 15 || next < 8) return;
        const diff = POINT_COSTS[next] - POINT_COSTS[current];
        if (pointsRemaining - diff < 0) return;
        setFormData(p => ({ ...p, stats: { ...p.stats, [stat]: next } }));
        setPointsRemaining(p => p - diff);
    };

    const handleStandardArray = (stat, val) => {
        const v = parseInt(val);
        setStandardUsage(p => ({ ...p, [stat]: v }));
        setFormData(p => ({ ...p, stats: { ...p.stats, [stat]: v } }));
    };

    const toggleSkill = (skill, isLocked) => {
        if (isLocked) return;
        const current = formData.selectedSkills;
        const cls = options.classes.find(c => c._id === formData.class);
        const max = cls?.skillChoices?.count || 2;
        const bgSkills = getBackgroundSkills();

        if (current.includes(skill)) {
            setFormData({ ...formData, selectedSkills: current.filter(s => s !== skill) });
        } else {
            // Contamos solo las que eligió el usuario (excluyendo fondo)
            const manualCount = current.filter(s => !bgSkills.includes(s)).length;
            if (manualCount < max) {
                setFormData({ ...formData, selectedSkills: [...current, skill] });
            }
        }
    };

    const toggleFeatSkill = (skill, isLocked) => {
        if (isLocked) return;

        const current = formData.featSkills;
        const limit = getSkilledLimit();

        if (current.includes(skill)) {
            setFormData({ ...formData, featSkills: current.filter(s => s !== skill) });
        } else {
            if (current.length < limit) {
                setFormData({ ...formData, featSkills: [...current, skill] });
            }
        }
    };

    // --- GUARDAR ---
    const handleSave = async () => {
        if (!user?.token) return alert("Debes iniciar sesión");
        setSaving(true);

        const finalStats = calculateFinalStats();
        const finalSkills = [...new Set([...formData.selectedSkills, ...formData.featSkills])];
        const finalSpeed = calculateSpeed();

        const featuresToSave = [];
        const bgData = options.backgrounds.find(b => b._id === formData.background);
        if (bgData?.feat) {
            featuresToSave.push({
                name: bgData.feat.name,
                source: `Trasfondo: ${bgData.name}`,
                description: bgData.feat.description
            });
        }

        if (formData.speciesFeat) {
            const spFeat = options.feats.find(f => f._id === formData.speciesFeat);
            if (spFeat) {
                featuresToSave.push({
                    name: spFeat.name,
                    source: "Especie: Humano",
                    description: spFeat.description
                });
            }
        }

        const classData = options.classes.find(c => c._id === formData.class);
        const savingThrows = classData?.savingThrows || [];

        const payload = {
            ...formData,
            stats: finalStats,
            proficiencies: { skills: finalSkills },
            features: featuresToSave,
            speed: finalSpeed,
            savingThrows: savingThrows,
            bonusStats: undefined, asiMode: undefined, asiSelection: undefined,
            featSkills: undefined, speciesFeat: undefined, selectedSkills: undefined
        };

        try {
            await axios.post('http://localhost:4000/api/characters', payload, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            navigate('/characters');
        } catch (error) {
            console.error(error);
            alert("Error al guardar: " + (error.response?.data?.message || error.message));
        } finally {
            setSaving(false);
        }
    };

    const nextStep = () => setStep(p => p + 1);
    const prevStep = () => setStep(p => p - 1);
    const selectedClassData = options.classes.find(c => c._id === formData.class);
    const selectedSpeciesData = options.species.find(s => s._id === formData.species);
    const subOptions = getSubspeciesOptions();

    let combinedSkillsToDisplay = [];
    if (selectedClassData) {
        const classSkills = selectedClassData.skillChoices.list;
        const bgSkills = getBackgroundSkills();
        combinedSkillsToDisplay = [...new Set([...classSkills, ...bgSkills])].sort();
    }

    if (loadingData) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-amber-500"><Loader2 className="animate-spin" /> Cargando...</div>;

    return (
        <div className="container mx-auto p-4 pb-32 max-w-6xl animate-fadeIn">
            {/* HEADER */}
            <div className="mb-8 text-center md:text-left">
                <h1 className="text-3xl font-serif font-bold text-amber-500">Crear Personaje</h1>
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} className={`flex items-center px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-colors ${step === n ? 'bg-amber-900/40 border-amber-500 text-amber-500 font-bold' : step > n ? 'border-green-600 text-green-500' : 'border-slate-800 text-slate-500'}`}>
                            {step > n ? <Check className="w-4 h-4 mr-2" /> : <span className="mr-2">{n}</span>}
                            {n === 1 && "Concepto"} {n === 2 && "Origen"} {n === 3 && "Estadísticas"} {n === 4 && "Historia"}
                        </div>
                    ))}
                </div>
            </div>

            {/* PASO 1: CONCEPTO */}
            {step === 1 && (
                <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-right-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-slate-400 text-sm font-bold mb-2">NOMBRE</label>
                            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-amber-500 outline-none" placeholder="Ej: Valeros" autoFocus />
                        </div>
                        <div className="p-4 bg-slate-900 border border-slate-800 rounded text-slate-400 text-sm">
                            <p><strong>Nota:</strong> Todos los personajes comienzan en <strong>Nivel 1</strong> según las reglas de creación estándar.</p>
                        </div>
                    </div>
                    <div className="bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-600 h-64">
                        <div className="text-center"><User className="w-12 h-12 mx-auto mb-2 opacity-50" /><p>Retrato</p></div>
                    </div>
                </div>
            )}

            {/* PASO 2: ORIGEN */}
            {step === 2 && (
                <div className="space-y-10 animate-in slide-in-from-right-8">
                    <div>
                        <h3 className="text-xl font-serif text-slate-200 mb-4 flex gap-2 border-b border-slate-800 pb-2"><Sword className="text-amber-500" /> Clase</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {options.classes.map(c => (
                                <div key={c._id} onClick={() => setFormData({ ...formData, class: c._id, selectedSkills: [] })}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.class === c._id ? 'border-amber-500 bg-amber-900/20' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}>
                                    <div className="font-bold text-slate-200">{c.name}</div>
                                    <div className="text-xs text-slate-500">d{c.hitDie} • {c.primaryAbility[0]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-slate-200 mb-4 flex gap-2 border-b border-slate-800 pb-2"><Heart className="text-amber-500" /> Especie</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {options.species.map(s => (
                                <div key={s._id} onClick={() => setFormData({ ...formData, species: s._id })}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.species === s._id ? 'border-amber-500 bg-amber-900/20' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}>
                                    <div className="font-bold text-slate-200">{s.name}</div>
                                    <div className="text-xs text-slate-500">{s.speed}m</div>
                                </div>
                            ))}
                        </div>
                        {subOptions && (
                            <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-lg animate-in fade-in">
                                <label className="block text-amber-500 text-sm font-bold mb-2">Elige tu {subOptions.title}:</label>
                                <select className="w-full md:w-1/2 bg-slate-950 border border-slate-600 rounded p-2 text-white outline-none focus:border-amber-500"
                                    value={formData.subspecies} onChange={e => setFormData({ ...formData, subspecies: e.target.value })}>
                                    <option value="">-- Seleccionar --</option>
                                    {subOptions.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        )}
                         {selectedSpeciesData?.name === "Humano" && (
                            <div className="flex-1 p-4 bg-slate-900 border border-slate-700 rounded-lg animate-in fade-in">
                                <label className="block text-amber-500 text-sm font-bold mb-2 flex items-center gap-2">
                                    <Zap className="w-4 h-4" /> Dote de Origen (Humano):
                                </label>
                                <select className="w-full bg-slate-950 border border-slate-600 rounded p-2 text-white outline-none focus:border-amber-500"
                                    value={formData.speciesFeat} onChange={e => setFormData({ ...formData, speciesFeat: e.target.value })}>
                                    <option value="">-- Seleccionar --</option>
                                    {options.feats.map(f => {
                                        const selectedBg = options.backgrounds.find(b => b._id === formData.background);
                                        const isConflict = selectedBg?.feat?.name === f.name;
                                        const isRepeatable = REPEATABLE_FEATS.includes(f.name);
                                        const isDisabled = isConflict && !isRepeatable;
                                        return <option key={f._id} value={f._id} disabled={isDisabled}>{f.name} {isDisabled ? "(Ya lo tienes por Trasfondo)" : ""}</option>;
                                    })}
                                </select>
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-slate-200 mb-4 flex gap-2 border-b border-slate-800 pb-2"><BookOpen className="text-amber-500" /> Trasfondo</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {options.backgrounds.map(bg => {
                                const humanFeatName = options.feats.find(f => f._id === formData.speciesFeat)?.name;
                                const isConflict = humanFeatName === bg.feat?.name;
                                const isRepeatable = REPEATABLE_FEATS.includes(bg.feat?.name);
                                const isDisabled = isConflict && !isRepeatable;
                                return (
                                    <div key={bg._id} onClick={() => !isDisabled && setFormData({ ...formData, background: bg._id })}
                                        className={`p-4 rounded-lg border-2 transition-all relative ${isDisabled ? 'border-slate-800 bg-slate-900/50 opacity-50 cursor-not-allowed grayscale' : formData.background === bg._id ? 'border-amber-500 bg-amber-900/20 cursor-pointer' : 'border-slate-800 bg-slate-900 hover:border-slate-600 cursor-pointer'}`}>
                                        <div className="font-bold text-slate-200">{bg.name}</div>
                                        {bg.feat && <div className="text-[10px] text-amber-500/80 mt-1">Dote: {bg.feat.name}</div>}
                                        {isDisabled && <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg"><span className="text-xs text-red-400 font-bold px-2 text-center bg-black/80 rounded py-1 border border-red-900">Ya tienes {bg.feat.name}</span></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* PASO 3: ESTADÍSTICAS */}
            {step === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right-8">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                        <div className="flex gap-4 mb-6 border-b border-slate-700 pb-4">
                            <button onClick={() => changeStatMethod('pointBuy')} className={`px-4 py-2 rounded font-bold ${statMethod === 'pointBuy' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}>Compra de Puntos</button>
                            <button onClick={() => changeStatMethod('standard')} className={`px-4 py-2 rounded font-bold ${statMethod === 'standard' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}>Matriz Estándar</button>
                        </div>
                        {statMethod === 'pointBuy' ? (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-slate-400 text-sm">Aumenta tus características (Max 15, Min 8).</p>
                                    <div className={`px-3 py-1 rounded font-mono font-bold ${pointsRemaining === 0 ? 'bg-green-900 text-green-400' : 'bg-slate-800 text-amber-500'}`}>Puntos: {pointsRemaining}/27</div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {Object.keys(formData.stats).map(stat => (
                                        <div key={stat} className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between items-center">
                                            <span className="uppercase font-bold text-slate-500 text-xs w-20">{STAT_TRANSLATIONS[stat]?.slice(0, 3)}</span>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handlePointBuy(stat, 'dec')} className="w-6 h-6 bg-slate-800 rounded hover:bg-slate-700 text-slate-300">-</button>
                                                <span className="text-lg font-bold w-6 text-center text-white">{formData.stats[stat]}</span>
                                                <button onClick={() => handlePointBuy(stat, 'inc')} className="w-6 h-6 bg-slate-800 rounded hover:bg-slate-700 text-slate-300">+</button>
                                            </div>
                                            <span className="text-xs text-slate-600 w-10 text-right">({POINT_COSTS[formData.stats[stat]]}p)</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.keys(formData.stats).map(stat => (
                                    <div key={stat} className="bg-slate-950 p-4 rounded border border-slate-800">
                                        <label className="block text-amber-500 font-bold uppercase tracking-wider text-xs mb-2">{STAT_TRANSLATIONS[stat]}</label>
                                        <select value={standardUsage[stat] || ""} onChange={e => handleStandardArray(stat, e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-amber-500">
                                            <option value="" disabled>--</option>
                                            {STANDARD_ARRAY.map(val => {
                                                const isUsed = Object.values(standardUsage).includes(val) && standardUsage[stat] !== val;
                                                return !isUsed ? <option key={val} value={val}>{val}</option> : null;
                                            })}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-amber-500 flex items-center gap-2"><Brain className="w-5 h-5" /> Mejoras de Trasfondo</h3>
                            <div className="flex bg-slate-950 rounded p-1 gap-1">
                                <button onClick={() => setFormData({ ...formData, asiMode: '+2+1', asiSelection: { '+2': '', '+1a': '' } })} className={`px-3 py-1 rounded text-xs font-bold ${formData.asiMode === '+2+1' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}>+2 / +1</button>
                                <button onClick={() => setFormData({ ...formData, asiMode: '+1+1+1', asiSelection: { '+1a': '', '+1b': '', '+1c': '' } })} className={`px-3 py-1 rounded text-xs font-bold ${formData.asiMode === '+1+1+1' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}>+1 / +1 / +1</button>
                            </div>
                        </div>
                        {formData.asiMode === '+2+1' ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-slate-400 text-xs mb-1 uppercase font-bold">Bono +2</label>
                                    <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white outline-none focus:border-amber-500" value={formData.asiSelection['+2']} onChange={e => setFormData({ ...formData, asiSelection: { ...formData.asiSelection, '+2': e.target.value } })}>
                                        <option value="">Seleccionar</option>
                                        {getBackgroundAbilityScores().map(s => <option key={s} value={s} disabled={s === formData.asiSelection['+1a']}>{s.toUpperCase()}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs mb-1 uppercase font-bold">Bono +1</label>
                                    <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white outline-none focus:border-amber-500" value={formData.asiSelection['+1a']} onChange={e => setFormData({ ...formData, asiSelection: { ...formData.asiSelection, '+1a': e.target.value } })}>
                                        <option value="">Seleccionar</option>
                                        {getBackgroundAbilityScores().map(s => <option key={s} value={s} disabled={s === formData.asiSelection['+2']}>{s.toUpperCase()}</option>)}
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-3 gap-4">
                                {['+1a', '+1b', '+1c'].map(slot => (
                                    <div key={slot}>
                                        <label className="block text-slate-400 text-xs mb-1 uppercase font-bold">BONO +1</label>
                                        <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" value={formData.asiSelection[slot]} onChange={e => setFormData({ ...formData, asiSelection: { ...formData.asiSelection, [slot]: e.target.value } })}>
                                            <option value="">Elegir...</option>
                                            {getBackgroundAbilityScores().map(s => {
                                                const isUsed = Object.entries(formData.asiSelection).some(([k, v]) => v === s && k !== slot);
                                                return <option key={s} value={s} disabled={isUsed}>{s.toUpperCase()}</option>
                                            })}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {selectedClassData && (
                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-amber-500 flex items-center gap-2"><Shield className="w-5 h-5" /> Habilidades (Clase + Trasfondo)</h3>
                                <span className={`text-xs px-2 py-1 rounded ${formData.selectedSkills.filter(s => !getBackgroundSkills().includes(s)).length === selectedClassData.skillChoices.count ? 'bg-green-900 text-green-400' : 'bg-slate-800 text-slate-300'}`}>
                                    Elecciones libres: {formData.selectedSkills.filter(s => !getBackgroundSkills().includes(s)).length} / {selectedClassData.skillChoices.count}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {combinedSkillsToDisplay.map(skill => {
                                    const isBgSkill = getBackgroundSkills().includes(skill);
                                    const isFeatSkill = formData.featSkills.includes(skill);
                                    const isSelected = formData.selectedSkills.includes(skill);
                                    const isClassOption = selectedClassData.skillChoices.list.includes(skill);
                                    return (
                                        <div key={skill} onClick={() => toggleSkill(skill, isBgSkill || isFeatSkill)} className={`p-3 rounded border text-sm flex items-center gap-2 transition-all ${(isBgSkill || isFeatSkill) ? 'border-amber-600/50 bg-amber-950/40 text-amber-500 cursor-not-allowed opacity-100' : isSelected ? 'border-green-500 bg-green-900/20 text-green-400 font-bold cursor-pointer' : 'border-slate-700 text-slate-400 hover:border-slate-500 cursor-pointer'} ${!isClassOption && (isBgSkill || isFeatSkill) ? 'ring-1 ring-amber-500/30' : ''}`}>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${(isBgSkill || isFeatSkill) ? 'bg-amber-600 border-amber-600 text-slate-900' : isSelected ? 'bg-green-500 border-green-500' : 'border-slate-600'}`}>
                                                {(isBgSkill || isFeatSkill) ? <Lock className="w-3 h-3" /> : (isSelected && <Check className="w-3 h-3 text-slate-950" />)}
                                            </div>
                                            {skill}
                                            <div className="ml-auto flex gap-1">
                                                {isBgSkill && <span className="text-[10px] uppercase font-bold opacity-70">Fondo</span>}
                                                {isFeatSkill && <span className="text-[10px] uppercase font-bold opacity-70">Dote</span>}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {(() => {
                        const skilledLimit = getSkilledLimit();
                        if (skilledLimit > 0) {
                            return (
                                <div className="bg-slate-900 border border-amber-500/50 p-6 rounded-xl mt-6 animate-in fade-in">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-amber-500" />
                                            <div>
                                                <h3 className="text-lg font-bold text-amber-500">Dote: Habilidoso {skilledLimit > 3 && "(x2)"}</h3>
                                                <p className="text-xs text-slate-400">
                                                    {skilledLimit === 6 ? "¡Doble dote! Elige 6 habilidades extra." : "Tu dote te otorga 3 habilidades extra."}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${formData.featSkills.length === skilledLimit ? 'bg-green-900 text-green-400' : 'bg-slate-800 text-slate-300'}`}>Elegidas: {formData.featSkills.length} / {skilledLimit}</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {ALL_SKILLS.map(skill => {
                                            const isOwned = formData.selectedSkills.includes(skill);
                                            const isSelectedHere = formData.featSkills.includes(skill);
                                            return (
                                                <div key={skill} onClick={() => toggleFeatSkill(skill, isOwned)} className={`p-2 rounded border text-xs flex items-center gap-2 transition-all ${isOwned ? 'border-slate-800 bg-slate-900/50 text-slate-600 cursor-not-allowed' : isSelectedHere ? 'border-green-500 bg-green-900/20 text-green-400 font-bold cursor-pointer' : 'border-slate-700 text-slate-300 hover:border-slate-500 cursor-pointer'}`}>
                                                    <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${isOwned ? 'bg-slate-700 border-slate-700' : isSelectedHere ? 'bg-green-500 border-green-500' : 'border-slate-600'}`}>
                                                        {isOwned && <Check className="w-2 h-2 text-slate-400" />}
                                                        {isSelectedHere && <Check className="w-2 h-2 text-slate-900" />}
                                                    </div>
                                                    {skill}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            );
                        }
                    })()}
                </div>
            )}

            {/* PASO 4: HISTORIA */}
            {step === 4 && (
                <div className="animate-in slide-in-from-right-8 duration-500 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                        <h3 className="text-xl font-serif text-amber-500 mb-6 border-b border-slate-800 pb-2 flex items-center gap-2"><FileText className="w-5 h-5" /> Identidad</h3>
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-slate-400 text-sm font-bold mb-2">Alineamiento</label>
                                    <select className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white outline-none focus:border-amber-500" onChange={e => setFormData({ ...formData, lore: { ...formData.lore, alignment: e.target.value } })} value={formData.lore.alignment}>
                                        <option>Neutral</option><option>Legal Bueno</option><option>Neutral Bueno</option><option>Caótico Bueno</option>
                                        <option>Legal Neutral</option><option>Caótico Neutral</option>
                                        <option>Legal Malvado</option><option>Neutral Malvado</option><option>Caótico Malvado</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm font-bold mb-2">Apariencia Física</label>
                                    <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white placeholder:text-slate-600 outline-none focus:border-amber-500" placeholder="Altura, peso, ojos, cabello..." onChange={e => setFormData({ ...formData, lore: { ...formData.lore, appearance: e.target.value } })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Historia</label>
                                <textarea rows="5" className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white placeholder:text-slate-600 outline-none focus:border-amber-500 resize-none" placeholder="Orígenes, motivaciones, miedos..." onChange={e => setFormData({ ...formData, lore: { ...formData.lore, backstory: e.target.value } })}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-900/10 border border-amber-900/30 p-6 rounded-xl text-center">
                        <h3 className="text-2xl font-serif text-amber-500 mb-4">{formData.name}</h3>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {Object.entries(calculateFinalStats()).map(([key, total]) => (
                                <div key={key} className="text-center w-20">
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">{STAT_TRANSLATIONS[key]?.slice(0, 3)}</div>
                                    <div className="w-14 h-14 rounded-lg border border-amber-700/50 bg-slate-900 flex items-center justify-center font-bold text-white text-2xl mx-auto shadow-lg relative">
                                        {total}
                                        {total > formData.stats[key] && <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>}
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1 font-mono font-bold">{Math.floor((total - 10) / 2) >= 0 ? '+' : ''}{Math.floor((total - 10) / 2)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* NAVEGACIÓN */}
            <div className="fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur border-t border-slate-800 p-4 z-40 shadow-lg">
                <div className="container mx-auto max-w-6xl flex justify-between">
                    <button onClick={prevStep} disabled={step === 1 || saving} className="flex items-center gap-2 px-6 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50"><ChevronLeft className="w-5 h-5" /> Anterior</button>
                    {step < 4 ? (
                        <button onClick={nextStep} disabled={(step === 1 && !formData.name) || (step === 2 && (!formData.class || !formData.species || !formData.background || (subOptions && !formData.subspecies) || (selectedSpeciesData?.name === "Humano" && !formData.speciesFeat))) || (step === 3 && (statMethod === 'standard' ? Object.values(standardUsage).some(v => v === null) : pointsRemaining !== 0))} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-slate-950 px-8 py-3 rounded-lg font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-95">Siguiente <ChevronRight className="w-5 h-5" /></button>
                    ) : (
                        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-green-900/20 transition transform active:scale-95 disabled:opacity-70">{saving ? <Loader2 className="animate-spin" /> : <Save />} {saving ? "Guardando..." : "Crear Personaje"}</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateCharacterPage;