import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { signUp } from "../../lib/api/auth"
import { SignUpData } from "../../interface/index"
import { AuthContext } from "../../App"

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const { setIsSignedIn, setCurrentCompany } = useContext(AuthContext)

  const navigation = useNavigate()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: SignUpData = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    };

    try {
      const res = await signUp(data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentCompany(res.data.data)

        navigation("/")

        console.log("Signed in successfully!")
      } else {
      //   setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      // setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <p>SignUp</p>
      <Link to={'/'}>home</Link>
      <Link to={'/signin'}>sign in</Link>
      <form noValidate autoComplete="off">
        <TextField
          variant="outlined"
          required
          fullWidth
          label="名前"
          value={name}
          margin="dense"
          onChange={event => setName(event.target.value)}
        />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="メールアドレス"
            value={email}
            margin="dense"
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="パスワード"
            type="password"
            value={password}
            margin="dense"
            autoComplete="current-password"
            onChange={event => setPassword(event.target.value)}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="パスワード（確認用）"
            type="password"
            value={passwordConfirmation}
            margin="dense"
            autoComplete="current-password"
            onChange={event => setPasswordConfirmation(event.target.value)}
          />
          <div>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              disabled={!name || !email || !password || !passwordConfirmation ? true : false}
              onClick={handleSubmit}
            >
              送信
            </Button>
          </div>
    </form>
  </>
  );
};

export default SignUp;
