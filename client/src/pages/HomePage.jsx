import { Link } from "react-router-dom";
import { ArrowRight, Zap, Scroll, Users, Shield } from "lucide-react";

/* --- Card Reutilizable para Features --- */
function FeatureCard({ icon: Icon, title, children }) {
    return (
        <div
            className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl
                       border border-slate-800 bg-black/20 
                       hover:border-amber-500/30 transition-all duration-300"
        >
            <div className="p-4 rounded-full bg-amber-500/10 text-amber-500">
                <Icon className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-100 font-serif">{title}</h2>
            <p className="text-slate-400">{children}</p>
        </div>
    );
}

export default function HomePage() {
    return (
        <div
            className="relative flex flex-col min-h-[calc(100vh-4rem)]
                    bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 
                    text-slate-200"
        >
            <main className="flex-1">

                {/* --- HERO --- */}
                <section
                    className="relative overflow-hidden w-full py-16 md:py-28 lg:py-40
                            flex flex-col items-center justify-center text-center px-4 md:px-6"
                >
                    {/* Fondo mágico suave (sin cortar secciones) */}
                    <div
                        className="absolute inset-0 pointer-events-none
                                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                                from-amber-900/20 via-transparent to-transparent"
                    />

                    <div className="relative z-10 max-w-3xl space-y-6">

                        {/* Badge */}
                        <div
                            className="inline-flex items-center justify-center p-2 mb-4 rounded-full
                                    bg-black/30 border border-slate-800 backdrop-blur-sm"
                        >
                            <Shield className="h-5 w-5 text-amber-500 mr-2" />
                            <span className="text-sm font-medium text-rose-800 px-2">
                                Actualizado a Reglas 2024
                            </span>
                        </div>

                        {/* Título */}
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold
                                    tracking-tighter bg-clip-text text-transparent
                                    bg-gradient-to-b from-white to-slate-400 font-serif"
                        >
                            Forja Tu Leyenda
                        </h1>

                        {/* Subtítulo */}
                        <p
                            className="mx-auto max-w-[700px] text-slate-300 md:text-xl leading-relaxed"
                        >
                            El constructor de personajes definitivo. Optimizado, poderoso y listo para tu próxima
                            aventura con el nuevo reglamento.
                        </p>

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <Link
                                to="/characters/create"
                                className="inline-flex h-12 items-center justify-center rounded-md bg-red-700 px-8
                                        text-lg font-medium text-white shadow hover:bg-red-800 
                                        transition-colors focus-visible:ring-1 focus-visible:ring-red-500"
                            >
                                Crear Personaje
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>

                            <Link
                                to="/rules"
                                className="inline-flex h-12 items-center justify-center rounded-md border
                                        border-slate-700 bg-transparent px-8 text-lg font-medium
                                        text-slate-200 shadow-sm hover:bg-slate-800
                                        transition-colors focus-visible:ring-1 focus-visible:ring-slate-300"
                            >
                                Explorar Reglas
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --- FEATURES --- */}
                <section className="w-full py-5 md:py-10 lg:py-15 px-4 md:px-6">
                    <div className="container mx-auto">
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

                            <FeatureCard icon={Zap} title="Reglas 2024 Actualizadas">
                                Completamente actualizado con las últimas clases, especies y trasfondos del
                                Manual del Jugador 2024.
                            </FeatureCard>

                            <FeatureCard icon={Scroll} title="Hoja Inteligente">
                                Cálculos automáticos para CA, tiradas de salvación y habilidades. Concéntrate
                                en el juego, no en los números.
                            </FeatureCard>

                            <FeatureCard icon={Users} title="Modo Grupo">
                                Comparte tu personaje con tu DM y compañeros instantáneamente. Actualizaciones
                                de PV y estado en tiempo real.
                            </FeatureCard>
                        </div>
                    </div>
                </section>

                {/* --- CTA --- */}
                <section
                    className="w-full py-16 md:py-28 lg:py-32 px-4 md:px-6 text-center flex flex-col items-center"
                >
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-serif">
                            ¿Listo para Tirar Iniciativa?
                        </h2>

                        <p className="text-slate-300 md:text-xl">
                            Únete a miles de aventureros usando el constructor de personajes 5.5e más avanzado.
                        </p>

                        <div className="pt-4">
                            <Link
                                to="/characters/create"
                                className="inline-flex h-12 items-center justify-center rounded-md
                                        bg-amber-600 px-8 text-lg font-bold text-slate-950 shadow
                                        hover:bg-amber-500 transition-transform hover:scale-105"
                            >
                                Comenzar Gratis
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
