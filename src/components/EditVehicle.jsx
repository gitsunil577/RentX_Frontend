import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCar, FaDollarSign, FaBoxes, FaListAlt, FaEdit, FaArrowLeft } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryID: '',
  });

  useEffect(() => {
    // Load vehicle data from sessionStorage or fetch it
    const storedData = sessionStorage.getItem('editVehicleData');
    if (storedData) {
      const vehicle = JSON.parse(storedData);
      setFormData({
        name: vehicle.name || '',
        description: vehicle.description || '',
        price: vehicle.price || '',
        stock: vehicle.stock || '',
        categoryID: vehicle.categoryID?._id || vehicle.categoryID || '',
      });
    } else {
      // Fetch vehicle data if not in sessionStorage
      fetchVehicleData();
    }

    // Fetch categories
    fetchCategories();
  }, [id]);

  const fetchVehicleData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_BASE_URL}/vehicle/vehicleByID/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data?.data) {
        const vehicle = response.data.data;
        setFormData({
          name: vehicle.name || '',
          description: vehicle.description || '',
          price: vehicle.price || '',
          stock: vehicle.stock || '',
          categoryID: vehicle.categoryID?._id || vehicle.categoryID || '',
        });
      }
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      toast.error('Failed to load vehicle data');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/all-categories`);
      if (response.data?.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.categoryID) {
      toast.error('Please fill in all fields');
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    if (parseInt(formData.stock) < 0) {
      toast.error('Stock cannot be negative');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');

      const updateData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        categoryID: formData.categoryID,
      };

      const response = await axios.put(
        `${API_BASE_URL}/vehicle/update-vehicle/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data) {
        toast.success('Vehicle updated successfully!');
        sessionStorage.removeItem('editVehicleData');
        navigate('/owner-dashboard');
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
      toast.error(error.response?.data?.message || 'Failed to update vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-8 md:py-12 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto max-w-3xl relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/owner-dashboard')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="relative group mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3 mb-2">
              <FaEdit className="text-blue-400" />
              Edit Vehicle
            </h1>
            <p className="text-slate-400">Update your vehicle information</p>
          </div>
        </div>

        {/* Form */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vehicle Name */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <FaCar className="text-blue-400" />
                  Vehicle Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter vehicle name (e.g., Honda City 2023)"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <FaListAlt className="text-purple-400" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your vehicle (features, condition, etc.)"
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  required
                />
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <FaDollarSign className="text-green-400" />
                    Price per Day (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter daily rental price"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <FaBoxes className="text-orange-400" />
                    Stock Available
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="Number of units"
                    min="0"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <FaListAlt className="text-blue-400" />
                  Category
                </label>
                <select
                  name="categoryID"
                  value={formData.categoryID}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Note about image */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                  <strong>Note:</strong> To change the vehicle image, please contact support or delete and re-register the vehicle.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/owner-dashboard')}
                  className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-all ${
                    loading
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg'
                  }`}
                >
                  {loading ? 'Updating...' : 'Update Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVehicle;
