import { useState } from "react";
import { Calendar, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { upCities } from "../data/cityList"; // your UP cities list file
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Home() {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
  });
   const  navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(""); // 'source' or 'destination'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setActiveField(name);

    if (value.trim() === "") {
      setSuggestions(upCities.slice(0, 10)); // top 10 default
    } else {
      const filtered = upCities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
    }
  };

  const handleSelect = (city) => {
    setFormData({ ...formData, [activeField]: city });
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching buses for:", formData);
    navigate("/search", { state: formData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Navbar */}
    <Navbar/>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center flex-grow px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Find, Book & Go — Easy Bus Travel!
        </motion.h2>
        <p className="text-gray-600 mb-8 text-lg">
          Book your next trip in just a few clicks. Safe, fast, and affordable travel options.
        </p>

        {/* Search Box */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl relative"
        >
          {/* From */}
          <div className="relative w-full md:w-1/3">
            <div className="flex items-center bg-gray-50 px-4 py-3 rounded-xl border">
              <MapPin className="text-blue-600 mr-3" />
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="From"
                className="w-full bg-transparent outline-none"
                required
                onFocus={() => {
                  setActiveField("source");
                  setSuggestions(upCities.slice(0, 10));
                }}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && activeField === "source" && (
              <ul className="absolute z-50 top-full mt-2 w-full bg-white border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                {suggestions.map((city, i) => (
                  <li
                    key={i}
                    onMouseDown={() => handleSelect(city)}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* To */}
          <div className="relative w-full md:w-1/3">
            <div className="flex items-center bg-gray-50 px-4 py-3 rounded-xl border">
              <MapPin className="text-blue-600 mr-3" />
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="To"
                className="w-full bg-transparent outline-none"
                required
                onFocus={() => {
                  setActiveField("destination");
                  setSuggestions(upCities.slice(0, 10));
                }}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && activeField === "destination" && (
              <ul className="absolute z-50 top-full mt-2 w-full bg-white border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                {suggestions.map((city, i) => (
                  <li
                    key={i}
                    onMouseDown={() => handleSelect(city)}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date */}
          <div className="flex items-center w-full md:w-1/4 bg-gray-50 px-4 py-3 rounded-xl border">
            <Calendar className="text-blue-600 mr-3" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            <Search size={20} />
            Search
          </button>
        </motion.form>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Search and book your bus tickets in seconds with a smooth experience.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Pay securely through multiple payment options with full data safety.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Get assistance anytime from our customer support team.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-10">
        <p>© {new Date().getFullYear()} BusYatra. All rights reserved.</p>
      </footer>
    </div>
  );
}
