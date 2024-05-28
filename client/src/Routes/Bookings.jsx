import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import ReservationCard from "../Components/ReservationCard";
import { useNavigate } from "react-router-dom";
function Bookings() {
  const { user } = useContext(UserContext);
  const [reservations, setReservations] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reservations/user/accommodation/${user.id}`
        );
        if (!response.ok)
          throw new Error("Couldn't fetch user reservations: NETWORK ERROR");
        const data = await response.json();
        setReservations(data);
        console.log(data);
      } catch (err) {
        console.error("couldn't fetch reservations: ", err);
      }
    };
    fetchUserReservations();
  });
  function transformDateFormat(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <Header />
      <h2 style={{ margin: "90px 0 0 50px " }}>Your Bookings</h2>
      {reservations && (
        <main className="bookings-container">
          {reservations.length === 0 ? (
            <p style={{ textAlign: "center" }}>You have no upcoming trips...</p>
          ) : (
            reservations.map((reservation, index) => (
              <div
                key={`${reservation.id}_${index}`}
                onClick={() =>
                  navigate(`/listings/${reservation.accommodation_id}`)
                }
                style={{ width: "min-content" }}
              >
                <ReservationCard
                  title={reservation.title}
                  checkin={transformDateFormat(reservation.check_in_date)}
                  checkout={transformDateFormat(reservation.check_out_date)}
                  total={reservation.total_price}
                  thumbnail={reservation.pictures}
                  date={transformDateFormat(reservation.reservation_date)}
                />
              </div>
            ))
          )}
        </main>
      )}
      <Footer />
    </>
  );
}

export default Bookings;
