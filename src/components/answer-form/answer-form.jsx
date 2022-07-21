import Btn from '../btn/btn';
import { ReactComponent as Check } from '../../assets/svg/check-icon-btn.svg';
import { ReactComponent as Question } from '../../assets/svg/question-icon-btn.svg';
import { ReactComponent as Cross } from '../../assets/svg/cross-icon-btn.svg';
import './answer-form.scss';
import { ANSWERING, NO, NOT_SURE, YES } from '../../constants/constants';
import { useCallback } from 'react';
import clsx from 'clsx';

function AnswerForm({ disabled, mode, onSubmit }) {
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit(event.nativeEvent.submitter.value);
    },
    [onSubmit]
  );

  return (
    <form className="answer-row" onSubmit={handleSubmit}>
      <Btn
        disabled={disabled}
        type="submit"
        className={clsx('btn-green-solid', {
          'btn-third': mode === ANSWERING,
          'btn-half': mode !== ANSWERING,
        })}
        name="answer"
        value={YES}
      >
        <Check fill="#1e1b18" />
        YES
      </Btn>
      <Btn
        disabled={disabled}
        type="submit"
        className={clsx('btn-pink-solid', {
          'btn-third': mode === ANSWERING,
          'btn-half': mode !== ANSWERING,
        })}
        value={NO}
      >
        <Cross fill="#1e1b18" />
        NO
      </Btn>
      {mode === ANSWERING && (
        <Btn
          disabled={disabled}
          type="submit"
          className="btn-orange-solid btn-third"
          value={NOT_SURE}
        >
          <Question fill="#1e1b18" />
          DON'T KNOW
        </Btn>
      )}
    </form>
  );
}

export default AnswerForm;
