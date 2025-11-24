import { Link } from "react-router-dom";
import { Book, Sparkles, Shield, Users, Scroll, Backpack, Sword, Zap } from "lucide-react";

// Configuración de las secciones
const SECTIONS = [
    {
        title: "Clases",
        description: "Descubre las 12 clases, sus subclases y capacidades únicas.",
        icon: Users,
        href: "/rules/classes",
        color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
        title: "Trasfondos",
        description: "Orígenes, historias y beneficios iniciales para tu personaje.",
        icon: Scroll,
        href: "/rules/backgrounds",
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
        title: "Especies",
        description: "Humanos, Elfos, Orcos y más habitantes del multiverso.",
        icon: User, // O un icono personalizado si tenés
        href: "/rules/species", // Asumiendo que tendrás esta ruta
        color: "text-green-400 bg-green-500/10 border-green-500/20" // Ajustar color
    },
    {
        title: "Dotes",
        description: "Talentos especiales, estilos de combate y dones épicos.",
        icon: Zap,
        href: "/rules/feats",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
        title: "Conjuros",
        description: "El grimorio completo de magia arcana y divina.",
        icon: Sparkles,
        href: "/rules/spells", // Redirección a lo que ya hicimos
        color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
        title: "Equipo y Objetos",
        description: "Armas, armaduras, herramientas y objetos mágicos.",
        icon: Backpack,
        href: "/rules/items",
        color: "text-rose-400 bg-rose-500/10 border-rose-500/20"
    }
];
import { User } from "lucide-react"; // Importar User icon

export default function RulesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200 font-sans">
            <div className="container mx-auto px-4 py-12">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-800/50 border border-slate-700 shadow-xl">
                        <Book className="h-8 w-8 text-slate-200" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                        Compendio de Reglas
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        La referencia definitiva para creación de personajes y consulta rápida en tus partidas.
                    </p>
                </div>

                {/* Grid de Secciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {SECTIONS.map((section) => (
                        <Link
                            key={section.title}
                            to={section.href}
                            className="group relative flex flex-col p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm
                         hover:bg-slate-800/60 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            {/* Efecto de Glow en Hover */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-current ${section.color.split(' ')[0]}`} />

                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl border ${section.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <section.icon className="h-6 w-6" />
                                </div>
                                <Shield className="h-4 w-4 text-slate-700 group-hover:text-slate-500 transition-colors" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-100 mb-2 font-serif group-hover:text-white transition-colors">
                                {section.title}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                {section.description}
                            </p>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}