// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../services/auth';

// const SignUp = () => {
//     const [formData, setFormData] = useState({ username: '', email: '', password: '' , role: 'user' });
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         await registerUser(formData);
//         localStorage.setItem('user', JSON.stringify(formData));
//         navigate('/login');
//     } catch (error) {
//         console.error('Register Failed:', error.response.data.message);
//     }
//     };

//     return (
//     <form onSubmit={handleSubmit}>
//         <input name="username" placeholder="Username" onChange={handleChange} />
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} />
//         <input name="role" type="text" placeholder="Sign up as" onChange={handleChange} />
//         <button type="submit">Sign Up</button>
//     </form>
//     );
// };

// export default SignUp;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';

const SignUp = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            localStorage.setItem('user', JSON.stringify(formData));
            navigate('/login');
        } catch (error) {
            console.error('Register Failed:', error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="w-100 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 " >
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} className="">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Username</label>
                        <br />
                        <input
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <br  />
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <br />
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Role</label>
                        <br />
                        <select
                            name="role"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-blue-600 text-white font-medium py-2 rounded-md transition duration-200 mt-3"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
