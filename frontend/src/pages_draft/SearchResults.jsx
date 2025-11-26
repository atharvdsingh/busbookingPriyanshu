import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import BusCard from "../components/features/BusCard";
import { Filter } from "lucide-react";

// Mock data
const MOCK_BUSES = [
  {
    id: 1,
    operator: "BlueLine Travels",
    type: "AC Sleeper (2+1)",
    departureTime: "22:00",
    arrivalTime: "06:00",
    source: "Mumbai",
    destination: "Goa",
    duration: "8h 00m",
    price: 1200,
    seatsAvailable: 12,
  },
  {
    id: 2,
    operator: "Green Express",
    type: "Non-AC Seater (2+2)",
    departureTime: "21:30",
    arrivalTime: "05:45",
    source: "Mumbai",
    destination: "Goa",
    duration: "8h 15m",
    price: 800,
    seatsAvailable: 24,
  },
  {
    id: 3,
    operator: "Royal Voyages",
    type: "Volvo Multi-Axle AC",
    departureTime: "23:00",
    arrivalTime: "06:30",
    source: "Mumbai",
    destination: "Goa",
    duration: "7h 30m",
    price: 1500,
    seatsAvailable: 5,
  },
];

export default function SearchResults() {
  const [buses, setBuses] = useState(MOCK_BUSES);

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="Min" className="h-8" />
                  <span>-</span>
                  <Input type="number" placeholder="Max" className="h-8" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bus Type</label>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    AC
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Non-AC
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Sleeper
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Seater
                  </label>
                </div>
              </div>
              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>
        </aside>

        {/* Results List */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Mumbai to Goa</h1>
            <span className="text-muted-foreground">{buses.length} Buses found</span>
          </div>
          
          <div className="space-y-4">
            {buses.map((bus) => (
              <BusCard key={bus.id} bus={bus} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
