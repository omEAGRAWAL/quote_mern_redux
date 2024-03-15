import { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { get } from "mongoose";

export default function HomePost() {
  const { currentUser } = useSelector((state) => state.user);
  const [post, setpost] = useState([]);
  const [likestate, setlikestate] = useState(false);

  useEffect(() => {
    const getpost = async () => {
      try {
        const response = await fetch("/api/post/getpost", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(currentUser);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        } else {
          setpost(data);
        }
      } catch (err) {
        console.log(err);
      }

      try {
        post.forEach(async (post) => {
          const res = await fetch(`api/user/getuser/${post.userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const userdata = await res.json();
          post[userdata] = userdata;
          console.log(post);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getpost();
  }, [currentUser, likestate]);

  const like = async (postId) => {
    try {
      const response = await fetch("/api/post/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId: currentUser._id }),
      });
      const data = await response.json();
      setlikestate(!likestate);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {post.map((post) => {
        return (
          <Card key={post._id} className="my-4  w-3/5 ">
            <div className="flex items-center gap-2">
              <img
                src={post.profilePicture}
                alt="user"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="font-semibold">{post.username}</h1>
                <p className="text-xs">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div
              className="p-3 max-w-2xl mx-auto w-full post-content"
              dangerouslySetInnerHTML={{ __html: post && post.content }}
            ></div>
            <button onClick={() => like(post.postId)}>
              {post.likes.includes(currentUser._id) ? (
                <FaHeart color="red" />
              ) : (
                <FaHeart color="gray" />
              )}
            </button>
            <p>{post.likes.length} likes</p>
          </Card>
        );
      })}
    </div>
  );
}
