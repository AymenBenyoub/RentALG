import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import Bookings from "./Routes/Bookings";
import ListingDetails from "./Routes/ListingDetails";
import Host from "./Routes/Host";
import UserProfile from "./Routes/UserProfile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/host" element={<Host />} />
        <Route path="/profile/:id" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
