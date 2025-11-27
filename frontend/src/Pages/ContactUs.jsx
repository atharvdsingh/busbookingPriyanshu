import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../Components/Navbar";

import toast from 'react-hot-toast';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data
    console.log("Contact Form Submitted:", formData);
    toast.success("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Hero Section */}
      <Navbar/>
      <div className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl">We’re here to help and answer any question you might have.</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto my-12 px-4 gap-10">
        {/* Contact Form */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-start space-x-4">
            <MapPin className="w-8 h-8 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Address</h3>
              <p className="text-gray-600">Uttar Pradesh, India</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-start space-x-4">
            <Phone className="w-8 h-8 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">+91 8765464600</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-start space-x-4">
            <Mail className="w-8 h-8 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">support@busyatra.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
