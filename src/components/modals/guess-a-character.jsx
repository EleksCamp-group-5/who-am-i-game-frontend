import { useState, useEffect, useCallback } from 'react';
import CountdownTimer from '../timer/timer-countdown/timer-countdown';
import Btn from '../btn/btn';
import checkGuess from '../../helper-functions/check-guess.js';
import './modal.scss';
import ModalWrapper from './modal-wrapper';

function GuessCharacterModal({
  active,
  onSubmit: onSubmitProp,
  onCancel,
  onTimerFinish: onTimerFinishProp,
}) {
  const [guess, setGuess] = useState('');
  const trimmedGuess = guess.trim();

  useEffect(() => {
    return () => setGuess('');
  }, [active]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (onSubmitProp) {
        onSubmitProp(trimmedGuess);
      }
    },
    [onSubmitProp, trimmedGuess]
  );

  const onTimerFinish = useCallback(() => {
    const isValid = !checkGuess(trimmedGuess);

    if (onSubmitProp && isValid) {
      onSubmitProp(trimmedGuess);
    } else if (onTimerFinishProp) {
      onTimerFinishProp();
    }
  }, [trimmedGuess, onSubmitProp, onTimerFinishProp]);

  if (!active) {
    return null;
  }

  return (
    <ModalWrapper title="READY TO GUESS?" onCancel={onCancel}>
      <form className="modal-form" onSubmit={onSubmit}>
        <div className="modal__timer-container">
          <p className="modal__timer-container_name">TIME LEFT</p>
          <CountdownTimer
            time={60}
            inLobby={'in-lobby'}
            small={'v-small'}
            onFinish={onTimerFinish}
            disableSessionTracker
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
          disabled={checkGuess(trimmedGuess)}
          type="submit"
        >
          I WANT TO GUESS
        </Btn>
      </form>
    </ModalWrapper>
  );
}

export default GuessCharacterModal;
