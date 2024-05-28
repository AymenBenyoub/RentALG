import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import UpcomingGuestCard from "../Components/UpcomingGuestCard";

function Bookings() {
  const { user } = useContext(UserContext);
  const [upcomingGuests, setUpcomingGuests] = useState([]);

  useEffect(() => {
    const fetchUpcomingGuests = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reservations/me/${user.id}`
        );
        if (!response.ok)
          throw new Error("Couldn't fetch upcoming guests: NETWORK ERROR");
        const data = await response.json();
        setUpcomingGuests(data);
        console.log(data);
      } catch (err) {
        console.error("couldn't fetch upcoming guests: ", err);
      }
    };
    fetchUpcomingGuests();
  }, [user]);
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
      <h2 style={{ margin: "90px 0 0 50px " }}>Upcoming guests</h2>
      {upcomingGuests && (
        <main className="bookings-container">
          {upcomingGuests.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              You have no upcoming guests...
            </p>
          ) : (
            upcomingGuests.map((reservation, index) => (
              <div key={`${reservation.id}_${index}`}>
                <UpcomingGuestCard
                  accommodationId={reservation.accommodation_id}
                  guest_id={reservation.guest_id}
                  name={reservation.first_name + " " + reservation.last_name}
                  phoneNumber={reservation.phone_number}
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
