import React, { useState } from 'react';
import axios from 'axios';
import LoginTop from '../../../../shared/loginTob/LoginTop';
import { EyeIcon, EyeSlashIcon, UserIcon } from '@heroicons/react/24/outline';
import { loginAdmin } from '../../../../../utils/apis/Apis';
import { useNavigate } from 'react-router-dom';


const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async () => {
    const payload = {
      user_id: username,
      password: password,
    };

    try {
      const response = await loginAdmin(payload);
      setUsername("")
      setPassword("")
      navigate('/home');
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <LoginTop />
      <div className='mt-5'>
        {/* <div className=" text-center mb-3 text-xl text-gray-600 font-semibold -mt-1">Admin Login</div> */}
        <label className="text-sm mb-2 block text-start">User email or phone</label>
        <div className="relative flex items-center">
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
            placeholder="Enter user name"
          />
          <UserIcon className="w-[18px] h-[18px] text-gray-600 absolute right-4" />
        </div>
      </div>
      <div>
        <label className="text-sm mb-2 block text-start">Password</label>
        <div className="relative flex items-center">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
            placeholder="Enter password"
          />
          {showPassword ? (
            <EyeSlashIcon
              className="w-[18px] h-[18px] text-gray-600 absolute right-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <EyeIcon
              className="w-[18px] h-[18px] text-gray-600 absolute right-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </div>
      <div className="!mt-10">
        <button
          type="button"
          className="w-full mb-5 shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none"
          onClick={handleLogin}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
