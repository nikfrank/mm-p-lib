import chai, { expect } from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { mount } from 'enzyme';

import guessStory from './driver';
import { guessStub, noGuessStub } from './stub';

chai.use(sinonChai);

export default ({ describe, it }) => specName =>
  describe(specName, () => {
    it('renders guess and score', () => {

      const guessSpy = sinon.spy();
      const changeGuessSpy = sinon.spy();
      const styles = {};
      
      const guess = mount(guessStory({
        onGuess: guessSpy,
        onChangeGuess: changeGuessSpy,
        ...guessStub,
      }));

      guess.simulate('click');
      expect(guessSpy.callCount).to.eql(0);

      // expect the score dots, disabled changers
    });

    
    it('renders guess in progress', () => {

      const guessSpy = sinon.spy();
      const changeGuessSpy = sinon.spy();
      const styles = {};

      const guess = mount(guessStory({
        onGuess: guessSpy,
        onChangeGuess: changeGuessSpy,
        ...noGuessStub,
      }));
      
      guess.simulate('click');
      expect(guessSpy.callCount).to.eql(0);

      // expect spies to be callable, guess button clickable
      // expect onChangeGuess to work by dotArity modulo
    });
  });
