import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.init";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleEmailBlur = (event) => {
    const validEmail = /.+@(gmail|yahoo|outlook|mail|icloud|aol)\.com$/;
    if (event.target.value.match(validEmail)) {
      setEmail(event.target.value);
    } else {
      alert("Email is not valid");
    }
  };

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };

  if (user) {
    navigate(from, { replace: true });
  }

  const handleUserSignIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  return (
    <div>
      <div className="container">
        <div className="auth-card d-flex justify-content-center align-items-center">
          <div className="auth-main-cart">
            <form onSubmit={handleUserSignIn}>
              <h1 className="text-center">LOGIN</h1>

              <label htmlFor="email" className="ms-3 mb-1">
                E-mail
              </label>
              <br />
              <input
                onBlur={handleEmailBlur}
                type="email"
                placeholder="Enter your email"
                className="input-field rounded-pill px-3 py-2"
                required
              />
              <br />
              <label htmlFor="password" className="ms-3 mb-1">
                Password
              </label>
              <br />
              <input
                onBlur={handlePasswordBlur}
                type="password"
                placeholder="Enter your password"
                className="input-field rounded-pill px-3 py-2"
                required
              />
              <br />
              <input
                className=" common-btn w-100 p-2 rounded-pill"
                type="submit"
                value="Login"
                required
              />
            </form>
            <p className="text-center" style={{ color: "red" }}>
              {error?.message}
            </p>
            {loading && <p className="text-center">Loading...</p>}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
