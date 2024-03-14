import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import OAuth from "../components/OAuth.jsx";
export default function SignUp() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({});
  const [errorMessage, seterrorMessage] = useState(null);
  const [loading, setloading] = useState(false);
  const eventHandler = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
    console.log(formdata);
  };
  useEffect(() => {}, [loading]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.username || !formdata.email || !formdata.password) {
      return seterrorMessage("please fill all the fields");
    }

    try {
      setloading(true);
      seterrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        return seterrorMessage(data.message);
      }
      setloading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (e) {
      console.log(e);
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-centre gap-5">
        {/*left side*/}
        <div className="flex-1 ">
          <Link to="/" className="font-bold text-4xl    ">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Quotes
            </span>
            Gram
          </Link>

          <p className="mt-5 text-sm">
            this a website that allows you to share to share quotes with others
          </p>
        </div>

        <div className=" flex-1 ">
          {/*right side*/}
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div className="" onChange={eventHandler}>
              <Label value="your username" />
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <div className="" onChange={eventHandler}>
              <Label value="your email" />
              <TextInput type="email" placeholder="xyz@abc.com" id="email" />
            </div>
            <div className="" onChange={eventHandler}>
              <Label value="your password" />
              <TextInput type="password" placeholder="password" id="password" />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="small" /> <span>Loading...</span>
                </>
              ) : (
                "Sign-up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5 ">
            <span>Have an account</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign-in
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
