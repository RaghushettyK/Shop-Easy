import { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:5000/api/products/${editingId}`
      : 'http://localhost:5000/api/products';

    const method = editingId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        fetchProducts();
        setFormData({ title: '', price: '', category: '', image: '' });
        setEditingId(null);
      })
      .catch((err) => console.error('Error submitting form:', err));
  };

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
    });
    setEditingId(product._id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchProducts())
      .catch((err) => console.error('Error deleting product:', err));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="leafy greens">Leafy Greens</option>
          <option value="root vegetables">Root Vegetables</option>
          <option value="fruiting vegetables">Fruiting Vegetables</option>
          <option value="seasonal vegetables">Seasonal Vegetables</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="md:col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product Table */}
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-2">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    'No image'
                  )}
                </td>
                <td className="p-2">{product.title}</td>
                <td className="p-2">₹{product.price}</td>
                <td className="p-2 capitalize">{product.category}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Products;
