import clsx from 'clsx';
import { useMemo } from 'react';
import AnswerIcon from '../answer-icon/answer-icon';
import './history-item.scss';

function HistoryItem({ question, users, user }) {
  const { answers } = question;

  const [guess, message] = useMemo(() => {
    const guess = question.question.includes('Guess:');

    if (guess) {
      return [guess, question.question.replace('Guess:', '').trim()];
    }

    return [guess, question.question];
  }, [question.question]);

  const answersByUserId = useMemo(() => {
    return answers.reduce((all, answer) => {
      return {
        ...all,
        [answer.player]: answer.answer,
      };
    }, {});
  }, [answers]);

  return (
    <div className="history-item">
      <div className={clsx('history-item__question', { guess })}>
        {guess && <span className="my-guess">My Guess</span>}
        <div className={clsx('history-item__avatar', user.avatar)}></div>
        <p>{message}</p>
      </div>
      <div className="history-item__icons-box">
        {users
          .filter((u) => user.id !== u.id)
          .map((user) => (
            <AnswerIcon
              key={user.id}
              user={user}
              status={answersByUserId[user.id]}
            />
          ))}
      </div>
    </div>
  );
}

export default HistoryItem;
