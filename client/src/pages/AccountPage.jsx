import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

function AccountPage() {
  const now = new Date();

  // Format the date
  const formattedDate = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  // Format the time without seconds
  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  console.log(subpage);
  if (subpage === undefined) {
    subpage = "profile";
  }

  function logOut() {
    axios.post("/users/logout");
    setRedirect("/");
    setUser(null);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg text-gray-700">
          Welcome {user.firstName} {user.lastName}
        </h1>
        <div className="flex justify-between w-1/6 text-sm text-gray-500">
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>
      </div>
      <h1 className="flex justify-between"></h1>
      <AccountNav />
      {subpage === "profile" && (
        <div className="max-w-lg mx-auto mt-8 p-5 bg-white rounded-lg shadow-md text-center gap-2">
          <h2 className="text-lg text-gray-700">My Profile</h2>
          <p className="text-center">
            Logged in as {user.firstName} ({user.email})
          </p>
          <button className="primary max-w-sm mt-2" onClick={logOut}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}

export default AccountPage;
