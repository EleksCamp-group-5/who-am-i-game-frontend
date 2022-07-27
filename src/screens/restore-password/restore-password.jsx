import Btn from '../../components/btn/btn';
import GameTitle from '../../components/game-title/game-title';
import Input from '../../components/Input/Input';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import { useNavigate } from 'react-router-dom';
import { REDIRECT } from '../../constants/constants';
import { useState } from 'react';
import './restore-password.scss';
import { sendEmail } from '../../services/users-service';

function RestorePassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const formIsValid = email.length > 3;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(email);
      navigate(REDIRECT);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScreenWrapper>
      <GameTitle />
      <form className="form-wrapper" onSubmit={submitHandler}>
        <div className="subtitle title-wight">restore password</div>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => emailHandler(e)}
          placeholder="Email"
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
      </form>
    </ScreenWrapper>
  );
}

export default RestorePassword;
