import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

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
  const { ready, user } = useContext(UserContext);
  let { subpage } = useParams();
  console.log(subpage);
  if (subpage === undefined) {
    subpage = "profile";
  }
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    } else {
      classes += " hover:bg-gray-300 hover:text-blue-900 rounded-full";
    }
    return classes;
  }
  return (
    <div>
      <div className="flex justify-between">
        <h1>
          Welcome {user.firstName} {user.lastName}
        </h1>
        <div className="flex justify-between w-1/6">
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>
      </div>
      <h1 className="flex justify-between"></h1>
      <nav className="w-full flex mt-8 gap-2 justify-center">
        <Link to={"/account"} className={linkClasses("profile")}>
          My Profile
        </Link>
        <Link to={"/account/bookings"} className={linkClasses("bookings")}>
          My Bookings
        </Link>
        <Link to={"/account/places"} className={linkClasses("places")}>
          My Accomodations
        </Link>
      </nav>
    </div>
  );
}

export default AccountPage;
