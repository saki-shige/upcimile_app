import React from "react"
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <p>Home</p>
      <Link to={'/signin'}>sign in</Link>
      <Link to={'/signup'}>sign up</Link>
    </>
  );
};

export default Home;
