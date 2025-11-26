import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Clock, Bus, IndianRupee, Filter } from "lucide-react";

// Pool of buses
const busPool = [
  { name: "UPSRTC Express", type: "Non-AC Seater", basePrice: 350 },
  { name: "Royal Travels", type: "AC Sleeper", basePrice: 550 },
  { name: "Shatabdi Bus Lines", type: "AC Seater", basePrice: 480 },
  { name: "City Connect", type: "Non-AC Seater", basePrice: 300 },
  { name: "SilverLine Travels", type: "AC Sleeper", basePrice: 600 },
  { name: "BlueSky Express", type: "AC Seater", basePrice: 500 },
  { name: "YellowLine", type: "Non-AC Sleeper", basePrice: 400 },
  { name: "FastTrack", type: "AC Seater", basePrice: 520 },
  { name: "Royal Coach", type: "AC Sleeper", basePrice: 580 },
  { name: "Metro Bus", type: "Non-AC Seater", basePrice: 320 },
  { name: "SuperBus", type: "AC Seater", basePrice: 530 },
  { name: "GoTravel", type: "Non-AC Sleeper", basePrice: 360 },
  { name: "StarLine", type: "AC Sleeper", basePrice: 600 },
  { name: "FastWay", type: "AC Seater", basePrice: 490 },
];

const generateRandomBus = (bus, id) => {
  // Random departure hour between 6 AM and 10 PM
  const depHour = Math.floor(Math.random() * 16) + 6;
  const depMin = Math.floor(Math.random() / 60 * 60);
  const departure = `${depHour.toString().padStart(2, "0")}:${Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0")} ${depHour >= 12 ? "PM" : "AM"}`;

  // Random duration 2-6 hours
  const duration = Math.floor(Math.random() * 5) + 2;
  const arrHour = depHour + duration;
  const arrival = `${(arrHour % 24).toString().padStart(2, "0")}:${Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0")} ${arrHour >= 12 ? "PM" : "AM"}`;

  // Random seats
  const seatsAvailable = Math.floor(Math.random() * 20) + 1;

  // Random price variation ±50
  const price = bus.basePrice + Math.floor(Math.random() * 100 - 50);

  return {
    id,
    name: bus.name,
    type: bus.type,
    departure,
    arrival,
    seatsAvailable,
    price,
  };
};

const BusList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { source, destination, date } = location.state || {};
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    // Generate random 8–12 buses from pool
    const shuffled = [...busPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 5) + 8);
    const randomBuses = selected.map((bus, idx) => generateRandomBus(bus, idx + 1));
    setBuses(randomBuses);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Available Buses</h2>
        <div className="flex flex-wrap items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          <span className="font-medium">{source || "Source"}</span>
          <span className="mx-2">→</span>
          <span className="font-medium">{destination || "Destination"}</span>
          <span className="mx-4">|</span>
          <Clock className="w-4 h-4 mr-1 text-blue-600" />
          <span>{date || "Select Date"}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-5xl mx-auto bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <Filter className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Filters:</span>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">All</button>
          <button className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">AC</button>
          <button className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">Non-AC</button>
          <button className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">Sleeper</button>
        </div>
      </div>

      {/* Bus List */}
      <div className="max-w-5xl mx-auto space-y-4">
        {buses.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Loading buses...</p>
        ) : (
          buses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-2xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition"
            >
              <div className="flex items-center space-x-4">
                <Bus className="w-10 h-10 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{bus.name}</h3>
                  <p className="text-sm text-gray-600">{bus.type}</p>
                  <p className="text-sm mt-1 text-gray-700">{bus.departure} → {bus.arrival}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-6">
                <div className="flex items-center text-green-700 font-semibold">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  {bus.price}
                </div>
                <p className="text-sm text-gray-500">{bus.seatsAvailable} seats left</p>
                <button
                  onClick={() => navigate(`/bus/${bus.id}`, { state: bus })}
                  className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
                >
                  View Seats
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BusList;
