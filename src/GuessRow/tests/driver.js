import React from 'react';
import { mount } from 'enzyme';

import GuessRow from '../';

const guessStory = (props) => {
  const p = (<GuessRow {...props} />);
  const m = mount(p);

  return {
    p,
    m,
    changeGuess: (ind, dir) =>
      m.find(`.change-dot-${dir}`).at(ind).simulate('click'),

    makeGuess: () =>
      m.find('.make-guess').simulate('click'),
  };
};

export default guessStory;
