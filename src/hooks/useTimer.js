import { useEffect } from 'react';
import timerWorker from '../lib/timerWorker';

export default function useTimer(callback) {
  useEffect(() => {
    function onMessage(message) {
      if (message.data === 'tick' && typeof callback === 'function') {
        callback();
      }
    }
    timerWorker.addEventListener('message', onMessage);

    return () => {
      timerWorker.removeEventListener('message', onMessage);
    };
  }, [callback]);
}
