import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import GameTitle from '../../components/game-title/game-title';
import Input from '../../components/Input/Input';
import InputPassword from '../../components/Input/InputPassword';
import Btn from '../../components/btn/btn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registrationUser } from '../../services/users-service';
import { SIGN_IN } from '../../constants/constants';

function CreateAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    email.length > 3 &&
    username.length >= 2 &&
    username.length < 50;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registrationUser(username, email, password);
      navigate(SIGN_IN);
    } catch (error) {
      if (error.response.data.details?.length) {
        setError(error.response.data.details[0]);
      }
    }
    setLoading(false);
  };

  return (
    <ScreenWrapper>
      <GameTitle />
      <p className="form-error">{error}</p>
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
          <Btn disabled={loading || !formIsValid} type="submit">
            create account
          </Btn>
        </div>
      </form>
    </ScreenWrapper>
  );
}

export default CreateAccount;
