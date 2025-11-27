import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Search, MapPin, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative z-10 px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Travel with Comfort & Confidence
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book bus tickets instantly. Choose from thousands of routes and travel partners across the country.
          </p>
          
          {/* Search Widget */}
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="From" className="pl-10 text-black" />
            </div>
            <div className="flex-1 w-full relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="To" className="pl-10 text-black" />
            </div>
            <div className="flex-1 w-full relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input type="date" className="pl-10 text-black" />
            </div>
            <Button size="lg" className="w-full md:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">Book your tickets in just a few clicks with our user-friendly interface.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Live Tracking</h3>
              <p className="text-muted-foreground">Track your bus in real-time and share your location with loved ones.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Our customer support team is available round the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
