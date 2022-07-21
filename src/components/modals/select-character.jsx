import { useCallback } from 'react';
import { useState } from 'react';
import Btn from '../btn/btn';
import ModalWrapper from './modal-wrapper';
import './modal.scss';

function SelectCharacterModal({
  player,
  active,
  onCancel,
  onSubmit: onSubmitProp,
}) {
  const [playerName, setPlayerName] = useState(player);
  const [characterName, setCharacterName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setSubmitting(true);
      try {
        await onSubmitProp(playerName, characterName);
      } catch {
        // todo: handle errors
      }
      setSubmitting(false);
    },
    [characterName, onSubmitProp, playerName]
  );

  if (!active) {
    return null;
  }

  return (
    <ModalWrapper title="SUGGEST A CHARACTER" onCancel={onCancel}>
      <form
        className="modal-form"
        onSubmit={(event) => onSubmit(event, playerName, characterName)}
      >
        <input
          className="modal__input-field"
          type="text"
          maxLength="50"
          value={playerName}
          onInput={(e) => {
            setPlayerName(e.target.value);
          }}
        />
        <input
          className="modal__input-field"
          type="text"
          placeholder="Suggest a character"
          maxLength="50"
          value={characterName}
          onInput={(e) => {
            setCharacterName(e.target.value);
          }}
        />
        <Btn
          className="btn-green-solid"
          disabled={
            submitting ||
            (playerName && playerName.trim().length < 3) ||
            characterName.trim().length < 3
          }
          type="submit"
        >
          SUGGEST
        </Btn>
      </form>
    </ModalWrapper>
  );
}

export default SelectCharacterModal;
