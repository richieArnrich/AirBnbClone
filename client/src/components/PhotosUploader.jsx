import axios from "axios";
import React, { useState } from "react";

const PhotosUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  function addPhotoByLink(event) {
    axios
      .post("/places/upload-by-link", { link: photoLink })
      .then((res) => {
        console.log(res.data);
        onChange((prev) => {
          const updatedPhotos = [...prev, res.data]; // Store updated photos
          console.log(updatedPhotos); // Log the new state here
          return updatedPhotos; // Return the updated state
        });
        setPhotoLink("");
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  }
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/places/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        const { data: filenames } = res;
        onChange((prev) => {
          const updatedPhotos = [...prev, ...filenames]; // Store updated photos
          console.log(addedPhotos); // Log the new state here
          return updatedPhotos; // Return the updated state
        });
      })
      .catch((err) => {});
  }
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          placeholder="Add using a link ....jpg"
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 px-4 rounded-2xl"
        >
          Add&nbsp;Photo
        </button>
      </div>

      {/* Photo upload button */}
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => {
            console.log(link);
            return (
              <div className="h-32 flex" key={link}>
                <img
                  src={`http://localhost:4000/uploads/${link}`}
                  alt="uploaded photo"
                  className="rounded-2xl w-full object-cover position-center"
                />
              </div>
            );
          })}
        <label className="h-32 cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input
            type="file"
            className="hidden"
            multiple
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
