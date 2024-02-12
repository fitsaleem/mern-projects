// Client-side (React)

import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Spinner, Alert } from "flowbite-react";
import { useState } from "react";

const SignUp = () => {
  const [userData, setUserData] = useState({});
  const [messageError, setMessageError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setUserData({ ...userData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.username || !userData.email || !userData.password) {
      return setMessageError("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setMessageError(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!data.success) {
        setMessageError(data.message);
      }
      if(res.ok) {
        navigate('/sign-in');
      }

      setLoading(false);

    } catch (error) {
      setMessageError("Internal server error");
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Fitcodding
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Hi, A passionate Web3 developer sign up with your email and password or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {messageError && <Alert className="mt-5" color="failure">{messageError}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
