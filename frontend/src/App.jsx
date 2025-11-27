import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Hero"
import SearchResults from "./Pages/SearchResult";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import MyBookings from "./Pages/MyBooking";
import SeatSelection from "./Pages/SeatSelection";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Toaster } from 'react-hot-toast';


import AddBus from "./Pages/Admin/AddBus";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact"  element={<ContactUs/>} />
        <Route path="/login"  element={<Login/>} />
        <Route path="/signup"  element={<Signup/>} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/search" element={< SearchResults/>} />
          <Route  path="/my-bookings"  element={<MyBookings/>}  />
          <Route path="/bus/:id" element={<SeatSelection />} />
          <Route path="/admin/add-bus" element={<AddBus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
