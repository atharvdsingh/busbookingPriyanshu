import React, { useState, useEffect } from "react";
import { MapPin, Clock, Bus, IndianRupee, Trash2 } from "lucide-react";
import API from "../api/axios";
import Navbar from "../Components/Navbar";

// Dummy booking data (simulate user bookings)
const dummyBookings = [
  {
    id: 1,
    busName: "UPSRTC Express",
    source: "Lucknow",
    destination: "Kanpur",
    date: "2025-10-20",
    seats: 2,
    price: 700,
    status: "Confirmed",
  },
  {
    id: 2,
    busName: "Royal Travels",
    source: "Agra",
    destination: "Lucknow",
    date: "2025-10-22",
    seats: 1,
    price: 550,
    status: "Pending",
  },
  {
    id: 3,
    busName: "Shatabdi Bus Lines",
    source: "Varanasi",
    destination: "Lucknow",
    date: "2025-10-25",
    seats: 3,
    price: 1440,
    status: "Cancelled",
  },
];

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await API.get('/bookings/my-bookings');
        console.log("Fetched bookings:", data);
        // Transform data if necessary to match UI expectations
        // Assuming backend returns bookings with included bus details
        const formattedBookings = data.map(b => ({
          id: b.id,
          busName: b.bus?.name || "Unknown Bus",
          source: b.bus?.source || "Unknown", 
          destination: b.bus?.destination || "Unknown",
          date: new Date(b.date).toLocaleDateString(),
          seats: b.seatNumbers.length,
          price: b.totalPrice,
          status: b.status
        }));
        setBookings(formattedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await API.put(`/bookings/${id}/cancel`);
        console.log("Booking cancelled:", id);
        setBookings(bookings.map(b => b.id === id ? { ...b, status: "Cancelled" } : b));
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("Failed to cancel booking.");
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 px-4 py-6">
        
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">You have no bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition"
              >
                {/* Booking Info */}
                <div className="flex items-center space-x-4">
                  <Bus className="w-10 h-10 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{booking.busName}</h3>
                    <p className="text-sm text-gray-600">
                      <MapPin className="inline w-4 h-4 text-blue-600 mr-1" />
                      {booking.source} → {booking.destination}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <Clock className="inline w-4 h-4 text-blue-600 mr-1" />
                      {booking.date}
                    </p>
                  </div>
                </div>

                {/* Seats & Price */}
                <div className="mt-4 md:mt-0 flex items-center space-x-6">
                  <p className="text-sm text-gray-700">
                    Seats: <span className="font-medium">{booking.seats}</span>
                  </p>
                  <div className="flex items-center text-green-700 font-semibold">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {booking.price}
                  </div>
                  <p
                    className={`text-sm font-medium ${
                      booking.status === "Confirmed"
                        ? "text-green-600"
                        : booking.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {booking.status}
                  </p>
                  {booking.status !== "Cancelled" && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
