import chai, { expect } from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import guessStory from './driver';
import { guessStub, noGuessStub } from './stub';

chai.use(sinonChai);

export default ({ describe, it }) => specName =>
  describe(specName, () => {
    it('renders guess and score', () => {
      const guessSpy = sinon.spy();
      const changeGuessSpy = sinon.spy();

      const guessRow = guessStory({
        onGuess: guessSpy,
        onChangeGuess: changeGuessSpy,
        ...guessStub,
      });

      guessRow.changeGuess(0, 'up');
      expect(changeGuessSpy.callCount).to.eql(0);

      // expect the score dots, disabled changers
    });


    it('renders guess in progress', () => {
      const guessSpy = sinon.spy();
      const changeGuessSpy = sinon.spy();

      const guessRow = guessStory({
        onGuess: guessSpy,
        onChangeGuess: changeGuessSpy,
        ...noGuessStub,
      });

      // change the guess dn
      let XGuess = JSON.parse(JSON.stringify(noGuessStub.code));
      XGuess[1] =
        (XGuess[1] + noGuessStub.dotArity - 1) % noGuessStub.dotArity;

      guessRow.changeGuess( 1, 'dn' );
      expect(changeGuessSpy.callCount).to.eql(1);

      const nuGuess = changeGuessSpy.getCall(0).args[0];

      expect( nuGuess ).to.deep.eql( XGuess );

      // change the guess up
      XGuess[1] = (XGuess[1] + 2) % noGuessStub.dotArity;
      
      guessRow.changeGuess( 1, 'up' );
      expect(changeGuessSpy.callCount).to.eql(2);

      const nu2Guess = changeGuessSpy.getCall(1).args[0];
      
      expect( nu2Guess ).to.deep.eql( XGuess );
    });
  });
