import Btn from '../../components/btn/btn';
import { CREATE_ACCOUNT, SIGN_IN } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import PlayQuickGameButton from './PlayQuickGameButton';

function BeforeLogin() {
  const navigate = useNavigate();

  return (
    <>
      <PlayQuickGameButton />
      <div className="dividing-line"></div>
      <Btn
        className={'btn-blue-outline'}
        onClick={() => {
          navigate(CREATE_ACCOUNT);
        }}
      >
        CREATE ACCOUNT
      </Btn>
      <div className="text-login or">or</div>
      <Btn className={'btn-fb-blue'} iconClassName={'fb'}>
        Continue with Facebook
      </Btn>
      <div className="dividing-line"></div>
      <div className="text-login already">Already have an account?</div>
      <Btn
        className={'btn-blue-outline'}
        onClick={() => {
          navigate(SIGN_IN);
        }}
      >
        SIGN IN
      </Btn>
    </>
  );
}

export default BeforeLogin;
