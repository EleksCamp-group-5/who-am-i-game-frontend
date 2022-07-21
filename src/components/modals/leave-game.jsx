import GameDataContext from '../../contexts/game-data-context';
import { useContext } from 'react';
import './modal.scss';
import Btn from '../btn/btn';
import ModalWrapper from './modal-wrapper';
import { useNavigate } from 'react-router-dom';

function LeaveGameModal({ active, onCancel }) {
  const { leaveGame } = useContext(GameDataContext);
  const navigate = useNavigate();

  if (!active) {
    return null;
  }

  const submitLeaveGame = async (event) => {
    event.preventDefault();
    await leaveGame();
    navigate('/');
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
          <Btn type="submit" className="btn-pink-solid">
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
