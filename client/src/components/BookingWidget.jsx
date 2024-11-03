import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);
  console.log({ user });

  useEffect(() => {
    if (user) {
      const fullName = user.firstName + " " + user.lastName;
      setName(fullName);
    }
  }, [user]);
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  function bookThisPlace() {
    // Your logic here to book the place
    const data = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      mobile,
      place: place._id,
      price: numberOfNights * place.price,
    };
    axios
      .post("/places/bookings", data, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        alert("Booking Successfull");
        const bookingId = res.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
      })
      .catch((err) => {
        console.log(err);
        alert("Booking error");
      });
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <h2 className="font-semibold text-2xl text-center">
          Price: {place.price} / per night
        </h2>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check in: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check out: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>Number of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full name:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Contact number:</label>
              <input
                type="tel"
                value={mobile}
                onChange={(ev) => setMobile(ev.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-4">
          Book This
          {numberOfNights > 0 && (
            <span>
              {" \u20B9"}
              {numberOfNights * place.price}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default BookingWidget;
