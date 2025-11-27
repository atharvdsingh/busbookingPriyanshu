import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Bus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Bus className="h-6 w-6 text-primary" />
          <span>BusBooking</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-primary">Home</Link>
          <Link to="/search" className="transition-colors hover:text-primary">Search</Link>
          <Link to="/mybookings" className="transition-colors hover:text-primary">My Bookings</Link>
          <Link to="/contact" className="transition-colors hover:text-primary">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
