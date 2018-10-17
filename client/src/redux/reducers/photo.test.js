import { Map } from 'immutable';

import reducer from './photo';

describe('photo', () => {
  it('has initial state', () => {
    const action = { type: undefined };
    const newState = reducer(undefined, action);

    expect(newState).toEqual(Map({
      loading: false,
      data: Map(),
    }));
  });
});
