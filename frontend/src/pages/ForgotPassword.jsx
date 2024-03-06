import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { forgotPasswordStart , forgotPasswordSuccess , forgotPasswordFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";




const ForgotPassword = () => {

  const [email, setEmail] = useState("")
  const  navigate = useNavigate();
  const {loading, messageError} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!email) {
      return dispatch(forgotPasswordFailure("Please fill out the email fields."));
  }

    

    try {

      dispatch(forgotPasswordStart());
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(forgotPasswordFailure(data.message));
      }
      if(res.ok) {
        dispatch(forgotPasswordSuccess(data));
        navigate('/verify-email');
      }

      dispatch(forgotPasswordFailure(data.message));

    } catch (error) {
      dispatch(forgotPasswordFailure(error.message));
    }

  }

  
  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="flex flex-col items-center justify-center">
    <h2 className="text-4xl font-bold mb-4"> Reset your password</h2>
      <p className="mt-2 mb-2 text-gray-600 dark:text-white">We will send you an email to reset your password</p>
    </div>
    <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-3 py-2 mt-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Send Reset Link
        </button>
      </form>
      {messageError && <p className="mt-4 text-center text-green-500">{messageError}</p>}
    </div>
  </div>
  )
}

export default ForgotPassword