import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'loganathanarun774@gmail.com' && password === 'Arun@1799') {
            navigate('/chat');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#1D1D1D] transition-colors duration-300">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md bg-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border border-[#333]">
                <div className="p-8">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-[#EAEAEA] mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Sign in to continue to your chat</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-[#3A3A3A] bg-[#1D1D1D] rounded-xl focus:ring-1 focus:ring-[#41C85A] focus:outline-none text-[#EAEAEA] placeholder-gray-600 transition-all duration-200"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-[#3A3A3A] bg-[#1D1D1D] rounded-xl focus:ring-1 focus:ring-[#41C85A] focus:outline-none text-[#EAEAEA] placeholder-gray-600 transition-all duration-200"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#41C85A] hover:bg-[#38b04d] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#41C85A]/20 flex items-center justify-center gap-2 group"
                        >
                            Sign In
                            <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[#41C85A] hover:text-[#38b04d] hover:underline font-bold">
                            Create account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
