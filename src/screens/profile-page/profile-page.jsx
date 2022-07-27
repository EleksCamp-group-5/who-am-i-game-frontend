import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from '../../components/btn/btn';
import Input from '../../components/Input/Input';
import InputPassword from '../../components/Input/InputPassword';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import './profile-page.scss';
import { updateUser } from '../../services/users-service';
import useAuth from '../../hooks/useAuth';

export default function ProfilePage() {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [username, setUsername] = useState(authCtx.username);
  const [password, setPassword] = useState('');

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser(username, authCtx.token, password);
      authCtx.changeUserName(username);
      alert('username and password changed');
    } catch (error) {
      alert(error);
    }
    setUsername('');
    setPassword('');
  };

  return (
    <ScreenWrapper>
      <form className="profile" onSubmit={submitHandler}>
        <div className="profile__avatar"></div>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={(e) => usernameHandler(e)}
          placeholder="Username"
        />
        <InputPassword
          name="password"
          value={password}
          onChange={(e) => passwordHandler(e)}
          placeholder="Password"
        />
        <div className="btn-form-wrapper">
          <Btn className={'btn-green-solid'} type="submit">
            update
          </Btn>
          <Btn
            className={'btn-blue-outline-small'}
            onClick={() => {
              navigate('/');
            }}
          >
            Cancel
          </Btn>
        </div>
      </form>
    </ScreenWrapper>
  );
}
