import Btn from '../../components/btn/btn';
import GameTitle from '../../components/game-title/game-title';
import Input from '../../components/Input/Input';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import { Link, useNavigate } from 'react-router-dom';
import { RESTORE } from '../../constants/constants';
import './signin-page.scss';
import InputPassword from '../../components/Input/InputPassword';
import { useState } from 'react';
import { authorisationUser } from '../../services/users-service';
import useAuth from '../../hooks/useAuth';

function SignIn() {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await authorisationUser(email, password);
      authCtx.login(response.data.idToken);
      authCtx.changeUserName(response.data.userName);
      navigate('/');
    } catch (error) {
      alert(error);
    }
  };

  const formIsValid =
    password.length >= 8 && password.length < 20 && email.length > 3;

  return (
    <ScreenWrapper>
      <GameTitle />
      <form className="form-wrapper" onSubmit={submitHandler}>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => emailHandler(e)}
          placeholder="Email"
        />
        <InputPassword
          name="password"
          value={password}
          onChange={(e) => passwordHandler(e)}
          placeholder="Password"
        />
        <div className="btn-form-wrapper">
          <Btn
            className={'btn-pink-solid'}
            onClick={() => {
              navigate('/');
            }}
          >
            Cancel
          </Btn>
          <Btn disabled={!formIsValid} type="submit">
            sign in
          </Btn>
        </div>
        <Link to={RESTORE} className="subtitle title-red">
          restore password
        </Link>
      </form>
    </ScreenWrapper>
  );
}

export default SignIn;
