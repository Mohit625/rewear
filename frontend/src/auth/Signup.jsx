import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', form);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      const msg = err?.response?.data?.error || 'Signup failed. Try again.';
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold">Create Account</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="input w-full"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="input w-full"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="input w-full"
        required
      />
      <button type="submit" className="btn w-full">Sign Up</button>
    </form>
  );
}
