import ModalContext from '../../contexts/modal-context';
import Btn from '../btn/btn';
import { useContext, useState, useCallback } from 'react';
import './question-form.scss';

function QuestionForm({ disabled, onSubmit }) {
  const setModalActive = useContext(ModalContext)[1];
  const [question, setQuestion] = useState('');
  const trimmedQuestion = question.trim();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (trimmedQuestion) {
        onSubmit(trimmedQuestion);
      }
    },
    [onSubmit, trimmedQuestion]
  );

  const formIsValid =
    !!trimmedQuestion &&
    trimmedQuestion.length > 1 &&
    trimmedQuestion.length < 128;

  return (
    <div className="form">
      <form className="row" onSubmit={handleSubmit}>
        <input
          name="question"
          className="input_field"
          type="text"
          placeholder="Type your question"
          maxLength="256"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          disabled={disabled || !formIsValid}
          type="submit"
          className="btn btn_ask"
        >
          Ask
        </button>
      </form>
      <Btn
        disabled={disabled}
        className="btn-yellow-solid"
        onClick={() => setModalActive(true)}
      >
        I AM READY TO GUESS
      </Btn>
    </div>
  );
}

export default QuestionForm;
