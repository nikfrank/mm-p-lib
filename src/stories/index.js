import { storiesOf, action } from '@kadira/storybook';

import { specs, describe, it } from 'storybook-addon-specifications';


import guessStory from '../GuessRow/tests/driver';
import { guessStub, noGuessStub } from '../GuessRow/tests/stub';
import specGuess from '../GuessRow/tests/spec';


storiesOf('GuessRow', module)

  .add('guessed something', () => {
    specs(() => specGuess({ describe, it })());

    return guessStory(guessStub).p;
  })

  .add('not yet guessed something', () => {
    specs(() => specGuess({ describe, it })());

    return guessStory({
      onGuess: action('guess'),
      onChangeGuess: action('changeGuess'),
      ...noGuessStub,
    }).p;
  });
