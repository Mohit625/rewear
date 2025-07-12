import { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../auth/AuthProvider';

export default function Dashboard() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get('/items').then(res => {
      const userItems = res.data.filter(item => item.uploader._id === user.id);
      setItems(userItems);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}</h1>
      <p className="text-gray-600">Points: <strong>{user.points ?? 'N/A'}</strong></p>
      <h2 className="text-xl mt-6 mb-3">Your Uploaded Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item._id} className="p-4 border rounded-xl">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-500">{item.category} - {item.size}</p>
            <p className="text-xs mt-1">{item.approved ? '✅ Approved' : '⏳ Pending'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
