import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function CreatePost() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [contentForm, setContentForm] = useState({
    userId: currentUser._id,
  });

  const createPost = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contentForm),
      });
      const data = await res.json();
      if (res.success) {
        console.log(data);
        navigate("/");
      } else {
        console.log(data + "error in creating post");
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(contentForm);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-centre text-3xl my-7 font-semibold">Create a Post</h1>
      <form action="">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          {/* TextInput placeholder="Title" /> */}
        </div>
        <ReactQuill
          placeholder="Write something..."
          className="h-72 mb-12 bg-white dark:bg-gray-500 text-gray-900 dark:text-white"
          required
          onChange={(value) => {
            setContentForm({ ...contentForm, content: value });
          }}
        />
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-lg"
          onClick={createPost}
        >
          Create
        </button>
      </form>
    </div>
  );
}
