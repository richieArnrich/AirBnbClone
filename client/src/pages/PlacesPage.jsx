import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import axios from "axios";

import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../components/AccountNav";
function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("/places/", { withCredentials: true })
      .then(({ data }) => {
        setPlaces(data);
        document.getElementById("message").innerHTML =
          "<b>Fetched Successfully</b>";
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("message").innerHTML =
          "<b>Something went wrong while fetching</b>";
      });
    console.log(document.getElementById("message"));
  }, []);
  return (
    <div>
      <AccountNav />
      <p
        id="message"
        className="text-center p-5 bg-slate-400 w-40 mx-auto rounded-md my-4"
      ></p>
      <div className="text-center gap-2 my-3">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Add New Place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link
                to={"/account/places/" + place._id}
                key={place.id}
                className="flex cursor-pointer gap-4 bg-gray-200 p-4 rounder-2xl"
              >
                <div className="w-32 h-32 bg-primary grow shrink-0">
                  {place.photos.length > 0 && <img src={place.photos[0]} />}
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl ">{place.name}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default PlacesPage;
