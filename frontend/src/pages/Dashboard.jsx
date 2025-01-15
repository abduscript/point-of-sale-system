import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');  // Ambil token dari localStorage
            if (token) {
                try {
                    // Kirim request ke backend untuk mengambil data pengguna
                    const response = await axios.get('http://localhost:5000/api/users/me', {
                        headers: {
                            Authorization: `Bearer ${token}`  // Sertakan token di header
                        }
                    });

                    // Simpan data pengguna ke state
                    setUser(response.data);
                } catch (error) {
                    console.error('Gagal mengambil data pengguna', error);
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {user ? (
                <h1>Welcome, {user.username}</h1>  // Menampilkan nama pengguna
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Dashboard;
