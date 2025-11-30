import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Shield, User, Sword } from 'lucide-react';

const RegisterPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', email: '', password: '', role: 'player' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/api/auth/register', form);
            login(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrarse');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-amber-500 font-serif text-center mb-6">Únete a la Aventura</h1>

                {error && <div className="bg-red-900/30 text-red-400 p-3 rounded mb-4 text-sm text-center border border-red-900">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Nombre de Usuario" className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-amber-500 outline-none" onChange={e => setForm({ ...form, username: e.target.value })} required />
                    <input type="email" placeholder="Email" className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-amber-500 outline-none" onChange={e => setForm({ ...form, email: e.target.value })} required />
                    <input type="password" placeholder="Contraseña" className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-amber-500 outline-none" onChange={e => setForm({ ...form, password: e.target.value })} required />

                    {/* Selección de Rol */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div onClick={() => setForm({ ...form, role: 'player' })} className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${form.role === 'player' ? 'border-amber-500 bg-amber-900/20 text-amber-500' : 'border-slate-700 bg-slate-800 text-slate-500 hover:border-slate-500'}`}>
                            <Sword className="w-8 h-8" /> <span className="font-bold text-sm">Jugador</span>
                        </div>
                        <div onClick={() => setForm({ ...form, role: 'dm' })} className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${form.role === 'dm' ? 'border-blue-500 bg-blue-900/20 text-blue-400' : 'border-slate-700 bg-slate-800 text-slate-500 hover:border-slate-500'}`}>
                            <Shield className="w-8 h-8" /> <span className="font-bold text-sm">Dungeon Master</span>
                        </div>
                    </div>

                    <button className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-3 rounded-lg transition-colors mt-4">Registrarse</button>
                </form>

                <p className="text-center text-slate-500 mt-6 text-sm">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-amber-500 hover:underline">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
};
export default RegisterPage;