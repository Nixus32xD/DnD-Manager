import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { Loader2, BookOpen } from 'lucide-react';

const Keyword = ({ children, term }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Estados para posición
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [placement, setPlacement] = useState('top');

    // Referencias
    const spanRef = useRef(null);
    const timerRef = useRef(null);
    const tooltipRef = useRef(null); // <--- NUEVA REFERENCIA PARA EL TOOLTIP

    const searchTerm = term || children;

    const handleMouseEnter = () => {
        if (timerRef.current) clearTimeout(timerRef.current);

        if (spanRef.current) {
            const rect = spanRef.current.getBoundingClientRect();
            const tooltipHeight = 350;
            const spaceAbove = rect.top;

            let newPlacement = 'top';
            let top = rect.top - 10;

            if (spaceAbove < tooltipHeight) {
                newPlacement = 'bottom';
                top = rect.bottom + 10;
            }

            setPlacement(newPlacement);
            setCoords({
                top: top,
                left: rect.left + (rect.width / 2)
            });
        }

        setIsOpen(true);

        if (!data && !loading && !hasError) {
            setLoading(true);
            axios.get(`http://localhost:4000/api/glossary?term=${encodeURIComponent(searchTerm)}`)
                .then(res => setData(res.data))
                .catch(() => setHasError(true))
                .finally(() => setLoading(false));
        }
    };

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => setIsOpen(false), 200);
    };

    // --- CORRECCIÓN DEL SCROLL ---
    useEffect(() => {
        if (isOpen) {
            const handleScroll = (e) => {
                // Si el elemento que scrollea está DENTRO del tooltip, NO cerramos
                if (tooltipRef.current && tooltipRef.current.contains(e.target)) {
                    return;
                }
                // Si el scroll es afuera (la página principal), cerramos
                setIsOpen(false);
            };

            // Mantenemos el 'true' (capture) para detectar scroll en la página,
            // pero ahora filtramos si es nuestro propio tooltip el que scrollea.
            window.addEventListener('scroll', handleScroll, true);
            return () => window.removeEventListener('scroll', handleScroll, true);
        }
    }, [isOpen]);

    const tooltipContent = (
        <div
            ref={tooltipRef} // <--- ASIGNAMOS LA REF AQUÍ
            className={`
        fixed z-[9999] w-120 bg-slate-950 border border-amber-600/50 rounded-xl shadow-2xl p-5
        animate-in fade-in zoom-in-95 duration-200 cursor-default
        -translate-x-1/2
        ${placement === 'top' ? '-translate-y-full' : ''}
      `}
            style={{ top: coords.top, left: coords.left }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {loading ? (
                <div className="flex items-center justify-center py-4 text-slate-400 gap-2 text-xs font-serif">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> Consultando los archivos...
                </div>
            ) : data ? (
                <div className="flex flex-col max-h-80">
                    <div className="flex justify-between items-start mb-3 border-b border-slate-800 pb-2 shrink-0">
                        <div>
                            <h4 className="font-bold text-amber-500 font-serif text-xl leading-none">{data.name}</h4>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1 block">
                                {data.type} • {data.source}
                            </span>
                        </div>
                        <BookOpen className="w-5 h-5 text-slate-600" />
                    </div>

                    {/* Cuerpo con Scroll */}
                    <div className="overflow-y-auto custom-scrollbar pr-2">
                        <div
                            className="text-slate-300 text-sm leading-relaxed text-left"
                            dangerouslySetInnerHTML={{
                                __html: data.description.replace(/\n/g, '<br />')
                            }}
                        />
                    </div>
                </div>
            ) : null}

            <div
                className={`
          absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 border-r border-b border-amber-600/50 transform rotate-45 pointer-events-none
          ${placement === 'top' ? '-bottom-2 border-t-0 border-l-0' : '-top-2 border-b-0 border-r-0 bg-slate-950 border-t border-l'}
        `}
            ></div>
        </div>
    );

    return (
        <>
            <span
                ref={spanRef}
                className="relative inline-block cursor-help text-amber-500 hover:text-amber-300 border-b border-dashed border-amber-500/50 transition-colors font-medium"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => { if (!isOpen) handleMouseEnter(); }}
            >
                {children}
            </span>

            {isOpen && !hasError && createPortal(tooltipContent, document.body)}
        </>
    );
};

export default Keyword;