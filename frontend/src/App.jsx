import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Hero"
import SearchResults from "./Pages/SearchResult";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import MyBookings from "./Pages/MyBooking";
import SeatSelection from "./Pages/SeatSelection";
import ProtectedRoute from "./Components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact"  element={<ContactUs/>} />
        <Route path="/login"  element={<Login/>} />
        <Route path="/signup"  element={<Signup/>} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/search" element={< SearchResults/>} />
          <Route  path="/my-bookings"  element={<MyBookings/>}  />
          <Route path="/bus/:id" element={<SeatSelection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
