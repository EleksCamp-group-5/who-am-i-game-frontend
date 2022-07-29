import GameDataContext from '../../contexts/game-data-context';
import { useContext, useState } from 'react';
import './modal.scss';
import Btn from '../btn/btn';
import ModalWrapper from './modal-wrapper';
import { useNavigate } from 'react-router-dom';
import { DEFEAT } from '../../constants/constants';

function LeaveGameModal({ active, onCancel, inGame = false }) {
  const { leaveGame } = useContext(GameDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!active) {
    return null;
  }

  const submitLeaveGame = async (event) => {
    event.preventDefault();
    setLoading(true);
    await leaveGame();
    setLoading(false);

    if (inGame) {
      navigate(DEFEAT);
    } else {
      navigate('/');
    }
  };

  return (
    <ModalWrapper
      title="LEAVE THE GAME"
      className="leave-modal"
      onCancel={onCancel}
    >
      <form className="modal-form leave-modal" onSubmit={submitLeaveGame}>
        <p className="modal__question">
          Are you sure you want to leave the game?
        </p>
        <div className="modal__buttons-container">
          <Btn type="submit" disabled={loading} className="btn-pink-solid">
            LEAVE
          </Btn>
          <Btn className="modal__cancel-btn" onClick={onCancel}>
            CANCEL
          </Btn>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default LeaveGameModal;
