import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingItems, setPendingItems] = useState([]);

  useEffect(() => {
    if (user?.role !== 'admin') navigate('/'); // redirect non-admins
    fetchPending();
  }, []);

  const fetchPending = async () => {
    const res = await API.get('/admin/pending');
    setPendingItems(res.data);
  };

  const handleApprove = async (id) => {
    await API.patch(`/admin/approve/${id}`);
    fetchPending();
  };

  const handleReject = async (id) => {
    await API.delete(`/items/${id}`); // delete route must exist
    fetchPending();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Approve Items</h1>
      {pendingItems.length === 0 ? (
        <p>No items pending approval ✅</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pendingItems.map(item => (
            <div key={item._id} className="p-4 border rounded-xl">
              <img src={item.imageUrls?.[0]} className="h-40 w-full object-cover rounded-md mb-2" />
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-xs">Uploader ID: {item.uploader}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleApprove(item._id)} className="btn">Approve</button>
                <button onClick={() => handleReject(item._id)} className="btn bg-red-600 hover:bg-red-700">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
