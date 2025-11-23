import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
    return (
        <div className="group relative bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-amber-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-1">

            {/* Header de la tarjeta con degradado */}
            <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-900 p-4 flex justify-between items-start relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition font-serif">
                        {character.name}
                    </h3>
                    <p className="text-sm text-slate-400">
                        {character.species || 'Humano'} {character.class || 'Guerrero'}
                    </p>
                </div>
                <div className="bg-slate-950 border border-slate-700 text-slate-200 px-2 py-1 rounded text-xs font-bold">
                    Lvl {character.level}
                </div>
            </div>

            {/* Cuerpo de la tarjeta (Stats rápidos) */}
            <div className="p-4">
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-slate-950 rounded p-1 border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase">FUE</div>
                        <div className="font-bold text-amber-500">{character.stats?.strength?.value || 10}</div>
                    </div>
                    <div className="bg-slate-950 rounded p-1 border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase">DES</div>
                        <div className="font-bold text-amber-500">{character.stats?.dexterity?.value || 10}</div>
                    </div>
                    <div className="bg-slate-950 rounded p-1 border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase">CAR</div>
                        <div className="font-bold text-amber-500">{character.stats?.charisma?.value || 10}</div>
                    </div>
                </div>

                <Link
                    to={`/characters/${character._id}`}
                    className="block w-full text-center bg-slate-800 hover:bg-amber-700 text-slate-300 hover:text-white py-2 rounded transition border border-slate-700 hover:border-amber-500"
                >
                    Ver Hoja
                </Link>
            </div>
        </div>
    );
};

export default CharacterCard;