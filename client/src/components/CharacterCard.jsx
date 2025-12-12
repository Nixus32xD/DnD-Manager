import { Link } from 'react-router-dom';
import { Shield, Heart, User, Scroll } from 'lucide-react';

// Diccionario para abreviaturas de stats
const STAT_LABELS = {
    strength: "FUE",
    dexterity: "DES",
    constitution: "CON",
    intelligence: "INT",
    wisdom: "SAB",
    charisma: "CAR"
};

const CharacterCard = ({ character }) => {
    // Calculamos el modificador (Ej: 16 -> +3)
    const getMod = (val) => {
        // A veces val viene como objeto { value: 16, mod: 3 } o directo como número 16
        const score = typeof val === 'object' ? val.value : val;
        const mod = Math.floor((score - 10) / 2);
        return mod >= 0 ? `+${mod}` : mod;
    };

    // Datos seguros (por si el backend manda population o solo IDs)
    const speciesName = character.species?.name || "Especie desconocida";
    const className = character.class?.name || "Clase desconocida";
    const bgName = character.background?.name || "Sin pasado";

    return (
        <Link 
            to={`/characters/${character._id}`} 
            className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/20 block transform hover:-translate-y-1"
        >
            {/* Header: Nivel y Clase */}
            <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-serif font-bold text-slate-100 group-hover:text-amber-500 transition-colors truncate pr-2">
                        {character.name}
                    </h3>
                    <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-1">
                        <span className="text-amber-600 font-bold bg-amber-950/30 px-1.5 py-0.5 rounded border border-amber-900/50">Nivel {character.level}</span>
                        <span>•</span>
                        <span>{speciesName}</span>
                        <span>•</span>
                        <span>{className}</span>
                    </div>
                </div>
                {/* Icono de clase o avatar (Placeholder) */}
                <div className="w-10 h-10 bg-slate-800 rounded-full flex-shrink-0 flex items-center justify-center text-slate-500 border border-slate-700 group-hover:border-amber-500/30 group-hover:text-amber-500 transition-colors">
                    <User className="w-5 h-5" />
                </div>
            </div>

            {/* Cuerpo: Combate y Trasfondo */}
            <div className="p-4 space-y-4">
                
                {/* Fila de Combate (HP y CA) */}
                <div className="flex gap-3">
                    <div className="flex-1 bg-slate-950 rounded p-2 border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-bold">
                            <Heart className="w-3.5 h-3.5 text-red-600" /> PG
                        </div>
                        <span className="font-mono text-white font-bold">{character.hp?.max || 10}</span>
                    </div>
                    <div className="flex-1 bg-slate-950 rounded p-2 border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-bold">
                            <Shield className="w-3.5 h-3.5 text-blue-500" /> CA
                        </div>
                        <span className="font-mono text-white font-bold">{character.ac || 10}</span>
                    </div>
                </div>

                {/* Trasfondo */}
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-950/30 p-2 rounded border border-slate-800/50">
                    <Scroll className="w-3 h-3" />
                    <span className="truncate">Trasfondo: <strong className="text-slate-300">{bgName}</strong></span>
                </div>

                {/* Grilla de Stats (Las 6 características) */}
                <div className="grid grid-cols-6 gap-1 pt-2 border-t border-slate-800/50">
                    {Object.entries(character.stats || {}).map(([key, val]) => {
                        const score = typeof val === 'object' ? val.value : val;
                        return (
                            <div key={key} className="text-center">
                                <div className="text-[8px] uppercase text-slate-500 font-bold mb-0.5 tracking-wider">
                                    {STAT_LABELS[key]?.slice(0,3) || key.slice(0,3)}
                                </div>
                                {/* Valor (ej: 16) */}
                                <div className="text-sm font-bold text-slate-200 leading-none">
                                    {score}
                                </div>
                                {/* Modificador (ej: +3) */}
                                <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                                    {getMod(score)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Link>
    );
};

export default CharacterCard;