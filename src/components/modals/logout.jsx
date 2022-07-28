import './modal.scss';
import Btn from '../btn/btn';
import ModalWrapper from './modal-wrapper';
import useAuth from '../../hooks/useAuth';

function LogoutModal({ active, onCancel }) {
  const { logout } = useAuth();

  if (!active) {
    return null;
  }

  const submitLogout = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <ModalWrapper title="LOG OUT" className="leave-modal" onCancel={onCancel}>
      <form className="modal-form leave-modal" onSubmit={submitLogout}>
        <p className="modal__question">Are you sure you want to log out?</p>
        <div className="modal__buttons-container">
          <Btn type="submit" className="btn-green-solid">
            YES
          </Btn>
          <Btn className="btn-pink-solid" onClick={onCancel}>
            NO
          </Btn>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default LogoutModal;
