// Client-side (React)

import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Spinner, Alert } from "flowbite-react";
import { useState } from "react";
import { signInStart, signInSuccess ,signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector} from "react-redux";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  // const [messageError, setMessageError] = useState(null);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {loading, messageError} = useSelector(state => state.user);


  function handleChange(e) {
    setUserData({ ...userData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
        return dispatch(signInFailure("Please fill out all fields."));
      // return setMessageError("Please fill out all fields.");
    }

    if (userData.password.length < 6) {
      return dispatch(signInFailure("Password must be at least 6 characters long."));
    }   

    try {
      dispatch(signInStart());
      // setLoading(true);
      // setMessageError(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        // setMessageError(data.message);
      }
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
        
      dispatch(signInFailure(data.message));

    } catch (error) {
      dispatch(signInFailure(error.message));
      // setMessageError("Internal server error");
      // setLoading(false);
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
                "Sign In"
              )}
            </Button>
          </form>
          <OAuth />
          <div className="flex gap-2 text-sm mt-5">
            <span>Do not have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {messageError && <Alert className="mt-5" color="failure">{messageError}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
