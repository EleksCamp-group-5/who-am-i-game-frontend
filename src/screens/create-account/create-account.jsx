import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import GameTitle from '../../components/game-title/game-title';
import Input from '../../components/Input/Input';
import InputPassword from '../../components/Input/InputPassword';
import Btn from '../../components/btn/btn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CreateAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const formIsValid =
    password.length >= 8 &&
    password.length < 20 &&
    email.length > 3 &&
    username.length > 3 &&
    username.length < 8;

  const submitHandler = (e) => {
    e.preventDefault();
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <ScreenWrapper>
      <GameTitle />
      <form className="form-wrapper" onSubmit={submitHandler}>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={(e) => usernameHandler(e)}
          placeholder="Nickname"
        />
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
            create account
          </Btn>
        </div>
      </form>
    </ScreenWrapper>
  );
}

export default CreateAccount;
