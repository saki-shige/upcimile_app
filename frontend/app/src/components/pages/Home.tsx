import React, { useContext } from "react"
import { Link } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";

const Home: React.FC = () => {
  const { isSignedIn, currentCompany } = useContext(AuthContext);

  return (
    <>
      <p>Home</p>
    {/* // (仮）サインインしているユーザー（カンパニー名）を表示 */}
      <h2>{isSignedIn ? <p>{currentCompany.name}としてサインインしています</p> : <p>サインインしていません</p>}</h2>
      <Link to={'/signin'}>sign in</Link>
      <Link to={'/signup'}>sign up</Link>
    </>
  );
};

export default Home;