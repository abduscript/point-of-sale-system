// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../services/auth.js';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await loginUser(formData);
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify(formData));
//         navigate('/dashboard');
//     } catch (error) {
//         console.error('Login Failed:', error.response.data.message);
//     }
//     };

//     return (
//     <form onSubmit={handleSubmit}>
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} />
//         <button type="submit">Login</button>
//     </form>
//     );
// };

// export default Login;


// // const res = await axios.post('/api/auth/login', { email, password });
// // const { token, userId, name } = res.data;
// // localStorage.setItem('token', token);
// // localStorage.setItem('user', JSON.stringify({ userId, name }));
// // alert('Login successful!');

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth.js';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(formData));
            navigate('/');
        } catch (error) {
            console.error('Login Failed:', error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                {/* Header */}
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">Username</label>
                        <br  />
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">Email</label>
                        <br  />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">Password</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-blue-600 text-white py-2 rounded-md font-medium mt-3"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center text-gray-500 mt-4">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;

