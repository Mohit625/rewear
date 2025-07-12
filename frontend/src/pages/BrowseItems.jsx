import { useAuth } from '../auth/AuthProvider';

export default function BrowseItems() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await API.get('/items');
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSwap = async (id) => {
    await API.patch(`/items/${id}/swap`);
    alert('Swap requested!');
    fetchItems();
  };

  const handleRedeem = async (id) => {
    await API.patch(`/items/${id}/redeem`);
    alert('Item redeemed!');
    fetchItems();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Browse Available Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item._id} className="border p-4 rounded-xl">
            <img src={item.imageUrls?.[0]} alt={item.title} className="w-full h-48 object-cover mb-2 rounded-md" />
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-500">{item.category} • {item.size}</p>
            <p className="text-xs text-gray-400 mt-1">{item.points} pts</p>
            <p className="text-xs mt-1">Uploader: {item.uploader?.name}</p>
            {user && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleSwap(item._id)} className="btn">Swap</button>
                <button onClick={() => handleRedeem(item._id)} className="btn bg-green-600 hover:bg-green-700">Redeem</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
