import { useState } from 'react';
import axios from 'axios';
import { Loader2, BookOpen } from 'lucide-react';

const Keyword = ({ children, term }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Si pasás prop 'term', usa eso. Si no, usa el texto que está adentro (children)
    const searchTerm = term || children;

    const handleInteraction = async () => {
        setIsOpen(true);

        // Si ya tenemos la data o dio error antes, no volvemos a fetchear para no saturar
        if (data || loading || hasError) return;

        setLoading(true);
        try {
            // Llamamos a TU backend
            const res = await axios.get(`http://localhost:4000/api/glossary?term=${encodeURIComponent(searchTerm)}`);
            setData(res.data);
        } catch (error) {
            setHasError(true);
            console.log("No se encontró definición para:", searchTerm);
        } finally {
            setLoading(false);
        }
    };

    return (
        <span
            className="relative inline-block group"
            onMouseEnter={handleInteraction}
            onMouseLeave={() => setIsOpen(false)}
            onClick={handleInteraction} // Para que funcione en celular con un tap
        >
            {/* El texto subrayado */}
            <span className="cursor-help text-amber-500 hover:text-amber-400 border-b border-dashed border-amber-500/50 transition-colors font-medium">
                {children}
            </span>

            {/* El Tooltip Flotante */}
            {isOpen && !hasError && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-slate-900 border border-amber-700/50 rounded-lg shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">

                    {loading ? (
                        <div className="flex items-center justify-center py-2 text-slate-400 gap-2 text-xs">
                            <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> Buscando en los archivos...
                        </div>
                    ) : data ? (
                        <div>
                            <div className="flex justify-between items-start mb-2 border-b border-slate-800 pb-2">
                                <div>
                                    <h4 className="font-bold text-amber-500 font-serif text-lg leading-none">{data.name}</h4>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                                        {data.type} • {data.source}
                                    </span>
                                </div>
                                <BookOpen className="w-4 h-4 text-slate-600" />
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed text-left">
                                {data.description}
                            </p>
                        </div>
                    ) : null}

                    {/* Triangulito decorativo abajo */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                </div>
            )}
        </span>
    );
};

export default Keyword;