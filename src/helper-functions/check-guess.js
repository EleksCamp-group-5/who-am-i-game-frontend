function checkGuess(guess) {
  if (guess.length < 1 || guess.length > 128) {
    return true;
  }

  return /(\b)(on\S+)(\s*)=|javascript|<(|\/|[^\\/>][^>]+|\/[^>][^>]+)>/gi.test(
    guess
  );
}

export default checkGuess;
