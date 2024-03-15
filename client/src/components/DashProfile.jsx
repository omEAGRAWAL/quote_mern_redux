/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { TextInput, Button, Alert } from "flowbite-react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signOutSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { set } from "mongoose";
function DashProfile() {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const filePickerRef = useRef();
  const [imageFile, setimageFile] = useState(null);
  const [imageUrl, setimageUrl] = useState(null);
  const [uploadfail, setuploadfail] = useState(false);
  const [uploading, setuploading] = useState(false);
  const [uploadpercentage, setuploadpercentage] = useState();

  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) uploadImage();
  }, [imageFile]);

  //handle sign out
  const handleSignout = async () => {
    try {
      console.log("signing out");

      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data.message);
        dispatch(signOutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const uploadImage = async () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "stage_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setuploading(true);
        setuploadpercentage(progress.toFixed(0));
      },
      (error) => {
        console.log(error);
        console.log("upload failed");
        setuploadfail(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageUrl(downloadURL);
          setForm({ ...form, profilePicture: downloadURL });
          setuploadfail(false);
          console.log(downloadURL);
          setuploading(false);
        });
      }
    );
  };

  // eslint-disable-next-line no-unused-vars
  const updateUser = async (e) => {
    console.log(form);
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(res);
      if (!res.ok) {
        dispatch(updateFailure(res.statusText));
      } else {
        const data = await res.json();
        dispatch(updateSuccess(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center fonst-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={updateUser}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32  self-center cursor-pointer shadow-md
         overflow-hidden rounded-full"
        >
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full  w-full h-full border-8 object-cover border-[lightgray]"
            onClick={() => filePickerRef.current.click()}
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />

        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        {/* <TextInput
          type="text"
          id="password"
          placeholder="password"
          onChange={handleChange}
        /> */}
        {uploading ? (
          <Button type="submit" gradientDuoTone="purpleToBlue" disabled>
            wait uploading image
          </Button>
        ) : (
          <Button type="submit" gradientDuoTone="purpleToBlue">
            Update
          </Button>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
      {uploadfail && (
        <Alert type="danger" className="mt-5">
          Image upload failed
        </Alert>
      )}
      {uploading && (
        <div className="mt-5">
          <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
            <div className="w-full h-full bg-gray-200 absolute"></div>
            <div
              className="h-full bg-green-500 absolute"
              style={{ width: `${uploadpercentage}%` }}
            ></div>
          </div>
          <div className="text-center mt-2">{uploadpercentage}% uploaded</div>
        </div>
      )}
    </div>
  );
}

export default DashProfile;
