import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bus = location.state;

  // Mock seat layout (2 rows of 10 seats on each side for a 40 seater)
  // 0: Available, 1: Booked, 2: Selected
  const [seats, setSeats] = useState(
    Array(40).fill(0).map(() => (Math.random() > 0.7 ? 1 : 0)) // Randomly book some seats
  );

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (index) => {
    if (seats[index] === 1) return; // Cannot select booked seats

    const newSeats = [...seats];
    if (newSeats[index] === 2) {
      newSeats[index] = 0; // Deselect
      setSelectedSeats(selectedSeats.filter((s) => s !== index + 1));
    } else {
      newSeats[index] = 2; // Select
      setSelectedSeats([...selectedSeats, index + 1]);
    }
    setSeats(newSeats);
  };

  const handleBooking = () => {
    alert(`Booking confirmed for seats: ${selectedSeats.join(", ")}\nTotal Price: ₹${selectedSeats.length * bus.price}`);
  };

  if (!bus) {
    return <div className="p-10 text-center">No bus selected. Please go back and select a bus.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Search
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Seat Layout */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Select Seats</h2>
            
            {/* Legend */}
            <div className="flex gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gray-200 border border-gray-300"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gray-400 cursor-not-allowed"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-600 border border-blue-700"></div>
                <span>Selected</span>
              </div>
            </div>

            {/* Bus Layout */}
            <div className="border-2 border-gray-200 rounded-xl p-4 relative max-w-sm mx-auto">
              <div className="absolute -right-8 top-10 transform rotate-90 text-gray-400 text-xs tracking-widest">DRIVER</div>
              
              <div className="grid grid-cols-4 gap-4">
                {seats.map((status, index) => {
                  // Add aisle gap after 2nd column
                  const isAisle = (index % 4) === 2;
                  
                  return (
                    <React.Fragment key={index}>
                      {isAisle && <div className="w-4"></div>} {/* Aisle */}
                      <button
                        onClick={() => toggleSeat(index)}
                        disabled={status === 1}
                        className={`
                          w-10 h-10 rounded-lg flex items-center justify-center transition-all
                          ${status === 0 ? "bg-gray-100 border border-gray-300 hover:border-blue-500 hover:bg-blue-50" : ""}
                          ${status === 1 ? "bg-gray-300 cursor-not-allowed text-gray-500" : ""}
                          ${status === 2 ? "bg-blue-600 text-white shadow-md transform scale-105" : ""}
                        `}
                      >
                        <span className="text-xs font-medium">{index + 1}</span>
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Trip Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Operator</p>
                  <p className="font-semibold">{bus.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Route</p>
                  <p className="font-semibold">{bus.departure} → {bus.arrival}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-semibold">{bus.type}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Fare Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Seat Price</span>
                  <span className="font-medium">₹{bus.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Selected Seats</span>
                  <span className="font-medium">{selectedSeats.length}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-blue-600">
                  <span>Total</span>
                  <span>₹{selectedSeats.length * bus.price}</span>
                </div>
              </div>
              
              <button
                onClick={handleBooking}
                disabled={selectedSeats.length === 0}
                className={`
                  w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
                  ${selectedSeats.length > 0 ? "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl" : "bg-gray-300 cursor-not-allowed"}
                `}
              >
                <CheckCircle className="w-5 h-5" />
                Proceed to Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
