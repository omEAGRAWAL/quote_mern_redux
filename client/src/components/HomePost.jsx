import { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
export default function HomePost() {
  const { currentUser } = useSelector((state) => state.user);
  const [post, setpost] = useState([]);

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
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getpost();
  }, []);

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
                {/* <h1 className="font-semibold">{post.username}</h1> */}
                <p className="text-xs">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div
              className="p-3 max-w-2xl mx-auto w-full post-content"
              dangerouslySetInnerHTML={{ __html: post && post.content }}
            ></div>
          </Card>
        );
      })}
    </div>
  );
}
