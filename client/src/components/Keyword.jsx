import { useState, useRef } from 'react';
import axios from 'axios';
import { Loader2, BookOpen } from 'lucide-react';

const Keyword = ({ children, term }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Estado para controlar la posición: 'top' (arriba) o 'bottom' (abajo)
    const [position, setPosition] = useState('top');

    // Referencia al elemento span para poder medir su posición
    const spanRef = useRef(null);

    const searchTerm = term || children;

    const handleInteraction = async () => {
        // 1. CALCULAR POSICIÓN ANTES DE MOSTRAR
        if (spanRef.current) {
            const rect = spanRef.current.getBoundingClientRect();
            // Si hay menos de 300px hasta el techo, lo mandamos abajo
            if (rect.top < 300) {
                setPosition('bottom');
            } else {
                setPosition('top');
            }
        }

        setIsOpen(true);

        if (data || loading || hasError) return;

        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:4000/api/glossary?term=${encodeURIComponent(searchTerm)}`);
            setData(res.data);
        } catch (error) {
            setHasError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <span
            ref={spanRef} // Conectamos la referencia
            className="relative inline-block group"
            onMouseEnter={handleInteraction}
            onMouseLeave={() => setIsOpen(false)}
            onClick={handleInteraction}
        >
            <span className="cursor-help text-amber-500 hover:text-amber-400 border-b border-dashed border-amber-500/50 transition-colors font-medium">
                {children}
            </span>

            {isOpen && !hasError && (
                <div
                    className={`
            absolute left-1/2 -translate-x-1/2 w-72 md:w-80 bg-slate-900 border border-amber-700/50 rounded-lg shadow-2xl p-4 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200
            
            /* Lógica de clases condicionales según la posición calculada */
            ${position === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'}
          `}
                >

                    {loading ? (
                        <div className="flex items-center justify-center py-2 text-slate-400 gap-2 text-xs">
                            <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> Buscando archivos...
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
                            <div className="max-h-48 overflow-y-auto custom-scrollbar pr-1">
                                <p className="text-slate-300 text-sm leading-relaxed text-left">
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    ) : null}

                    {/* FLECHITA (Triángulo) 
             También tiene que invertirse según si el tooltip está arriba o abajo 
          */}
                    <div
                        className={`
              absolute left-1/2 -translate-x-1/2 border-8 border-transparent
              ${position === 'top'
                                ? 'top-full border-t-slate-900'  // Si tooltip está arriba, flecha apunta abajo
                                : 'bottom-full border-b-slate-900' // Si tooltip está abajo, flecha apunta arriba
                            }
            `}
                    ></div>
                </div>
            )}
        </span>
    );
};

export default Keyword;