import React, { useEffect, useState } from "react";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(0);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios
        .get("/places/" + id, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);
  function inputHeader(header) {
    return <h2 className="text-2xl mt-4">{header}</h2>;
  }
  function inputDescription(description) {
    return <p className="text-gray-500 text-sm"> {description}</p>;
  }
  function preInput(header, descripton) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(descripton)}
      </>
    );
  }

  function addNewPlace(event) {
    event.preventDefault();
    const data = {
      name: title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest: maxGuests,
    };
    axios
      .post("places/addplaces", data, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setRedirect(true);
        alert("Place added successfully");
      })
      .catch((err) => {
        alert("something went wrong");
        console.log(err);
      });
  }
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {/* Title input field */}
        {preInput("Title", "A chatchy title for your place")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, Eg: My lovely apt"
        />
        {/* Address input field */}
        {preInput("Address", "Your place location (address)")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {/* Photos input field */}
        {preInput("Photos", "The more, the better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {/* Description input field */}
        {preInput("Description", "Tell us about your place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {/* Perks input field */}
        {preInput("Perks", "Select all the perks of your stay")}
        <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {/*  Extra information input field */}
        {preInput("Extra Information", "House rules, etc...")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {/* Check in and out times input fields */}
        {preInput(
          "Check In&Out times",
          "Add Check in and out times, remember to have some time window for cleaning the bedroom between guests"
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-2">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-2">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-2">Max number of guests</h3>
            <input
              type="text"
              placeholder="Max guests"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}

export default PlacesFormPage;
