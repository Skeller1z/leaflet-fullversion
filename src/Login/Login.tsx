// src/Login.js
import React, { useState } from 'react';
import userData from './users.json'; // นำเข้าข้อมูล JSON
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const user = userData.find((u: { username: string; password: string; }) => u.username === username && u.password === password);
    if (user) {
        if (user.role === "Admin") {
            setError('');
            navigate('MapComponents'); // เช่น นำทางไปยังหน้าหลังจากล็อกอินสำเร็จสำหรับ Admin
          } else if(user.role === "Tester"){
            setError('');
            navigate('Tester'); // เช่น นำทางไปยังหน้าหลังจากล็อกอินสำเร็จสำหรับ User
          } else {
            setError('');
            navigate('UserPreview'); // เช่น นำทางไปยังหน้าหลังจากล็อกอินสำเร็จสำหรับ User
          }
    } else {
      // ล็อกอินไม่สำเร็จ
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">เข้าสู่ระบบ</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium mb-2">ชื่อผู้ใช้</label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600">เข้าสู่ระบบ</button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
