import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/api/auth/login', form);
            login(data);
            navigate('/');
        } catch (err) {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-amber-500 font-serif text-center mb-6">Bienvenido</h1>
                {error && <div className="bg-red-900/30 text-red-400 p-3 rounded mb-4 text-sm text-center border border-red-900">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" placeholder="Email" className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-amber-500 outline-none" onChange={e => setForm({ ...form, email: e.target.value })} required />
                    <input type="password" placeholder="Contraseña" className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-amber-500 outline-none" onChange={e => setForm({ ...form, password: e.target.value })} required />
                    <button className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-3 rounded-lg transition-colors mt-4">Entrar</button>
                </form>
                <p className="text-center text-slate-500 mt-6 text-sm">
                    ¿No tienes cuenta? <Link to="/register" className="text-amber-500 hover:underline">Regístrate</Link>
                </p>
            </div>
        </div>
    );
};
export default LoginPage;