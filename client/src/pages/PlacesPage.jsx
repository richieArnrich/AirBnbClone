import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";
import PhotosUploader from "../components/PhotosUploader";
function PlacesPage() {
  // Get the action parameter from the URL
  const { action } = useParams();
  // Initialize state variables for the form fields
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState();
  const [redirect, setRedirect] = useState("");

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

  function addNewPlace(ev) {
    ev.prventDefault();
    const data = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    axios.post("/addplaces", data).then((res) => {
      console.log(res.data);
      setRedirect("/account/places");
    });
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      {action != "new" && (
        <div className="text-center gap-2 my-3">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clip-rule="evenodd"
              />
            </svg>
            Add New Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
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
            <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
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
      )}
    </div>
  );
}

export default PlacesPage;
