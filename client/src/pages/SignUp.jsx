import { Link } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";

export default function SignUp() {
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

        <div className=" flex-1">
          {/*right side*/}
          <form className="flex flex-col gap-4 ">
            <div className="">
              <Label value="your username" />
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <div className="">
              <Label value="your email" />
              <TextInput type="text" placeholder="email" id="email" />
            </div>
            <div className="">
              <Label value="your username" />
              <TextInput type="text" placeholder="email" id="password" />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit">
              Sign-Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 ">
            <span>Have an account</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign-in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
