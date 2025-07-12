import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-center px-6 py-16">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">👕 ReWear</h1>
      <p className="text-lg text-gray-600 max-w-xl">
        Exchange unused clothes through direct swaps or point-based redemptions.
        Promote sustainability and reduce textile waste by giving your garments a second life.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Link to="/browse" className="btn">Browse Items</Link>
        <Link to="/add" className="btn bg-green-600 hover:bg-green-700">List an Item</Link>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">🌟 How it Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 border rounded-xl bg-white shadow-sm">
            <h3 className="font-bold mb-2">1. Sign Up</h3>
            <p>Create your free account to join the ReWear community.</p>
          </div>
          <div className="p-4 border rounded-xl bg-white shadow-sm">
            <h3 className="font-bold mb-2">2. List Clothes</h3>
            <p>Upload clothes you no longer wear and describe them.</p>
          </div>
          <div className="p-4 border rounded-xl bg-white shadow-sm">
            <h3 className="font-bold mb-2">3. Swap or Redeem</h3>
            <p>Swap directly or use earned points to redeem new items.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
