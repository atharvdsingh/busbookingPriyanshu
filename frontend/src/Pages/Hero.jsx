import { useState } from "react";
import { Calendar, MapPin, Search, Bus } from "lucide-react";
import { motion } from "framer-motion";
import { upCities } from "../data/cityList"; // your UP cities list file
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import toast from 'react-hot-toast';

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
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error("You must be logged in to search for buses.");
      navigate("/login");
      return;
    }

    console.log("Searching buses for:", formData);
    navigate("/search", { state: formData });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 h-[500px] rounded-b-[50px] shadow-2xl overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-pink-400 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Travel with <span className="text-yellow-300">Comfort</span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto opacity-90">
              Seamless bus booking experience across Uttar Pradesh. Safe, reliable, and fast.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Box Container - Overlapping the Hero */}
      <div className="px-4 -mt-24 relative z-20 mb-20">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-6 w-full max-w-5xl mx-auto border border-gray-100"
        >
          {/* From */}
          <div className="relative w-full md:w-1/3 group">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">From</label>
            <div className="flex items-center bg-gray-50 px-4 py-4 rounded-2xl border border-gray-200 group-focus-within:border-blue-500 group-focus-within:ring-4 group-focus-within:ring-blue-50 transition-all">
              <MapPin className="text-blue-600 mr-3 w-6 h-6" />
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="Enter Source City"
                className="w-full bg-transparent outline-none text-gray-800 font-semibold text-lg placeholder-gray-400"
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
              <ul className="absolute z-50 top-full mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
                {suggestions.map((city, i) => (
                  <li
                    key={i}
                    onMouseDown={() => handleSelect(city)}
                    className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 font-medium transition-colors border-b border-gray-50 last:border-none"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* To */}
          <div className="relative w-full md:w-1/3 group">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">To</label>
            <div className="flex items-center bg-gray-50 px-4 py-4 rounded-2xl border border-gray-200 group-focus-within:border-blue-500 group-focus-within:ring-4 group-focus-within:ring-blue-50 transition-all">
              <MapPin className="text-red-500 mr-3 w-6 h-6" />
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Enter Destination"
                className="w-full bg-transparent outline-none text-gray-800 font-semibold text-lg placeholder-gray-400"
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
              <ul className="absolute z-50 top-full mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
                {suggestions.map((city, i) => (
                  <li
                    key={i}
                    onMouseDown={() => handleSelect(city)}
                    className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 font-medium transition-colors border-b border-gray-50 last:border-none"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date */}
          <div className="w-full md:w-1/4 group">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Date</label>
            <div className="flex items-center bg-gray-50 px-4 py-4 rounded-2xl border border-gray-200 group-focus-within:border-blue-500 group-focus-within:ring-4 group-focus-within:ring-blue-50 transition-all">
              <Calendar className="text-indigo-600 mr-3 w-6 h-6" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-gray-800 font-semibold text-lg"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto mt-6 md:mt-0 h-16 px-8 bg-blue-600 text-white font-bold text-xl rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-1"
          >
            <Search size={24} />
            Search
          </button>
        </motion.form>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BusYatra?</h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
            {[
                { title: "Easy Booking", desc: "Book tickets in just 3 simple steps.", icon: "🎫", color: "bg-blue-100 text-blue-600" },
                { title: "Secure Payments", desc: "100% secure payment gateways.", icon: "🔒", color: "bg-green-100 text-green-600" },
                { title: "24/7 Support", desc: "We are here to help you anytime.", icon: "🎧", color: "bg-purple-100 text-purple-600" }
            ].map((feature, idx) => (
                <motion.div 
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300 text-center"
                >
                    <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-6 ${feature.color}`}>
                        {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {feature.desc}
                    </p>
                </motion.div>
            ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div>
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-blue-500">🚌</span> BusYatra
                </h4>
                <p className="text-gray-400">Making travel simple and accessible for everyone across Uttar Pradesh.</p>
            </div>
            <div>
                <h5 className="font-bold mb-4 text-lg">Quick Links</h5>
                <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
                </ul>
            </div>
             <div>
                <h5 className="font-bold mb-4 text-lg">Support</h5>
                <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition">Help Center</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                </ul>
            </div>
            <div>
                <h5 className="font-bold mb-4 text-lg">Newsletter</h5>
                <div className="flex">
                    <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg outline-none w-full" />
                    <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">Subscribe</button>
                </div>
            </div>
        </div>
        <div className="text-center text-gray-500 mt-12 pt-8 border-t border-gray-800">
            <p>© {new Date().getFullYear()} BusYatra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
