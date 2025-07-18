import { useEffect, useState } from 'react';

function Transactions() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/address') // ✅ Correct endpoint
      .then((res) => res.json())
      .then((data) => {
        setAddresses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching address data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading transactions...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
      {addresses.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Pincode</th>
              <th className="p-3 text-left">Payment Method</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((addr) => (
              <tr key={addr._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{addr.fullName}</td>
                <td className="p-3">{addr.addressLine}</td>
                <td className="p-3">{addr.city}</td>
                <td className="p-3">{addr.pinCode}</td>
                <td className="p-3">{addr.paymentMethod}</td>
                <td className="p-3">{new Date(addr.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transactions;
