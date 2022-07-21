import { useState, useEffect } from 'react';
import CountdownTimer from '../timer/timer-countdown/timer-countdown';
import Btn from '../btn/btn';
import checkGuess from '../../helper-functions/check-guess.js';
import './modal.scss';
import ModalWrapper from './modal-wrapper';

function GuessCharacterModal({ active, onSubmit, onCancel, onTimerFinish }) {
  const [guess, setGuess] = useState('');

  useEffect(() => {
    return () => setGuess('');
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <ModalWrapper title="READY TO GUESS?" onCancel={onCancel}>
      <form className="modal-form" onSubmit={(event) => onSubmit(event, guess)}>
        <div className="modal__timer-container">
          <p className="modal__timer-container_name">TIME LEFT</p>
          <CountdownTimer
            time={60}
            inLobby={'in-lobby'}
            small={'v-small'}
            onFinish={onTimerFinish}
          />
        </div>
        <input
          className="modal__input-field"
          type="text"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
          }}
        />
        <Btn
          className="btn-yellow-solid"
          disabled={checkGuess(guess)}
          type="submit"
        >
          I WANT TO GUESS
        </Btn>
      </form>
    </ModalWrapper>
  );
}

export default GuessCharacterModal;
