import React from "react"
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <>
      <p>SignUp</p>
      <Link to={'/'}>home</Link>
      <Link to={'/signin'}>sign in</Link>
    </>
  );
};

export default SignUp;
