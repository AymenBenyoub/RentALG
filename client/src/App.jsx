import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import Bookings from "./Routes/Bookings";
import ListingDetails from "./Routes/ListingDetails";
import Host from "./Routes/Host";
import UserProfile from "./Routes/UserProfile";
import AdminHome from "./Routes/AdminHome";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import AdminReportList from "./Routes/AdminReportList";
import AdminStats from "./Components/AdminStats";
import AccommodationsStats from"./Components/AccommodationsStats";
import UpcomingGuests from "./Routes/UpcomingGuests";
function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !user || (user && user.role === "user") ? <Home /> : <AdminHome />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/host" element={<Host />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/UpcomingGuests" element={<UpcomingGuests />} />
        <Route path="reports" element={<AdminReportList />} />
        <Route path="/AdminStats" element={<AdminStats />} />
        <Route path="/AccommodationsStats" element={<AccommodationsStats />} />

      </Routes>
    </>
  );
}

export default App;
