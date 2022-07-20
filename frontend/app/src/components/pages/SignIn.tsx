import React from "react"
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  return (
    <>
      <p>SignIn</p>
      <Link to={'/'}>home</Link>
      <Link to={'/signup'}>sign up</Link>
    </>
  );
};

export default SignIn;
