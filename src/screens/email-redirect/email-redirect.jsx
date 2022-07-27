import GameTitle from '../../components/game-title/game-title';
import Btn from '../../components/btn/btn';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import { useNavigate } from 'react-router-dom';
import './email-redirect.scss';

function EmailRedirect() {
  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <GameTitle />
      <h3 className="inactivity-kick-message">
        CHECK YOUR EMAIL TO RESTORE PASSWORD
      </h3>

      <Btn
        className={'btn-blue-outline'}
        onClick={() => {
          navigate('/');
        }}
      >
        GO TO MAIN MENU
      </Btn>
    </ScreenWrapper>
  );
}

export default EmailRedirect;
