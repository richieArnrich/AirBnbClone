import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import axios from "axios";

import PlacesFormPage from "./PlacesFormPage";
function PlacesPage() {
  // Get the action parameter from the URL
  const { action } = useParams();
  // Initialize state variables for the form fields

  const [redirect, setRedirect] = useState("");

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6";
    if (type === false) {
      classes += " bg-primary text-white rounded-full";
    } else {
      classes += " bg-gray-200 hover:text-blue-900 rounded-full";
    }
    return classes;
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
      )}
      {action === "new" && <PlacesFormPage />}
    </div>
  );
}

export default PlacesPage;
