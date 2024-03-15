import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import OAuth from "../components/OAuth.jsx";
export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);
  const [formdata, setformdata] = useState({});
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const eventHandler = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
    console.log(formdata);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      return dispatch(signInFailure("please fill all the fields"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (e) {
      dispatch(signInFailure(e.message));
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
              <Label value="your email" color="" />
              <TextInput type="email" placeholder="xyz@abc.com" id="email" />
            </div>
            <div className="" onChange={eventHandler}>
              <Label value="your password" color="" />
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
                "Sign-in"
              )}
            </Button>
            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-5 ">
            <span>Not having an account</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign-up
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
