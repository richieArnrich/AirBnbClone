import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      alert("cannot fetch place details");
    }
    axios
      .get(`/places/place/${id}`)
      .then((res) => {
        console.log(res.data);
        setPlace(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("alert while fetching, check network");
      });
  }, [id]);
  if (!place) return "";
  return (
    <div className="mt-4 bg-grey-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.name}</h1>
      <a
        className="my-2 block font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <div className="grid gap-2 grid-cols-[2fr_1fr]">
        <div>
          {place.photos?.[0] && (
            <img
              className="aspect-square object-cover"
              src={`http://localhost:4000/uploads/` + place.photos[0]}
              alt="place 1"
            />
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              className="aspect-square object-cover"
              src={`http://localhost:4000/uploads/` + place.photos[1]}
              alt="place 2"
            />
          )}
          <div>
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover relative top-2"
                src={`http://localhost:4000/uploads/` + place.photos[2]}
                alt="place 3"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacePage;
