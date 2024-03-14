/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { TextInput, Button, Alert } from "flowbite-react";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
function DashProfile() {
  const [imageFile, setimageFile] = useState(null);
  const [imageUrl, setimageUrl] = useState(null);
  const [uploadfail, setuploadfail] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
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
    uploadImage();
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = new getStorage(app);
    const filename = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "stage_changed",
      (snapshot) => {
        setuploadfail(false);
      },
      (error) => {
        setuploadfail(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageUrl(downloadURL);
          setForm({ ...form, profilePicture: downloadURL });
          setuploadfail(false);
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
        <input type="file" accept="image/*" id="profilePicture" />
        <div
          className="w-32 h-32  self-center cursor-pointer shadow-md
         overflow-hidden rounded-full"
        >
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full  w-full h-full border-8 object-cover border-[lightgray]"
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
        <TextInput
          type="text"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      <Alert>{uploadfail ? "upload fail" : ""}</Alert>
    </div>
  );
}

export default DashProfile;
