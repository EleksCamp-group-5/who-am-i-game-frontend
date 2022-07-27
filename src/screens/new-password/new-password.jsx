import Btn from '../../components/btn/btn';
import GameTitle from '../../components/game-title/game-title';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import InputPassword from '../../components/Input/InputPassword';
import { sendPass } from '../../services/users-service';
import { SIGN_IN } from '../../constants/constants';

function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const location = useLocation();
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const rePasswordHandler = (e) => {
    setRePassword(e.target.value);
  };

  const formIsValid =
    password.length >= 8 && password.length < 20 && password === rePassword;

  const submitHandler = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams(location.search);
    const obbCode = query.get('obbCode');
    try {
      await sendPass(obbCode, password);
      navigate(SIGN_IN);
    } catch (error) {
      alert(error);
    }
    setPassword('');
    setRePassword('');
  };

  return (
    <ScreenWrapper>
      <GameTitle />
      <form className="form-wrapper" onSubmit={submitHandler}>
        <InputPassword
          name="password"
          value={password}
          onChange={(e) => passwordHandler(e)}
          placeholder="New password"
        />
        <InputPassword
          name="rePassword"
          value={rePassword}
          onChange={(e) => rePasswordHandler(e)}
          placeholder="Confirm new password"
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
            confirm
          </Btn>
        </div>
      </form>
    </ScreenWrapper>
  );
}

export default NewPassword;
