import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/auth/signup', form);
    alert('Signup successful!');
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-sm mx-auto">
      <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} className="input" />
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} className="input" />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} className="input" />
      <button className="btn">Sign Up</button>
    </form>
  );
}
