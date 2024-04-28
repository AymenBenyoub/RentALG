import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import Bookings from "./Routes/Bookings";
import ListingDetails from "./Routes/ListingDetails";
import Host from "./Routes/Host";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/listings" element={<ListingDetails />} />
        <Route path="/host" element={<Host />} />
      </Routes>
    </>
  );
}

export default App;
