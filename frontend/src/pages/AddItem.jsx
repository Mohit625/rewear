import { useState } from 'react';
import API from '../api/axios';

export default function AddItem() {
  const [form, setForm] = useState({
    title: '', description: '', category: '', type: '',
    size: '', condition: '', tags: '', imageUrls: [], points: 5
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = form.tags.split(',').map(tag => tag.trim());
    await API.post('/items', { ...form, tags });
    alert('Item submitted!');
    setForm({ ...form, title: '', description: '', tags: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      {['title', 'description', 'category', 'type', 'size', 'condition', 'tags'].map(field => (
        <input key={field} placeholder={field} value={form[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          className="input" required />
      ))}
      <input type="number" min="1" placeholder="Points" value={form.points}
        onChange={e => setForm({ ...form, points: e.target.value })} className="input" />
      <button className="btn">Submit Item</button>
    </form>
  );
}
