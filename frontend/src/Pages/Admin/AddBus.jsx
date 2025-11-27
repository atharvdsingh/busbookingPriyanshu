import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import toast from 'react-hot-toast';
import Navbar from "../../Components/Navbar";

const AddBus = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "AC Seater",
    source: "",
    destination: "",
    departure: "",
    arrival: "",
    basePrice: "",
    seatsAvailable: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        basePrice: parseFloat(formData.basePrice),
        seatsAvailable: parseInt(formData.seatsAvailable),
      };
      
      const { data } = await API.post('/buses', payload);
      console.log("Bus added:", data);
      toast.success("Bus added successfully!");
      navigate("/"); // Redirect to home or stay on page to add more
    } catch (error) {
      console.error("Error adding bus:", error);
      toast.error("Failed to add bus. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Bus</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Bus Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Bus Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Royal Travels"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Bus Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="AC Seater">AC Seater</option>
                <option value="Non-AC Seater">Non-AC Seater</option>
                <option value="AC Sleeper">AC Sleeper</option>
                <option value="Non-AC Sleeper">Non-AC Sleeper</option>
              </select>
            </div>

            {/* Source & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Source</label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Lucknow"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Delhi"
                  required
                />
              </div>
            </div>

            {/* Departure & Arrival */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Departure Time</label>
                <input
                  type="text"
                  name="departure"
                  value={formData.departure}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 10:00 AM"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Arrival Time</label>
                <input
                  type="text"
                  name="arrival"
                  value={formData.arrival}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 06:00 PM"
                  required
                />
              </div>
            </div>

            {/* Price & Seats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Base Price (₹)</label>
                <input
                  type="number"
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Total Seats</label>
                <input
                  type="number"
                  name="seatsAvailable"
                  value={formData.seatsAvailable}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 40"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Add Bus
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBus;
