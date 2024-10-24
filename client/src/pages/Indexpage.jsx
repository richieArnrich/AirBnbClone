import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Indexpage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("/places/allplaces")
      .then((res) => {
        console.log(res.data);
        setPlaces([...res.data, ...res.data, ...res.data]);
        // only to repeat the pictures, remove this and make it res.data once enough
        // places are added
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong");
      });
  }, []);
  return (
    <div className="mt-8 gap-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place.id}>
            <div className="bg-gray-500 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt="place"
                />
              )}
            </div>
            <h3 className="font-bold leading-4">{place.address}</h3>
            <h2 className="text-sm leading-4 text-gray-500">{place.name}</h2>
            <div className="mt-1">
              <span className="font-bold">
                {"\u20B9"}
                {place.price}
              </span>{" "}
              per night
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Indexpage;
